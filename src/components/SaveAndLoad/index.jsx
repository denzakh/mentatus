import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  saveStoreOnServer,
  loadStoreFromServer,
  getStore
} from "../../actions/general";
import Button from "../Button";

class SaveAndLoad extends Component {
  save = () => {
    this.props.bindHandleSave();
  };

  load = () => {
    this.props.bindHandleLoad();
    this.props.bindHandleGetStore();
  };

  render() {
    return (
      <div className="save-and-load">
        <div className="save-and-load__row">
          <Button
            onClick={this.save}
            disabled={this.props.general.dataIsLoadingOrSaving}
          >
            Сохранить
          </Button>
          <Button
            onClick={this.load}
            disabled={this.props.general.dataIsLoadingOrSaving}
          >
            Загрузить
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    general: state.general
  };
}

function mapDispatchToProps(dispatch) {
  return {
    bindHandleSave: bindActionCreators(saveStoreOnServer, dispatch),
    bindHandleLoad: bindActionCreators(loadStoreFromServer, dispatch),
    bindHandleGetStore: bindActionCreators(getStore, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveAndLoad);
