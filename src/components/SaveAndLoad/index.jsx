import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveStoreOnServer, loadStoreFromServer } from "../../actions/general";
import Button from "../Button";

class SaveAndLoad extends Component {
  render() {
    return (
      <div className="save-and-load">
        <div className="save-and-load__row">
          <Button
            onClick={this.props.handleSave}
            disabled={this.props.general.dataIsLoadingOrSaving}
          >
            Сохранить
          </Button>
          <Button
            onClick={this.props.handleLoad}
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
    handleSave: bindActionCreators(saveStoreOnServer, dispatch),
    handleLoad: bindActionCreators(loadStoreFromServer, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveAndLoad);
