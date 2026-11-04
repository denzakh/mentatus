import React, { Component } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { setRadio } from "../../actions/radioAction";
import { isKritikaEmpty } from "../../lib/rules/kritika";
import { fieldOf } from "../../lib/redux";
import type { RadioOption, Schema } from "../../types/schema";
import type { StatusState } from "../../types/status";
import "./RadioListKogn.css";

/*
RadioListKogn
группа радиокнопок интеллектуально-мнестических функций:
часть ответов дополнительно снижает критику

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
  isKritikaEmpty: boolean;
}

interface DispatchProps {
  setRadio: (name: string, value: number) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

class RadioListKogn extends Component<Props> {
  handleChange: ChangeHandler = e => {
    this.props.setRadio(this.props.name, +e.target.value);
  };

  render() {
    const { name, options, selected, isKritikaEmpty } = this.props;

    // функция снижения критики: часть ответов автоматически
    // выставляет критику, если она ещё не задана
    const withKritika = (number: number, onChange: ChangeHandler) => (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (isKritikaEmpty) {
        this.props.setRadio("kritika", number);
      }

      onChange(e);
    };

    const toggleList: ChangeHandler[] = [
      this.handleChange, // 0
      withKritika(2, this.handleChange), // 1
      withKritika(3, this.handleChange), // 2
      withKritika(4, this.handleChange), // 3
      this.handleChange // 4
    ];

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
              onChange={toggleList[item.id]}
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
    selected: field ? field.number : 0,
    isKritikaEmpty: isKritikaEmpty(fieldOf(state, "kritika"))
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
)(RadioListKogn);
