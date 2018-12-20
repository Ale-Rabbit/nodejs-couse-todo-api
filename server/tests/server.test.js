const expect = require('expect');
const request = require('supertest');
let {ObjectID} = require('mongodb')

let {app} = require('./../server');
let {Todo} = require('./../models/todo');

const todos = [{
    _id:new ObjectID(),
    text:'Primeiro teste Todo'
},{
    _id:new ObjectID(),
    text:'Segundo teste Todo'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});


describe('POST /todos', () => {
    it('Deveria criar um novo Todo', (done) => {
        let text = 'Teste';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            }) 
            .end((err,resp) => {
                if (err){
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });


    it('Não deveria criar Todo com body inválido', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });

    describe('GET /todos', () => {
        it('Deveria funcionar o GET', (done) => {
            request(app)
                .get('/todos')
                .expect(200)
                .expect((res) => {
                    expect(res.body.todos.length).toBe(2)
                })
                .end(done);
        });
    });

    describe('GET /todos/:id', () => {
        it('Deveria retornar todo doc', (done) => {
            request(app)
                .get(`/todos/${todos[0]._id.toHexString()}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.todo.text).toBe(todos[0].text)
                })
                .end(done);
        });

        it('Deveria retornar erro 404 se todo não foi achado', (done) => {
            let hexId = new ObjectID().toHexString();

             request(app)
                 .get(`/todos/${hexId}`)
                 .expect(404)
                 .end(done);
        });

        it('Deveria retornar erro 404 para objetos não encontrados', (done) => {
            request(app)
                .get('/todos/123abc')
                .expect(404)
                .end(done);
            });
        });

});

describe('DELETE /todos/:id', () => {
    it('Deveria excluir um todo', (done) => {
        let hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err,res) => {
                if(err){
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('Deveria retorna4 um erro 404 se Todo não encontrado', (done) => {
        let hexId = new ObjectID().toHexString();

             request(app)
                 .delete(`/todos/${hexId}`)
                 .expect(404)
                 .end(done);

    });

    it('Deveria retornan um erro 404 se ObjectID for inválido', (done) => {
        request(app)
                .delete('/todos/123abc')
                .expect(404)
                .end(done);

    });
});
 