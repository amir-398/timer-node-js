const express = require("express");
const app = express();
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swaggerConfig");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/userTimer");
app.use(express.urlencoded());
app.use(express.json());

const userRoute = require("./routes/userRoute");
const timerRoute = require("./routes/timerRoute");
app.use("/users", userRoute);
app.use("/", timerRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
