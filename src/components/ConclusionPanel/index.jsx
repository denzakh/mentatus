import React, { Component } from "react";
import "./ConclusionPanel.css";

export default class ConclusionPanel extends Component {
  copyText = e => {
    var ta = document.getElementById("conclusion");
    var range = document.createRange();
    range.selectNode(ta);
    window.getSelection().addRange(range);

    try {
      document.execCommand("copy");
    } catch (err) {
      console.log("Can`t copy, boss");
    }
    window.getSelection().removeAllRanges();
  };

  printText = e => {
    window.print();
  };

  render() {
    return (
      <div>
        <div className="conclusion-panel">
          <div className="conclusion-panel__row">
            <button
              type="button"
              className="conclusion-panel__btn"
              onClick={this.copyText}
            >
              Копировать
            </button>
            <button
              type="button"
              className="conclusion-panel__btn"
              onClick={this.printText}
            >
              Печать
            </button>
          </div>
        </div>
      </div>
    );
  }
}
