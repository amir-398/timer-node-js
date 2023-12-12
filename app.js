const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/userTimer");
app.use(express.urlencoded());
app.use(express.json());

const userRoute = require("./routes/userRoute");
app.use("/users", userRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
