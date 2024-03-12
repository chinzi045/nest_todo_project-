import React, { useEffect, useState } from "react";
import "./completed.css";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Completed = () => {
  const [todos, setTodos] = useState([]);

  const token = Cookies.get("token");
  const decode = jwtDecode(token);

  useEffect(() => {
    (async () => {
      const data = await fetch(
        `http://localhost:4000/todo/findalltodos/${decode.userId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const response = await data.json();
      console.log(token);
      console.log(response, "rrrr");
      setTodos(response);
    })();
  }, []);

  // delete api integration for todo

  const handleDel = async (todo) => {
    const data = await fetch(`http://localhost:4000/todo/${todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const response = await data.json();
    console.log(response);
    if (response.affected === 1) {
      setTodos(todos.filter((t) => t.id !== todo.id));
      toast.success("Deleted Successfully");
    }
  };
  return (
    <>
      <Navbar />
      <div className="completed_todos">
        <h1>Completed Todos</h1>
        <div className="completed_todoss">
          {todos.map((todo) => (
            <div className="todos_container" key={todo.id}>
              <h4>{todo.title}</h4>
              <button className="todos_btn" onClick={() => handleDel(todo)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Completed;
