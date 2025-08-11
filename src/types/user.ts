export interface UserRegisterRequest {
  name: string;
  email: string;
  password: string;
}   

export interface UserRegisterResponse {
    name: string;   
    email: string;
    id: number;
}