import axios from 'axios';
import { createBrowserHistory } from "history";

export const USER_LOGIN = 'userLogin';
export const USER_REGISTER = 'userRegister'
export const ACCESSTOKEN = 'accessToken';
export const history = createBrowserHistory();


export const settings = {
    setStorageJson: (name: string, data: any): void => {
        data = JSON.stringify(data)
        localStorage.setItem(name, data)
    },
    setStorage: (name: string, data: string): void => {
        localStorage.setItem(name, data)
    },
    getStorageJson: (name: string): any | undefined => {
        if (localStorage.getItem(name)) {
            const dataStore: string | undefined | null = localStorage.getItem(name)
            if (typeof dataStore == 'string') {
                const data = JSON.parse(dataStore)
                return data
            }
            return undefined
        }
        return; 
    },
    getStore: (name: string): string | null | undefined => {
        if (localStorage.getItem(name)) {
            const data: string | null | undefined = localStorage.getItem(name)
            return data
        }
        return;
    },
    setCookieJson: (name: string, value: any, days: number): void => {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        value = JSON.stringify(value);
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookieJson: (name: string): any => {
        //Hàm lấy cookie
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length, c.length));
        }
        return null;
    },
    setCookie: (name: string, value: any, days: number): void => { 
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookie: (name: string): string | null => {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    eraseCookie: (name: string): void => {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

export const TOKEN_CYBERSOFT: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMyIsIkhldEhhblN0cmluZyI6IjA4LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MDkxMjAwMDAwMCIsIm5iZiI6MTY1Mjg5MzIwMCwiZXhwIjoxNjgxMDU5NjAwfQ.YWfEjzumDyUA3XRRvMIkDiD1cOGgRKyAAeOTP3qTT2c'

export const http = axios.create({
    baseURL: 'https://elearningnew.cybersoft.edu.vn', 
    timeout: 30000 
});


http.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: 'Bearer ' + settings.getStore(ACCESSTOKEN),
    }

    return config;

}, err => {
    console.log(err);
    return Promise.reject(err);
})




http.interceptors.response.use((response) => {
    return response
}, (error) => {
    console.log(error)
    if (error.response?.status === 401) {
        //window.location.href = '/login' //Chuyển hướng nhưng reload lại page => có thể mất dữ liệu từ redux
        //Mục đích: chuyển hướng trang mà không cần reload lại page
        // history.push('/login')
        window.location.href = '/login'
    }

    // if (error.response?.data === "Tài khoản hoặc mật khẩu không đúng!") {
    //     alert("Tài khoản hoặc mật khẩu không đúng!")
    // }

    // if (error.response?.data === "Email đã tồn tại!" || error.response?.status === "Tài khoản đã tồn tại!") {
    //     alert("Đăng ký thất bại!")
    // }

    // if (error.response?.status === 400 || error.response?.status === 404) {
    //     history.push('/')
    // }
    
    return Promise.reject(error)
})
