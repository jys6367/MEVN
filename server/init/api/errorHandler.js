


module.exports = app =>{

    app.use(function (err, req, res, next) {
        if (!err) next();

        console.log("************************************************************************");
        console.log(`  500 / ${err.message}  `);

        res.Error();
    });

    app.use((req, res) => {
        console.log("************************************************************************");
        console.log(`      404 NOT_FOUND          `);

        res.sendStatus(404);
    })
};