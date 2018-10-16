const express = require("express");
const expressGraphQL = require("express-graphql");
const cors = require("cors");
const schema = require("./schema/schema");
const config = require("./config/config");
const port = config.development.server.port;
require("./config/database");

const app = express();

app.use(cors());

app.get("/", (req, res, next) => {
  res.send("<h2>Welcome to GraphQL</h2>");
});

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.listen(port, () => console.log(`Server is connected on ${port}`));
