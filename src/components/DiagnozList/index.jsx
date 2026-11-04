import React, { Component } from "react";
import { connect } from "react-redux";

class DiagnozList extends Component {
  render() {
    const { mkb10, klin, dopolnenie, reqilech } = this.props;

    const diagnozText = () => {
      if (!mkb10 && !klin && !dopolnenie) {
        return null;
      }

      return (
        <p>
          <span> Диагноз: </span>
          {mkb10 ? <span>F {mkb10} &nbsp;</span> : null}
          <span>{klin} &nbsp;</span>
          {dopolnenie ? (
            <span>
              <br />
              {dopolnenie} &nbsp;
            </span>
          ) : null}
        </p>
      );
    };

    const reqText = () => {
      if (!reqilech) {
        return null;
      }

      return (
        <p>
          <span> Рекомендовано: </span> <br />
          <span className="pre">{reqilech} &nbsp;</span>
        </p>
      );
    };

    return (
      <div data-id="diagnoz" onClick={this.props.toggleTab}>
        {diagnozText()}
        {reqText()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const psystatus = state.psystatus;

  return {
    mkb10: psystatus.diagnozMkb10.text,
    klin: psystatus.diagnozKlin.text,
    dopolnenie: psystatus.diagnozDopolnenie.text,
    reqilech: psystatus.reqilech.text
  };
}

export default connect(mapStateToProps)(DiagnozList);
