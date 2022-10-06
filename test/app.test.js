const request = require('supertest');
const app = require("../server.js");
const fs = require("fs");
const filePath = "./data.json"

const getEntryData = () => {
    const jsonData = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(jsonData)    
}

const entries = getEntryData()

describe("API server connection", () => {
    let api;

    beforeAll(() => {
        api = app.listen(5000, () => {
            console.log("Example app listening on port 5000")
        })
    })

    afterAll((done) => {
        console.log("Gracefully stopping test server");
        api.close(done);
    })

    it("Returns 200 status code and 'Hello' response to get request made to / route", (done) => {
        request(api).get("/").expect("Hello").expect(200, done);
    })

})

describe("Get Requests", () => {
    let api;

    beforeAll(() => {
        api = app.listen(5000);
    })

    afterAll((done) => {
        api.close(done);
    })

    it("Returns all entries on /entries route", (done) => {
        request(api).get("/entries").expect(200, done)
    })

    it("Returns 200 status and the specified entry on get request to /entries/:id route", (done) => {
        request(api).get("/entries/0").expect(200)
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

    it("Returns 404 status on get request to /entries/:id route where :id does not exist", (done) => {
        request(api).get("/entries/99").expect(404)
        .expect(404, done)
    })

})

describe("Post Requests", () => {
    let api;

    beforeAll(() => {
        api = app.listen(5000);
    })

    afterAll((done) => {
        api.close(done);
    })

    it("Returns 201 status on post request to /entries route, and returns the new entry", (done) => {
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
        request(api).post("/entries")
                    .send(testEntry)
                    .set("Accept", /application\/json/)
                    .expect(201).expect({ ...testEntry, id: entries[entries.length - 1].id + 1}, done)
    })

    it("Returns 404 status on get request to /entries/:id route where :id does not exist", (done) => {
        request(api).get("/entries/99").expect(404)
        .expect(404, done)
    })

})

describe("Delete Requests", () => {
    let api;

    beforeAll(() => {
        api = app.listen(5000)
    })

    afterAll((done) => {
        api.close(done); // TypeError: api.close is not a function
    })

    it("Returns 404 status on delete request to /entries/:id/delete route", async () => {
      await request(api).delete("/entries/3/delete").expect(404);
      const newDbList = await request(api).get("/entries");
      expect(newDbList.body.length).toBe(entries.length -1);
    })

    it("Returns 404 status on delete request to /entries/:id/delete route where :id does not exist", (done) => {
        request(api).delete("/-1/delete").expect(404);
      })

})

describe("Comment Patch Requests", () => {
    let api;

    beforeAll(() => {
        api = app.listen(5000);
    })

    afterAll((done) => {
        api.close(done);
    })

    let testComment = {
        comment: "test"
    };

    it("responds to a patch /:id/comments with a status code of 200", (done) => {
        request(api)
            .patch("/2/comments")
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

    it(" to a patch /entries/:id/comments with a status code of 200", (done) => {
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

    it("Returns 404 status on get request to /entries/:id/comments route where :id does not exist", (done) => {
        request(api).get("/-1/comments").expect(404)
        .expect(404, done)
    })

})

describe("Reaction Patch Requests", () => {
    let api;

    beforeAll(() => {
        api = app.listen(5000);
    })

    afterAll((done) => {
        api.close(done);
    })

    let testReaction = {
        reaction: "smiley"
    };

    it("Returns 200 status on patch request to /:id/reaction route", (done) => {
        request(api)
            .patch("/1/reaction")
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

    it("Returns 404 status an error when trying to a patch request to a nonexistent entry's reaction count", (done) => {
        request(api)
            .patch("/-1/reaction")
            .send(testReaction)
            .expect(404, done)
    })

})

describe("GIF Patch Requests", () => {
    let api;

    beforeAll(() => {
        api = app.listen(5000);
    })

    afterAll((done) => {
        api.close(done);
    })

    let testGif = {
        gif: "test"
    };

    it("Returns 200 status to patch request to /:id/gif route", (done) => {
        request(api)
            .patch("/0/gif")
            .send(testGif)
            .expect(200)
            .expect({
                "id": 4,
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

    it("Returns 404 status on get request to /:id/gif route where :id does not exist", (done) => {
        request(api).get("/-1/gif").expect(404)
        .expect(404, done)
    })

})
