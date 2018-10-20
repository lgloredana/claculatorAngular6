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


  constructor() {console.log('i am the constructor'); }
  
  ngOnInit() {console.log('i am the init'); } 
  
  add(){
    console.log('add click');
    //debugger;
    this.selectedCalcList.push({
        name: this.selectedOp.name,
        value: this.selectedOp.value,
        nr: this.nr
    })
  }
  
  reset(){
    console.log('reset click');
    this.nr = 0;
    this.result = 0;
    this.selectedCalcList = [];
    this.selectedOp = null;    
  }
  
  evaluateCalcList = function(selecectedCalcs){
    let calcLength = selecectedCalcs.length-1;
    let startNr = selecectedCalcs[calcLength].nr
    let result = startNr;
    for(let i=0; i<calcLength; i++){
      result = this.applyOp(result)(selecectedCalcs[i]);
    }
    return result;
  }

  applyOp = function(result){
    return function(selected){
      switch(selected.value){
        case "*": 
            result = result * selected.nr; 
            break;
        case "/": 
            result = result / selected.nr; 
            break;
        case "-": 
            result = result - selected.nr; 
            break;
        case "+": 
            result = result + selected.nr; 
            break;
      }
      return result;
    }
  }

  calculate = function(){
    console.log('calculate click');
    this.result = this.evaluateCalcList(this.selectedCalcList);
    return this.result;
  } 
}


