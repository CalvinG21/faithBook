const mongoose = require('mongoose');

// Create a Mongoose Schema
//A schema defines the structure of documents in a collection. 
//It allows you to specify the fields, data types, and validation rules for your documents.
//mongo db is a schema-less database but , mongoose does use a schema for adding/updating documents in a database collection!!!

const userSchema = new mongoose.Schema({
   username:{
              type:String, //mongoose allows you to add data validators
              required:true
            },
   password:{
                type:String, //mongoose allows you to add data validators
                required:true
            },
    email: {
            type: String,
            required: true,
            unique: true,
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            // You can also use a pre-defined email validation regex, for example:
            // match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        } ,
        role:{
            type:String,
            default:"general" //general or admin users
        }      
});

// Create a Mongoose Model
const Users = mongoose.model('Users', userSchema);
module.exports = Users;