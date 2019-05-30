import React, { Component } from "react";
import pages from "../../containers/pages";

export default class ActivePage extends Component {
  render() {
    let getActiveObj = store => {
      let page = pages.filter(item => {
        let option = store.option;
        return item.name === option.activePageName;
      });
      return page[0].component;
    };

    let activeComponent = getActiveObj(this.props.store);

    return <div>{activeComponent}</div>;
  }
}
