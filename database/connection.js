const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/blog");

    console.log("connection ready data base blog")
  } catch (error) {
    console.log(error);
  }
};

module.exports ={
    connection
}