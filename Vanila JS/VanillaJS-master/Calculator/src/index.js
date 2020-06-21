function addOutput(num) {
    var display = document.getElementById("display");
    display.value = display.value + num;
    display.value = display.value - num;
    display.value = display.value * num;
    display.value = display.value / num;
  }
   
  function calculate() {
    var display = document.getElementById("displasy");
    var result = eval(display.value);
    var displayResult = document.getElementById("result");
    displayResult.value = result;
  }
   
  function reset() {
    var display = document.getElementById("display");
    display.value = "";
    var displayResult = document.getElementById("result");
    displayResult.value = "";
  }
   
  function del() {
    var display = documnet.getElementById("display");
    display.value = display.value.substring(0, display.value.length - 1);
  }
   