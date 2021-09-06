import React from "react";

function Profile(props) {
  return (
    <div className="container">
      <div>
        <header className="jumbotron">
          <h3>
            <strong>Kumar</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
        </p>
        <p>
          <strong>Id:</strong> 203323
        </p>
        <p>
          <strong>Email:</strong> kumar.s7943@gmail.com
        </p>
        <strong>Authorities:</strong>
        <ul></ul>
      </div>
    </div>
  );
}
export default Profile;
