const mongoose = require("mongoose");

const { DB_USERNAME, DB_PRIMARY_PASSWORD, DB_PRIMARY_CONNECTION_STRING } =
  process.env;

mongoose
  .connect(DB_PRIMARY_CONNECTION_STRING, {
    auth: {
      username: DB_USERNAME,
      password: DB_PRIMARY_PASSWORD,
    },
    useNewUrlParser: true,
  })
  .then(() => {
    if (process.env.NODE_ENV === "DEV")
      console.log(`Cosmos DB (MongoDB) connected successfully`);
  })
  .catch((error) => {
    console.error(error);
  });
