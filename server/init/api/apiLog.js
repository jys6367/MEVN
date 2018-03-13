module.exports = {
    requestLog(app) {
        app.use("/", (req, res, next) => {
            console.log("************************************************************************");
            console.log(`user : ${JSON.stringify(req.user)} `);
            console.log(`query : ${JSON.stringify(req.query)} & params : ${JSON.stringify(req.params)} & body : ${JSON.stringify(req.body)}`);
            console.log(`method : ${req.method} & url : ${req.url}`);
            console.log(`time : ${new Date()}`);

            next()
        });
    }
};
