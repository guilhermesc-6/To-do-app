/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/menu.js":
/*!*********************!*\
  !*** ./src/menu.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
/* harmony import */ var _todoList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todoList */ "./src/todoList.js");



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
  project.onclick = (e) => (0,_todoList__WEBPACK_IMPORTED_MODULE_1__.loadProjectList)(e);

  userProject.appendChild(project);
};
const newProject = (name) => {
  const todoList = _storage__WEBPACK_IMPORTED_MODULE_0__.storage.getTodo();
  const userProject = document.querySelector(".user-projects");
  const project = document.createElement("div");
  project.classList.add("btn");
  project.innerText = name;
  project.onclick = (e) => (0,_todoList__WEBPACK_IMPORTED_MODULE_1__.loadProjectList)(e);

  const newTodoList = { [name]: [], ...todoList };
  _storage__WEBPACK_IMPORTED_MODULE_0__.storage.saveTodo(newTodoList);

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

  const todos = Object.keys(_storage__WEBPACK_IMPORTED_MODULE_0__.storage.getTodo());
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
      (0,_todoList__WEBPACK_IMPORTED_MODULE_1__.loadProjectList)(e);
    });

  document.querySelector("button.add-project").addEventListener("click", () => {
    createProjects();
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Menu);


/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "storage": () => (/* binding */ storage)
/* harmony export */ });
const storage = (() => {
  const getTodo = () => {
    return (
      JSON.parse(localStorage.getItem("todo")) || {
        Default: [],
      }
    );
  };

  const saveTodo = (todo) => {
    localStorage.setItem("todo", JSON.stringify(todo));
  };

  return { getTodo, saveTodo };
})();


/***/ }),

/***/ "./src/todoList.js":
/*!*************************!*\
  !*** ./src/todoList.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TodoList": () => (/* binding */ TodoList),
/* harmony export */   "loadProjectList": () => (/* binding */ loadProjectList)
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/storage.js");


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
  const todoList = _storage__WEBPACK_IMPORTED_MODULE_0__.storage.getTodo();
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
  _storage__WEBPACK_IMPORTED_MODULE_0__.storage.saveTodo(todoList);
  createList(title, description, date, check);
};

const refreshTodoList = () => {
  const todoList = document.querySelector(".todo-list");
  todoList.innerHTML = "";
  let projectTitle = [document.querySelector(".project-view h1").innerText];

  const todos = _storage__WEBPACK_IMPORTED_MODULE_0__.storage.getTodo();
  todos[projectTitle].map((todo) => {
    const { title, description, date, check } = todo;
    createList(title, description, date, check);
  });

  // var result = Object.keys(todos).map((key) => [key, todos[key]]);
  // console.log(result);
};

const loadTodos = (e) => {
  const todos = _storage__WEBPACK_IMPORTED_MODULE_0__.storage.getTodo();
  todos[e].map((todo) => {
    const { title, description, date, check } = todo;
    createList(title, description, date, check);
  });
};

const deleteTodo = (e) => {
  const todoList = _storage__WEBPACK_IMPORTED_MODULE_0__.storage.getTodo();
  let projectTitle = [document.querySelector(".project-view h1").innerText];

  let title = e.target.parentElement.parentElement.firstChild.innerText;
  let tasks = todoList[projectTitle].filter((todo) => todo.title !== title);
  todoList[projectTitle] = tasks;
  _storage__WEBPACK_IMPORTED_MODULE_0__.storage.saveTodo(todoList);
  refreshTodoList();
};

const checkTodo = (e) => {
  const todoList = _storage__WEBPACK_IMPORTED_MODULE_0__.storage.getTodo();
  let projectTitle = [document.querySelector(".project-view h1").innerText];
  e.target.classList.toggle("done");
  let title = e.target.parentElement.parentElement.firstChild.innerText;
  let list = todoList[projectTitle].filter((todo) => todo.title !== title);
  let task = todoList[projectTitle].filter((todo) => todo.title === title);
  task[0].check = !task[0].check;
  list.unshift(...task);
  todoList[projectTitle] = list;
  _storage__WEBPACK_IMPORTED_MODULE_0__.storage.saveTodo(todoList);
  refreshTodoList();
};

const loadProjectList = (e) => {
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

const TodoList = () => {
  const list = DOMCreate();
  const main = document.querySelector(".main");

  main.appendChild(list);

  const todoList = _storage__WEBPACK_IMPORTED_MODULE_0__.storage.getTodo();
  if (todoList["Default"].length > 0) {
    loadTodos("Default");
  }
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu */ "./src/menu.js");
/* harmony import */ var _todoList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todoList */ "./src/todoList.js");



const createDOM = () => {
  const main = document.querySelector(".main");

  (0,_todoList__WEBPACK_IMPORTED_MODULE_1__.TodoList)();
  (0,_menu__WEBPACK_IMPORTED_MODULE_0__["default"])();
};

createDOM();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQW9DO0FBQ1M7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwwREFBZTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxREFBZTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwwREFBZTtBQUMxQztBQUNBLHdCQUF3QjtBQUN4QixFQUFFLHNEQUFnQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHFEQUFlO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSwwREFBZTtBQUNyQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzNIYjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2RtQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHFEQUFlO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxzREFBZ0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixxREFBZTtBQUMvQjtBQUNBLFlBQVksa0NBQWtDO0FBQzlDO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixxREFBZTtBQUMvQjtBQUNBLFlBQVksa0NBQWtDO0FBQzlDO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxREFBZTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxzREFBZ0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIscURBQWU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsc0RBQWdCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIscURBQWU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUMzT0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOMEI7QUFDWTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsbURBQVE7QUFDVixFQUFFLGlEQUFJO0FBQ047QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvbWVudS5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL3RvZG9MaXN0LmpzIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgbG9hZFByb2plY3RMaXN0IH0gZnJvbSBcIi4vdG9kb0xpc3RcIjtcclxuXHJcbmNvbnN0IERPTUNyZWF0ZSA9ICgpID0+IHtcclxuICBjb25zdCBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm5hdlwiKTtcclxuICBtZW51LmNsYXNzTGlzdC5hZGQoXCJtZW51XCIpO1xyXG5cclxuICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZGVmYXVsdFByb2plY3QuY2xhc3NMaXN0LmFkZChcImRlZmF1bHQtcHJvamVjdHNcIik7XHJcbiAgY29uc3QgZGVmYXVsdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZGVmYXVsdEJ0bi5jbGFzc0xpc3QuYWRkKFwiYnRuXCIpO1xyXG4gIGRlZmF1bHRCdG4uaW5uZXJUZXh0ID0gXCJEZWZhdWx0XCI7XHJcbiAgZGVmYXVsdFByb2plY3QuYXBwZW5kQ2hpbGQoZGVmYXVsdEJ0bik7XHJcblxyXG4gIGNvbnN0IHVzZXJQcm9qZWN0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgdXNlclByb2plY3RzLmNsYXNzTGlzdC5hZGQoXCJ1c2VyLXByb2plY3RzXCIpO1xyXG4gIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gIHByb2plY3RUaXRsZS5pbm5lclRleHQgPSBcIlByb2plY3RzXCI7XHJcbiAgdXNlclByb2plY3RzLmFwcGVuZENoaWxkKHByb2plY3RUaXRsZSk7XHJcblxyXG4gIGNvbnN0IGNyZWF0ZVByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGNyZWF0ZVByb2plY3QuY2xhc3NMaXN0LmFkZChcImNyZWF0ZS1wcm9qZWN0XCIpO1xyXG4gIGNvbnN0IGlucHV0VHh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gIGlucHV0VHh0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xyXG4gIGNvbnN0IGNvbmZpcm1CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgY29uZmlybUJ0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xyXG4gIGNvbmZpcm1CdG4uY2xhc3NMaXN0LmFkZChcImNvbmZpcm1cIik7XHJcbiAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gIGNhbmNlbEJ0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xyXG4gIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwiY2FuY2VsXCIpO1xyXG4gIGNyZWF0ZVByb2plY3QuYXBwZW5kQ2hpbGQoaW5wdXRUeHQpO1xyXG4gIGNyZWF0ZVByb2plY3QuYXBwZW5kQ2hpbGQoY29uZmlybUJ0bik7XHJcbiAgY3JlYXRlUHJvamVjdC5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xyXG5cclxuICB1c2VyUHJvamVjdHMuYXBwZW5kQ2hpbGQoY3JlYXRlUHJvamVjdCk7XHJcblxyXG4gIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnRuLmlubmVyVGV4dCA9IFwiKyBhZGQgbmV3IHByb2plY3RcIjtcclxuICBidG4uY2xhc3NMaXN0LmFkZChcImFkZC1wcm9qZWN0XCIpO1xyXG4gIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xyXG4gIHVzZXJQcm9qZWN0cy5hcHBlbmRDaGlsZChidG4pO1xyXG5cclxuICBtZW51LmFwcGVuZENoaWxkKGRlZmF1bHRQcm9qZWN0KTtcclxuICBtZW51LmFwcGVuZENoaWxkKHVzZXJQcm9qZWN0cyk7XHJcblxyXG4gIHJldHVybiBtZW51O1xyXG59O1xyXG5jb25zdCBsb2FkUHJvamVjdCA9IChuYW1lKSA9PiB7XHJcbiAgY29uc3QgdXNlclByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItcHJvamVjdHNcIik7XHJcbiAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgcHJvamVjdC5jbGFzc0xpc3QuYWRkKFwiYnRuXCIpO1xyXG4gIHByb2plY3QuaW5uZXJUZXh0ID0gbmFtZTtcclxuICBwcm9qZWN0Lm9uY2xpY2sgPSAoZSkgPT4gbG9hZFByb2plY3RMaXN0KGUpO1xyXG5cclxuICB1c2VyUHJvamVjdC5hcHBlbmRDaGlsZChwcm9qZWN0KTtcclxufTtcclxuY29uc3QgbmV3UHJvamVjdCA9IChuYW1lKSA9PiB7XHJcbiAgY29uc3QgdG9kb0xpc3QgPSBzdG9yYWdlLmdldFRvZG8oKTtcclxuICBjb25zdCB1c2VyUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1wcm9qZWN0c1wiKTtcclxuICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBwcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJidG5cIik7XHJcbiAgcHJvamVjdC5pbm5lclRleHQgPSBuYW1lO1xyXG4gIHByb2plY3Qub25jbGljayA9IChlKSA9PiBsb2FkUHJvamVjdExpc3QoZSk7XHJcblxyXG4gIGNvbnN0IG5ld1RvZG9MaXN0ID0geyBbbmFtZV06IFtdLCAuLi50b2RvTGlzdCB9O1xyXG4gIHN0b3JhZ2Uuc2F2ZVRvZG8obmV3VG9kb0xpc3QpO1xyXG5cclxuICB1c2VyUHJvamVjdC5hcHBlbmRDaGlsZChwcm9qZWN0KTtcclxufTtcclxuXHJcbmNvbnN0IGNyZWF0ZVByb2plY3RzID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNyZWF0ZVByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNyZWF0ZS1wcm9qZWN0XCIpO1xyXG5cclxuICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXQuY2FuY2VsXCIpO1xyXG4gIGNvbnN0IGNvbmZpcm1CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXQuY29uZmlybVwiKTtcclxuICBjcmVhdGVQcm9qZWN0QnRuLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3JlYXRlLXByb2plY3QgaW5wdXRbdHlwZT10ZXh0XVwiKS52YWx1ZSA9IFwiXCI7XHJcbiAgICBjcmVhdGVQcm9qZWN0QnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICB9KTtcclxuICBjb25maXJtQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBsZXQgdGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3JlYXRlLXByb2plY3QgaW5wdXRbdHlwZT10ZXh0XVwiKS52YWx1ZTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3JlYXRlLXByb2plY3QgaW5wdXRbdHlwZT10ZXh0XVwiKS52YWx1ZSA9IFwiXCI7XHJcbiAgICBjcmVhdGVQcm9qZWN0QnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHJcbiAgICBjb25zb2xlLmxvZyh0ZXh0KTtcclxuXHJcbiAgICBuZXdQcm9qZWN0KHRleHQpO1xyXG4gICAgY3JlYXRlUHJvamVjdEJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBjb25zdCBsb2FkUHJvamVjdFZpZXcgPSAoZSkgPT4ge1xyXG4vLyAgIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcclxuLy8gfTtcclxuXHJcbmNvbnN0IE1lbnUgPSAoKSA9PiB7XHJcbiAgY29uc3QgbWVudSA9IERPTUNyZWF0ZSgpO1xyXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5cIik7XHJcblxyXG4gIG1haW4uYXBwZW5kQ2hpbGQobWVudSk7XHJcblxyXG4gIGNvbnN0IHRvZG9zID0gT2JqZWN0LmtleXMoc3RvcmFnZS5nZXRUb2RvKCkpO1xyXG4gIGlmICh0b2Rvcykge1xyXG4gICAgdG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xyXG4gICAgICBpZiAodG9kbyAhPT0gXCJEZWZhdWx0XCIpIHtcclxuICAgICAgICBsb2FkUHJvamVjdCh0b2RvKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkb2N1bWVudFxyXG4gICAgLnF1ZXJ5U2VsZWN0b3IoXCIuZGVmYXVsdC1wcm9qZWN0cyAuYnRuXCIpXHJcbiAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZGVmYXVsdFwiKTtcclxuICAgICAgbG9hZFByb2plY3RMaXN0KGUpO1xyXG4gICAgfSk7XHJcblxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b24uYWRkLXByb2plY3RcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGNyZWF0ZVByb2plY3RzKCk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNZW51O1xyXG4iLCJleHBvcnQgY29uc3Qgc3RvcmFnZSA9ICgoKSA9PiB7XHJcbiAgY29uc3QgZ2V0VG9kbyA9ICgpID0+IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2RvXCIpKSB8fCB7XHJcbiAgICAgICAgRGVmYXVsdDogW10sXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2F2ZVRvZG8gPSAodG9kbykgPT4ge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2RvXCIsIEpTT04uc3RyaW5naWZ5KHRvZG8pKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4geyBnZXRUb2RvLCBzYXZlVG9kbyB9O1xyXG59KSgpO1xyXG4iLCJpbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcIi4vc3RvcmFnZVwiO1xyXG5cclxuY29uc3QgRE9NQ3JlYXRlID0gKG5hbWUgPSBcIkRlZmF1bHRcIikgPT4ge1xyXG4gIC8vIGNvbnN0IGxpc3QgPSBgXHJcbiAgLy8gPGRpdiBjbGFzcz1cInByb2plY3Qtdmlld1wiPlxyXG4gIC8vICAgPGgxPiR7bmFtZX08L2gxPlxyXG4gIC8vICAgPGRpdiBjbGFzcz1cImFkZC1saXN0XCI+XHJcbiAgLy8gICAgIDxidXR0b24+YWRkIGEgdGFzazwvYnV0dG9uPlxyXG4gIC8vICAgICA8ZGl2IGNsYXNzPSdtb2RhbCc+XHJcbiAgLy8gICAgICAgPGRpdj5cclxuICAvLyAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGl0bGVcIiBwbGFjZWhvbGRlcj0nUHJvamVjdCB0aXRsZSc+XHJcbiAgLy8gICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImRlc2NyaXB0aW9uXCIgcGxhY2Vob2xkZXI9J1Byb2plY3QgZGVzY3JpcHRpb24nPlxyXG4gIC8vICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgaWQ9XCJkYXRlXCI+XHJcbiAgLy8gICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjaGVja2JveFwiPlxyXG4gIC8vICAgICAgICAgPGxhYmVsIGZvcj1cImNoZWNrYm94XCI+RG9uZTwvbGFiZWw+XHJcbiAgLy8gICAgICAgICA8ZGl2IGNsYXNzPSdidXR0b25zJz5cclxuICAvLyAgICAgICAgICAgPGJ1dHRvbj5jcmVhdGU8L2J1dHRvbj5cclxuICAvLyAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0nY2FuY2VsJz5jYW5jZWw8L2J1dHRvbj5cclxuICAvLyAgICAgICAgIDwvZGl2PlxyXG4gIC8vICAgICAgIDwvZGl2PlxyXG4gIC8vICAgICA8L2Rpdj5cclxuICAvLyAgIDwvZGl2PlxyXG4gIC8vICAgPGRpdiBjbGFzcz0ndG9kby1saXN0Jz48L2Rpdj5cclxuICAvLyA8L2Rpdj5cclxuICAvLyBgO1xyXG4gIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGxpc3QuY2xhc3NMaXN0LmFkZChcInByb2plY3Qtdmlld1wiKTtcclxuXHJcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XHJcbiAgdGl0bGUuaW5uZXJUZXh0ID0gbmFtZTtcclxuXHJcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBkaXYuY2xhc3NMaXN0LmFkZChcImFkZC1saXN0XCIpO1xyXG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uLmlubmVyVGV4dCA9IFwiYWRkIGEgdGFza1wiO1xyXG4gIGJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgY29uc3QgaW5wdXRkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsXCIpO1xyXG4gICAgaW5wdXRkaXYuY2xhc3NMaXN0LnRvZ2dsZShcIm9wZW5cIik7XHJcbiAgfTtcclxuXHJcbiAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcblxyXG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBtb2RhbC5jbGFzc0xpc3QuYWRkKFwibW9kYWxcIik7XHJcblxyXG4gIGNvbnN0IGlucHV0ZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICBjb25zdCBkZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gIGNvbnN0IGRhdGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICBjb25zdCBkb25lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XHJcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XHJcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ0aXRsZVwiKTtcclxuICBkZXNjcmlwdGlvbklucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xyXG4gIGRlc2NyaXB0aW9uSW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJkZXNjcmlwdGlvblwiKTtcclxuICBkYXRlSW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImRhdGVcIik7XHJcbiAgZGF0ZUlucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZGF0ZVwiKTtcclxuICBkb25lSW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xyXG4gIGRvbmVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImNoZWNrYm94XCIpO1xyXG4gIGxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcImNoZWNrYm94XCIpO1xyXG4gIGxhYmVsLmlubmVyVGV4dCA9IFwiRG9uZVwiO1xyXG4gIGNvbnN0IGlucHV0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBpbnB1dEJ0bi5pbm5lclRleHQgPSBcImNyZWF0ZVwiO1xyXG4gIGlucHV0QnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhY3R1YWxUaXRsdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtdmlldyBoMVwiKS5pbm5lclRleHQ7XHJcbiAgICBjcmVhdGVUb2RvKGFjdHVhbFRpdGx0ZSk7XHJcbiAgfTtcclxuICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGNhbmNlbEJ0bi5pbm5lclRleHQgPSBcImNhbmNlbFwiO1xyXG4gIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwiY2FuY2VsXCIpO1xyXG4gIGNhbmNlbEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgY29uc3QgaW5wdXRkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsXCIpO1xyXG4gICAgaW5wdXRkaXYuY2xhc3NMaXN0LnRvZ2dsZShcIm9wZW5cIik7XHJcbiAgfTtcclxuICBjb25zdCBidG5zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBidG5zRGl2LmNsYXNzTGlzdC5hZGQoXCJidXR0b25zXCIpO1xyXG4gIGJ0bnNEaXYuYXBwZW5kQ2hpbGQoaW5wdXRCdG4pO1xyXG4gIGJ0bnNEaXYuYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcclxuICBpbnB1dGRpdi5hcHBlbmRDaGlsZChpbnB1dCk7XHJcbiAgaW5wdXRkaXYuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25JbnB1dCk7XHJcbiAgaW5wdXRkaXYuYXBwZW5kQ2hpbGQoZGF0ZUlucHV0KTtcclxuICBpbnB1dGRpdi5hcHBlbmRDaGlsZChkb25lSW5wdXQpO1xyXG4gIGlucHV0ZGl2LmFwcGVuZENoaWxkKGxhYmVsKTtcclxuICBpbnB1dGRpdi5hcHBlbmRDaGlsZChidG5zRGl2KTtcclxuXHJcbiAgbW9kYWwuYXBwZW5kQ2hpbGQoaW5wdXRkaXYpO1xyXG5cclxuICBkaXYuYXBwZW5kQ2hpbGQobW9kYWwpO1xyXG5cclxuICBsaXN0LmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICBsaXN0LmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gIGNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICB0b2RvTGlzdC5jbGFzc0xpc3QuYWRkKFwidG9kby1saXN0XCIpO1xyXG5cclxuICBsaXN0LmFwcGVuZENoaWxkKHRvZG9MaXN0KTtcclxuXHJcbiAgcmV0dXJuIGxpc3Q7XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVMaXN0ID0gKHRpdGxlLCBkZXNjcmlwdGlvblRleHQsIGRhdGVUZXh0LCBjaGVjaykgPT4ge1xyXG4gIGNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3RcIik7XHJcblxyXG4gIGNvbnN0IHRvZG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHRvZG8uY2xhc3NMaXN0LmFkZChcInRvZG9cIik7XHJcblxyXG4gIGNvbnN0IHRvZG9UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gIHRvZG9UaXRsZS5jbGFzc0xpc3QuYWRkKFwidGl0bGVcIik7XHJcbiAgdG9kb1RpdGxlLmlubmVyVGV4dCA9IHRpdGxlO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBkZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKFwiZGlzY3JpcHRpb25cIik7XHJcbiAgZGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gZGVzY3JpcHRpb25UZXh0O1xyXG4gIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRhdGUuY2xhc3NMaXN0LmFkZChcImRhdGVcIik7XHJcbiAgZGF0ZS5pbm5lclRleHQgPSBkYXRlVGV4dDtcclxuICBjb25zdCBidG5zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBidG5zLmNsYXNzTGlzdC5hZGQoXCJjb250cm9sbGVyc1wiKTtcclxuXHJcbiAgY29uc3QgZG9pbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRvaW5nLmNsYXNzTGlzdC5hZGQoXCJjaGVja1wiKTtcclxuICBkb2luZy5pbm5lclRleHQgPSBcImRvaW5nXCI7XHJcbiAgaWYgKGNoZWNrKSB7XHJcbiAgICBkb2luZy5pbm5lclRleHQgPSBcImRvbmVcIjtcclxuICAgIGRvaW5nLmNsYXNzTGlzdC5hZGQoXCJkb25lXCIpO1xyXG4gIH1cclxuICBkb2luZy5vbmNsaWNrID0gKGUpID0+IGNoZWNrVG9kbyhlKTtcclxuICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlXCIpO1xyXG4gIGRlbGV0ZUJ0bi5pbm5lclRleHQgPSBcImRlbGV0ZVwiO1xyXG4gIGRlbGV0ZUJ0bi5vbmNsaWNrID0gKGUpID0+IGRlbGV0ZVRvZG8oZSk7XHJcblxyXG4gIGJ0bnMuYXBwZW5kQ2hpbGQoZG9pbmcpO1xyXG4gIGJ0bnMuYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcclxuXHJcbiAgdG9kby5hcHBlbmRDaGlsZCh0b2RvVGl0bGUpO1xyXG4gIHRvZG8uYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xyXG4gIHRvZG8uYXBwZW5kQ2hpbGQoZGF0ZSk7XHJcbiAgdG9kby5hcHBlbmRDaGlsZChidG5zKTtcclxuXHJcbiAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQodG9kbyk7XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVUb2RvID0gKG5hbWUpID0+IHtcclxuICBjb25zdCB0b2RvTGlzdCA9IHN0b3JhZ2UuZ2V0VG9kbygpO1xyXG4gIGxldCBwcm9qZWN0VGl0bGUgPSBbZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LXZpZXcgaDFcIikuaW5uZXJUZXh0XTtcclxuICBsZXQgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpLnZhbHVlO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXNjcmlwdGlvblwiKS52YWx1ZTtcclxuICBjb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRlXCIpLnZhbHVlO1xyXG4gIGNvbnN0IGNoZWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaGVja2JveFwiKS5jaGVja2VkO1xyXG5cclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJvcGVuXCIpO1xyXG5cclxuICBsZXQgdG9kbyA9IHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBjaGVjayB9O1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIikudmFsdWUgPSBcIlwiO1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25cIikudmFsdWUgPSBcIlwiO1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0ZVwiKS52YWx1ZSA9IFwiXCI7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaGVja2JveFwiKS5jaGVja2VkID0gZmFsc2U7XHJcblxyXG4gIHRvZG9MaXN0W25hbWVdLnB1c2godG9kbyk7XHJcbiAgc3RvcmFnZS5zYXZlVG9kbyh0b2RvTGlzdCk7XHJcbiAgY3JlYXRlTGlzdCh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIGNoZWNrKTtcclxufTtcclxuXHJcbmNvbnN0IHJlZnJlc2hUb2RvTGlzdCA9ICgpID0+IHtcclxuICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0XCIpO1xyXG4gIHRvZG9MaXN0LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgbGV0IHByb2plY3RUaXRsZSA9IFtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtdmlldyBoMVwiKS5pbm5lclRleHRdO1xyXG5cclxuICBjb25zdCB0b2RvcyA9IHN0b3JhZ2UuZ2V0VG9kbygpO1xyXG4gIHRvZG9zW3Byb2plY3RUaXRsZV0ubWFwKCh0b2RvKSA9PiB7XHJcbiAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgY2hlY2sgfSA9IHRvZG87XHJcbiAgICBjcmVhdGVMaXN0KHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgY2hlY2spO1xyXG4gIH0pO1xyXG5cclxuICAvLyB2YXIgcmVzdWx0ID0gT2JqZWN0LmtleXModG9kb3MpLm1hcCgoa2V5KSA9PiBba2V5LCB0b2Rvc1trZXldXSk7XHJcbiAgLy8gY29uc29sZS5sb2cocmVzdWx0KTtcclxufTtcclxuXHJcbmNvbnN0IGxvYWRUb2RvcyA9IChlKSA9PiB7XHJcbiAgY29uc3QgdG9kb3MgPSBzdG9yYWdlLmdldFRvZG8oKTtcclxuICB0b2Rvc1tlXS5tYXAoKHRvZG8pID0+IHtcclxuICAgIGNvbnN0IHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBjaGVjayB9ID0gdG9kbztcclxuICAgIGNyZWF0ZUxpc3QodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBjaGVjayk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBkZWxldGVUb2RvID0gKGUpID0+IHtcclxuICBjb25zdCB0b2RvTGlzdCA9IHN0b3JhZ2UuZ2V0VG9kbygpO1xyXG4gIGxldCBwcm9qZWN0VGl0bGUgPSBbZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LXZpZXcgaDFcIikuaW5uZXJUZXh0XTtcclxuXHJcbiAgbGV0IHRpdGxlID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmZpcnN0Q2hpbGQuaW5uZXJUZXh0O1xyXG4gIGxldCB0YXNrcyA9IHRvZG9MaXN0W3Byb2plY3RUaXRsZV0uZmlsdGVyKCh0b2RvKSA9PiB0b2RvLnRpdGxlICE9PSB0aXRsZSk7XHJcbiAgdG9kb0xpc3RbcHJvamVjdFRpdGxlXSA9IHRhc2tzO1xyXG4gIHN0b3JhZ2Uuc2F2ZVRvZG8odG9kb0xpc3QpO1xyXG4gIHJlZnJlc2hUb2RvTGlzdCgpO1xyXG59O1xyXG5cclxuY29uc3QgY2hlY2tUb2RvID0gKGUpID0+IHtcclxuICBjb25zdCB0b2RvTGlzdCA9IHN0b3JhZ2UuZ2V0VG9kbygpO1xyXG4gIGxldCBwcm9qZWN0VGl0bGUgPSBbZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LXZpZXcgaDFcIikuaW5uZXJUZXh0XTtcclxuICBlLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKFwiZG9uZVwiKTtcclxuICBsZXQgdGl0bGUgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZmlyc3RDaGlsZC5pbm5lclRleHQ7XHJcbiAgbGV0IGxpc3QgPSB0b2RvTGlzdFtwcm9qZWN0VGl0bGVdLmZpbHRlcigodG9kbykgPT4gdG9kby50aXRsZSAhPT0gdGl0bGUpO1xyXG4gIGxldCB0YXNrID0gdG9kb0xpc3RbcHJvamVjdFRpdGxlXS5maWx0ZXIoKHRvZG8pID0+IHRvZG8udGl0bGUgPT09IHRpdGxlKTtcclxuICB0YXNrWzBdLmNoZWNrID0gIXRhc2tbMF0uY2hlY2s7XHJcbiAgbGlzdC51bnNoaWZ0KC4uLnRhc2spO1xyXG4gIHRvZG9MaXN0W3Byb2plY3RUaXRsZV0gPSBsaXN0O1xyXG4gIHN0b3JhZ2Uuc2F2ZVRvZG8odG9kb0xpc3QpO1xyXG4gIHJlZnJlc2hUb2RvTGlzdCgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGxvYWRQcm9qZWN0TGlzdCA9IChlKSA9PiB7XHJcbiAgY29uc3QgYWN0dWFsVGl0bHRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LXZpZXcgaDFcIikuaW5uZXJUZXh0O1xyXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5cIik7XHJcblxyXG4gIC8vIGlmIChlLnRhcmdldC5pbm5lclRleHQgPT09IGFjdHVhbFRpdGx0ZSkge1xyXG4gIC8vICAgcmV0dXJuO1xyXG4gIC8vIH1cclxuICBjb25zdCBwcm9qZWN0VmlldyA9IERPTUNyZWF0ZShlLnRhcmdldC5pbm5lclRleHQpO1xyXG4gIG1haW4ucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LXZpZXdcIikpO1xyXG4gIG1haW4uaW5zZXJ0QmVmb3JlKHByb2plY3RWaWV3LCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnVcIikpO1xyXG5cclxuICBsb2FkVG9kb3MoZS50YXJnZXQuaW5uZXJUZXh0KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBUb2RvTGlzdCA9ICgpID0+IHtcclxuICBjb25zdCBsaXN0ID0gRE9NQ3JlYXRlKCk7XHJcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpblwiKTtcclxuXHJcbiAgbWFpbi5hcHBlbmRDaGlsZChsaXN0KTtcclxuXHJcbiAgY29uc3QgdG9kb0xpc3QgPSBzdG9yYWdlLmdldFRvZG8oKTtcclxuICBpZiAodG9kb0xpc3RbXCJEZWZhdWx0XCJdLmxlbmd0aCA+IDApIHtcclxuICAgIGxvYWRUb2RvcyhcIkRlZmF1bHRcIik7XHJcbiAgfVxyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBNZW51IGZyb20gXCIuL21lbnVcIjtcclxuaW1wb3J0IHsgVG9kb0xpc3QgfSBmcm9tIFwiLi90b2RvTGlzdFwiO1xyXG5cclxuY29uc3QgY3JlYXRlRE9NID0gKCkgPT4ge1xyXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5cIik7XHJcblxyXG4gIFRvZG9MaXN0KCk7XHJcbiAgTWVudSgpO1xyXG59O1xyXG5cclxuY3JlYXRlRE9NKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==