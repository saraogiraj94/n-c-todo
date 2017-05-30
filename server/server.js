var express=require('express');
var bodyParser=require('body-parser');

var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/Todos');
var {User}=require('./models/Users');

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

app.listen(port,()=>{   
    console.log(`Listening at port ${port}`);
});