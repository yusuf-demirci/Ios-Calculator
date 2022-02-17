let currentNumber = $(".screen");
let isOperatorActive = false;
let memory;
let currentOperator = "";

function calculate(a, b, operator) {
    let result;
    switch (operator) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            result = a / b;
            break;
    }
    return Math.floor(result * 1000) / 1000
}

function numClick(content) {
    if (isOperatorActive) currentNumber.text("0")

    if (currentNumber.text().length > 7) currentNumber.css("font-size", "4rem")
    else currentNumber.css("font-size", "5rem")

    if (currentNumber.text().length > 8) return

    $(".reset").text("C")

    if (content === ".") {
        !currentNumber.text().includes(".") && currentNumber.text(currentNumber.text() + content)
    }
    else {
        if (currentNumber.text().includes(".")) {
            currentNumber.text(currentNumber.text() + content);
        } else {
            currentNumber.text(+(currentNumber.text() + content));
        }
    }
    isOperatorActive = false;
}

function operatorClick(operator) {
    if (isOperatorActive) {
        currentOperator = operator
        memory = currentNumber.text()
        return
    }
    isOperatorActive = true

    if (memory) {
        currentNumber.text(calculate(+memory, +currentNumber.text(), currentOperator) + "")
    }

    memory = currentNumber.text()
    currentOperator = operator
}

function equalClick() {
    if (isOperatorActive || !memory) return;
    currentNumber.text(calculate(+memory, +currentNumber.text(), currentOperator) + "")
    isOperatorActive = true;
    currentOperator = ""
    memory = null;
}

function resetClick() {
    currentNumber.text("0");
    memory = null;
    currentNumber.css("font-size", "5rem")
    $(".reset").text("AC")
}

$(".plus-minus").click(() => {
    if (currentNumber.text() !== "0") currentNumber.text(+currentNumber.text() * -1)
    $(this).blur();
})

$(".percent").click(() => {
    currentNumber.text(+currentNumber.text() / 100)
    $(this).blur();
})

$(".num, .dot").click(function (e) {
    numClick(e.target.textContent);
    $(this).blur();
})

$(".reset").click(function(){
    resetClick();
    $(this).blur();
})

$(".operator").click(function () {
    operatorClick($(this).attr("name"))
    $(this).blur();
})

$(".equal").click(function(){
    equalClick();
    $(this).blur();
})

$(document).keydown((e) => {
    if (!isNaN(e.key) || e.key === ".") numClick(e.key)
    else if (["+", "-", "*", "/"].includes(e.key)) operatorClick(e.key)
    else if (e.key === "Enter" || e.key === "NumpadEnter") equalClick()
    else if (e.key === "Escape") resetClick()
})






