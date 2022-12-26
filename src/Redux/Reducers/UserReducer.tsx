import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DispatchType } from '../ConfigStore';
import { http, USER_LOGIN, settings, ACCESSTOKEN, USER_REGISTER } from '../../Utils/Config';
import { keyboard } from '@testing-library/user-event/dist/keyboard';

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
  chiTietKhoaHocGhiDanh: CourseDetail;
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
}
export interface CourseDetail {
  biDanh: string;
  danhGia: number;
  hinhAnh: string;
  luotXem: number;
  maKhoaHoc: string;
  moTa: string;
  ngayTao: Date;
  tenKhoaHoc: string;
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
export interface CancelSubcribe {
  maKhoaHoc: string;
  taiKhoan: string;
}
export interface UnSubcribeUser {
  taiKhoan: string;
  hoTen:    string;
  biDanh:   string;
}

export interface UserState {
  userLogin: UserLogin[],
  userProfile: UserProfile | CourseDetail | any,
  userProfileUpdate: UserProfileUpdate[],
  userRegister: UserRegister[],
  courseRegister: {},
  chiTietKhoaHocGhiDanh: CourseDetail | null,
  cancelSubcribe: CancelSubcribe[],
  unSubcribeUser: UnSubcribeUser[],
}

const initialState: UserState = {
  userLogin: settings.getStorageJson(USER_LOGIN) ? settings.getStorageJson(USER_LOGIN) : [],
  userProfile: {},
  chiTietKhoaHocGhiDanh: null,
  userProfileUpdate: [],
  userRegister: settings.getStorageJson(USER_REGISTER) ? settings.getStorageJson(USER_REGISTER) : [],
  courseRegister: {},
  cancelSubcribe: [],
  unSubcribeUser: [],
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
    },
    cancelSubcribeAction: (state: UserState, action: PayloadAction<CancelSubcribe[]>) =>{
      state.cancelSubcribe = action.payload
    },
    unSubcribeAction: (state: UserState, action: PayloadAction<UnSubcribeUser[]>) =>{
      state.unSubcribeUser = action.payload
    },
  }
});

export const { loginAction, getProfileAction, getProfileUpdateAction, RegisterAction, registerCourseAction, cancelSubcribeAction, unSubcribeAction } = UserReducer.actions

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

export const getCancelSubcribeApi = (inform:{}) => {
  return async (dispatch: DispatchType) => {
      const result: any = await http.post('/api/QuanLyKhoaHoc/HuyGhiDanh', inform);
      const action = cancelSubcribeAction(result.data);
      dispatch(action)
  }
}
export const getUnSubcribeApi = () => {
  return async (dispatch: DispatchType) => {
      const result: any = await http.post('/api/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh');
      const action = unSubcribeAction(result.data);
      dispatch(action)
  }
}