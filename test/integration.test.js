const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const app = require("../app")

describe('/messages - POST', () => {
    it('Send a message', (done) => {
        chai
            .request(app)
            .post('/api/messages')
            .type('form')
            .send({
                'destination': `Arturo`,
                'message': `this is a message for Arturo`
            })
            .end((err, res) => {
                assert.equal(res.statusCode, 200)
                done();
            });
    });
});

