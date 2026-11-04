import React, { Component } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { setRadio } from "../../actions/radioAction";
import { fieldOf } from "../../lib/redux";
import type { RadioOption, Schema } from "../../types/schema";
import type { StatusState } from "../../types/status";
import "./RadioList.css";

/*
RadioList
группа радиокнопок, привязанная к полю стора

принимает:
name - имя поля в сторе
dataBase - объект БД, в котором лежит группа (label + data)
*/

interface OwnProps {
  name: string;
  dataBase?: Schema;
}

interface StateProps {
  options: RadioOption[];
  selected?: number;
}

interface DispatchProps {
  setRadio: (name: string, value: number) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class RadioList extends Component<Props> {
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

function mapStateToProps(
  state: StatusState,
  ownProps: OwnProps
): StateProps {
  const field = fieldOf(state, ownProps.name);
  const group = ownProps.dataBase && ownProps.dataBase[ownProps.name];

  return {
    options: (group && group.data) || [],
    selected: field ? field.number : 0
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    setRadio: (name, value) => dispatch(setRadio(name, value))
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(RadioList);
