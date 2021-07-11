import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateOneTextOption, saveAllOption } from "../../actions/option";
import cicleFn from "../../fn/cicleFn";
import dataObj from "../../store/optionData";
import "./Option.css";

class Option extends Component {
  render() {
    let propsOption = this.props.option;
    let handlerUpdateOneTextOption = e => {
      this.props.updateOneTextOption(e.target.id, e.target.value);
    };
    let handlerSaveAllOption = () => {
      this.props.saveAllOption(this.props.option);
    };

    // получаем список элементов, относящихся к этому циклу
    let arrayFromPassport = cicleFn(dataObj, "passport");

    let showUpdateIndicator = () => {
      if (propsOption.isOptionUpdating) {
        return <div className="option__update">обновление...</div>;
      } else {
        if (propsOption.isOptionUpdateError) {
          return <div className="option__error">ошибка сохранения!</div>;
        } else {
          if (propsOption.isOptionUpdateSuccess) {
            return <div className="option__success">сохранено</div>;
          } else {
            if (!propsOption.isOptionSave) {
              return (
                <div className="option__not-save">изменения не сохранены</div>
              );
            }
          }
        }
      }
    };

    function buildOptionList() {
      return arrayFromPassport.map(name => {
        return (
          <div className="option__item" key={name}>
            <label htmlFor={name} className="option__label">
              {dataObj[name].label}:
            </label>
            <input
              type="text"
              id={name}
              className="option__input"
              onChange={handlerUpdateOneTextOption}
            />
            <b>{propsOption[name]}</b>
          </div>
        );
      });
    }

    return (
      <div className="repository">
        <h1>Настройки</h1>
        <div className="option__list">{buildOptionList()}</div>
        <div className="option__save-row">
          <button
            type="button"
            className="button"
            onClick={handlerSaveAllOption}
            disabled={propsOption.isOptionUpdating ? true : false}
          >
            Сохранить
          </button>
          {showUpdateIndicator()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    option: state.option
  };
}

//bindActionCreators оборачивает каждый экшн в dispatch, поэтому когда мы вызываем this.props.actions.myFunc() происходит dispatch экшена myFunc, только он скрыт под капотом
function mapDispatchToProps(dispatch) {
  return {
    updateOneTextOption: bindActionCreators(updateOneTextOption, dispatch),
    saveAllOption: bindActionCreators(saveAllOption, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Option);
