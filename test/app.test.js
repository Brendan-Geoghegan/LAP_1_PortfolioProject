const request = require('supertest');
const app = require("../server.js");
const fs = require("fs");
const filePath = "./data.json"
const getEntryData = () => {
    const jsonData = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(jsonData)    
}
const entries = getEntryData()
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
        .expect([{id: 0,
        entry: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos voluptatibus fuga harum quibusdam, culpa dolorem odio id omnis excepturi. Aspernatur eligendi, unde facere impedit iusto possimus tempora placeat doloremque dolores.",
        comments: [
            null,
            "sad"
        ],
        reactions: {
            smiley: 1202,
            sad: 20,
            like: 200
        },
        gif: ""
      }], done)
    })

    it('it return status 201 to post request to /entries and return the new entry', (done) => {
        const testEntry = {
            "entry": "test entry",
            "comments": ["new comment"],
            "reactions": {
              "smiley": 2,
              "sad": 20,
              "like": 5
            },
            "gif": "url"
          }
        request(api).post('/entries')
                    .send(testEntry)
                    .set('Accept', /application\/json/)
                    .expect(201).expect({ ...testEntry, id: entries[entries.length - 1].id + 1}, done)
    })

    let testReaction = {
        reaction: "smiley"
    };

    it("responds to a patch /:id/reaction with a status code of 200", (done) => {
        request(api)
            .patch("/entries/1/reaction")
            .send(testReaction)
            .expect(200)
            .expect({
                id: 1,
                entry: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos voluptatibus fuga harum quibusdam, culpa dolorem odio id omnis excepturi. Aspernatur eligendi, unde facere impedit iusto possimus tempora placeat doloremque dolores.",
                comments: [],
                reactions: {
                    smiley: 1213,
                    sad: 12,
                    like: 200
                },
                gif: ""
            }, done)
    })


    let testComment = {
        comment: "test"
    };

    it("responds to a patch /:id/comments with a status code of 200", (done) => {
        request(api)
            .patch("/entries/2/comments")
            .send(testComment)
            .expect(201)
            .expect({
                "id": 2,
                "entry": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos voluptatibus fuga harum quibusdam, culpa dolorem odio id omnis excepturi. Aspernatur eligendi, unde facere impedit iusto possimus tempora placeat doloremque dolores.",
                "comments": [
                    "test"
                ],
                "reactions": {
                    "smiley": 1200,
                    "sad": 11,
                    "like": 200
                },
                "gif": ""
            }, done)
    })

    let testGif = {
        gif: "test"
    };

    it("responds to a patch /:id/gif with a status code of 200", (done) => {
        request(api)
            .patch("/entries/3/gif")
            .send(testGif)
            .expect(200)
            .expect({
                "id": 3,
                "entry": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos voluptatibus fuga harum quibusdam, culpa dolorem odio id omnis excepturi. Aspernatur eligendi, unde facere impedit iusto possimus tempora placeat doloremque dolores.",
                "comments": [],
                "reactions": {
                    "smiley": 1200,
                    "sad": 11,
                    "like": 200
                },
                "gif": "test"
            }, done)
    })

    it.only('returns an error when retrieving an nonexistant entry', (done) => {
        request(api).get('/entries/-1').expect(404)
        .expect("item not found", done)
    })

})
