import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { act } from '@testing-library/react';
import { http } from '../../Utils/Config';
import { DispatchType } from '../ConfigStore';

//type Course

export interface CourseModel {
    maKhoaHoc: string;
    biDanh: string;
    tenKhoaHoc: string;
    moTa: string;
    luotXem: number;
    hinhAnh: string;
    maNhom: string;
    ngayTao: string;
    soLuongHocVien: number;
    nguoiTao: NguoiTAO;
    danhMucKhoaHoc: DanhMucKhoaHoc;
}

export interface DanhMucKhoaHoc {
    maDanhMucKhoahoc: string;
    tenDanhMucKhoaHoc: string;
}

export interface NguoiTAO {
    taiKhoan: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    tenLoaiNguoiDung: string;
}

//type category
export interface CourseCategoryModel {
    maDanhMuc: string;
    tenDanhMuc: string;
}

//type Detail
export interface CourseDetail {
    maKhoaHoc: string;
    biDanh: string;
    tenKhoaHoc: string;
    moTa: null;
    luotXem: number;
    hinhAnh: string;
    maNhom: null;
    ngayTao: string;
    soLuongHocVien: number;
    nguoiTao: NguoiTAO;
    danhMucKhoaHoc: DanhMucKhoaHoc;
}
export interface CancelSubcribe {
    maKhoaHoc: string;
    taiKhoan: string;
}

//type state
export interface CourseState {
    arrCourse: CourseModel[],
    courseCategory: CourseCategoryModel[],
    listCourseCatalog: CourseModel[],
    courseDetail: CourseDetail | null,
    cancelSubcribe: CancelSubcribe[]
}

const initialState:CourseState = {
    arrCourse: [],
    courseCategory: [],
    listCourseCatalog: [],
    courseDetail: null,
    cancelSubcribe: []
}

const CourseReducer = createSlice({
    name: 'CourseReducer',
    initialState,
    reducers: {
        setArrCourseAction: (state: CourseState, action: PayloadAction<CourseModel[]>) => {
            const arrCourse: CourseModel[] = action.payload
            state.arrCourse = arrCourse;
        },
        setCourseCategoryAction: (state: CourseState, action: PayloadAction<CourseCategoryModel[]>) => {
            const category: CourseCategoryModel[] = action.payload
            state.courseCategory = category;
        },
        setCourseByCategoryAction: (state: CourseState, action: PayloadAction<CourseModel[]>) => {
            const arrCouse: CourseModel[] = action.payload
            state.listCourseCatalog = arrCouse;
        },
        setCourseDetailAction: (state: CourseState, action: PayloadAction<CourseDetail>) => {
            state.courseDetail = action.payload;
        },
        cancelSubcribeAction: (state: CourseState, action: PayloadAction<CancelSubcribe[]>) =>{
            state.cancelSubcribe = action.payload;
        }
    }
});

export const { setArrCourseAction, setCourseCategoryAction, setCourseByCategoryAction, setCourseDetailAction, cancelSubcribeAction } = CourseReducer.actions

export default CourseReducer.reducer


export const getArrCouseApi = () => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01');

        let arrCourse: CourseModel[] = result.data

        const action: PayloadAction<CourseModel[]> = setArrCourseAction(arrCourse);
        dispatch(action)
    }
}

export const getCourseCategoryApi = () => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc');
        let category: CourseCategoryModel[] = result.data

        const action: PayloadAction<CourseCategoryModel[]> = setCourseCategoryAction(category)
        dispatch(action)
    }
}

export const getCourseByCategoryApi = (maDanhMuc: string) => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=' + maDanhMuc + '&MaNhom=GP01');

        let arrCourse: CourseModel[] = result.data
        const action: PayloadAction<CourseModel[]> = setCourseByCategoryAction(arrCourse);
        dispatch(action)
    }
}

export const getCourseDetailApi = (maKhoaHoc: string) => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=' + maKhoaHoc);

        let detail: CourseDetail = result.data
        const action: PayloadAction<CourseDetail> = setCourseDetailAction(detail);
        dispatch(action)
    }
}

export const getCancelSubcribeApi = (inform:any) => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.post('/api/QuanLyKhoaHoc/HuyGhiDanh',inform);
        const action = cancelSubcribeAction(result.data);
        dispatch(action)
    }
}
