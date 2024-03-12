import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./users.css";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { MyContext } from "../components/Context";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(false);
  const { token, decode } = useContext(MyContext);

  useEffect(() => {
    (async () => {
      setLoader(true);
      const data = await fetch("http://localhost:4000/findall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const response = await data.json();
      console.log(response);
      setUsers(response);
    })();
  }, [loader]);

  // delete the user by admin role
  const handleDel = async (user) => {
    const id = user.id;
    console.log(id);
    const data = await fetch(`http://localhost:4000/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const res = await data.json();
    console.log(res, "rrrrrrrrrrr");
    if (res.affected === 1) {
      setUsers(users.filter((u) => u.id !== user.id));
      toast.success("user deleted");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="users_main">
        <h1>Registerd Users</h1>

        <table
          border={1}
          style={{ borderCollapse: "collapse", padding: "10px" }}
          id="customers"
        >
          <thead>
            <tr className="theadssss">
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>STATUS</th>
              <th>ACTIVE</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="action_btn"
                      onClick={() => handleDel(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div>Loading....</div>
            )}        
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
