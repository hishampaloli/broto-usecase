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
  createStudentProfile: (
    profileData: StudentProfileAttrs,
    session: TransactionClientType
  ) => Promise<any>;
  getUserByEmail: (email: string) => Promise<any>;
  blockUserByEmail: (email: string, status: boolean) => Promise<void>;
  editUserById: (userId: string, data: object) => Promise<void>;
  deleteUserByEmail: (email: string) => Promise<void>;
  getAllCordinators: () => Promise<any[]>;
  getAllStudents: () => Promise<any[]>;
  getAllReviewers: () => Promise<any[]>;
  editStudentProfile: (userId: string, data: object) => Promise<void>;
}

export interface NotificationRepository {
  createNotification: (data: NotificationAttrs) => Promise<void>;
  readNotification: (notificationId: string, userId: string) => Promise<any>;
}

export interface RequestLogRepository {
  AddRequestLogs: (data: RequestLogAttrs) => Promise<void>;
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

export interface NotificationAttrs {
  userId: string;
  message: string;
}

export interface RequestLogAttrs {
  method: string;
  path: string;
  ipAddress: string;
  userAgent: string;
}
export interface CustomRequestWithUser extends Request {
  user?: any;
}
