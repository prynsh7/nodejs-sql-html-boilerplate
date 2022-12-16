const express = require('express');
const cors=require('cors')
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
var mysql = require('mysql');

//Creating Connection to the SQL server
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
  });

  con.connect(function(err){
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Connection Successfull");
    }
  })

app.post("/createDatabase",function(req,res){
   con.connect(function(err){
    if(err)
    {
        console.log(err);
    }
    console.log("Connected");
    var sql="CREATE DATABASE shreyas";
    con.query(sql,(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        console.log("DB CREATED !");
    });
   });
});

app.get("/",function(req,res){
    res.send("Heloo ")
})

app.post("/createTable",async(req,res)=>{
    var con = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database:'shreyas'
      });
    await con.connect(async function(err){
        if(err)
        {
            console.log("Hello")
            console.log(err);
            return;
        }
            var sql = "CREATE TABLE employees (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), SSN VARCHAR(255), Salary VARCHAR(255), Designation VARCHAR(255), Department VARCHAR(255), Experience INT, doj VARCHAR(255)) ";
           await con.query(sql, (err, result)=>{
                if(err) throw err;
                console.log("Table Created");
            })
            var sql = "INSERT INTO employees (name , SSN, Salary, Designation, Department, Experience, doj) VALUES ? ";
            var values = [
                ["Shreyas", "123", "10000", "Developer", "Sales", 20, "10-10-2022"],
                ["Shreyas1", "124", "20000", "TPM", "Sales", 30, "10-10-2022"],
                ["Shreyas2", "125", "40000", "Developer", "Sales", 26, "10-10-2022"],
                ["Shreyas3", "126", "60000", "TPM", "Production", 28, "10-10-2022"],
                ["Shreyas4", "122", "10000", "Developer", "Sales", 78, "10-10-2022"],
                ["Shreyas5", "129", "20000", "Developer", "Production", 12, "10-10-2022"],
                ["Shreyas6", "121", "50000", "TPM", "Sales", 40, "10-10-2022"],
                ["Shreyas7", "128", "60000", "Developer", "Sales", 50, "10-10-2022"],
                ["Shreyas8", "129", "10000", "TPM", "Sales", 60, "10-10-2022"],
                ["Shreyas9", "120", "60000", "Developer", "Production", 60, "10-10-2022"],
            ];
    
           await con.query(sql, [values], (err, result)=>{
                if(err) throw err;
                console.log(result);
            })
    })
})



app.get("/getEmployees", (req, res)=>{

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: ""
      });

            con.connect(function(err){
            if(err)
            {
                console.log(err);
                return;
            }
            var name = "shreyas";
            var sql = "SELECT * FROM shreyas.employees";
            con.query(sql, [name], (err, result)=>{
                if(err) throw err;
                res.send(JSON.parse(JSON.stringify(result)))
            });
            con.end();
        })
})


app.delete("/deleteEmployee", (req, res)=>{
        var Experience = 20;
        var sql1 = "DELETE FROM shreyas.employees WHERE Experience=?";
     
            con.query(sql1, [Experience], (err, result)=>{
                if(err) throw err;
                console.log("User deleted."+result.affectedRows);
            })

        var sql12="SELECT * FROM shreyas.shreyas";
        con.query(sql12,(err,result)=>{
            if(err) console.log(err);
            res.send(JSON.parse(JSON.stringify(result)));
        })
})
app.listen(port, ()=>{
    console.log(`Listening on ${port}`);
})