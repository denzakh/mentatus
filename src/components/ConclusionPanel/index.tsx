import React from "react";
import "./ConclusionPanel.css";

/*
ConclusionPanel
кнопки «Копировать» и «Печать»

Копирование берёт текст узла `#conclusion`; если Clipboard API нет или
он не сработал, используется выделение узла и `document.execCommand`.
Поведение и разметка прежние.
*/

export default function ConclusionPanel() {
  // резервный способ для браузеров без Clipboard API
  const copyTextFallback = (node: HTMLElement) => {
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

  const copyText = () => {
    const conclusion = document.getElementById("conclusion");

    if (!conclusion) {
      return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(conclusion.innerText)
        .catch(() => copyTextFallback(conclusion));
      return;
    }

    copyTextFallback(conclusion);
  };

  const printText = () => {
    window.print();
  };

  return (
    <div>
      <div className="conclusion-panel">
        <div className="conclusion-panel__row">
          <button
            type="button"
            className="conclusion-panel__btn"
            onClick={copyText}
          >
            Копировать
          </button>
          <button
            type="button"
            className="conclusion-panel__btn"
            onClick={printText}
          >
            Печать
          </button>
        </div>
      </div>
    </div>
  );
}
