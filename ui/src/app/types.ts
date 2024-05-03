export interface User {
  id?: number;
  username?: string;
  email: string;
  password?: string;
}

export interface ErrorType {
  data: {
    errors: [];
    status: number;
  };
}
