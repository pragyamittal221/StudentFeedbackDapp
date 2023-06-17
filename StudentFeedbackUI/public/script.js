
// Connect Metamask
let account;
let contract;
let abi;

fetch('StudentFeedbackSystem.json')
.then(response => response.json())
.then(contractData => {
  abi = contractData.abi;
})
.catch(error => console.error(error));
const connectMetamask = async () => {
  if(window.ethereum !== "undefined"){
      const accounts = await ethereum.request({method:"eth_requestAccounts"});
      account = accounts[0];
      document.getElementById("accountArea").innerHTML = account;
  }
}

// Add an event listener for the accountsChanged event
ethereum.on("accountsChanged", async (accounts) => {
  account = accounts[0];
  document.getElementById("accountArea").innerHTML = account;
  updateFormVisibility();
  clearDisplay();
});

// Connect to smart contract
const connectContract = async () => {
console.log('Started');
              
/**************************                  Change this if new contract deployed                    *****************************/ 
const Address = "0x52Cf4b062F03E454D1AAFA983396B943072cd873";
/*********************************************************************************************************************************/

window.web3 = await new Web3(window.ethereum);
window.contract = await new window.web3.eth.Contract(abi, Address); 
if (window.contract) {
  document.getElementById("contractArea").innerHTML = "Connected to Smart Contract";
  console.log(window.contract)
  console.log('Contract Loaded Successfully');
} else {
  document.getElementById("contractArea").innerHTML = "Failed to Connect to Smart Contract";
  console.log('Failed to Load Contract');
}
console.log('Finished');
document.getElementById("contractArea").innerHTML = "Connected to Smart Contract";
console.log('Finished');
updateFormVisibility();
}

//3-read data from smart contract
const readContract = async () => {
  const data = await window.contract.methods.isOwner().call({ from: account });
  document.getElementById("dataArea").innerHTML = data;
}

const addTeacherRole = async () => {
  const teacherAccountAddress = document.getElementById("teacherAccountAddress").value;
  await window.contract.methods.addTeacher(teacherAccountAddress).send({ from: account });
  document.getElementById("addTeacherRoleResult").innerHTML = "Assigned Teacher Role Successfully!";
}

const addStudentRole = async () => {
  const studentAccountAddress = document.getElementById("studentAccountAddress").value;
  await window.contract.methods.addStudent(studentAccountAddress).send({ from: account });
  document.getElementById("addStudentRoleResult").innerHTML = "Assigned Student Role Successfully!";
}

const addTeacher = async () => {
  const teacherCode = document.getElementById("teacherCode").value;
  const subjectCodes = document.getElementById("subjectCodes").value.split(",");
  const studentCounts = document.getElementById("studentCounts").value.split(",");
  await window.contract.methods.addTeacher(teacherCode, subjectCodes, studentCounts).send({ from: account });
  document.getElementById("addTeacherResult").innerHTML = "Added Teacher Successfully!";
}

const getTeacher = async () => {
  const teacherCode = document.getElementById("teacherCode1").value;

  const result = await window.contract.methods.getTeacher(teacherCode).call({ from: account });
  if(result === null)
      console.log("failed");
  else
  {
    const teacherCodeElement = document.getElementById("teacherCodeResult");
    const subjectCodesElement = document.getElementById("subjectCodeResult");

    teacherCodeElement.innerText = `Teacher Code: ${result.code}`;
    subjectCodesElement.innerText = `Subject Codes: ${result.subjectCodes.join(", ")}`;
  }
}

const getPasswords = async () => {
  const teacherCode = document.getElementById("teacherCode2").value;
  const subjectCode = document.getElementById("subjectCode").value;
  const result = await window.contract.methods.getPasswords(teacherCode, subjectCode).call({ from: account });
  if(result===null)
      console.log("failed");
  else
      document.getElementById("passwordsResult").innerHTML = JSON.stringify(result);
}

const getReview = async () => {
  const teacherCode = document.getElementById("teacherCode3").value;
  const subjectCode = document.getElementById("subjectCode2").value;

  const reviews = await window.contract.methods.getReview(teacherCode, subjectCode).call({ from: account });

  const reviewContainer = document.getElementById("reviewResult");
  reviewContainer.innerHTML = ""; // Clear previous content

  if (reviews.length === 0) {
    reviewContainer.innerHTML = "No reviews available.";
  } else {
    reviews.forEach((review, index) => {
      const feedbackNumber = index + 1;
      const rating = review[0];
      const comment = review[1];

      const feedbackDiv = document.createElement("div");
      feedbackDiv.innerHTML = `
        <p>Feedback ${feedbackNumber}:</p>
        <p style="padding-left: 20px;">Rating: ${rating}</p>
        <p style="padding-left: 20px;">Review: ${comment}</p>
        <br>
      `;
      reviewContainer.appendChild(feedbackDiv);
    });
  }
}

const addReview = async () => {
  const teacherCode = document.getElementById("teacherCode4").value;
  const subjectCode = document.getElementById("subjectCode3").value;
  const rating = document.getElementById("rating").value;
  const comments = document.getElementById("comments").value;
  const password = document.getElementById("password").value;

  await window.contract.methods.addReview(teacherCode, subjectCode, rating, comments, password).send({ from: account });
}

const isOwner = async () => {
  const result = await window.contract.methods.isOwner().call({from:account});
  console.log(result);
  return result;
}

const isTeacher = async () => {
  return await window.contract.methods.isTeacher(account).call({from:account});
}

const isStudent = async () => {
  return await window.contract.methods.isStudent(account).call({from:account});
}

const clearDisplay = () => {
  // Clear form inputs
  console.log("in clear");
  document.getElementById("addTeacherRoleResult").innerHTML = "";
  document.getElementById("addStudentRoleResult").innerHTML = "";
  document.getElementById("teacherCode").value = "";
  document.getElementById("subjectCodes").value = "";
  document.getElementById("studentCounts").value = "";
  document.getElementById("addTeacherResult").innerHTML = "";
  document.getElementById("teacherCode1").value = "";
  document.getElementById("teacherCodeResult").innerHTML = "";
  document.getElementById("subjectCodeResult").innerHTML = "";
  document.getElementById("teacherCode2").value = "";
  document.getElementById("subjectCode").value = "";
  document.getElementById("passwordsResult").innerHTML = "";
  document.getElementById("teacherCode3").value = "";
  document.getElementById("subjectCode2").value = "";
  document.getElementById("reviewResult").innerHTML = "";
  document.getElementById("teacherCode4").value = "";
  document.getElementById("subjectCode3").value = "";
  document.getElementById("rating").value = "";
  document.getElementById("comments").value = "";
  document.getElementById("password").value = "";
}

// Update form visibility and layout based on the current role
const updateFormVisibility = async () => {
  const addTeacherForm = document.forms.addTeacherForm;
  const getTeacherForm = document.forms.getTeacherForm;
  const getPasswordsForm = document.forms.getPasswordsForm;
  const getReviewForm = document.forms.getReviewForm;
  const addReviewForm = document.forms.addReviewForm;
  const assignTeacherRole = document.forms.assignTeacherRole;
  const assignStudentRole = document.forms.assignStudentRole;
  const notRegisteredText = document.getElementById("notRegisteredText");

  // Set default view
  addTeacherForm.style.display = "none";
  getTeacherForm.style.display = "none";
  getPasswordsForm.style.display = "none";
  getReviewForm.style.display = "none";
  addReviewForm.style.display = "none";
  assignTeacherRole.style.display = "none";
  assignStudentRole.style.display = "none";
  notRegisteredText.style.display = "none";

  try {
    const isOwnerResult = await isOwner();
    if (isOwnerResult === true) {
      console.log("Owner");
      assignTeacherRole.style.display = "block";
      assignStudentRole.style.display = "block";
      addTeacherForm.style.display = "block";
      getTeacherForm.style.display = "block";
      getPasswordsForm.style.display = "block";
      getReviewForm.style.display = "block";
      addReviewForm.style.display = "none";
      notRegisteredText.style.display = "none";
      return;
    }

    const isTeacherResult = await isTeacher();
    if (isTeacherResult === true) {
      console.log("Teacher");
      assignTeacherRole.style.display = "none";
      assignStudentRole.style.display = "none";
      addTeacherForm.style.display = "none";
      getTeacherForm.style.display = "block";
      getPasswordsForm.style.display = "block";
      getReviewForm.style.display = "block";
      addReviewForm.style.display = "none";
      notRegisteredText.style.display = "none";
      return;
    }

    const isStudentResult = await isStudent();
    if (isStudentResult === true) {
      console.log("Student");
      assignTeacherRole.style.display = "none";
      assignStudentRole.style.display = "none";
      addTeacherForm.style.display = "none";
      getTeacherForm.style.display = "none";
      getPasswordsForm.style.display = "none";
      getReviewForm.style.display = "none";
      addReviewForm.style.display = "block";
      notRegisteredText.style.display = "none";
      return;
    }

    // None of the roles matched
    notRegisteredText.style.display = "block";
  } catch (error) {
    console.error(error);
  }
};

// Call updateFormVisibility() initially to set the initial layout based on the current role
updateFormVisibility();