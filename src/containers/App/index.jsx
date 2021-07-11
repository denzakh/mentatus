import React from "react";
import { connect } from "react-redux";

import * as components from "../test";

const App = ({ page }) => {
  const Component = components[page];
  return <Component />;
};

const mapStateToProps = ({ page }) => ({ page });

export default connect(mapStateToProps)(App);
