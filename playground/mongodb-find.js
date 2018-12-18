// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Não foi possivel conectar no servidor MongoDB');       
    }
    console.log('Conectado no servidor MongoDB');
    const db = client.db('TodoApp');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5c1935a7841354f6fec05410')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined,2));      
    // }, (err) => {
    //     console.log('Não foi possivel conectar com Todos', err);
    // });


    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);      
    // }, (err) => {
    //     console.log('Não foi possivel conectar com Todos', err);
    // });

    db.collection('Users').find({name:'Alexandra'}).count().then((count) => {
        console.log(`Todos count: ${count}`);      
    }, (err) => {
        console.log('Não foi possivel conectar com Todos', err);
    });

    //client.close();c
});