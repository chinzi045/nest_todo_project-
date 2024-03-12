import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./active.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Context, { MyContext } from "../components/Context";

const Active = () => {
  const initialValues = {
    title: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().min(3).max(20).required("Todos title is required"),
  });

  const [todos, setTodos] = useState([]);
  const [loader, setLoader] = useState(false);
  const { token, decode } = useContext(MyContext);

  const {
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (event) => {
      try {
        const data = await fetch(
          `http://localhost:4000/todo/${decode.userId}`,
          {
            method: "POST",
            body: JSON.stringify(event),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (!data.ok) throw data;

        const response = await data.json();

        setTodos((state) => [response.data, ...state]);
        toast.success("Successfully added!");

        resetForm();
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  useEffect(() => {
    if (decode) {
      // Check if decode is not null
      (async () => {
        setLoader(true);
        try {
          const response = await fetch(
            `http://localhost:4000/todo/findalltodosUncompletes/${decode.userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );

          const data = await response.json();
          if (!data) throw data;

          setTodos(data);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoader(false);
        }
      })();
    }
  }, [decode]); // Make useEffect dependent on decode

  const handleAdd = async (todo) => {
    try {
      const data = await fetch(`http://localhost:4000/todo/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!data.ok) throw data;

      const response = await data.json();

      if (response.affected === 1) {
        setTodos(todos.filter((t) => t.id !== todo.id));
      }

      toast.success("Successfully marked as completed!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDel = async (todo) => {
    try {
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <form className="main_active" onSubmit={handleSubmit}>
        <label>
          <h2>Enter Todo</h2>
        </label>
        <div className="input_div">
          <input
            type="text"
            className="todo_type"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <br />
          {errors.title && touched.title ? (
            <span className="input_error">{errors.title}</span>
          ) : null}
        </div>

        <button className="todo_btn" type="submit">
          Save
        </button>
      </form>
      {loader ? (
        <div>Loading</div>
      ) : (
        <div className="uncompleted_todos">
          {todos.map((todo) => (
            <div className="added_todo" key={todo.id}>
              <h4>{todo.title}</h4>

              <button className="mark_btn" onClick={() => handleAdd(todo)}>
                Mark Completed
              </button>
              <button className="delete_btn" onClick={() => handleDel(todo)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Active;
