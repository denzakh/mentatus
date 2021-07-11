import React, { Component } from "react";
import Home from "./Home";
import User from "./User";
import CurrentStatus from "./CurrentStatus";
import Repository from "./Repository";

const NotFound = () => {
	return (
		<div>
			<h3>404</h3>
		</div>
	);
};

export { Home, User, CurrentStatus, Repository, NotFound };
