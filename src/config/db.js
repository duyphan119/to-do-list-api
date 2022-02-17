const mongoose = require("mongoose");
const connectDatabase = () => {
  try {
    mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDatabase;
