module.exports = function (res) {
    let end = false;
    return {
        isEnd(){
          return end;
        },
        Success() {
            console.log("Result.Success 호출")
            if (!end) {
                console.log("SUCCESS")
                res.json("SUCCESS")
                end = true
            }
        },
        Json(data) {
            console.log("Result.Json 호출")
            if (!end) {
                console.log("Json", data)
                res.json(data);
                end = true
            }
        },
        NotFound() {
            console.log("Result.Notfound 호출")
            if (!end) {
                console.log("notFound")
                res.json("notFound")
                end = true
            }
        },
        Error(e) {
            console.log("Result.Error 호출")
            if (!end) {
                console.log("Error", e)
                res.json("ERROR")
                end = true
            }
        }
    }
}