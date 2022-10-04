const request = require('supertest');
const app = require("../server.js");

describe('API server', () => {
    let api;

    beforeAll(() => {
        api = app.listen(5000, () => {
            console.log(`Example app listening on port 5000`)
        })
    })

    afterAll((done) => {
        console.log("gracefully stopping test server");
        api.close(done);
    })

    it('responds to get / with a status of 200 and says hello', (done) => {
        request(api).get('/').expect("Hello").expect(200, done);
    })

    it('retrieves all entries', (done) => {
        request(api).get('/entries').expect(200, done)
    })

    it('retrieves a specific entry', (done) => {
        request(api).get('/entries/0').expect(200)
        .expect({
            id: 0,
            entry: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos voluptatibus fuga harum quibusdam, culpa dolorem odio id omnis excepturi. Aspernatur eligendi, unde facere impedit iusto possimus tempora placeat doloremque dolores.",
            comments: [],
            reactions: {
                smiley: 1202,
                sad: 13,
                like: 200
            },
            gif: ""
        }, done)
    })
})
