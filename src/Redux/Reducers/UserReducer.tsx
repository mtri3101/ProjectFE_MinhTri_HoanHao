import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
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
  hoTen: string;
  email: string;
  soDt: string;
  maLoaiNguoiDung: string
}

export interface UserList {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string;
  maLoaiNguoiDung: string;
}
export interface SearchUser {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string;
  matKhau: string;
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung: string;
}
export interface Pagination {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: UnSubcribeUser[];
}
export interface WaitingUser {
  taiKhoan: string;
  hoTen: string;
  biDanh: string;
}
export interface AddUser {
  taiKhoan: string,
  matKhau: string,
  hoTen: string,
  soDt: string,
  maLoaiNguoiDung: string,
  maNhom: string,
  email: string,
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
  userList: UserList[],
  courseStudent: UnSubcribeUser[],
  listWaitingStudent: UnSubcribeUser[],
  allUser: UserList[],
  searchUser: SearchUser[],
  paginateUser: Pagination,
  waitingUser: WaitingUser[],
  addUser: AddUser,
  deleteUser: any
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
  userList: [],
  courseStudent: [],
  listWaitingStudent: [],
  allUser: [],
  searchUser: [],
  paginateUser: {
    currentPage: 0,
    count: 0,
    totalPages: 0,
    totalCount: 0,
    items: [],
  },
  waitingUser: [],
  addUser: {
    taiKhoan: "haotrinh",
    matKhau: "123456",
    hoTen: "CrMaster",
    soDt: "19009090",
    maLoaiNguoiDung: "GV",
    maNhom: "GP01",
    email: "haotrinh@gmail.com",
  },
  deleteUser: '',
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
    RegisterAction: (state:UserState, action: PayloadAction<UserRegister[]>) => {
      state.userRegister = action.payload;
    },
    registerCourseAction: (state: UserState, action: PayloadAction<{}>) => {
      state.courseRegister = action.payload
    },
    cancelSubcribeAction: (state: UserState, action: PayloadAction<CancelSubcribe[]>) => {
      state.cancelSubcribe = action.payload
    },
    unSubcribeAction: (state: UserState, action: PayloadAction<UnSubcribeUser[]>) => {
      state.unSubcribeUser = action.payload
    },
    getUserListAction: (state: UserState, action: PayloadAction<UserList[]>) => {
      state.userList = action.payload
    },
    getCourseStudentAction: (state: UserState, action: PayloadAction<UnSubcribeUser[]>) => {
      state.courseStudent = action.payload
    },
    getWaitingStudentAction: (state: UserState, action: PayloadAction<UnSubcribeUser[]>) => {
      state.listWaitingStudent = action.payload
    },
    getAllUserAction: (state: UserState, action: PayloadAction<UserList[]>) => {
      state.allUser = action.payload
    },
    searchUserAction: (state: UserState, action: PayloadAction<SearchUser[]>) => {
      state.searchUser = action.payload
    },
    getUserPaginationAction: (state: UserState, action: PayloadAction<Pagination>) => {
      state.paginateUser = action.payload
    },
    getWaitingUserAction: (state: UserState, action: PayloadAction<WaitingUser[]>) => {
      state.waitingUser = action.payload
    },
    addUserAction: (state: UserState, action: PayloadAction<AddUser>) => {
      state.addUser = action.payload
    },
    deleteUserAction: (state: UserState, action: PayloadAction<any>) => {
      state.deleteUser = action.payload
    }

  }
});

export const { loginAction, getProfileAction, getProfileUpdateAction, RegisterAction, registerCourseAction, cancelSubcribeAction, unSubcribeAction, getUserListAction, getCourseStudentAction, getWaitingStudentAction, getAllUserAction, searchUserAction, getUserPaginationAction, getWaitingUserAction, addUserAction, deleteUserAction } = UserReducer.actions

export default UserReducer.reducer

export const loginApi = (userLogin: any) => {
  return async (dispatch: DispatchType) => {
    const result: any = await http.post('/api/QuanLyNguoiDung/DangNhap', userLogin);
    const action = loginAction(result.data);
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

export const getRegisterCourseApi = (detail: {}) => {
  return async (dispatch: DispatchType) => {
    const result = await http.post('api/QuanLyKhoaHoc/DangKyKhoaHoc', detail);
    const action = registerCourseAction(result.data);
    dispatch(action);
  }
}

export const getCancelSubcribeApi = (inform: {}) => {
  return async (dispatch: DispatchType) => {
    const result: any = await http.post('/api/QuanLyKhoaHoc/HuyGhiDanh', inform);
    const action = cancelSubcribeAction(result.data);
    dispatch(action)
  }
}
export const getUnSubcribeApi = () => {
  return async (dispatch: DispatchType) => {
    const result: any = await http.get('/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01');
    const action = unSubcribeAction(result.data);
    dispatch(action)
  }
}
export const getUserListApi = (id: string) => {
  return async (dispatch: DispatchType) => {
    const result: any = await http.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=${id}`);
    const action = getUserListAction(result.data);
    dispatch(action)
  }
}

export const getCourseStudentApi = (maKhoaHoc: string) => {
  const body = {
    "maKhoaHoc": maKhoaHoc,
  };
  return async (dispatch: DispatchType) => {
    const result: any = await http.post('/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc', body);
    const action = getCourseStudentAction(result.data);
    dispatch(action)
  }
}

export const getWaitingStudentApi = (maKhoaHoc: string) => {
  const body = {
    "maKhoaHoc": maKhoaHoc,
  };
  return async (dispatch: DispatchType) => {
    const result: any = await http.post('/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet', body);
    const action = getWaitingStudentAction(result.data);
    dispatch(action)
  }
}

export const getAllUserApi = () => {
  return async (dispatch: DispatchType) => {
    const result: any = await http.get('/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01')
    const action = getAllUserAction(result.data);
    dispatch(action)
  }
}

export const searchUserApi = (keyword:string) => {
  return async (dispatch: DispatchType) => {
      const result: any = await http.get("/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=" + `${keyword}`);
      const action = searchUserAction(result.data);
      dispatch(action)
  }
}

export const getUserPaginationApi = (page: number, userPerPage: number) => {
  return async (dispatch: DispatchType) => {
      const result: any = await http.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang?MaNhom=GP01&page=${page}&pageSize=${userPerPage}`);
      let paginateUser: Pagination = result.data
      const action: PayloadAction<Pagination> = getUserPaginationAction(paginateUser)
      dispatch(action)
  }
}

export const getWaitingUserApi = (maKhoaHoc: string) => {
  const body = {
      "taiKhoan": maKhoaHoc,
  };
  return async (dispatch: DispatchType) => {
      const result: any = await http.post(`/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`, body)
      let user: WaitingUser[] = result.data
      const action: PayloadAction<WaitingUser[]> = getWaitingUserAction(user)
      dispatch(action)
  }
}

export const addUserApi = (body: AddUser) => {
  return async (dispatch: DispatchType) => {
      const result: any = await http.post('/api/QuanLyNguoiDung/ThemNguoiDung', body)
      const action: PayloadAction<AddUser> = addUserAction(result.data)
      dispatch(action)
  }
}

export const deleteUserApi = (taiKhoan: string) => {
  return async (dispatch: DispatchType) => {
      const result: any = await http.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
      const action: PayloadAction<any> = deleteUserAction(result.data)
      dispatch(action)
  }
}