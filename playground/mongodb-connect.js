// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Não foi possivel conectar no servidor MongoDB');       
    }
    console.log('Conectado no servidor MongoDB');
    const db = client.db('TodoApp');
    
    // db.collection('Todos').insertOne({
    //     text:'Algo para fazer',
    //     completed: false
    // }, (err,result) => {
    //     if(err){
    //         return console.log('Não foi possivel inserir todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name:'Alexandra',
    //     age: 21,
    //     location: 'Sapucaia do Sul'
    // }, (err,result) => {
    //     if(err){
    //         return console.log('Não foi possivel inserir todo', err);
    //     }

    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    client.close();
});