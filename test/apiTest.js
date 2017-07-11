const apiApp= require("../api");
const assert = require("assert");
const request = require("supertest");


describe("GET /api/customer/items", function(){
    it("should return successsfully", function(done){
        request(apiApp)
        .get("/api/customer/items")  ////returns a promise
        .expect(200)         ///status code
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(res){
            var success =res.body["vendingData"]["status"]
            assert.equal(success, "success" );            
        })
        .end(done);///tells supertest we are done\\\
        // .end(function(err, res){if(err){done(err);else{done()}}})
    });
});

describe("POST /api/customer/items/:itemId/purchases", function(){
    it("should return with a quantity change of -1 ", function(done){
        request(apiApp)
        .post("/api/customer/items/2/purchases")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(res){
            var inventory = res.body.newInventory
          
            
            assert.equal(inventory, "9")

        }) .end(done);
        });
        
    });

describe("GET /api/vendor/purchases",function(){
    it("should return successfully", function(done){
        request(apiApp)
        .get("/api/vendor/purchases")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(res){
             var success = res.body["purchaseData"]["status"]
             var purchases=res.body.purchaseData
             console.log("This is the purchase data", purchases);
            assert.equal(success, "success" );            
        })
        .end(done);
          
            
        });
    });

describe("GET /api/vendor/money",function(){
    it("should return successfully", function(done){
        request(apiApp)
        .get("/api/vendor/money")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(res){
            var money = res.body["vendingData"]["money"]
            assert.equal(money, 250);
        }).end(done);
    })
})

describe("POST /api/vendor/items", function(){
    it("should add the item to an array", function(done){
        request(apiApp)
        .post("/api/vendor/items")
        .send( {
      "id": 5,
      "description": "Apple",
      "cost": 35,
      "quantity": 12
    })
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(res){   
            newInventory = res.body["addInventory"].length  
            assert.equal(newInventory, 5)

        }) .end(done);
        });
        
    });
    describe("PUT /api/vendor/items/3", function(){
        it("should update the attributes of an item", function(done){
            request(apiApp)
            .put("/api/vendor/items/3")
            .send({
      "id": 3,
      "description": "Marshalls favorite Pringles",
      "cost": 105,
      "quantity": 10
    })
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(res){   
            updatedCost = res.body["changeInventory"]
            
            newCost = updatedCost[2].cost
            assert.equal(newCost, 105)

        }) .end(done);
        });
    });