const express = require("express");
const Location = require('./src/apis/location')

const app = express();

app.use(express.json({ limit: "300mb", extended: true }));
app.use(express.urlencoded({ limit: "300mb", extended: true }));

app.use("/location", Location);

app.use((req, res) => {
  res.status(404).send({
    error: true,
    errorDesc: "endpoint not found",
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, (_) => console.log(`APP is listening at PORT: ${PORT}`));