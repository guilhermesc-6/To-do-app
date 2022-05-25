import { storage } from "./storage";

const DOMCreate = (name = "Default") => {
  // const list = `
  // <div class="project-view">
  //   <h1>${name}</h1>
  //   <div class="add-list">
  //     <button>add a task</button>
  //     <div class='modal'>
  //       <div>
  //         <input type="text" id="title" placeholder='Project title'>
  //         <input type="text" id="description" placeholder='Project description'>
  //         <input type="date" id="date">
  //         <input type="checkbox" id="checkbox">
  //         <label for="checkbox">Done</label>
  //         <div class='buttons'>
  //           <button>create</button>
  //           <button class='cancel'>cancel</button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  //   <div class='todo-list'></div>
  // </div>
  // `;
  const list = document.createElement("div");
  list.classList.add("project-view");

  const title = document.createElement("h1");
  title.innerText = name;

  const div = document.createElement("div");
  div.classList.add("add-list");
  const button = document.createElement("button");
  button.innerText = "add a task";
  button.onclick = () => {
    const inputdiv = document.querySelector(".modal");
    inputdiv.classList.toggle("open");
  };

  div.appendChild(button);

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const inputdiv = document.createElement("div");
  const input = document.createElement("input");
  const descriptionInput = document.createElement("input");
  const dateInput = document.createElement("input");
  const doneInput = document.createElement("input");
  const label = document.createElement("label");
  input.setAttribute("type", "text");
  input.setAttribute("id", "title");
  descriptionInput.setAttribute("type", "text");
  descriptionInput.setAttribute("id", "description");
  dateInput.setAttribute("type", "date");
  dateInput.setAttribute("id", "date");
  doneInput.setAttribute("type", "checkbox");
  doneInput.setAttribute("id", "checkbox");
  label.setAttribute("for", "checkbox");
  label.innerText = "Done";
  const inputBtn = document.createElement("button");
  inputBtn.innerText = "create";
  inputBtn.onclick = () => {
    const actualTitlte = document.querySelector(".project-view h1").innerText;
    createTodo(actualTitlte);
  };
  const cancelBtn = document.createElement("button");
  cancelBtn.innerText = "cancel";
  cancelBtn.classList.add("cancel");
  cancelBtn.onclick = () => {
    const inputdiv = document.querySelector(".modal");
    inputdiv.classList.toggle("open");
  };
  const btnsDiv = document.createElement("div");
  btnsDiv.classList.add("buttons");
  btnsDiv.appendChild(inputBtn);
  btnsDiv.appendChild(cancelBtn);
  inputdiv.appendChild(input);
  inputdiv.appendChild(descriptionInput);
  inputdiv.appendChild(dateInput);
  inputdiv.appendChild(doneInput);
  inputdiv.appendChild(label);
  inputdiv.appendChild(btnsDiv);

  modal.appendChild(inputdiv);

  div.appendChild(modal);

  list.appendChild(title);
  list.appendChild(div);

  const todoList = document.createElement("div");
  todoList.classList.add("todo-list");

  list.appendChild(todoList);

  return list;
};

const createList = (title, descriptionText, dateText, check) => {
  const todoList = document.querySelector(".todo-list");

  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("p");
  todoTitle.classList.add("title");
  todoTitle.innerText = title;
  const description = document.createElement("div");
  description.classList.add("discription");
  description.innerText = descriptionText;
  const date = document.createElement("div");
  date.classList.add("date");
  date.innerText = dateText;
  const btns = document.createElement("div");
  btns.classList.add("controllers");

  const doing = document.createElement("div");
  doing.classList.add("check");
  doing.innerText = "doing";
  if (check) {
    doing.innerText = "done";
    doing.classList.add("done");
  }
  doing.onclick = (e) => checkTodo(e);
  const deleteBtn = document.createElement("div");
  deleteBtn.classList.add("delete");
  deleteBtn.innerText = "delete";
  deleteBtn.onclick = (e) => deleteTodo(e);

  btns.appendChild(doing);
  btns.appendChild(deleteBtn);

  todo.appendChild(todoTitle);
  todo.appendChild(description);
  todo.appendChild(date);
  todo.appendChild(btns);

  todoList.appendChild(todo);
};

const createTodo = (name) => {
  const todoList = storage.getTodo();
  let projectTitle = [document.querySelector(".project-view h1").innerText];
  let title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const date = document.querySelector("#date").value;
  const check = document.querySelector("#checkbox").checked;

  document.querySelector(".modal").classList.toggle("open");

  let todo = { title, description, date, check };
  document.querySelector("#title").value = "";
  document.querySelector("#description").value = "";
  document.querySelector("#date").value = "";
  document.querySelector("#checkbox").checked = false;

  todoList[name].push(todo);
  storage.saveTodo(todoList);
  createList(title, description, date, check);
};

const refreshTodoList = () => {
  const todoList = document.querySelector(".todo-list");
  todoList.innerHTML = "";
  let projectTitle = [document.querySelector(".project-view h1").innerText];

  const todos = storage.getTodo();
  todos[projectTitle].map((todo) => {
    const { title, description, date, check } = todo;
    createList(title, description, date, check);
  });

  // var result = Object.keys(todos).map((key) => [key, todos[key]]);
  // console.log(result);
};

const loadTodos = (e) => {
  const todos = storage.getTodo();
  todos[e].map((todo) => {
    const { title, description, date, check } = todo;
    createList(title, description, date, check);
  });
};

const deleteTodo = (e) => {
  const todoList = storage.getTodo();
  let projectTitle = [document.querySelector(".project-view h1").innerText];

  let title = e.target.parentElement.parentElement.firstChild.innerText;
  let tasks = todoList[projectTitle].filter((todo) => todo.title !== title);
  todoList[projectTitle] = tasks;
  storage.saveTodo(todoList);
  refreshTodoList();
};

const checkTodo = (e) => {
  const todoList = storage.getTodo();
  let projectTitle = [document.querySelector(".project-view h1").innerText];
  e.target.classList.toggle("done");
  let title = e.target.parentElement.parentElement.firstChild.innerText;
  let list = todoList[projectTitle].filter((todo) => todo.title !== title);
  let task = todoList[projectTitle].filter((todo) => todo.title === title);
  task[0].check = !task[0].check;
  list.unshift(...task);
  todoList[projectTitle] = list;
  storage.saveTodo(todoList);
  refreshTodoList();
};

export const loadProjectList = (e) => {
  const actualTitlte = document.querySelector(".project-view h1").innerText;
  const main = document.querySelector(".main");

  // if (e.target.innerText === actualTitlte) {
  //   return;
  // }
  const projectView = DOMCreate(e.target.innerText);
  main.removeChild(document.querySelector(".project-view"));
  main.insertBefore(projectView, document.querySelector(".menu"));

  loadTodos(e.target.innerText);
};

export const TodoList = () => {
  const list = DOMCreate();
  const main = document.querySelector(".main");

  main.appendChild(list);

  const todoList = storage.getTodo();
  if (todoList["Default"].length > 0) {
    loadTodos("Default");
  }
};
