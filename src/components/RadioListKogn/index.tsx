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

// ответы, которые дополнительно снижают критику: id пункта -> номер критики
const kritikaByOption: Record<number, number> = { 1: 2, 2: 3, 3: 4 };

class RadioListKogn extends Component<Props> {
  handleChange: ChangeHandler = e => {
    const optionId = +e.target.value;
    const kritika = kritikaByOption[optionId];

    // часть ответов автоматически выставляет критику, если она ещё не задана
    if (this.props.isKritikaEmpty && kritika !== undefined) {
      this.props.setRadio("kritika", kritika);
    }

    this.props.setRadio(this.props.name, optionId);
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
