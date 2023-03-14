const mongoose = require('mongoose') // original
// const client = mongoose(process.env.DB_STRING);
const { MongoClient } = require("mongodb") 
// const { MongooseClient } = require('mongoose')
const uri = 'mongodb+srv://cchoip6:0tterHous3101@cluster0.ny8ppoe.mongodb.net/POMS?retryWrites=true&w=majority'
const client = new MongoClient(uri)


// Database Name
// let db,
//     dbConnectionStr = process.env.DB_STRING,
//     dbName = 'POMS'

// const connectDB = async () => {
//   MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
//     .then(client => {
//         console.log(`Connected to ${dbName} Database`)
//         db = client.db(dbName)

//         db.customer.createIndex({ type: 1},
//           { collation: { locale: 'en', strength: 2 } })
//     })
//   }

// const client = mongoose.connect(process.env.DB_STRING)



// // db.createCollection("fruit")
// customerCollection.createIndex( { type: 1},
//     { collation: { locale: 'en', strength: 2 } } )

// MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
//     .then(client => {
//         console.log(`Connected to ${dbName} Database`)
//         db = client.db(dbName)
//     })

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING) // original database connection
    // let db = MongoClient.connect(process.env.DB_STRING)
    // await client.connect()

    // console.log(`MongoDB Connected: ${conn.connection.host}`) // original
    ////////
    console.log("Connected successfully to server");
    const database = client.db("POMS")
    // console.log(database)
    const customers = database.collection("customers");
    const result = await customers.createIndex({ type: 1 },
      { collation: { locale: 'en', strength: 2 } });
  console.log(`Index created: ${result}`);


    ////
    // const collection = conn.db('POMS').collection('customers')
    // console.log(collection)
    // await collection.createIndex( { type : 1 },
    // { collation : { locale : 'en', strength: 2 } });
    // console.log(db)
    // console.log(`MongoDB Connected: ${client}`)

    // const db = client.db(dbName);
    // const collection = db.collection('customers');

    // using collation to search case insensitive
    // let db = mongoose.connect(process.env.DB_STRING) //client.db('POMS')
    // let db = conn.db('POMS')
    // const customerCollection = db.collection('customer')
    // let db = mongoose.connect(process.env.DB_STRING)
    // db.customers.createIndex({ type: 1},
    //     { collation: { locale: 'en', strength: 2 } })
    // db.collection.createIndex({ type: 1},
    //     { collation: { locale: 'en', strength: 2 } })
    // let db = conn.db('POMS')
    // const customerCollection = db.collection('customers')
    // db.customer.createIndex( { type: 1},
    //   { collation: { locale: 'en', strength: 2 } } )
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB