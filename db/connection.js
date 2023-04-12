const mongoose = require("mongoose");

const {
  DB_USERNAME,
  DB_PRIMARY_PASSWORD,
  DB_PRIMARY_CONNECTION_STRING,
  DB_DEV_MONGODB_URL,
  DB_MONGODB_URL,
} = process.env;

mongoose
  .connect(
    process.env.NODE_ENV === "DEV" ? DB_DEV_MONGODB_URL : DB_MONGODB_URL,
    {
      // auth: {
      //   username: DB_USERNAME,
      //   password: DB_PRIMARY_PASSWORD,
      // },
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log(`MongoDB connected successfully`);
  })
  .catch((error) => {
    console.error(error);
  });
