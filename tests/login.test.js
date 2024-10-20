// login.test.js
import { login } from "../src/js/api/auth/login.js";
import { save } from "../src/js/storage/save.js";

jest.mock("../src/js/storage/save.js", () => ({
  save: jest.fn(),
}));

global.fetch = jest.fn();

describe('login', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should store the token when provided with valid credentials', async () => {
    const mockProfile = { accessToken: 'mocked_token', name: 'Inge Brigt' };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfile,
    });

    const result = await login('test@example.com', 'password123');

    expect(save).toHaveBeenCalledWith('token', 'mocked_token');
    expect(save).toHaveBeenCalledWith('profile', { name: 'Inge Brigt' });

    expect(result).toEqual({ name: 'Inge Brigt' });
  });
});
