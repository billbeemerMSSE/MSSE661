const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjgwMzg2NzQ5fQ.GBuCRW_6JOF9Uh_77mHKx5GY9hR-rIk-EyHzCKGwPNU";
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjgwMzgwNjU0fQ.l8WeRvrTxrnrheRI_WsI7bnJuhtUqUxI5PQuPDRWKZQ";
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjgwMzg1MTMyfQ.u4Lp3KVag3fdueO_tCVRTIbxTbAo-I2BEw8ccQ56eqQ";


describe("User API Service", () => {
    it("should GET user credentials", (done) => {
        const expected = [
            {
                user_id: 5,
                username: "xcvbxcvb",
                email: "xcvbxcvb",
            }
        ];
        chai
            .request("http://localhost:3000")
            .get("/api/user/me")
            .set("auth-token", token)
            // .set("Authorization", `Bearer ${token}`)
            .end((error, response) => {
                expect(response.body).to.be.eql(expected);
                done();
        });
    });

    // it("should PUT updated credentials", (done) => {
    //     const updateUser = {
    //         username: "usernameUpdate",
    //         email: "usernameUpdate@example.com",
    //         password: "xcvbxcvb"
    //     };
    //     const expected = { message: "'Nothing to update..." };

    //     chai
    //         .request("http://localhost:3000")
    //         .put("/api/user/me/update")
    //         // .set("auth-token", token)
    //     // .set("Authorization", `Bearer ${token}`)
    //         .send(updateUser)
    //         .end((error, response) => {
    //             expect(response.body).to.eql(expected);
    //             done();
    //         });
    //     });



    // it('should PUT updated credentials for a logged in user', (done) => {
    //     const updatedUser = {
    //       username: 'admin2',
    //       password: 'newPassword',
    //       email: 'admin@example.com',
    //     };
    //     const expected = { msg: 'Nothing to update...' };
    
    //     chai
    //       .request('http://localhost:3000')
    //       .put('/api/user/me/update')
    //       .set("Authorization", `Bearer ${token}`)
    //       .send(updatedUser)
    //       .end((error, response) => {
    //         expect(response.body).to.be.eql(expected);
    //         done();
    //       });
    //   });

    // it("should PUT updated credentials", (done) => {
    //     const updateUser = {
    //         username: "usernameUpdate",
    //         email: "usernameUpdate@example.com",
    //         password: "passwordUpdate"
    //     };
    //     const expected = { message: "User Update Successful!" };

    //     chai
    //     .request("http://localhost:3000")
    //     .put("/api/user/me/update")
    //     .set("auth-token", token)
    //     // .set("Authorization", `Bearer ${token}`)
    //     .send(updateUser)
    //     .end((error, response) => {
    //         expect(response.body).to.eql(expected);
    //         done();
    //     });
    // });

//     it("should PUT updated credentials", (done) => {
//         const updateUser = {
//             username: "usernameUpdate",
//             email: "usernameUpdate@example.com",
//             password: "passwordUpdate"
//         };
//         const expected = { message: "UPDATE" };

//         chai
//         .request("http://localhost:3000")
//         .put("/api/user/me/update")
//         .set("Authorization", `Bearer ${token}`)
//         .send(updateUser)
//         .end((error, response) => {
//             expect(response.body).to.eql(expected);
//             done();
//         });
//     });



});