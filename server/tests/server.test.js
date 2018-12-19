const expect = require('expect');
const request = require('supertest');

let {app} = require('./../server');
let {Todo} = require('./../models/todo');

beforeEach((done) => {
    Todo.deleteMany({}).then(() => done());
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

                Todo.find().then((todos) => {
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
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });

    });
});