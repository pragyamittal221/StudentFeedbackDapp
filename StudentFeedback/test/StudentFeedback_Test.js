const StudentFeedbackSystem = artifacts.require("StudentFeedbackSystem");

contract("StudentFeedbackSystem", (accounts) => {
    it("should check the owner", async () => {
        const instance = await StudentFeedbackSystem.deployed()
        const testVale = await instance.isOwner();
        assert.equal(testVale, true, "Not the owner");
    });
});