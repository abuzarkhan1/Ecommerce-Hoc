const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.DB);
    console.log("Database connected Successfully ");
  } catch (error) {
    console.log("database error");
  }
};
module.exports = dbConnect;
