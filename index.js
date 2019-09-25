const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const routes = require("./routes/routes.js");

const app = express()
app.set('port', process.env.PORT || 3001)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.options((req, res) => { res.sendStatus(200) })

routes(app);

app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
