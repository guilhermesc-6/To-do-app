import { storage } from "./storage";
import { loadProjectList } from "./todoList";

const DOMCreate = () => {
  const menu = document.createElement("nav");
  menu.classList.add("menu");

  const defaultProject = document.createElement("div");
  defaultProject.classList.add("default-projects");
  const defaultBtn = document.createElement("div");
  defaultBtn.classList.add("btn");
  defaultBtn.innerText = "Default";
  defaultProject.appendChild(defaultBtn);

  const userProjects = document.createElement("div");
  userProjects.classList.add("user-projects");
  const projectTitle = document.createElement("p");
  projectTitle.innerText = "Projects";
  userProjects.appendChild(projectTitle);

  const createProject = document.createElement("div");
  createProject.classList.add("create-project");
  const inputTxt = document.createElement("input");
  inputTxt.setAttribute("type", "text");
  const confirmBtn = document.createElement("input");
  confirmBtn.setAttribute("type", "button");
  confirmBtn.classList.add("confirm");
  const cancelBtn = document.createElement("input");
  cancelBtn.setAttribute("type", "button");
  cancelBtn.classList.add("cancel");
  createProject.appendChild(inputTxt);
  createProject.appendChild(confirmBtn);
  createProject.appendChild(cancelBtn);

  userProjects.appendChild(createProject);

  const btn = document.createElement("button");
  btn.innerText = "+ add new project";
  btn.classList.add("add-project");
  btn.setAttribute("type", "button");
  userProjects.appendChild(btn);

  menu.appendChild(defaultProject);
  menu.appendChild(userProjects);

  return menu;
};
const loadProject = (name) => {
  const userProject = document.querySelector(".user-projects");
  const project = document.createElement("div");
  project.classList.add("btn");
  project.innerText = name;
  project.onclick = (e) => loadProjectList(e);

  userProject.appendChild(project);
};
const newProject = (name) => {
  const todoList = storage.getTodo();
  const userProject = document.querySelector(".user-projects");
  const project = document.createElement("div");
  project.classList.add("btn");
  project.innerText = name;
  project.onclick = (e) => loadProjectList(e);

  const newTodoList = { [name]: [], ...todoList };
  storage.saveTodo(newTodoList);

  userProject.appendChild(project);
};

const createProjects = () => {
  const createProjectBtn = document.querySelector(".create-project");

  const cancelBtn = document.querySelector("input.cancel");
  const confirmBtn = document.querySelector("input.confirm");
  createProjectBtn.style.display = "flex";
  cancelBtn.addEventListener("click", () => {
    document.querySelector(".create-project input[type=text]").value = "";
    createProjectBtn.style.display = "none";
  });
  confirmBtn.addEventListener("click", () => {
    let text = document.querySelector(".create-project input[type=text]").value;
    document.querySelector(".create-project input[type=text]").value = "";
    createProjectBtn.style.display = "none";

    console.log(text);

    newProject(text);
    createProjectBtn.style.display = "none";
  });
};

// const loadProjectView = (e) => {
//   console.log(e.target);
// };

const Menu = () => {
  const menu = DOMCreate();
  const main = document.querySelector(".main");

  main.appendChild(menu);

  const todos = Object.keys(storage.getTodo());
  if (todos) {
    todos.forEach((todo) => {
      if (todo !== "Default") {
        loadProject(todo);
      }
    });
  }

  document
    .querySelector(".default-projects .btn")
    .addEventListener("click", (e) => {
      console.log("default");
      loadProjectList(e);
    });

  document.querySelector("button.add-project").addEventListener("click", () => {
    createProjects();
  });
};

export default Menu;
