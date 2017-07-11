const express = require("express");
const app = express();
const vendingData = require("./data.js");
const purchaseData= require("./purchase.js");
const bodyParser = require("body-parser");


app.use(bodyParser.json());



app.get("/api/customer/items",function(req,res){
  vendingData.status = "success";
  res.json({vendingData});
})
app.post("/api/customer/items/:itemId/purchases",function(req,res){
  
  var itemId = req.params.itemId;
  var itemInformation = vendingData.data[(itemId-1)];
  
  var newInventory = itemInformation.quantity;
  newInventory = newInventory - 1;
  res.json({newInventory});

})

app.get("/api/vendor/purchases",function(req,res){
 
  purchaseData.status = "success";
  res.json({purchaseData});
})

app.get("/api/vendor/money", function(req,res){
   res.json({vendingData})
})

app.post("/api/vendor/items", function(req,res){
   console.log("old inventory", vendingData.data )
    var addInventory = vendingData.data
    addInventory.push(req.body)
    console.log("new inventory", addInventory)
   
    res.json({addInventory})
})

app.put("/api/vendor/items/:itemId", function(req,res){
  console.log("original inventory", vendingData.data)
  var changeInventory = vendingData.data;
  var updateInventory = req.body;
  var number = req.params.itemId - 1
  changeInventory.splice(number,1,updateInventory);
  console.log("new inventory", changeInventory);
  res.json({changeInventory});
})






  app.listen(3000, function () {
      console.log('Express running on http://localhost:3000/.')})
  

module.exports=app;