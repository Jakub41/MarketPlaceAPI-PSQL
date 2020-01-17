const c = require("./src/config/config");
const express = require("express");
const app = express();
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
const morgan = require("morgan");
const port = c.server.port || 5000;

app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

app.use(require("./src/routes/index.routes"));

app.get("/", (req, res) => {
    res.send({ message: "endpoint working" });
});

console.log(listEndpoints(app));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
