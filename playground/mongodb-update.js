// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Não foi possivel conectar no servidor MongoDB');       
    }
    console.log('Conectado no servidor MongoDB');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5c1977f2091af63c94803704')
    // }, {
    //     $set: {
    //         completed:false
    //     }
    // },{
    //     returnOriginal:false
    // }).then((result) => {
    //     console.log(result);
        
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5c193098a3249336e04e92b3')
    }, {
        $set: {
            name:'Alexandra'
        }
    },{
        returnOriginal:false
    }).then((result) => {
        console.log(result);
        
    });
    
   
});