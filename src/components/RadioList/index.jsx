import React, { Component } from "react";
import { connect } from "react-redux";
import { setRadio } from "../../actions/radioAction";
import "./RadioList.css";

/*
RadioList
группа радиокнопок, привязанная к полю стора

принимает:
name - имя поля в сторе
dataBase - объект БД, в котором лежит группа (label + data)
*/

class RadioList extends Component {
  handleChange = e => {
    this.props.setRadio(this.props.name, +e.target.value);
  };

  render() {
    const { name, options, selected } = this.props;

    return (
      <div className="radio__list">
        {options.map(item => (
          <div key={item.id} className="radio__item">
            <input
              type="radio"
              name={name}
              id={name + item.id}
              value={item.id}
              className="radio__input"
              onChange={this.handleChange}
              checked={+item.id === +selected}
            />
            <label className="radio__label" htmlFor={name + item.id}>
              {item.label}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const field = state.psystatus[ownProps.name];
  const group = ownProps.dataBase[ownProps.name];

  return {
    options: group ? group.data : [],
    selected: field ? field.number : 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setRadio: (name, value) => dispatch(setRadio(name, value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RadioList);
