const mongoose = require("mongoose");
const connectDatabase = () => {
  try {
    mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.comsr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDatabase;
