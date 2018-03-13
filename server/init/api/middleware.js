


module.exports = {
    response: (req, res, next) => {
        res.ok = () => res.sendStatus(200);
        res.notFound = () => res.sendStatus(404);
        res.error = err => err && err.message ? res.status(500).json(err.message) : res.sendStatus(500);
        res.forbidden = () => res.sendStatus(403);
        res.return = (err, result) => err ? res.error(err) : res.json(result);

        next();
    }
}