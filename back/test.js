var express = require('express')
var app = express()
var mysql = require('mysql');
var bodyParser = require('body-parser')









var con = mysql.createConnection({
	host: "localhost", 
	database:"demo",
	user: "Navneet",
	password:"mohit@1234"
   });

con.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");  
 } else {
     console.log("Error connecting database ... \n\n");  
 }
 });

   var Name1="hello";
   var phone1=9899;
   var email1="dnknd";
   var password1="dnknd";
   var cabnumber1="adsd";
con.query("INSERT INTO driver(Name, phone,email,password,cabnumber) VALUES(?,?,?,?,?)",[Name1, phone1 ,email1,password1,cabnumber1], function(err, result){

if(err)
{
	console.log("error");

} else {
	console.log("ok");
	
}
});
app.listen(3037,function()
{
    console.log("Server running on 3037")
})

