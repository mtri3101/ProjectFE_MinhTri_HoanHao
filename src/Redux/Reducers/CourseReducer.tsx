import { createSlice,createAsyncThunk,PayloadAction } from '@reduxjs/toolkit'
import { act } from '@testing-library/react';
import { http } from '../../Utils/Config';
import { DispatchType } from '../ConfigStore';

//type Course

export interface CourseModel {
    maKhoaHoc:      string;
    biDanh:         string;
    tenKhoaHoc:     string;
    moTa:           string;
    luotXem:        number;
    hinhAnh:        string;
    maNhom:         string;
    ngayTao:        string;
    soLuongHocVien: number;
    nguoiTao:       NguoiTAO;
    danhMucKhoaHoc: DanhMucKhoaHoc;
}

export interface DanhMucKhoaHoc {
    maDanhMucKhoahoc:  string;
    tenDanhMucKhoaHoc: string;
}

export interface NguoiTAO {
    taiKhoan:         string;
    hoTen:            string;
    maLoaiNguoiDung:  string;
    tenLoaiNguoiDung: string;
}

//type category
export interface CourseCategoryModel {
    maDanhMuc:  string;
    tenDanhMuc: string;
}

//type state
export interface CourseState {
    arrCourse: CourseModel[],
    courseCategory: CourseCategoryModel[]
}

const initialState = {
    arrCourse: [],
    courseCategory:[]
}

const CourseReducer = createSlice({
  name: 'CourseReducer',
  initialState,
  reducers: {
    setArrCourseAction: (state: CourseState, action: PayloadAction<CourseModel[]>) =>{
        const arrCourse: CourseModel[] = action.payload
        state.arrCourse = arrCourse;
    },
    setCourseCategoryAction: (state:CourseState,action: PayloadAction<CourseCategoryModel[]>) =>{
        const category: CourseCategoryModel[] = action.payload
        state.courseCategory = category;
    }
  }
});

export const {setArrCourseAction, setCourseCategoryAction} = CourseReducer.actions

export default CourseReducer.reducer


export const getArrCouseApi = () => {
    return async(dispatch:DispatchType) =>{
        const result: any = await http.get('/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01');

        let arrCourse:CourseModel[] = result.data

        const action: PayloadAction<CourseModel[]> = setArrCourseAction(arrCourse);
        dispatch(action)
    }
}

export const getCourseCategoryApi = () =>{
    return async (dispatch:DispatchType) =>{
        const result:any = await http.get('/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc');
        let category:CourseCategoryModel[] = result.data
        
        const action: PayloadAction<CourseCategoryModel[]> = setCourseCategoryAction(category)
        dispatch(action)
    }
}