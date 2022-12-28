const context = document.querySelector("#context");

// user data for select step by user
const selectState = {
  nowStep: 1,
  period: "Monthly",
  step1: "",
  step2: "",
  step3: "",
  step4: "",
};

// place first page html element when the webpage is rendering first
fetch("assets/pages/step1").then((response) => {
  response.text().then((text) => {
    context.innerHTML = text;
  });
});

// click Event when user clicked monthly and yearly switch button

function switchMonthlyOrYearlyState() {
  if (selectState.period === "Monthly") {
    return selectState.period === "Yearly";
  } else if (selectState.period === "Yearly") {
    return selectState.period === "Monthly";
  }
}

// click event when user clicked Next Step and Confirm button
function moveToNextStepPage() {
  selectState.nowStep = selectState.nowStep + 1;

  fetch(`assets/pages/step${selectState.nowStep}`)
    .then((response) => response.text())
    .then((text) => {
      context.innerHTML = text;
    });
}

//click event when user clicked Go Back button
function moveToPreviousStepPage() {
  selectState.nowStep = selectState.nowStep - 1;

  fetch(`assets/pages/step${selectState.nowStep}`)
    .then((response) => response.text())
    .then((text) => {
      context.innerHTML = text;
    });
}
