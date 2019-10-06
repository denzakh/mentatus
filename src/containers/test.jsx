// test components.js
import React from "react";
import { connect } from "react-redux";
import Link from "redux-first-router-link";

const Home = () => <h3>Home</h3>;

const User = ({ userId }) => <h3>{`User ${userId}`}</h3>;
const mapStateToProps = ({ location }) => ({
  userId: location.payload.id
});
const ConnectedUser = connect(mapStateToProps)(User);

const NotFound = () => {
  return (
    <div>
      <h3>404</h3>

      <Link to="/user/1">user 1</Link>
    </div>
  );
};

export { Home, ConnectedUser as User, NotFound };
