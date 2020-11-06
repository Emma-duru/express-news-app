require("dotenv").config();
const express = require("express");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.API_KEY);
const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  newsapi.v2.topHeadlines({ language: "en" }).then((response) => {
    res.render("index", {
      title: "HOME | EXPRESS NEWS APP",
      articles: response.articles,
    });
  });
});

app.get("/:category", (req, res) => {
  const category = req.params.category;
  newsapi.v2
    .topHeadlines({ language: "en", category: category })
    .then((response) => {
      res.render("index", {
        title: category.toUpperCase() + " | EXPRESS NEWS APP",
        articles: response.articles,
      });
    });
});

app.listen(PORT, () => {
  console.log("Server is running at port 3000");
});
