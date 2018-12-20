const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

//Todo.findOneAndRemove()
//Todo.findByIdAndRemove();

Todo.findOneAndRemove({_id: ''}).then((todo) => {
    
})

Todo.findByIdAndRemove('5c1b8ad85651e98d1e2c3c73', (todo) => {
    console.log(todo);
});