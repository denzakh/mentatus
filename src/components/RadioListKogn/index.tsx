import React, { Component } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { setRadio } from "../../actions/radioAction";
import { isKritikaEmpty, autoKritikaForOption } from "../../lib/rules/kritika";
import { fieldOf, radioOptionsOf, radioSelectedOf } from "../../lib/redux";
import RadioOptions from "../RadioOptions";
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

Разметку рисует общий `RadioOptions`, авто-критику задаёт
`lib/rules/kritika` (AUTO_KRITIKA_BY_OPTION).
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

class RadioListKogn extends Component<Props> {
  handleChange = (value: number) => {
    const kritika = autoKritikaForOption(value);

    // часть ответов автоматически выставляет критику, если она ещё не задана
    if (this.props.isKritikaEmpty && kritika !== undefined) {
      this.props.setRadio("kritika", kritika);
    }

    this.props.setRadio(this.props.name, value);
  };

  render() {
    return (
      <RadioOptions
        name={this.props.name}
        options={this.props.options}
        selected={this.props.selected}
        onChange={this.handleChange}
      />
    );
  }
}

function mapStateToProps(state: StatusState, ownProps: OwnProps): StateProps {
  return {
    options: radioOptionsOf(state, ownProps.name, ownProps.dataBase),
    selected: radioSelectedOf(state, ownProps.name),
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
