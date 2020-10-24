class Calculator {
  constructor (previousOperandTextElevent, currentOperandTextElevent){
  this.previousOperandTextElevent = previousOperandTextElevent;
  this.currentOperandTextElevent = currentOperandTextElevent;
  this.clear();}
  clear () { 
      this.previousOperand = '';
      this.currentOperand = '';
      this.operation = undefined;
      this.equals = false;  
  }
  delete () {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
      this.equals = false;
      if (number === '.' && this.currentOperand.includes('.')) return;          
      this.currentOperand = this.currentOperand.toString() + number.toString();
      
        
  }
  chooseOperation (operation) {        
      if (this.currentOperand === '') {            
           return;}
      if (this.previousOperand !== '') {            
          this.compute();
      }
      this.operation = operation;
      //debugger;         
      this.previousOperand = this.currentOperand;
      if (this.operation === '√') {} else {
      this.currentOperand = '';}
    
  }
  compute () {
    let computation;        
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);      
    if (isNaN(prev) || isNaN(current)) return;
   
    
    switch (this.operation) {
      case '+':
          computation = prev + current;
          break;
      case '-':
          computation = prev - current;
          break;
      case '*':
          computation = prev * current;
          break;
      case '÷':
          computation = prev / current;
          break;
      case '√':
          if (prev < 0) {computation = 'error'; break} else {
          computation = Math.sqrt(prev);
          break;}
      case '^':
          computation = Math.pow(prev, current);
          break;
      default: return;
    }
    
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
     
  }  
  
  getDisplayNumber(number) { 
      if (typeof(number) === 'string') {return number}       
      const stringNumber = number.toString();        
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      let f = stringNumber.split('.')[1];
      let my = null;
      if (f != null){
      my = f.slice(0, 12);
      //const decimalDigits = stringNumber.split('.')[1];
      
      
      for (let i = my.length-1; my[i]=='0'; i--){my = my.slice(0, my.length-1)}}
      const decimalDigits = my;
      
      let integerDisplay;
      if(isNaN(integerDigits)) {
          integerDisplay ='';
      } else {
          integerDisplay = integerDigits.toLocaleString ('en', {
              maximumFractionDigits: 0
          })
          console.log (integerDisplay);
      }
      if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
      } else {
          return integerDisplay
      }
  }
      
  

  updateDisplay () {        
      if (this.operation === '√')  {this.currentOperandTextElevent.innerText = ''} else {
      this.currentOperandTextElevent.innerText = this.getDisplayNumber(this.currentOperand); }       
      if (this.operation != null) {
          this.previousOperandTextElevent.innerText = 
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;  
      } else {
          this.previousOperandTextElevent.innerText = '';
      }
           
  }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.getElementById('data-delete');
const allClearButton = document.getElementById('data-all-clear');
const previousOperandTextElevent = document.querySelector('[data-previous-operand]');
const currentOperandTextElevent = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElevent, currentOperandTextElevent);
numberButtons.forEach(button => {    
  button.addEventListener('click', () => {     
      if (calculator.previousOperand === '' && calculator.equals === true) {calculator.clear()}
      calculator.appendNumber(button.innerText);        
      calculator.updateDisplay();
  })
});

operationButtons.forEach(button => {    
  button.addEventListener('click', () => {        
     // console.log(calculator.currentOperand === '' && button.innerText === '-');
      if (calculator.currentOperand === '' && button.innerText === '-') {calculator.appendNumber(button.innerText)} else {      
      calculator.chooseOperation(button.innerText);}        
      calculator.updateDisplay();
      
  })
});

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
  calculator.equals = true;
})

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})
