var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'Navneet',
        password : 'mohit@1234',
        database : 'movie'
});
var app = express();
app.use(cors());
app.use(bodyParser.json());
 
connection.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");  
 } else {
     console.log("Error connecting database ...",err);  
 }
 });

//register user
app.post("/getdata",function(req,res){
     console.log(req.body);
        var name = req.body.name;
        var email = req.body.email;
        var phone = req.body.phone;
        var password = req.body.passw;
    connection.query("INSERT INTO users (name,email,phone,password) VALUES (?,?,?,?) ",[name,email,phone,password],function(err , row , fields){
       
        if (!err)
          {
     console.log(' success ');
       return res.json({err:0 , msg : 'Successfully Registered'});
           }
        else
       {
       console.log('Error while performing Query.',err.sqlMessage);
       return res.json({err:1 , msg: err.sqlMessage}); 
       }
   })
});

//login user

app.post("/signin",function(req,res){
     console.log(req.body);
        var gemail = req.body.email;
        var gpassword = req.body.pass1;
        connection.query("select * from users where password=" +gpassword,function(err , row , fields) {
      
        if (!err)
          {
       console.log(' success ');
              console.log(row[0].email);
               if(gemail==row[0].email)
                   {
                return res.json({err:0 , msg : 'Successfully signin',user:row[0].name ,email:row[0].email});
                }
              else
                  {
           console.log('Error while performing Query.');
           return res.json({err:1 , msg:'password not matched'}); 
                    }
           }
        else
       {
       console.log('Error while performing Query.',err);
       return res.json({err:1 , msg: err.sqlMessage}); 
       }
   })
});

 //getmovies

app.get('/getmovie',function(req,res){
      console.log(req.body);
     connection.query("select * from movies",function(err , row , fields) {
      
        if (!err)
          {
       console.log('success');
       return res.json({err:0 , data:row});
           }
        else
       {
       console.log('Error while performing Query.',err.sqlMessage);
       return res.json({err:1 , msg: err.sqlMessage}); 
       }
   })
    
    
});

//getcities

app.get('/getcity',function(req,res){
      console.log(req.body);
     connection.query("select * from cities",function(err , row , fields){
        
        if (!err)
          {
       console.log(' success ');
       return res.json({err:0 , data:row});
           }
        else
       {
       console.log('Error while performing Query.',err.sqlMessage);
       return res.json({err:1 , msg: err.sqlMessage}); 
       }
   })
    
});

app.get("/gettheat/:c_id",function(req,res)
{
      dat=req.params.c_id;
    connection.query("select * from theater where c_id="+dat,function(err , row , fields){
        
        if (!err)
          {
       console.log(' success ');
       return res.json({err:0 , data:row});
           }
        else
       {
       console.log('Error while performing Query.',err.sqlMessage);
       return res.json({err:1 , msg: err.sqlMessage}); 
       }
   })
      
})

app.get("/getshow/:th_id",function(req,res)
{
      dat=req.params.th_id;
    connection.query("select * from shows where th_id="+dat,function(err , row , fields){
        
        if (!err)
          {
       console.log(' success ');
       return res.json({err:0 , data:row});
           }
        else
       {
       console.log('Error while performing Query.',err.sqlMessage);
       return res.json({err:1 , msg: err.sqlMessage}); 
       }
   })
      
})

app.get("/getavail/:sh_id",function(req,res)
{
      dat=req.params.sh_id;
    connection.query("select * from availaible where sh_id=? AND avail=?",[dat,"y"],function(err , row , fields){
        
        if (!err)
          {
       console.log(' success ');
              console.log(row);
       return res.json({err:0 , data:row});
           }
        else
       {
       console.log('Error while performing Query.',err.sqlMessage);
       return res.json({err:1 , msg: err.sqlMessage}); 
       }
   })
      
})

app.post("/booking",function(req,res)
{
     console.log(req.body);
    var seat_no=req.body.seat_no;
    var screen_no=req.body.screen_no;
    var sh_id=req.body.sh_id;
    var user=req.body.email;
  
    connection.query("INSERT INTO book(seat_no,screen_no,sh_id,email) VALUES (?,?,?,?) ",[seat_no,screen_no,sh_id,user],function(err , row , fields){
        
        if (!err)
          {      
       connection.query("UPDATE availaible SET avail=? WHERE seat_no=? AND screen_no=? AND sh_id=?",["N",seat_no,screen_no,sh_id],function(err , row , fields){ 
        if (!err)
          {
       console.log('seat updated');
       
           }
        else
       {
       console.log('Error while performing updation Query.',err.sqlMessage); 
       }
               console.log(' success ');
               return res.json({err:0 , msg:"your seat is booked"});       
   })
           }
        
        else
       {
       console.log('Error while performing Query.',err.sqlMessage);
       return res.json({err:1 , msg: err.sqlMessage}); 
       }
   })
    
})

app.post('/mybooks',function(req,res){
      console.log(req.body);
    var user=req.body.email;
      console.log(user);
    
     connection.query("select * from book where email="+"'"+user+"'",function(err , row , fields){
        
        if (!err)
          {
       console.log(' success ');
       return res.json({err:0 , data:row});
           }
        else
       {
       console.log('Error while performing Query.',err);
       return res.json({err:1 , msg: err.sqlMessage}); 
       }
   })

    
});


app.listen(3036,function()
{
    console.log("Server running on 3036")
})
 
