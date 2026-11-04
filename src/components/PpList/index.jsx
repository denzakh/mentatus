import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/ppData.js";
import { fieldOf } from "../../lib/redux";
import FieldView from "../FieldView";
import SonAppetitList from "../SonAppetitList";
import KritikaList from "../KritikaList";

class PpList extends Component {
  render() {
    return (
      <span>
        <span data-id="pp" onClick={this.props.toggleTab}>
          {this.props.isBredHidden ? null : (
            <span>
              <FieldView name="bred" dataObj={dataBase} />
            </span>
          )}

          <FieldView name="bredText" dataObj={dataBase} />

          {this.props.isGallHidden ? null : (
            <span>
              <FieldView name="gall" dataObj={dataBase} />
            </span>
          )}

          <FieldView name="gallText" dataObj={dataBase} />

          {/*Опасные*/}
          {this.props.isOpasnyeHidden ? null : (
            <span>
              <FieldView name="opasnye" dataObj={dataBase} />

              <FieldView name="opasnyeAgressia" dataObj={dataBase} />
            </span>
          )}

          <FieldView name="opasnyeText" dataObj={dataBase} />
        </span>

        <span data-id="affekt" onClick={this.props.toggleTab}>
          <SonAppetitList />
        </span>

        <span data-id="pp" onClick={this.props.toggleTab}>
          <KritikaList />
        </span>
      </span>
    );
  }
}

function mapStateToProps(state) {
  const bredOtkl = fieldOf(state, "bredOtkl");
  const gallOtkl = fieldOf(state, "gallOtkl");
  const opasnyeOtkl = fieldOf(state, "opasnyeOtkl");

  return {
    isBredHidden: !!(bredOtkl && bredOtkl.isChecked),
    isGallHidden: !!(gallOtkl && gallOtkl.isChecked),
    isOpasnyeHidden: !!(opasnyeOtkl && opasnyeOtkl.isChecked)
  };
}

export default connect(mapStateToProps)(PpList);
