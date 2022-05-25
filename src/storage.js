export const storage = (() => {
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
