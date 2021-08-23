import express from "express";

const app = express();

app.set("port", 3000);

app.get("/", (req, res) => {
  res.status(200).send(`Hello there: ${req.query?.name ?? "name"}`);
});

app.listen(app.get("port"), "localhost", () => {
  console.log("Server started: http://localhost:3000");
});
