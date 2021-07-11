import React, { Component } from "react";
import pages from "../../containers/pages";

export default class ActivePage extends Component {
  render() {
    let getActiveObj = store => {
      let page = pages.filter(item => {
        let general = store.general;
        return item.name === general.activePageName;
      });
      console.dir(page[0]);
      return page[0].component;
    };

    let activeComponent = getActiveObj(this.props.store);

    return <div className="wrapper__active-page">{activeComponent}</div>;
  }
}
