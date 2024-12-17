export type AuthCredentials = {
  username: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

export type Todo = {
  _id: string;
  title: string;
  completed?: boolean;
};