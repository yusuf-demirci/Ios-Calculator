let currentNumber = $(".screen");
let previousNumber = 0;
let isOperatorActive = false;
let memory;
let currentOperator = "";

function calculate(a, b, operator) {
    switch (operator) {
        case "+":
            return (a + b).toFixed(2);
        case "-":
            return (a - b).toFixed(2);
        case "*":
            return (a * b).toFixed(2);
        case "/":
            return (a / b).toFixed(2);
    }
}

$(".num, .dot").click((e) => {
    if (isOperatorActive) currentNumber.text("0")

    if (currentNumber.text().length > 7) currentNumber.css("font-size", "4rem")
    else currentNumber.css("font-size", "5rem")

    if (e.target.textContent === ".") {
        !currentNumber.text().includes(".") && currentNumber.text(currentNumber.text() + e.target.textContent)
    }
    else {
        if (currentNumber.text().includes(".")){
            currentNumber.text(currentNumber.text() + e.target.textContent);
        } else {
            currentNumber.text(+(currentNumber.text() + e.target.textContent));
        }
    }
    isOperatorActive = false;
})

$(".reset").click(() => {
    currentNumber.text("0");
    memory = null;
    currentNumber.css("font-size", "5rem")
})

$(".operator").click(function () {
    if (isOperatorActive) {
        currentOperator = $(this).attr("name")
        memory = currentNumber.text()
        return
    }
    isOperatorActive = true

    if (memory) {
        currentNumber.text(calculate(+memory, +currentNumber.text(), currentOperator) + "")
    }

    memory = currentNumber.text()
    currentOperator = $(this).attr("name")
})

$(".equal").click(() => {
    if (isOperatorActive || !memory) return;

    currentNumber.text(calculate(+memory, +currentNumber.text(), currentOperator) + "")
    isOperatorActive = true;
    currentOperator = ""
    memory = null;
})






