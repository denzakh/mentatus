import React, { Component } from "react";
import "./ConclusionPanel.css";

export default class ConclusionPanel extends Component {
  copyText = () => {
    const conclusion = document.getElementById("conclusion");

    if (!conclusion) {
      return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(conclusion.innerText)
        .catch(() => this.copyTextFallback(conclusion));
      return;
    }

    this.copyTextFallback(conclusion);
  };

  // резервный способ для браузеров без Clipboard API
  copyTextFallback = node => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNode(node);
    selection.removeAllRanges();

    if (typeof selection.addRange === "function") {
      selection.addRange(range);
    } else if (typeof selection.selectAllChildren === "function") {
      selection.selectAllChildren(node);
    }

    try {
      document.execCommand("copy");
    } catch (err) {
      console.warn("Не удалось скопировать заключение:", err.message);
    }

    selection.removeAllRanges();
  };

  printText = () => {
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
