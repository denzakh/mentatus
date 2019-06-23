import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  createNewStatus,
  deleteStatus,
  openStatus,
  closeStatus
} from "../../actions/repository";

class Repository extends Component {
  handlerDeleteStatus = e => {
    this.props.deleteStatus(e.target.id);
  };

  handlerOpenStatus = e => {
    this.props.openStatus(e.target.id);
  };

  render() {
    return (
      <div className="repository">
        <h1>Заключения</h1>
        <div className="repository__panel">
          <button type="button" onClick={this.props.createNewStatus}>
            Новый осмотр
          </button>
        </div>
        <hr />
        <table className="repository__table" width="500px" border="1px">
          <tbody>
            <tr className="repository__row">
              <th>id</th>
              <th>дата</th>
              <th>пол</th>
              <th>возраст</th>
              <th>кнопки</th>
            </tr>
            {this.props.repository.map(psystatusRow => {
              return (
                <tr className="repository__row" key={psystatusRow.id}>
                  <td>
                    <button
                      type="button"
                      id={psystatusRow.id}
                      onClick={this.handlerOpenStatus}
                    >
                      <b>{psystatusRow.id}</b>
                    </button>
                  </td>
                  <td>{psystatusRow.dataOsmotra.text}</td>
                  <td>{psystatusRow.pol.isChecked ? "мужской" : "женский"}</td>
                  <td>{psystatusRow.vozrast.text}</td>
                  <td>
                    <button
                      type="button"
                      id={psystatusRow.id}
                      onClick={this.handlerDeleteStatus}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    repository: state.repository
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createNewStatus: bindActionCreators(createNewStatus, dispatch),
    deleteStatus: bindActionCreators(deleteStatus, dispatch),
    openStatus: bindActionCreators(openStatus, dispatch),
    closeStatus: bindActionCreators(closeStatus, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Repository);
