import axios from "axios";
import { setupServer } from "msw/node";

const server = setupServer();

export const interceptUrl = (url: string) => {
  return `${axios.defaults.baseURL}${url}`;
};

export const setupTest = () => {
  beforeAll(() => {
    axios.defaults.baseURL = "http://localhost/api";
    server.listen();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
};

export default server;
