const appRouter = function (app) {

    app.get("/api", function (req, res) {
        res.status(200).send("Health Check Api");
    });

    app.get("/api/:msg", function (req, res) {
        const msg = req.params.msg;
        respondHandler(msg, res);
    });

    app.post('/api', function (req, res) {
        const msg = req.body.msg;
        respondHandler(msg, res);
    });

    // Handle in-valid route
    app.all('api/*', function(req, res) {
        const response = { msg: null, message: 'Route not found!!' }
        res.status(404).send(response)
    })

}

function respondHandler(msg, res) {
    (msg) ? res.status(200).send(msg) : res.status(400).send({ msg: null, message: 'Message no recive!!' });
};

module.exports = appRouter;

