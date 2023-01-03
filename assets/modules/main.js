const context = document.querySelector("#context");

// user data for select step by user
const selectState = {
  nowStep: 1,
  period: "Monthly",
  plan: "arcade",
  addon: "",
};

// render event object when user move to step pages
const renderEvent = {
  step1: () => {},

  step2: () => {
    const palnGroup = document.getElementsByClassName("plan");
    // Array.from 관련 내용 정리 ★
    Array.from(palnGroup).forEach((element) => {
      if (selectState.plan === element.id) {
        element.classList.add("border-purplish-blue", "bg-magnolia");
      } else {
        element.classList.remove("border-purplish-blue", "bg-magnolia");
      }
    });
  },

  step3: () => {
    const checkboxGroup = document.getElementsByClassName("checkbox");
    // Array.from 관련 내용 정리 ★
    Array.from(checkboxGroup).forEach((element) => {
      if (selectState.addon.indexOf(element.id) !== -1) {
        element.parentNode.classList.add("border-purplish-blue", "bg-magnolia");
        element.classList.add("bg-purplish-blue", "border-purplish-blue");
      } else {
        element.parentNode.classList.remove(
          "border-purplish-blue",
          "bg-magnolia"
        );
        element.classList.remove("bg-purplish-blue", "border-purplish-blue");
      }
    });
  },

  step4: () => console.log(selectState),
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
      renderEvent[`step${selectState.nowStep}`]();
    });
}

// click event when user clicked Go Back button
function moveToPreviousStepPage() {
  selectState.nowStep = selectState.nowStep - 1;

  fetch(`assets/pages/step${selectState.nowStep}`)
    .then((response) => response.text())
    .then((text) => {
      context.innerHTML = text;
      renderEvent[`step${selectState.nowStep}`]();
    });
}

//step2 - click event when user clicked planning option
function selectPlanningOption(event) {
  const planGroup = document.getElementsByClassName("plan");
  // Array.from 관련 내용 정리 ★
  Array.from(planGroup).forEach((element) => {
    if (event.target.id === element.id) {
      element.classList.add("border-purplish-blue", "bg-magnolia");
      selectState.plan = element.id;
    } else {
      element.classList.remove("border-purplish-blue", "bg-magnolia");
    }
  });
}

//step3 - click event when user clicked add-on option
function selectAddOnOption(event) {
  const checkbox = event.target.querySelector(".checkbox");

  if (checkbox.classList.contains("bg-purplish-blue") === true) {
    checkbox.classList.remove("bg-purplish-blue", "border-purplish-blue");
    event.target.classList.remove("border-purplish-blue", "bg-magnolia");
    selectState.addon = selectState.addon.filter(
      (element) => element !== checkbox.id
    );
  } else {
    checkbox.classList.add("bg-purplish-blue", "border-purplish-blue");
    event.target.classList.add("border-purplish-blue", "bg-magnolia");
    selectState.addon = [...selectState.addon, checkbox.id];
  }
}

//step4 - render event when user move to page step 4;
function applyUserSelectData() {
  console.log(selectState);
}
