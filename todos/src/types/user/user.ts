

export interface UserResponse {
    success: boolean;
    error: string | null;
    data: UserData | null;
    token: string | null;
}

export interface UserData {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface UserRequest {
    name: string;
    email: string;
    password: string;
}