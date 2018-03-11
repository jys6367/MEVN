



module.exports = function TestService() {

    this.test = function () {
        console.log("TestService.test() 시작")
        let user = new this.User();
        return user.forClient();
    }
}