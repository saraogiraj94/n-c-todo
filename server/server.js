var express=require('express');
var bodyParser=require('body-parser');
var _ = require('lodash');

var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/Todos');
var {User}=require('./models/Users');
var {authenticate}=require('./middleware/authenticate');

const port=process.env.PORT||3000;


var app=express();  

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    console.log(JSON.stringify(req.body,undefined,2));

    var todo=Todo({
        title:req.body.text
    });

    //Now saving the todo created 

    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });  
});


app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        if(!todos){
            return res.status(404).send();
        }

        res.send({todos});
    },(err)=>{
        return res.status(400).send(err);
    });
});


app.get('/todo/:id',(req,res)=>{
    var id=req.params.id;   

    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send("To do not found");
        }

        res.send({todo});
    },(err)=>{
        res.status(404).send(err);
    });


});

//User Routes


app.post('/users',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});


app.get('/users/me',authenticate,(req,res)=>{
   res.send(req.user); 
});

//User Login Route
app.post('/users/login',(req,res)=>{
    var body=_.pick(req.body,['email','password']);

    User.findByCredentials(body.email,body.password).then((user)=>{
      // return res.send(user);
    //Now we will generate new token
        return user.generateAuthToken().then((token)=>{
            return res.header('x-auth',token).send(user);
        });
  }).catch((err)=>{
        res.status(401).send(err);
    });
});


//Logout API
app.delete('/users/me/token',authenticate,(req,res)=>{
    
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app}