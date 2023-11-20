const mongoose = require('mongoose');

// Create a Mongoose Schema
//A schema defines the structure of documents in a collection. 
//It allows you to specify the fields, data types, and validation rules for your documents.
//mongo db is a schema-less database but , mongoose does use a schema for adding/updating documents in a database collection!!!

const publicPostsSchema = new mongoose.Schema({
   type:{
              type:String, //mongoose allows you to add data validators
              required:true
            },
   title:{
                type:String, //mongoose allows you to add data validators
                required:true
            },
    text: {
            type: String,
            required: true,
            
        } ,
    authorId:{
            type:String,
            required: true, //general or admin users
        },   
     anonymous:{
        type:String,
        required: true, //general or admin users
        } ,  
     suspended:{
        type:Boolean,
        default: false, //general or admin users
        } ,
        likes:{
           type:Number,
        default: 0, //general or admin users
        }  
          
}, { timestamps: true });

// Add timestamps option to the schema
//publicPostsSchema.set('timestamps', true);


// Create a Mongoose Model
const PublicPosts = mongoose.model('PublicPosts', publicPostsSchema);
module.exports = PublicPosts;