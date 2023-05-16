/*
Importing the MongoClient module from the mongodb package. 
This module allows connecting to a MongoDB server and performing database operations.
*/

const {MongoClient} = require("mongodb");

/*
The URL variable is set to the address of the MongoDB server.
In this case, it is set to mongodb://127.0.0.1:27017, which represents the local MongoDB server running on the default port 27017.
*/
//const URL="mongodb://localhost:27017";
const URL="mongodb://127.0.0.1:27017";

/*
Creating a MongoClient instance:
Creates a new MongoClient instance using the connection URL.
*/
const client = new MongoClient(URL);

///////////////////////////////////////////
// getConnection
// Used to connect with MongoDBServer -> Database -> Collection
//////////////////////////////////////////
/*
This function is used to establish a connection with the MongoDB server and retrieve a reference to a specific collection.
Inside the function, client.connect() is called to connect to the MongoDB server.
After a successful connection, the function retrieves the "Marvellous" database and the "Batches" collection from the connected server.
Finally, it returns the reference to the "Batches" collection.
*/
async function getConnection() {
    let result = await client.connect();
    let db = result.db("Marvellous");
    let collection = db.collection("Batches");
   // let res = await collection.find({}).toArray();
    //console.log(res);
    return collection; // or `return result` if you want to return the client object
  }
  

///////////////////////////////////////////
// ReadData
// Used to connect with MongoDBServer -> Database -> Collection
//////////////////////////////////////////
/*
This function retrieves the reference to the "Batches" collection by calling getConnection().
Then, it uses the find() method to fetch all the documents from the collection and convert them into an array using toArray().
The fetched data is logged to the console.
*/

async function readData()
{
    
    var data = "";
     data = await getConnection();
    data = await data.find().toArray();
    console.log("Data from Marvellous Database is: ");
    console.log(data);
}

///////////////////////////////////////////
// deleteData
// Used to delete the data from database
//////////////////////////////////////////
/*
This function retrieves the reference to the "Batches" collection by calling getConnection().
It uses the deleteOne() method to delete a specific document from the collection based on a given condition (e.g., {"Batch": "PPA"}).
If the deletion is successful, it logs a success message; otherwise, it logs any error that occurs.
*/

async function deleteData()
{
    try {
    let data = await getConnection();
    let result = await data.deleteOne({"Batch":"PPA"});

    if(result.acknowledged)
    {
                console.log("Delete operation is perfomed successfully");
    }
} catch (error) {
    console.log(error);
  }
}

///////////////////////////////////////////
// insertData
// Used to insert the data from database
//////////////////////////////////////////
/*
This function retrieves the reference to the "Batches" collection by calling getConnection().
It uses the insertOne() method to insert a new document into the collection. The document contains key-value pairs for the "Batch" and "Fees" fields.
If the insertion is successful, it logs a success message; otherwise, it logs any error that occurs.
*/

async function insertData() {
    try {
      const data = await getConnection();
      const result = await data.insertOne({ "Batch": "Linux", "Fees": 25000 });
      if (result.acknowledged) {
        console.log("Insert operation is perfomed successfully");
      }
    } catch (err) {
      console.error(err);
    }
  }

  ///////////////////////////////////////////
// updateData
// Used to update the data from database
//////////////////////////////////////////
/*
This function retrieves the reference to the "Batches" collection by calling getConnection().
It uses the updateOne() method to update a specific document in the collection. In this case, it updates the document with Batch: 'PPA' and sets the value of the "Fees" field to 26000.
If the update is successful, it logs a success message; otherwise, it logs any error that occurs.
*/

async function updateData() 
{
    var data = "";
     data = await getConnection();

    let result = await data.updateOne( { Batch: 'PPA' },{ $set: { Fees: 26000 } });

    if (result.acknowledged) {
        console.log("Update operation is perfomed successfully");
    }
}


  
///////////////////////////////////////////
// main
// It should be considered as a entry fuction of node.js + express.js server
//////////////////////////////////////////
/*
main() function is called to start the execution of the application.
*/
function main()
{
   // updateData() ;
   insertData();
  // deleteData();
  //readData();
}

//Starter of the application
/*
When the code is executed, it establishes a connection to the MongoDB server, performs the specified database operations, and logs the results to the console.
*/
main();