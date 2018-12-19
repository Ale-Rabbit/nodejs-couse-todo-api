const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//let id = '5c1a390725d3632ab7805e98';

// if(!ObjectID.isValid(id)) {
//     console.log('ID inválido');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos',todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo ',todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('Id não encontrado');
//     }
//     console.log('Todo por ID ',todo);
// }).catch((e) => console.log());

User.findById('5c1a390725d3632ab7805e98').then((user) => {
    if(!user) {
        return console.log('Usuário não encontrado');
    }

    console.log(JSON.stringify(user, undefined,2));
    
}, (e) => {
    console.log(e);
    
}).catch((e) => console.log());