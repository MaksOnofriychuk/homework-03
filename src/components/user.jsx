import { number } from "prop-types";
import React, { useState } from "react";
import api from "../API";

const User = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    const newUser = users.filter((us) => {
      return us._id !== userId;
    });
    setUsers(newUser);
  };
  const renderPhrase = (number) => {
    return number === 0
      ? "Никто с тобой не тусанет сегодня"
      : `${number} человек тусанет с тобой сегодня`;
  };
  const getBadgeClasses = () => {
    let styles = "badge bg-";
    styles += users.length === 0 ? "danger" : "primary";
    return styles;
  };

  const renderTd = () => {
    let classes = "badge bg-";
    const usersHTML = users.map((user) => {
      return (
        <>
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>
              {user.qualities.map((qual) => (
                <td className={classes + "" + qual.color}>{qual.name}</td>
              ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td>
              <button
                onClick={() => handleDelete(user._id)}
                className="btn btn-danger"
              >
                delete
              </button>
            </td>
          </tr>
        </>
      );
    });
    return usersHTML;
  };
  return (
    <>
      <h3>
        <span className={getBadgeClasses()}>{renderPhrase(users.length)}</span>
      </h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Провфессия</th>
            <th scope="col">Встретиля, раз</th>
            <th scope="col" colSpan="2">
              Оценка
            </th>
          </tr>
        </thead>
        <tbody>{renderTd()}</tbody>
      </table>
    </>
  );
};

export default User;
