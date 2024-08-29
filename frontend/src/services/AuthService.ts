import { $api } from '../http';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
export default class AuthService {
    static async login(
        login: string,
        password: string
    ): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post<AuthResponse>('api/v1.0/auth/login', { login, password });
    }
    static async registration(
        login: string,
        email: string,
        fio: string,
        city: string,
        phoneNumber: string,
        password: string
    ): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post<AuthResponse>('api/v1.0/auth/registration', {
            login,
            email,
            fio,
            city,
            phoneNumber,
            password,
        });
    }
    static async logout(): Promise<void> {
        return $api.get('api/v1.0/auth/logout');
    }
}
