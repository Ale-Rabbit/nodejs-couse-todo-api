// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Não foi possivel conectar no servidor MongoDB');       
    }
    console.log('Conectado no servidor MongoDB');
    const db = client.db('TodoApp');
    
    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Commitar com GitHub'}).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text:'Commitar com GitHub'}).then((result) => {
    //     console.log(result);
    // })

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed:true}).then((result) => {
    //     console.log(result);   
    // });

    // db.collection('Users').deleteMany({name: 'Alexandra'});

    db.collection('Users').findOneAndDelete({_id: 123}).then((results) => {
        console.log(JSON.stringify(results,undefined,2));
    });


   
});