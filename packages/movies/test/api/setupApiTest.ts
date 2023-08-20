import { setupServer } from "msw/node";

const server = setupServer();

export const setupTest = () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
};

export default server;
