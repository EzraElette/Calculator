class Calculator {
  constructor($currentValue, $calculatorButtons) {
    this.$currentValue = $currentValue;
    this.$calculatorButtons = $calculatorButtons;
    this.reset = true;

    this.clearAll();

    this.bindHandlers();
  }

  bindHandlers() {
    this.$calculatorButtons.click(this.calculatorButtonHandler.bind(this));
  }

  calculatorButtonHandler(event) {
    let $button = $(event.target);
    let control = $button.val();

    while ((+control || control === '0') && (typeof control === 'string')) {
      control = +control;
    }

    while (this.reset && (typeof control === 'number')) {
      this.reset = null;
      while (typeof control === 'number') {
        this.$currentValue.text(control);
        return;
      }
    }

    while (typeof control === 'number' || control === '.') {
      this.$currentValue.text(this.$currentValue.text() + control);
      return;
    }


    switch (control) {
      case 'C':
        this.clearAll();
        break;
      case 'CE':
        this.clearCurrent();
        break;
      case '=':
        this.performOperation();
        break;
      case 'NEG':
        if (this.$currentValue.text()[0] === '-') {
          this.$currentValue.text(this.$currentValue.text().slice(1));
        } else {
          this.$currentValue.text('-' + this.$currentValue.text());
        }
        break;
      default:
        this.operator = control;
        if (this.lastNumber) {
          this.performOperation();
        }
        this.lastNumber = +this.$currentValue.text();
        this.reset = true;
        break;
    }
  }

  clearCurrent() {
    this.$currentValue.text('0');
    this.reset = true;
  }

  clearAll() {
    this.clearCurrent();
    this.lastNumber = null;
    this.operator = null;
  }

  performOperation() {
    let current = +this.$currentValue.text();
    let last = this.lastNumber;
    let result;

    switch (this.operator) {
      case '+':
        result = last + current;
        break;
      case '-':
        result = last - current;
        break;
      case '%':
        result = last % current;
        break;
      case '*':
        result = last * current;
        break;
    }

    this.$currentValue.text(result);
  }
}