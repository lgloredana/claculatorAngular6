import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalculatorComponent 
      ],
      imports: [
        FormsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Reset ', () => {
    it('on reset all properties are refreshed', () => {
      component.nr = 22;
      component.result = 44;
      component.selectedOp = {value:'opVal',name:'opName'};
      component.selectedCalcList = [{value:'opVal',name:'opName', nr:'444'}];
      component.reset();
      expect(component.nr).toEqual(0);
      expect(component.result).toEqual(0);
      expect(component.selectedOp).toBeNull();
      expect(component.selectedCalcList).toEqual([]);
    });
  });

  describe('Add', ()=>{
    it('on add the calculation list should have the new operation and number', () =>{
      component.selectedOp = {name: 'multiply', value:'*'};
      component.nr = 5;
      component.add();
      var calcLength = component.selectedCalcList.length;
      expect(calcLength).toEqual(1);
    });
  })

  describe('Calculate', ()=>{
    it('(3 + 2) * 3 = 15', ()=>{
      component.selectedCalcList = [
            {name:'add', value:'+', nr:'2'},
            {name:'multiply', value:'*', nr:'3'},
            {name:'', value:'', nr:'3'}
        ]
        component.calculate();
        expect(component.result).toEqual(15);
    });
  });

  describe('Calculate', ()=>{
    it('5 * 9 = 45', ()=>{
      component.selectedCalcList = [
        {name:'multiply', value:'*', nr:'9'},
        {name:'', value:'', nr:'5'},
      ]
        component.calculate();
        expect(component.result).toEqual(45);
    });
  });

  describe('Calculate', ()=>{
    it('apply 1 = 1', ()=>{
      component.selectedCalcList = [
        {name:'', value:'', nr:'1'}
      ]
      expect(component.calculate()).toEqual('1');
    });
  });

});
