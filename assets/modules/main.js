const errormsg1 = "This field is required.";
const errormsg2 = "Please provide a valid email address.";
const errormsg3 = "Please input a correct phone number.";
const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const phoneNumberFormat =
  /(\+|00)(297|93|244|1264|358|355|376|971|54|374|1684|1268|61|43|994|257|32|229|226|880|359|973|1242|387|590|375|501|1441|591|55|1246|673|975|267|236|1|61|41|56|86|225|237|243|242|682|57|269|238|506|53|5999|61|1345|357|420|49|253|1767|45|1809|1829|1849|213|593|20|291|212|34|372|251|358|679|500|33|298|691|241|44|995|44|233|350|224|590|220|245|240|30|1473|299|502|594|1671|592|852|504|385|509|36|62|44|91|246|353|98|964|354|972|39|1876|44|962|81|76|77|254|996|855|686|1869|82|383|965|856|961|231|218|1758|423|94|266|370|352|371|853|590|212|377|373|261|960|52|692|389|223|356|95|382|976|1670|258|222|1664|596|230|265|60|262|264|687|227|672|234|505|683|31|47|977|674|64|968|92|507|64|51|63|680|675|48|1787|1939|850|351|595|970|689|974|262|40|7|250|966|249|221|65|500|4779|677|232|503|378|252|508|381|211|239|597|421|386|46|268|1721|248|963|1649|235|228|66|992|690|993|670|676|1868|216|90|688|886|255|256|380|598|1|998|3906698|379|1784|58|1284|1340|84|678|681|685|967|27|260|263)(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{6,20}$/;

const context = document.querySelector("#context");

// user data for select step by user
const selectState = {
  nowStep: 1,
  name: "",
  emailAddress: "",
  phoneNumber: "",
  period: "Monthly",
  plan: "arcade",
  addon: "",
};

// render event object when user move to step pages
const renderEvent = {
  step1: () => {
    const nameNode = document.querySelector("#name");
    const emailNode = document.querySelector("#email");
    const phoneNode = document.querySelector("#phone");
    console.log(nameNode, emailNode, phoneNode);
    nameNode.value = selectState.name;
    emailNode.value = selectState.emailAddress;
    phoneNode.value = selectState.phoneNumber;
  },

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
  if (selectState.nowStep === 1) {
    if (validationCheckToNextStep() === false) {
      return;
    }
  }
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
      console.log(selectState.nowStep);
      renderEvent[`step${selectState.nowStep}`]();
    });
}

//step1 - input event when user inputed value in input element
function inputValidationCheck(event) {
  // 형제 노드 확인 -> previousElementSibling, nextElementSibling
  const prevNodes = event.target.previousElementSibling;
  const errorBox = prevNodes.querySelector("span");
  if (event.target.id === "name") {
    if (event.target.value === "") {
      errorBox.classList.remove("hidden");
      errorBox.classList.add("block");
      event.target.classList.add("border-strawberry-red");
      errorBox.innerText = errormsg1;
      selectState.name = event.target.value;
    } else {
      errorBox.classList.remove("block");
      errorBox.innerText = "";
      errorBox.classList.add("hidden");
      selectState.name = event.target.value;
      if (event.target.classList.contains("border-strawberry-red") === true) {
        event.target.classList.remove("border-strawberry-red");
      }
    }
  }

  if (event.target.id === "email") {
    errorBox.classList.remove("hidden");
    errorBox.classList.add("block");
    if (event.target.value === "") {
      errorBox.innerText = errormsg1;
      event.target.classList.add("border-strawberry-red");
      selectState.emailAddress = event.target.value;
    } else if (emailFormat.test(event.target.value) === true) {
      errorBox.innerText = "";
      event.target.classList.remove("border-strawberry-red");
      errorBox.classList.remove("block");
      errorBox.classList.add("hidden");
      selectState.emailAddress = event.target.value;
    } else {
      event.target.classList.add("border-strawberry-red");
      errorBox.innerText = errormsg2;
      selectState.emailAddress = event.target.value;
    }
  }

  if (event.target.id === "phone") {
    errorBox.classList.remove("hidden");
    errorBox.classList.add("block");
    if (event.target.value === "") {
      errorBox.innerText = errormsg1;
      event.target.classList.add("border-strawberry-red");
      selectState.phoneNumber = event.target.value;
    } else if (phoneNumberFormat.test(event.target.value) === true) {
      errorBox.innerText = "";
      event.target.classList.remove("border-strawberry-red");
      errorBox.classList.remove("block");
      errorBox.classList.add("hidden");
      selectState.phoneNumber = event.target.value;
    } else {
      event.target.classList.add("border-strawberry-red");
      errorBox.innerText = errormsg3;
      selectState.phoneNumber = event.target.value;
    }
  }
}

// step 1 - validation check event when user inputed step1 form and move to next step
function validationCheckToNextStep() {
  const nameNode = document.querySelector("#name");
  const emailNode = document.querySelector("#email");
  const phoneNode = document.querySelector("#phone");

  if (nameNode.value === "") {
    const errorBox = nameNode.previousElementSibling.querySelector("span");
    errorBox.classList.remove("hidden");
    errorBox.classList.add("block");
    nameNode.classList.add("border-strawberry-red");
    errorBox.innerText = errormsg1;
  }

  if (emailNode.value === "") {
    const errorBox = emailNode.previousElementSibling.querySelector("span");
    errorBox.innerText = errormsg1;
    emailNode.classList.add("border-strawberry-red");
  } else if (emailFormat.test(emailNode.value) === false) {
    const errorBox = emailNode.previousElementSibling.querySelector("span");
    emailNode.classList.add("border-strawberry-red");
    errorBox.innerText = errormsg2;
  }

  if (phoneNode.value === "") {
    const errorBox = phoneNode.previousElementSibling.querySelector("span");
    errorBox.innerText = errormsg1;
    phoneNode.classList.add("border-strawberry-red");
  } else if (phoneNumberFormat.test(phoneNode.value) === false) {
    const errorBox = phoneNode.previousElementSibling.querySelector("span");
    phoneNode.classList.add("border-strawberry-red");
    errorBox.innerText = errormsg3;
  }

  if (
    nameNode.classList.contains("border-strawberry-red") ||
    emailNode.classList.contains("border-strawberry-red") ||
    phoneNode.classList.contains("border-strawberry-red")
  ) {
    return false;
  }
  return true;
}

// step2 - click event when user clicked planning option
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
