import "./App.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  addUser,
  deleteUser,
  updateUsername
} from "./features/UsersSlice";

export default function App() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.data);

  const [userInfo, setUserInfo] = useState({
    name: "",
    userName: "",
    newUserName: ""
  });

  async function getData() {
    try {
      await fetch("https://randomuser.me/api/?results=10")
        .then((res) => res.json())
        .then((result) => dispatch(getUsers(result.results)));
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const changeUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      {" "}
      <div className="addUser">
        <input
          type="text"
          placeholder="Name..."
          name="name"
          onChange={changeUserInfo}
        />
        <input
          type="text"
          placeholder="Username..."
          name="userName"
          onChange={changeUserInfo}
        />
        <button
          onClick={() => {
            dispatch(
              addUser({
                id: { value: Date.now() + 1 },
                name: { first: userInfo.name },
                email: userInfo.userName
              })
            );
          }}
        >
          {" "}
          Add User
        </button>
      </div>
      <div className="displayUsers">
        {userList.map((user) => {
          return (
            <div key={user.email}>
              <h2>{user.name.first}</h2>
              <h2> {user.email}</h2>
              <input
                type="text"
                placeholder="New username..."
                name="newUserName"
                onChange={changeUserInfo}
              />
              <button
                onClick={() => {
                  dispatch(
                    updateUsername({
                      email: userInfo.newUserName,
                      id: user.email
                    })
                  );
                }}
              >
                Update Username
              </button>
              <button
                onClick={() =>
                  dispatch(
                    deleteUser({
                      id: user.email
                    })
                  )
                }
              >
                Delete User
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
