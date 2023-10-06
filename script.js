let userBill = 0;
let userTipPercent = 0;
let userNumberOfPeople = 1;

const bill = document.getElementById("bill");
bill.addEventListener("input", function () {
  userBill = Number(this.value);
  calculateTip();
});

const numberOfPeople = document.getElementById("numberOfPeople");
const errorField = document.getElementById("error");
numberOfPeople.addEventListener("input", function () {
  if (Number(this.value) > 0) {
    errorField.innerHTML = "";
    numberOfPeople.style.border = "none";
    userNumberOfPeople = Number(this.value);
    calculateTip();
  } else if (Number(this.value) === 0 && this.value !== "") {
    errorField.innerHTML = "Can't be zero";
    numberOfPeople.style.border = "solid";
    numberOfPeople.style.borderColor = "red";
  }
});

const percentTipSelections = document.querySelectorAll(".percentTipSelection");

percentTipSelections.forEach((percentTipSelection) => {
  percentTipSelection.addEventListener("click", seatFunction, false);
});

function seatFunction() {
  percentTipSelections.forEach((percent) => {
    customTipSelection.value = "Custom";
    percent.classList.remove("active-button");
    userTipPercent = Number(this.value.split("%")[0]);
    calculateTip();
  });
  this.classList.add("active-button");
}

// percentTipSelections.forEach((percentTipSelection) =>
//   percentTipSelection.addEventListener("click", function () {
//     userTipPercent = Number(this.value.split("%")[0]);
//     calculateTip();
//   })
// );

const customTipSelection = document.getElementById("customTipSelection");
customTipSelection.addEventListener("focusin", function () {
  this.value = "";
  percentTipSelections.forEach((percent) => {
    if (percent.classList.contains("active-button")) {
      percent.classList.remove("active-button");
    }
  });
});
customTipSelection.addEventListener("focusout", function () {
  if (this.value === "") {
    this.value = "Custom";
  }
});
customTipSelection.addEventListener("input", function () {
  userTipPercent = Number(this.value);
  calculateTip();
});

const tip = document.getElementById("tipPerPerson");
const result = document.getElementById("totalPerPerson");

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", function () {
  bill.value = "0";
  percentTipSelections.value = "";
  customTipSelection.value = "Custom";
  numberOfPeople.value = "0";
  tip.innerHTML = "0.00";
  result.innerHTML = "0.00";
  percentTipSelections.forEach((percent) => {
    if (percent.classList.contains("active-button")) {
      percent.classList.remove("active-button");
    }
  });
});

function calculateTip() {
  let total = 0;
  let totalTip = 0;
  let tipPerPerson = 0;
  let totalPerPerson = 0;

  totalTip = (userBill * userTipPercent) / 100;
  total = userBill + totalTip;

  tipPerPerson = totalTip / userNumberOfPeople;

  totalPerPerson = total / userNumberOfPeople;

  tip.innerHTML = `$${tipPerPerson.toFixed(2)}`;
  result.innerHTML = `$${totalPerPerson.toFixed(2)}`;

  if (totalPerPerson !== 0) {
    resetButton.classList.add("active-button");
  } else {
    resetButton.classList.remove("active-button");
  }
}
