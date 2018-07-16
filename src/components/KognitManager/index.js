import React, { Component } from 'react';
import dataBase from "../../store/kognitData.js";
import Checkbox from "../Checkbox";
import RadioList from "../RadioList";
import Textarea from "../Textarea";
import cicleFn from "../../fn/cicleFn";
import "./Kognit.css";

export default class affektManager extends Component {

  constructor(props) {
    super(props);
    this.state = {sonOption: false};
  }
  
  render() {   

    let orientirVremiaNumber = +this.props.psystatus.orientirVremia.number;
    let orientirMestoNumber = +this.props.psystatus.orientirMesto.number;
    let orientirLichnostNumber = +this.props.psystatus.orientirLichnost.number;




 

    return <div>
      <div className="orientir">
        <h3>Ориентировка</h3>  
        <div className="orientir__table"> 
          <div className="orientir__col"> 
            <div className="orientir__top"> 
              В месте
            </div>  
            <div className="orientir__content"> 
              <RadioList 
                name="orientirVremia" 
                dataBase={dataBase} 
                onChange={this.props.toggleRadio} 
                psystatus={this.props.psystatus}
              />
            </div>
          </div>       
          <div className="orientir__col"> 
            <div className="orientir__top"> 
              Времени
            </div>  
            <div className="orientir__content"> 
              <RadioList 
                name="orientirMesto" 
                dataBase={dataBase} 
                onChange={this.props.toggleRadio} 
                psystatus={this.props.psystatus}
              />
            </div>
          </div>
          <div className="orientir__col"> 
            <div className="orientir__top"> 
              Личности
            </div>  
            <div className="orientir__content"> 
              <RadioList 
                name="orientirLichnost" 
                dataBase={dataBase} 
                onChange={this.props.toggleRadio} 
                psystatus={this.props.psystatus}
              />
            </div>
          </div>  
        </div>
        <div className="orientir__bottom">
          <Checkbox 
            name="orientirNot"
            checked={this.props.psystatus.orientirNot.isChecked}
            onChange={this.props.toggleSymptom}
            label="ориентировку не определить" 
          />           
        </div>
      </div>
  

    </div>;
  }
}