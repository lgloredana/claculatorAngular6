import { Component, OnInit, Input} from '@angular/core';

interface Operation {
  value: string;
  name: string;
};

declare const OPERATIONS;

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
}) // export must be close to component decorator
export class CalculatorComponent {
  // order is important, param declaration -> input / output / events and methods
  name: string;
  result = 0;
  operations = OPERATIONS;
  selectedCalcList = [];

  @Input() nr: number;
  @Input() selectedOp: Operation;

  add(){
    this.selectedCalcList.push({
        name: this.selectedOp.name,
        value: this.selectedOp.value,
        nr: this.nr
    })
  }
  
  reset(){
    this.nr = 0;
    this.result = 0;
    this.selectedCalcList = [];
    this.selectedOp = null;    
  };
  
  applyOp = function(result){
    return function(selected){
      switch(selected.value){
        case "*": 
            result = result * Number.parseInt(selected.nr); 
            break;
        case "/": 
            result = result / Number.parseInt(selected.nr); 
            break;
        case "-": 
            result = result - Number.parseInt(selected.nr); 
            break;
        case "+": 
            result = result + Number.parseInt(selected.nr); 
            break;
      }
      return result;
    };
  };

  calculate = function(){
    let calcLength = this.selectedCalcList.length-1;
    let startNr = this.selectedCalcList[calcLength].nr
    this.result = Number.parseInt(startNr);
    for(let i=0; i<calcLength; i++){
      this.result = this.applyOp(this.result)(this.selectedCalcList[i]);
    };
  };
}


