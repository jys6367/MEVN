module.exports = function TestController() {

    this.post.test = function ({param, currentUser}) {
        return {
            param,
            currentUser
        }
    }

    this.get.test = function ({res, Json, param, currentUser}, {TestService}) {
        console.log("testcontroller. test 함수 실행")

        let result = TestService.test();
        res.json(123)
        res.json(123)
        res.json(123)
        res.json(123)
        return Json({
            param,
            result,
            currentUser
        })
    }
}

