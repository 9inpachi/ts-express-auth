export interface User {
  email: string;
  username: string;
  fullName: string;
  password: string;
}

export const sampleUser: User = {
  email: "test@test.com",
  username: "test",
  fullName: "Test User",
  password: "test-password",
};
