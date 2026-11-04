import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/affektData.js";
import { fieldOf } from "../../lib/redux";
import FieldView from "../FieldView";

class AffektList extends Component {
  render() {
    return (
      <span data-id="affekt" onClick={this.props.toggleTab}>
        {/*Настроение*/}
        <FieldView name="nastroyeniye" dataObj={dataBase} />

        <FieldView name="vSvyazi" dataObj={dataBase} isAnd />

        <FieldView name="s" dataObj={dataBase} />

        {this.props.isKolebaniaChecked ? (
          <span>
            <span>
              {" "}
              (
              <FieldView
                name="nastroyeniyeKolebaniaPodrobno"
                dataObj={dataBase}
              />
              )
            </span>
          </span>
        ) : null}

        <span>. </span>

        <FieldView
          name="nastroyenieSeparate"
          dataObj={dataBase}
          as="sentences"
        />

        <FieldView name="nastroyeniyeText" dataObj={dataBase} />

        {/*Тревога*/}
        <FieldView name="trevoga" dataObj={dataBase} />

        <span>. </span>

        <FieldView name="trevogaSeparate" dataObj={dataBase} as="sentences" />

        <FieldView name="trevogaText" dataObj={dataBase} />
      </span>
    );
  }
}

function mapStateToProps(state) {
  const field = fieldOf(state, "nastroyeniyeKolebania");

  return {
    isKolebaniaChecked: !!(field && field.isChecked)
  };
}

export default connect(mapStateToProps)(AffektList);
