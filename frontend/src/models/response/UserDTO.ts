export interface UserDTO {
    id: bigint;
    login: string;
    email: string;
    fio: string;
    city: string;
    phoneNumber: string;
    password: string;
    view: boolean;
    role: number;
}