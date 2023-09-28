var con =require("./connection")

var express= require("express");

var app=express();
var bodyParser=require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.get("/",(req,res)=>{
res.sendFile(__dirname+'/Enteryform.html');
});

app.post("/", (req,res)=>{
	var name=req.body.name;
	var email=req.body.email;
	var mob=req.body.mob;
	
	con.connect((error)=>{
		
		
		var sql="INSERT INTO datatotest(name,email,mob) VALUES(?,?,?)";
		
		
		con.query(sql,[name,email,mob],(error,result)=>{
			
			res.redirect("/next");
			//res.send('student register successful'+result.insertId);
		});
	});
});
	

app.get("/next",(req,res)=>{
	con.connect((error)=>{
		
		var sql="select * from datatotest ";
		con.query(sql,(error,result)=>{
			console.log(result); 
		    res.render("table1",{table:result}
			);
		});
	});
})

app.get("/delete-student",(req,res)=>{
	
	con.connect((error)=>{
		var id=req.query.mob;
		var sql="DELETE FROM datatotest WHERE mob=?";
		
		con.query(sql,[id],(error,result)=>{
			res.redirect("/next");
			
		});
	})
})



app.listen(3000,()=>{
console.log("Listening....")
});