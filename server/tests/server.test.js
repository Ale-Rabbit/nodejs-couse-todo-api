const expect = require('expect');
const request = require('supertest');

let {app} = require('./../server');
let {Todo} = require('./../models/todo');

const todos = [{
    text:'Primeiro teste Todo'
},{
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
    })
});