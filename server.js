const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const level = require("level");
const db = level("./testdb"); //update databse name

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

router.get('/', (req, res) => {
    res.json({ message: "Yea" });
})

router.route("/test") //update routes
    .post((req, res) => {
        console.log(req.body.testval);
        if (req.body.testval) {
            var sampleValue = req.body.testval;
            db.put('testval', sampleValue, (err) => {
                console.log("database updated")
                res.send();
            });
        }
    })
    .get((req, res) => {
        db.get('testval', (err, value) => {
            if (err)
                res.send(err);

            res.json(value);
        })
    })

app.use("/api", router);

app.listen(port, () => {
    console.log("express web api server running at", port);
});
