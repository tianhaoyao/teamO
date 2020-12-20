const {MongoClient} = require('mongodb');



async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://admin:aBdfjLt4Q9Hws9g@cache.t4kdx.mongodb.net/admin?retryWrites=true&w=majority";
 

    const client = new MongoClient(uri, { useUnifiedTopology: true });
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
        await insertSummoner(client, {test: "test"})
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    
};

async function insertSummoner(client, newSummoner){

    const result = await client.db("admin").collection("summoners").insertOne(newSummoner);

    console.log(`New listing created with the following id: ${result.insertedId}`);

}

async function getSummoner(client, newSummoner){

    const result = await client.db().collection("listingsAndReviews").insertOne(newListing);

    console.log(`New listing created with the following id: ${result.insertedId}`);

}