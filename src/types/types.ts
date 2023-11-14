import { TransactionClientType } from "../config/TransactionService";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  timestamp: number;
  ip?: string;
  method: string;
  url: string;
  headers: Record<string, string>;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: number;
    message: string;
    stack?: string;
  };
  timestamp: number;
  ip?: string;
  method: string;
  url: string;
  headers: Record<string, string>;
}

export interface UserRepository {
  createUser: (user: UserAttrs, session: TransactionClientType) => Promise<any>;
  createStudentProfile: (profileData: StudentProfileAttrs,session: TransactionClientType) => Promise<any>;
}

export interface UserAttrs {
  role: string;
  name: string;
  email: string;
  password: string;
  phone: number;
  isBlocked?: boolean;
}

export interface StudentProfileAttrs {
  userId: string;
  batch: string;
}
