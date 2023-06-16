const StudentFeedbackSystem = artifacts.require("StudentFeedbackSystem");

module.exports = function (deployer) {
  deployer.deploy(StudentFeedbackSystem);
};
