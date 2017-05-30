var mongoose=require('mongoose');

//We will set promises to use with mongoose instead of callbaks
mongoose.Promise=global.Promise;

//Connecting with the mongoose database
mongoose.connect("mongodb://localhost:27017/TodoApp");

//Creating a mongodb model

var Todo = mongoose.model('Todo',{
   title:{
        type:String
   },
   completed:{
        type:Boolean
   },
   completedAt:{
        type:Number
   } 
});


//Creating an instance
var newTodo=Todo({
    title:'Say Hello'
});

//Saving will have a promise
newTodo.save().then((doc)=>{
    console.log("Saved todo ",doc);
},(err)=>{
    console.log('Error in saving todo',err);
});


//Creating user Schema

var User=mongoose.model('User',{
    email:{
        type:String,
        minlength:1,
        required:true,
        trim:true
    }
});

var newUser=User({
    email:'saraogi.raj40@gmail.com'
});

newUser.save().then((doc)=>{
    console.log("User saved ",doc);
},(err)=>{
    console.log("Error",err);
});