// const chai = require("chai");
// const expect = chai.expect;
// const chaiHttp = require("chai-http");

// chai.use(chaiHttp);

// // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjgwMzg2NzQ5fQ.GBuCRW_6JOF9Uh_77mHKx5GY9hR-rIk-EyHzCKGwPNU";

// describe("Shoot API Service", () => {
//     it("should GET all shoots", (done) => {
//         chai
//             .request("http://localhost:3000")
//             .get("/api/shoot")
//             .end((error, response) => {
//                 expect(response.status).to.be.eql(200);
//                 expect(response.body).to.be.a("array");
//                 expect(response.body.length).to.not.be.eql(0);
//                 done();
//             });
//     });

//     it("should GET a single shoot", (done) => {
//         const expected = [
//             {
//                 shoot_id: 1,
//                 client: "Bend",
//                 cater: 20,
//             },
//         ];
//         chai
//             .request("http://localhost:3000")
//             .get("/api/shoot/1")
//             .end((error, response) => {
//                 expect(response.status).to.be.eql(200);
//                 expect(response.body).to.be.a("array");
//                 expect(response.body.length).to.not.be.eql(0);
//                 expect(response.body).to.be.eql(expected);
//                 done();
//         });
//     });

//     it.skip("should POST a single shoot", (done) => {
//         const newShoot = {
//             client: "TestClient",
//             cater: 0,
//         };
//         const expected = { message: "New Shoot added successfully!" };

//         chai
//             .request("http://localhost:3000")
//             .post("/api/shoot")
//             .send(newShoot)
//             .end((error, response) => {
//                 expect(response.status).to.be.eql(200);
//                 expect(response.body).to.be.eql(expected);
//                 done();
//         });
//     });

// });
