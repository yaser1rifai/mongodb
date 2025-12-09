const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

const connectionUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'proj-5';

mongoClient.connect(connectionUrl, (error, client) => {
    if (error) {
        return console.log('❌ Error connecting to MongoDB:', error);
    }
    console.log('✅ Connected to MongoDB');

    const db = client.db(dbName);
    const users = db.collection('users');

    // 1️⃣ Insert two documents using insertOne
    console.log("-----------------------------------------------")
    console.log("1- Insert two documents using insertOne")
    users.insertOne({ name: 'User1', age: 25 }, (err1, res1) => {
        if (err1) return console.log('Unable to insert User1');

        console.log('Inserted User1 with ID:', res1.insertedId);

        users.insertOne({ name: 'User2', age: 30 }, (err2, res2) => {
            if (err2) return console.log('Unable to insert User2');

            console.log('Inserted User2 with ID:', res2.insertedId);

            // 2️⃣ Insert ten documents using insertMany (5 with age = 27)
            console.log("-----------------------------------------------")
    console.log("2- Insert ten documents using insertMany (5 with age = 27)")
            const manyUsers = [
                { name: 'A1', age: 27 },
                { name: 'A2', age: 27 },
                { name: 'A3', age: 27 },
                { name: 'A4', age: 27 },
                { name: 'A5', age: 27 },
                { name: 'B1', age: 20 },
                { name: 'B2', age: 22 },
                { name: 'B3', age: 24 },
                { name: 'B4', age: 35 },
                { name: 'B5', age: 40 }
            ];

            users.insertMany(manyUsers, (err3, res3) => {
                if (err3) return console.log('Unable to insert many users');

                console.log(`Inserted ${res3.insertedCount} users using insertMany`);

                // 3️⃣ Find one document by _id (use User1's _id)
                console.log("-----------------------------------------------")
    console.log("3- Find one document by _id (use User1's _id)")
                
                users.findOne({ _id: res1.insertedId }, (err4, foundUser) => {
                    if (err4) return console.log('Error finding user by _id');

                    console.log('\nRetrieved user by _id:');
                    console.log(foundUser);

                    // 4️⃣ Find all documents where age = 27
                    console.log("-----------------------------------------------")
    console.log("4- Find all documents where age = 27")
                    users.find({ age: 27 }).limit(10).toArray((err5, users27) => {
                        if (err5) return console.log('Error finding users with age 27');

                        console.log('\nUsers with age = 27 (up to 10):');
                        console.log(users27);

                        // Count all users with age = 27
                        users.countDocuments({ age: 27 }, (err6, count) => {
                            if (err6) return console.log('Error counting users with age 27');

                            console.log('\nTotal users with age = 27:', count);

                            client.close();
                            console.log('🔌 Connection closed');
                        });
                    });
                });
            });
        });
    });
});
