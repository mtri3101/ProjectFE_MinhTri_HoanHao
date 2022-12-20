import React, { useState, useEffect,ChangeEvent, MouseEventHandler } from "react";
import { NavLink } from "react-router-dom";
import "../Assets/Scss/MyCourse.scss";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../Redux/ConfigStore";
import { UserProfile } from "../Redux/Reducers/UserReducer";
import { getProfileApi } from '../Redux/Reducers/UserReducer'
import { useParams } from 'react-router-dom'
import { getCancelSubcribeApi } from "../Redux/Reducers/CourseReducer";

type Props = {};

export default function MyCourse({}: Props) {
  const { userProfile } = useSelector((state: RootState) => state.UserReducer);
  const { cancelSubcribe } = useSelector((state: RootState) => state.CourseReducer);
  const dispatch: DispatchType = useDispatch();
  const params: any = useParams()

  useEffect(() => {
    const action = getProfileApi();
    dispatch(action)
  }, [])

  const [keyword,setKeyword] = useState('')

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target
    setKeyword(value)
  }

  const handleSubmit = (event:any) =>{
    event.preventDefault();
    // if(keyword === userProfile.chiTietKhoaHocGhiDanh?.tenKhoaHoc){
      const action = getProfileApi();
      dispatch(action)
    // }
  } 

  const cancelCourse = (maKhoaHoc:any) =>{
    console.log(maKhoaHoc);
    const action = getCancelSubcribeApi(maKhoaHoc)
    dispatch(action)
  }

  const renderCourse = () => {
    return userProfile.chiTietKhoaHocGhiDanh.map(
      (course: UserProfile, index: number) => {
        return (
          <div className="container course" key={index}>
            <div className="row row-course">
              <div className="col-2">
                <img
                  src={course.chiTietKhoaHocGhiDanh.hinhAnh}
                  style={{ width: 150, height: 120 }}
                  alt=""
                />
              </div>
              <div className="col-8">
                <h5>{course.chiTietKhoaHocGhiDanh.tenKhoaHoc}</h5>
                <p>{course.chiTietKhoaHocGhiDanh.moTa}</p>
                <button className="btn btn-danger" type="button">Hủy</button>
              </div>
            </div>
          </div>
        );
      }
    );
  };

  return (
    <div className="container">
      <h3 className="profile d-flex justify-content-left">THÔNG TIN CÁ NHÂN</h3>
      <div className="row">
        <div className="col-2">
          <img
            src="https://thuthuatnhanh.com/wp-content/uploads/2020/02/anh-ngau-chat-260x390.jpg"
            style={{ width: 140, height: 140, borderRadius: 200 }}
            alt="..."
          />
          <h6>CrMaster</h6>
          <p>Lập trình viên Front-end</p>
          <NavLink to="" className="btn btn-success">
            Hồ sơ cá nhân
          </NavLink>
        </div>
        <div className="col-8">
          <div className="row">
            <div className="thongTin">
              <NavLink className="btn caNhan" to="/profile">
                Thông tin cá nhân
              </NavLink>
              <NavLink className="btn khoaHoc" to="">
                Khóa học
              </NavLink>
            </div>
            <div className="thongTinKhoaHoc">
              <div className="timKhoaHoc">
                <h6>Khóa học của tôi</h6>
                <form action="" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="searchForm"
                    placeholder="Tìm kiếm..."
                    name="search"
                    onChange={handleChange}
                  />
                  <NavLink to={`/myCourse/${keyword}`} className="btn btn-outline-success" type="submit">Tìm kiếm</NavLink>
                </form>
              </div>
            </div>
            {renderCourse()}
          </div>
        </div>
      </div>
    </div>
  );
}
