let router = require("express").Router();

router.get("/ok", (req, res, next)=>{
    res.ok();
});

router.get("/forbidden", function (req, res) {
    res.forbidden();
});

router.get("/error", function (req, res) {
    res.error({message:"error!"});
});

module.exports = router;