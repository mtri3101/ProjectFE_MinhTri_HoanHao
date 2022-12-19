import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DispatchType } from '../ConfigStore';
import { http, USER_LOGIN, settings, ACCESSTOKEN, USER_REGISTER } from '../../Utils/Config';

export interface UserLogin {
  taiKhoan: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  hoTen: string;
  accessToken: string;
}
export interface UserProfile {
  chiTietKhoaHocGhiDanh: any[];
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
}
export interface UserProfileUpdate {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDt: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
  biDanh: null;
  maLoaiNguoiDungNavigation: null;
  hocVienKhoaHoc: any[];
  khoaHoc: any[];
}
export interface UserRegister {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  email: string;
}

export interface UserState {
  userLogin: UserLogin[],
  userProfile: UserProfile | any,
  userProfileUpdate: UserProfileUpdate[],
  userRegister: UserRegister[],
  courseRegister: {}
}

const initialState: UserState = {
  userLogin: settings.getStorageJson(USER_LOGIN) ? settings.getStorageJson(USER_LOGIN) : [],
  userProfile: {
    chiTietKhoaHocGhiDanh: null,
    taiKhoan: null,
    hoTen: null,
    soDT: null,
    maLoaiNguoiDung: null,
    maNhom: null,
    email: null,
  },
  userProfileUpdate: [],
  userRegister: settings.getStorageJson(USER_REGISTER) ? settings.getStorageJson(USER_REGISTER) : [],
  courseRegister: {}
}

const UserReducer = createSlice({
  name: 'UserReducer',
  initialState,
  reducers: {
    loginAction: (state: UserState, action: PayloadAction<UserLogin[]>) => {
      state.userLogin = action.payload;
    },
    getProfileAction: (state: UserState, action: PayloadAction<UserProfile[]>) => {
      state.userProfile = action.payload;
    },
    getProfileUpdateAction: (state, action) => {
      state.userProfileUpdate = action.payload;
    },
    RegisterAction: (state, action) => {
      state.userRegister = action.payload;
    },
    registerCourseAction:(state:UserState,action:PayloadAction<{}>) =>{
      state.courseRegister = action.payload
    }
  }
});

export const { loginAction, getProfileAction, getProfileUpdateAction, RegisterAction, registerCourseAction } = UserReducer.actions

export default UserReducer.reducer

export const loginApi = (userLogin: any) => {
  return async (dispatch: DispatchType) => {
    const result: any = await http.post('/api/QuanLyNguoiDung/DangNhap', userLogin);
    const action = loginAction(result.data.content);
    dispatch(action);

    const actionGetProfile = getProfileApi();
    dispatch(actionGetProfile);

    settings.setStorageJson(USER_LOGIN, result.data);

    settings.setStorage(ACCESSTOKEN, result.data.accessToken);

    settings.setCookie(ACCESSTOKEN, result.data.accessToken, 30);
  }
}

export const getProfileApi = () => {
  return async (dispatch: DispatchType) => {
    const result = await http.post('/api/QuanLyNguoiDung/ThongTinNguoiDung');
    const action = getProfileAction(result.data);
    dispatch(action);

  }
}

export const getProfileUpdateApi = (userProfileUpdate: any) => {
  return async (dispatch: DispatchType) => {
    const result = await http.put('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', userProfileUpdate);
    const action = getProfileUpdateAction(result.data);
    dispatch(action);
  }
}

export const getRegisterApi = (userRegister: any) => {
  return async (dispatch: DispatchType) => {
    const result = await http.post('/api/QuanLyNguoiDung/DangKy', userRegister);
    const action = RegisterAction(result.data);
    dispatch(action);

    settings.setStorageJson(USER_REGISTER, result.data);

    settings.setStorage(ACCESSTOKEN, result.data.accessToken);

    settings.setCookie(ACCESSTOKEN, result.data.accessToken, 30);
  }
}

export const getRegisterCourseApi = (detail:{}) =>{
  return async (dispatch:DispatchType) =>{
    const result = await http.post('api/QuanLyKhoaHoc/DangKyKhoaHoc',detail);
    const action = registerCourseAction(result.data);
    dispatch(action);
  }
}