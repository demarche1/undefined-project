const LoginRouter = require("../login-router");

const {
  MissingParamError,
  ServerError,
  UnauthorizedError,
} = require("../../helpers/errors");

describe("LoginRouter", () => {
  test("should return 500 if no httpResquest", async () => {
    const loginRouter = new LoginRouter({});
    const httpResquest = null;
    const response = await loginRouter.route(httpResquest);
    expect(response.status).toBe(500);
    expect(response.body).toEqual(new ServerError());
  });

  test("should return 500 if no httpResquest body", async () => {
    const loginRouter = new LoginRouter();
    const httpResquest = null;
    const response = await loginRouter.route(httpResquest);
    expect(response.status).toBe(500);
    expect(response.body).toEqual(new ServerError());
  });

  test("should return 400 if no email provided", async () => {
    const loginRouter = new LoginRouter();
    const httpResquest = {
      body: {
        password: "any_password",
      },
    };
    const response = await loginRouter.route(httpResquest);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(new MissingParamError("email"));
  });

  test("should return 400 if no password provided", async () => {
    const loginRouter = new LoginRouter();
    const httpResquest = {
      body: {
        email: "any_email@email.com",
      },
    };
    const response = await loginRouter.route(httpResquest);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(new MissingParamError("password"));
  });

  test("should return 401 if not return accessToken", async () => {
    const authService = {
      auth({ email, password }) {
        return null;
      },
    };

    const loginRouter = new LoginRouter(authService);
    const httpResquest = {
      body: {
        email: "any_email@email.com",
        password: "any_password",
      },
    };
    const response = await loginRouter.route(httpResquest);
    expect(response.status).toBe(401);
    expect(response.body).toEqual(new UnauthorizedError());
  });

  test("should return 200 if return accessToken", async () => {
    const authService = {
      auth({ email, password }) {
        return "any_token";
      },
    };

    const loginRouter = new LoginRouter(authService);
    const httpResquest = {
      body: {
        email: "any_email@email.com",
        password: "any_password",
      },
    };
    const response = await loginRouter.route(httpResquest);
    expect(response.status).toBe(200);
    expect(response.body.accessToken).toEqual("any_token");
  });

  test("should status 500 if authService not be provided", async () => {
    const loginRouter = new LoginRouter();
    const httpResquest = {
      body: {
        email: "any_email@email.com",
        password: "any_password",
      },
    };
    const response = await loginRouter.route(httpResquest);
    expect(response.status).toBe(500);
    expect(response.body).toEqual(new ServerError());
  });

  test("should status 500 if authService throws", async () => {
    const authService = {};

    const loginRouter = new LoginRouter(authService);
    const httpResquest = {
      body: {
        email: "any_email@email.com",
        password: "any_password",
      },
    };
    const response = await loginRouter.route(httpResquest);
    expect(response.status).toBe(500);
    expect(response.body).toEqual(new ServerError());
  });
});
