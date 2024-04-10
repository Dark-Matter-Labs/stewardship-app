import React from "react";

const UsersPage = () => {
  return (
    <div className="login">
      <b>Create a Clause</b>
      <form>
        <input
          className="input"
          placeholder="Relationship name"
          id="Relationship name"
          type="text"
        ></input>
        <input
          className="input"
          placeholder="Responsibility holder(s)"
          id="Responsibility holder"
          type="text"
        ></input>
        <input
          className="input"
          placeholder="Right Holder(s)"
          id="Right Holder"
          type="text"
        ></input>
        <input
          className="input"
          placeholder="Rights"
          id="Rights"
          type="text"
        ></input>
        <input
          className="input"
          placeholder="Responsibilities"
          id="Responsibilities"
          type="text"
        ></input>
        <button className="button primary">Create Relationship</button>
      </form>
    </div>
  );
};

export default UsersPage;
