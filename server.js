
var express = require('express');
var fs = require('fs'); //อ่านไฟล์ .jason
var app = express();


//แสดงรายชื่อทั้งหมด
app.get("/getUsers", function(req, res){
    fs.readFile(__dirname + "/" + "user.json",'utf8', function(err,data){
        res.end(data);
    });
});
//แสดงรายชื่อ ตามเงื่อนไข 1 = users['user1']
app.get('/getUsers/:id', function(req, res){
    fs.readFile(__dirname + "/" + "user.json", "utf8", function(err,data){
        var users = JSON.parse(data); //แปลงข้อมูบเป็นกลุ่ม ทั้งหมด
        var user = users["user" + req.params.id] // เพิ่มเงื่อนไข
        res.end(JSON.stringify(user));
    });
});
//ตัวอย่างเพื่อไว้เพิ่ม ข้อมูล
var user = {
    "user5" : {
        "id"   : "5",
        "name" : "testname5"
    }
}
//เพิ่มข้อมูล
app.post("/addUser", function(req,res){
    fs.readFile(__dirname + "/" + "user.json","stf8", function(err,data){
        data = JSON.parse(data);
        data["user5"] = user["user5"];//นำไปต่อกับข้อมูลที่มีอยู่แล้ว
        res.end(JSON.stringify(data));
    });
});

app.delete("/delUser/:indx", function(req, res){
    fs.readFile(__dirname + "/" + "user.json","stf8", function(err,data){
        data = JSON.parse(data);
        delete data["user" + req.params.index]; //ลบข้อมูลตาม index
        res.end(JSON.stringify(data));
    });
});
// เริ่มทำการเปิด server หรือ เรียกอีกอย่างว่า open port
var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("server เริ่มทำงาน ที่ http://%s:%s", host,port)
});