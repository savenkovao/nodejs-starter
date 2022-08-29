import { afterAll, beforeAll, describe, expect, it, vitest, vi, beforeEach, afterEach } from "vitest";
import server from "../src/app";
import jwtService from "../src/services/jwt-service";
import userService from "../src/services/user-service";

vi.mock('../src/services/user-service');

beforeAll(async () => {
    await server.ready();
});

afterAll(async () => {
    await server.close();
});

describe("Test server health", () => {
    it("serve GET /", async () => {
      const res = await server.inject("/");
      expect(res.statusCode).toEqual(200);
      expect(res.json()).toEqual({ message: "Server is alive" })
    })
})

describe("Test authorize", () => {
    const loginObj = {
        username:"test",
        password: "test"
    };

    beforeEach(() => {
        vi.resetAllMocks();
    });
    afterEach(() => {
        vi.restoreAllMocks()
    });
    
    it("login POST /login", async () => {
        const spy = vi.spyOn(userService, "getUserByCred");
        const res = await server
                .inject()
                .post("/login")
                .body(loginObj);

        expect(spy.getMockName()).toEqual("getUserByCred");
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(loginObj)
        expect(res.statusCode).toEqual(500);
    });

    it("reutrns token /login", async () => {
        const spy = vi.spyOn(userService, "getUserByCred").mockImplementation(async () => ({
            token: "token",
            message: "message"
        }));

        const res = await server
                .inject()
                .post("./login")
                .body(loginObj);

        expect(spy.getMockName()).toEqual("getUserByCred");
        expect(res.statusCode).toEqual(200);
        expect(JSON.parse(res.body)).toHaveProperty("token");
    });

    it("return failed aith /login", async () => {
        const spy = vi.spyOn(userService, "getUserByCred").mockImplementation(async () => ({
            message: "failed message"
        }));

        const res = await server
                .inject()
                .post("./login")
                .body(loginObj);

        expect(spy.getMockName()).toEqual("getUserByCred");
        expect(res.statusCode).toEqual(500);
        
        const body = JSON.parse(res.body);
        expect(body).toHaveProperty("message");
        expect(body["message"]).toEqual("Authentication failed");
    });
});


describe("Test user controller", () => {
    const createObj = {
        username: "username",
        password: "password"
    };

    const headers = {
        authorization: `Bearer ${jwtService.genToken(1)}`
    }

    beforeEach(() => {
        vi.resetAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks()
    });

    it("returns unauthorized with empty token", async () => {
        const res = await server
                .inject()
                .post("/users")
                .body(createObj);

        expect(res.statusCode).toEqual(401);
    });

    it("return unauthorized with wrong token", async () => {
        const res = await server
                .inject()
                .headers({
                    authorization: 'Bearer testtoken'
                })
                .post("/users")
                .body(createObj);

        expect(res.statusCode).toEqual(401);
    })

    it("create user POST /users", async () => {
        const spy = vi.spyOn(userService, "createUser");
        const res = await server
                .inject()
                .headers(headers)
                .post("/users")
                .body(createObj);

        expect(spy.getMockName()).toEqual("createUser");
        expect(spy).toHaveBeenCalledOnce();
        expect(spy).toHaveBeenCalledWith(createObj);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual("Kafka message sent");
    });

    it("error handling POST /users", async () => {
        const spy = vi.spyOn(userService, "createUser").mockImplementation(() => {
            throw new Error("Test message")
        });

        const res = await server
                .inject()
                .headers(headers)
                .post("/users")
                .body(createObj);

        expect(spy).toHaveBeenCalledOnce();
        expect(spy).toHaveBeenCalledWith(createObj);
        
        expect(res.statusCode).toEqual(500);
        expect(JSON.parse(res.body).msg).toEqual("Server error");
    });

    it("get users with empty token GET /users", async () => {
        const res = await server
                .inject()
                .get("/users");

        expect(res.statusCode).toEqual(401);
    });

    it("get users GET /users", async () => {
        const spy = vi.spyOn(userService, "getUsers");
        const res = await server
                .inject()
                .headers(headers)
                .get("/users");

        expect(spy.getMockName()).toEqual("getUsers");
        expect(spy).toHaveBeenCalledOnce();
        expect(res.statusCode).toEqual(200);
    });

    it("get users GET /users", async () => {
        const spy = vi.spyOn(userService, "getUsers").mockImplementation(async () => {
            return [{username: "user", id: 1}]
        });

        const res = await server
                .inject()
                .headers(headers)
                .get("/users");

        expect(spy.getMockName()).toEqual("getUsers");
        expect(spy).toHaveBeenCalledOnce();
        
        expect(JSON.parse(res.body)).toEqual([{username: "user", id: 1}]);
        expect(res.statusCode).toEqual(200);
    });

    it("get users GET /users", async () => {
        const errorMessage: string = "Something went wrong";
        const spy = vi.spyOn(userService, "getUsers").mockImplementation(async () => {
            throw new Error(errorMessage);
        });

        const res = await server
                .inject()
                .headers(headers)
                .get("/users");

        expect(spy.getMockName()).toEqual("getUsers");
        expect(spy).toHaveBeenCalledOnce();
        
        expect(JSON.parse(res.body).message).toEqual(errorMessage);
        expect(res.statusCode).toEqual(500);
    });
})