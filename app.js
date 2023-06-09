const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+ "/signup.html");
})

app.post("/", function(req,res){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const pNumber = req.body.pNumber;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname,
                    PHONE: pNumber
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us18.api.mailchimp.com/3.0/lists/94d11690f1";
    const options = {
        method: "POST",
        auth: "ifahim3107@gmail.com:153ef31b2c55468ca2f009fae4b641cc-us18"
    }

    const request = https.request(url ,options ,function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

    if(response.statusCode === 200)
    {
        res.sendFile(__dirname+"/success.html");
    }
    else
    {
        res.sendFile(__dirname+"/failure.html")
    }
})

app.listen(3000, function(){
    console.log("Server is up and running");
})

// List id: 94d11690f1
// api key: 153ef31b2c55468ca2f009fae4b641cc-us18