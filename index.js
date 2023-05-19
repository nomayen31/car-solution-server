const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();
const app = express()

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@my-blogging-application.rae0mb7.mongodb.net/?retryWrites=true&w=majority`;


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

    const serviceCollection = client.db("carSolution").collection('services');

    const orderCollection = client.db("carSolution").collection('orders');

    app.get('/services', async (req, res) => {
      const query = {}
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get('/services/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const service = await serviceCollection.findOne(query);
      res.send(service);
    });

    // order 

    app.get('/orders', async (req, res) => {
      let query = {};
      if (req.query.email) {
          query = {
              email: req.query.email
          }
      }
      const cursor = orderCollection.find(query);
      const orders = await cursor.toArray();
      res.send(orders);
    })

    app.post('/orders', async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order)
      res.send(result)
    });

    app.patch('/orders/:id', async(req, res)=>{
      const id = req.params.id;
      const status = req.body.status
      const query = {_id: new ObjectId(id)}
      const updatedDoc = {
        $set:{
          status: status
        }
      }
      const result = await orderCollection.updateOne(query, updatedDoc);
      res.send(result);
    })

    app.delete('/orders/:id', async(req, res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await orderCollection.deleteOne(query)
      res.send(result);
    })

  }
  finally {

  }
}
run().catch(err => console.error(err));


app.get('/', (req, res) => {
  res.send('car solution server is running')
})

app.listen(port, () => {
  console.log(`car solution server running on ${port}`);
})