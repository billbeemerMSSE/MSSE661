const request = require("supertest");
// const shoot = require("../public/src/shoot-api.service");

const SHOOT_API_URL = "http://localhost:3000/api";

describe('JEST Test Suite', () => {
    it('My TRUE Test', () => {
        expect(true).toEqual(true);
    });
});

describe("Shoot Test Suite", () => {
    const user = {
        email: "beemerb@gmail.com",
        password: "password", 
    }
    let token = "";
    beforeAll(async() => {
        const response = await request(SHOOT_API_URL).post("/login").send(user);
        token = response.body.token;
        console.log("token %s", token)
    })
    it("return one shoot with Auth", async () => {
        const response = await request(SHOOT_API_URL).get("/shoot/1").set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });
});