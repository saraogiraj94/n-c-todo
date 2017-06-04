const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');


var msg="Hello this is no 3";
var message=SHA256(message).toString();

console.log(`Message is ${message}`);

var data={
    id:10
}

var token=jwt.sign(data,"oursecret");
console.log("Token is" + token);

var result=jwt.verify(token,"oursecret");
console.log(result);
