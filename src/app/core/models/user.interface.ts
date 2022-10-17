export interface User {
    email: string;
    password: string;
}

export interface UserResponse {
    token: string;
    bearer: string;
    userName: string;
    authorities: Array<any>;
}