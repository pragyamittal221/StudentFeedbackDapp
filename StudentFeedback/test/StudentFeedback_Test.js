const StudentFeedbackSystem = artifacts.require('StudentFeedbackSystem');

contract('StudentFeedbackSystem', (accounts) => {
    before(async () =>{
        instance = await StudentFeedbackSystem.deployed();
    });
    // Checks function: isOwner
    it("should check the owner", async () => {
        const testVale = await instance.isOwner();
        assert.equal(testVale, true, "Not the owner");
    });
    // Checks functions: addStudent and isStudent 
    it("should add a student", async () => {
        const added = await instance.addStudent(accounts[2]);
        const checkStudent = await instance.isStudent(accounts[2]);
        assert.equal(checkStudent, true, "Student account not added");
    }); 
    // Checks functions: addTeacher and isTeacher
    it("should add a teacher", async () => {
        const added = await instance.addTeacher(accounts[1]);
        const checkTeacher = await instance.isTeacher(accounts[1]);
        assert.equal(checkTeacher, true, "Teacher account not added");
    });
    // Checks functions: addTeacher and getTeacher
    it("should add teacher and course information", async () => {
        const added = await instance.addTeacher("Anand1",["CSE01","CSE02"],[5,3]);
        const checkTeacher = await instance.getTeacher("Anand1");
        assert.equal(checkTeacher['0'], "Anand1", "Teacher account not added");
    });
    // Checks function: getPasswords
    it("should get passwords", async () => {
        const added = await instance.addTeacher("Anand1",["CSE01","CSE02"],[5,3]);
        const checkPassword = await instance.getPasswords("Anand1", "CSE01");
        assert.equal(checkPassword.length, 5, "Could not get password");
    });
    // Checks function: getReview and addReview
    it("should retrieve the review added", async () => {
        const added = await instance.addTeacher("Anand1",["CSE01","CSE02"],[5,3]);
        const password = await instance.getPasswords("Anand1", "CSE01");
        const review = await instance.addReview("Anand1", "CSE01", 4, "Great Teacher!", password[0]);
        const checkReview = await instance.getReview("Anand1", "CSE01");
        assert.equal(checkReview.length, 1, "Review count should be 1");
        assert.equal(checkReview[0].rating, 4, "Rating should match");
        assert.equal(checkReview[0].comments, "Great Teacher!", "Comments should match");
    });    
});


// // SPDX-License-Identifier: GPL-3.0
// pragma solidity >=0.4.24;
// pragma experimental ABIEncoderV2;

// import "truffle/Assert.sol";
// import "truffle/DeployedAddresses.sol";
// import "../contracts/StudentFeedbackSystem.sol";
// import '../contracts/Ownable.sol';
// import '../contracts/TeacherRole.sol';
// import '../contracts/StudentRole.sol'; 

// contract TestStudentFeedbackSystem is Ownable,TeacherRole,StudentRole{
//     StudentFeedbackSystem studentFeedback = StudentFeedbackSystem(DeployedAddresses.StudentFeedbackSystem());

//     function testAddTeacher() public {
//         string memory teacherCode = "T1";
//         string[] memory subjectCodes = new string[](2);
//         subjectCodes[0] = "S1";
//         subjectCodes[1] = "S2";
//         uint[] memory studentCounts = new uint[](2);
//         studentCounts[0] = 3;
//         studentCounts[1] = 2;There

//         // if(studentFeedback != 0){
//         studentFeedback.addTeacher(teacherCode, subjectCodes, studentCounts);
//         // }

//         (string memory code, string[] memory subjectCodesReturned) = studentFeedback.getTeacher("Anand1");

//         Assert.equal(code, teacherCode, "Teacher code should match");
//         // Assert.equal(code.length, subjectCodes.length, "Subject codes should match");
//         for (uint i = 0; i < 2; i++) {
//             Assert.equal(subjectCodesReturned[i], subjectCodes[i], "Subject codes should match");
//         }
//     }

//     function testGetTeacher() public {
//         // Add a teacher
//         string memory teacherCode = "T1";
//         string[] memory subjectCodes = new string[](2);
//         subjectCodes[0] = "S1";
//         subjectCodes[1] = "S2";
//         uint[] memory studentCounts = new uint[](2);
//         studentCounts[0] = 3;
//         studentCounts[1] = 2;
        
//        studentFeedback.addTeacher(teacherCode, subjectCodes, studentCounts);

//         // Get teacher details
//         (string memory code, string[] memory codes) =studentFeedback.getTeacher(teacherCode);
//         Assert.equal(code, teacherCode, "Teacher code should match");
//         Assert.equal(codes.length, subjectCodes.length, "Subject codes should match");
//     }

//     function testGetPasswords() public {
//         string memory teacherCode = "T1";
//         string[] memory subjectCode = new string[](1);
//         subjectCode[0] = "S1";
//         uint[] memory studentCounts = new uint[](1);
//         studentCounts[0] = 3;

//         studentFeedback.addTeacher(teacherCode, subjectCode, studentCounts);

//         uint[] memory passwords = studentFeedback.getPasswords(teacherCode, subjectCode[0]);

//         Assert.equal(passwords.length, studentCounts[0], "Password count should match");
//     }

//     function testGetReview() public {
//         // Add a teacher
//         string memory teacherCode = "T1";
//         string[] memory subjectCodes = new string[](2);
//         subjectCodes[0] = "S1";
//         subjectCodes[1] = "S2";
//         uint[] memory studentCounts = new uint[](2);
//         studentCounts[0] = 3;
//         studentCounts[1] = 2;

//         studentFeedback.addTeacher(teacherCode, subjectCodes, studentCounts);

//         // Add a review
//         string memory subjectCode = "S1";
//         uint rating = 4;
//         string memory comments = "Great teacher!";
//         uint password = 12345;
//        studentFeedback.addReview(teacherCode, subjectCode, rating, comments, password);

//         // Get reviews for the teacher and subject
//         StudentFeedbackSystem.Review[] memory reviews =studentFeedback.getReview(teacherCode, subjectCode);
//         Assert.equal(reviews.length, 1, "Review count should be 1");
//         Assert.equal(reviews[0].rating, rating, "Rating should match");
//         Assert.equal(reviews[0].comments, comments, "Comments should match");
//     }

//     function testAddReview() public {
//         string memory teacherCode = "T1";
//         string[] memory subjectCode = new string[](1);
//         subjectCode[0] = "S1";
//         uint[] memory studentCounts = new uint[](1);
//         studentCounts[0] = 3;
//         uint rating = 4;
//         string memory comments = "Great teacher!";
//         uint password = 12345;

//         studentFeedback.addTeacher(teacherCode, subjectCode, studentCounts);
//         studentFeedback.addReview(teacherCode, subjectCode[0], rating, comments, password);

//         StudentFeedbackSystem.Review[] memory reviews = studentFeedback.getReview(teacherCode, subjectCode[0]);

//         Assert.equal(reviews.length, 1, "Review count should be 1");
//         Assert.equal(reviews[0].rating, rating, "Rating should match");
//         Assert.equal(reviews[0].comments, comments, "Comments should match");
//     }
// }


