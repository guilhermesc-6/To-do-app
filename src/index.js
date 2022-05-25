import Menu from "./menu";
import { TodoList } from "./todoList";

const createDOM = () => {
  const main = document.querySelector(".main");

  TodoList();
  Menu();
};

createDOM();
