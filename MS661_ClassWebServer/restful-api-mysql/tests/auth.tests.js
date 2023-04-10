const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjgwMzg2NzQ5fQ.GBuCRW_6JOF9Uh_77mHKx5GY9hR-rIk-EyHzCKGwPNU";

describe("Auth API Service", () => {
    it.skip("should POST a single user", (done) => {
        const newUser = {
            username: "testUser",
            email: "testUser@example.com",
            password: "password",
        };
        const expected = { message: "Registration Successful!" };

        chai
            .request("http://localhost:3000")
            .post("/api/auth/register")
            .send(newUser)
            .end((error, response) => {
                expect(response.body).to.eql(expected);
                done();
        });
    });
    
    it("should NOT POST a new if user exists", (done) => {
        const checkUser = {
            username: "testUser",
            email: "testUser@example.com",
            password: "password",
        };
        const expected = { message: "Register User Failed." };

        chai
            .request("http://localhost:3000")
            .post("/api/auth/register")
            .send(checkUser)
            .end((error, response) => {
                expect(response.body).to.eql(expected);
                done();
        });
    });

    it("should POST a login if user exists", (done) => {
        const loginUser = {
            username: "testUser",
            email: "testUser@example.com",
            password: "password",
        };

        chai
            .request("http://localhost:3000")
            .post("/api/auth/login")
            .send(loginUser)
            .end((error, response) => {
                expect(response.body.auth).to.be.true;
                expect(response.body.expires_in).to.eql(86400);
                expect(response.body.access_token).to.be.a("string");
                expect(response.body.refresh_token).to.be.a("string");
                done();
        });
    });

});

