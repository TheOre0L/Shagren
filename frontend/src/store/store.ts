import axios from 'axios';
import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { API_URL } from '../http';
import { AuthResponse } from '../models/response/AuthResponse';
import { UserDTO } from '../models/response/UserDTO';
import AuthService from '../services/AuthService';

export default class Store {
    static login(login: string, password: string): void {
        throw new Error('Method not implemented.');
    }
    static registration(
        login: string,
        email: string,
        fio: string,
        city: string,
        phoneNumber: string,
        password: string
    ): import('react').MouseEventHandler<HTMLAnchorElement> | undefined {
        throw new Error('Method not implemented.');
    }
    public user = {} as UserDTO;
    public author = {} as UserDTO;
    public allPosts: any = [];
    public error: string = '';
    public is_error: boolean = false;
    public isAuth: boolean = false;
    public isActiv: boolean = false;
    public isLoading: boolean = false;
    public is_message: boolean = false;
    public message: string = '';
    public color_msg: string = '';
    constructor() {
        makeAutoObservable(this);
    }
    setActivated(activated: boolean) {
        this.isActiv = activated;
    }
    setAuth(bool: boolean) {
        this.isAuth = bool;
    }
    async setUser(userMe: UserDTO) {
        this.user = userMe;
    }
    setLoading(bool: boolean) {
        this.isLoading = bool;
    }
    setError(errors: string, isErr: boolean) {
        this.is_error = isErr;
        this.error = errors;
    }
    setMsg(isMsg: boolean, msg: string, color: string) {
        this.is_message = isMsg;
        this.message = msg;
        this.color_msg = color;
    }
    async login(login: string, password: string) {
        try {
            const response = await AuthService.login(login, password);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('userId', `${response.data.user.id}`);
            await this.setUser(response.data.user);
            this.setAuth(true);
            this.setMsg(true, 'Успешная авторизация!', 'success');
        } catch (e: any) {
            console.error(e.response.data.message);
            this.setError(e.response.data.message, true);
        }
    }
    async registration(
        login: string,
        email: string,
        fio: string,
        city: string,
        phoneNumber: string,
        password: string
    ) {
        try {
            const response = await AuthService.registration(
                login,
                email,
                fio,
                city,
                phoneNumber,
                password
            );
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('userId', `${response.data.user.id}`);
            this.setAuth(true);
            this.setUser(response.data.user);
            this.setMsg(true, 'Успешная регистрация!', 'success');
        } catch (e: any) {
            console.error(e.response.data.message);
            this.setError(e.response.data.message, true);
        }
    }

    async logout() {
        this.setLoading(true);
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            this.setAuth(false);
            this.setUser({} as UserDTO);
        } catch (e: any) {
            console.error(e.response.data.message);
            this.setError(e.response.data.message, true);
        }finally {
            this.setLoading(false);
            await new Promise(resolve => setTimeout(resolve, 100)); // Придаем системе время на "успокоение"
            window.location.replace("/");
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(
                `${API_URL}/api/v1.0/auth/refresh`,
                { withCredentials: true }
            );
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('userId', `${response.data.user.id}`);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.error(e.response.data.message);
            this.setError(e.response.data.message, true);
        } finally {
            this.setLoading(false);
        }
    }
}