import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import useUserStore from "../zustand/userstate";
import useTodoStore from "../zustand/todostate";

const TodoList: React.FC = () => {
  const userId = useUserStore((state) => state.user?.id || null);
  const { todos, fetchTodos, addTodo, toggleTodo, removeTodo } = useTodoStore();
  const [input, setInput] = useState("");

  useEffect(() => {
    if (userId !== null) {
      fetchTodos(userId);
    }
  }, [userId, fetchTodos]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && userId !== null) {
      await addTodo(userId, input.trim());
      setInput("");
    }
  };

  return (
    <div className="w-full pt-6 px-4 bg-gray-50 pb-6 border border-gray-200 rounded-lg shadow-md">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Todo List</h1>
        <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>
        <ul className="space-y-2">
          {todos.length === 0 && (
            <li className="text-gray-400 text-center">No todos yet!</li>
          )}
          {todos.map(todo => (
            <li
              key={todo.id}
              className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded hover:bg-gray-100 transition"
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className={`flex-1 cursor-pointer select-none ${
                  todo.completed ? "line-through text-gray-400" : "text-gray-800"
                }`}
                tabIndex={0}
                role="button"
                aria-pressed={todo.completed}
                onKeyDown={e => (e.key === "Enter" || e.key === " ") && toggleTodo(todo.id)}
                title="Toggle complete"
              >
                {todo.text}
              </span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="ml-4 text-red-500 hover:text-red-700 transition"
                aria-label="Delete todo"
                title="Delete"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;

