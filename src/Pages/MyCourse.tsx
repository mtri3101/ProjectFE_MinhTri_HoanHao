import React from "react";
import { NavLink } from "react-router-dom";
import "../Assets/Scss/MyCourse.scss";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../Redux/ConfigStore";
import { UserProfile } from "../Redux/Reducers/UserReducer";
import { useFormik } from "formik";

type Props = {};

export default function MyCourse({}: Props) {
  const { userProfile } = useSelector((state: RootState) => state.UserReducer);
  const frm = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) =>{
      console.log(values);
      if(values){
            
      }
  }
  });


  const renderCourse = () => {
    return userProfile.chiTietKhoaHocGhiDanh.map(
      (course: UserProfile, index: number) => {
        return (
          <div className="container course" key={index}>
            <div className="row row-course">
              <div className="col-2">
                <img
                  src="https://elearningnew.cybersoft.edu.vn/hinhanh/react-js.png"
                  style={{ width: 150, height: 120 }}
                  alt=""
                />
              </div>
              <div className="col-8">
                <h5>Lập trình front end với ReactJS</h5>
                <p>
                  React Js là một thư viện javascript dùng để xây dựng UI, UI ở
                  đây được dùng chính ở 2 nền tảng Web và Mobile. Ở lĩnh vực
                  Web, sử dụng React Js có thể đem lại trải nghiệm tốt cho người
                  dùng, cũng như khả năng Hot Reload giúp bạn lập trình nhanh
                  hơn.\n\nỞ lĩnh vực mobile, hãy đọc bài React Native là tương
                  lai của lập trình di động. Ở bài này mình đã phân tích rất kỹ
                  về React Native...
                </p>
                <button className="btn btn-danger">Hủy</button>
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
                <form action="" onSubmit={frm.handleSubmit}>
                  <input
                    type="text"
                    className="searchForm"
                    placeholder="Tìm kiếm..."
                    name="search" value={frm.values.search} onChange={frm.handleChange} onBlur={frm.handleBlur}
                  />
                </form>
              </div>
            </div>
            <div className="container course">
            <div className="row row-course">
              <div className="col-2">
                <img
                  src="https://elearningnew.cybersoft.edu.vn/hinhanh/react-js.png"
                  style={{ width: 150, height: 120 }}
                  alt=""
                />
              </div>
              <div className="col-8">
                <h5>Lập trình front end với ReactJS</h5>
                <p>
                  React Js là một thư viện javascript dùng để xây dựng UI, UI ở
                  đây được dùng chính ở 2 nền tảng Web và Mobile. Ở lĩnh vực
                  Web, sử dụng React Js có thể đem lại trải nghiệm tốt cho người
                  dùng, cũng như khả năng Hot Reload giúp bạn lập trình nhanh
                  hơn.\n\nỞ lĩnh vực mobile, hãy đọc bài React Native là tương
                  lai của lập trình di động. Ở bài này mình đã phân tích rất kỹ
                  về React Native...
                </p>
                <button className="btn btn-danger">Hủy</button>
              </div>
            </div>
          </div>
            {renderCourse()}
          </div>
        </div>
      </div>
    </div>
  );
}
