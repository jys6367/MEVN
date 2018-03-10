module.exports = function TestController() {
    this.post.test = function (param) {
        return {
            param,
            currentUser: this.currentUser
        }
    }

    this.get.test = function (param) {
        console.log("testcontroller. test 함수 실행")

        return {
            param,
            currentUser: this.currentUser
        }
    }
}

