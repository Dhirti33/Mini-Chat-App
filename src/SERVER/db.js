const mongoose = require('mongoose')

// MongoDB Connection
const connectDB = async () => {
    mongoose.connect('mongodb+srv://lomokodesmond:DESm"nd123@ravendb.m3h6i.mongodb.net/ravenDB?retryWrites=true&w=majority&appName=RavenDB', {
    }).then(() => {
      console.log("Connected to MongoDB");
    }).catch((err) => {
      console.error("MongoDB connection error: ", err);
      process.exit(1)
    });
}

module.exports = connectDB;