import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const UserList = () => {
  const [usersList, setUsersList] = useState();

  useEffect(() => {
    axiosWithAuth()
      .get("/api/users")
      .then(res => {
        console.log("UserList res.data =", res.data);
        setUsersList(res.data);
      })
      .catch(err => {
        console.log("Could not retrieve users", err);
      });
  }, []);

  return (
    <div className="user-list" user-id="user-list">
      {usersList &&
        usersList.map(userlist => {
          return (
            <div key={userlist.id} userlist={userlist}>
              {/* <h2>ID: {userlist.id}</h2> */}
              <h2>Name: {userlist.username}</h2>
              <h2>Password: {userlist.password}</h2>
            </div>
          );
        })}
    </div>
  );
};

export default UserList;
