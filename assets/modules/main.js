const context = document.querySelector("#context");

// user data for select step by user
const selectState = {
  nowStep: 1,
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

function moveToNextStepPage() {
  selectState.nowStep = selectState.nowStep + 1;

  fetch(`assets/pages/step${selectState.nowStep}`)
    .then((response) => response.text())
    .then((text) => {
      context.innerHTML = text;
    });
}

function moveToPreviousStepPage() {
  selectState.nowStep = selectState.nowStep - 1;

  fetch(`assets/pages/step${selectState.nowStep}`)
    .then((response) => response.text())
    .then((text) => {
      context.innerHTML = text;
    });
}
