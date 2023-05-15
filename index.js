const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();
const app =express()

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
console.log(process.env.DB_USER); 
console.log(process.env.DB_PASSWORD); 



const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@my-blogging-application.rae0mb7.mongodb.net/?retryWrites=true&w=majority`;


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
    
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) =>{
    res.send(' car solution is running')
})


app.listen(port,  () => {
    console.log(` web server listening on ${port}`);
  })