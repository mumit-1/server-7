
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5100;

const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(express.json());
app.use(cors());


// const uri = `mongodb+srv://CoreUP:t48i0MPvfWFwP3Mw@cluster0.yrnn1sn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yrnn1sn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    //  await client.connect();
    const toolsCollection = client.db("sportsDb").collection("tools");
    app.post("/addProduct",async(req,res)=>{
      const newProduct = req.body;
      console.log(newProduct);
      const result = await toolsCollection.insertOne(newProduct);
      res.send(result);
    })
    app.get('/addProduct',async(req,res)=>{
      const cursor = toolsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send("goal");
})
app.listen(port,()=>{
    console.log(`server is on ${port}`);
})