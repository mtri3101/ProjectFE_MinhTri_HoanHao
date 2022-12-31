import React, { Component } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Assets/Scss/Profile.scss";
import { getProfileApi, getProfileUpdateApi } from '../Redux/Reducers/UserReducer';
import { DispatchType, RootState } from '../Redux/ConfigStore'
import { useFormik } from "formik";
import * as yup from "yup";
import { NavLink } from "react-router-dom";

type Props = {}

export default function Profile({}: Props ) {
  const dispatch: DispatchType = useDispatch();
  const {userProfile} = useSelector((state: RootState) => state.UserReducer)
  useEffect(() => {
    const actionAsync = getProfileApi();
    dispatch(actionAsync);
  }, [])

  const frm = useFormik({
      initialValues: {
        hoTen: '',
        email: '',
        taiKhoan: '',
        matKhau: '',
        soDt: '',
        maLoaiNguoiDung: '',
        maNhom: '',
      },
      validationSchema: yup.object().shape({
        hoTen: yup.string().required('Vui lòng nhập vào họ tên !'),
        email: yup.string().required('Vui lòng nhập vào email !').email('Email không đúng định dạng !'),
        taiKhoan: yup.string().required('Vui lòng nhập vào tài khoản !'),
        matKhau: yup.string().required('Vui lòng nhập vào mật khẩu !').min(6, 'Mật khẩu từ 6 - 20 ký tự !').max(20, 'Mật khẩu từ 6 - 20 ký tự !'),
        soDt: yup.number().required('Vui lòng nhập vào số điện thoại !').typeError('Số điện thoại phải là số !'),
        maLoaiNguoiDung: yup.string().required('Vui lòng chọn mã loại người dùng !'),
        maNhom: yup.string().required('Vui lòng chọn mã nhóm !')
      }),
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: (values) => {
        console.log(values)
        const action = getProfileUpdateApi(values);
        dispatch(action);
      }
    });

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
          <NavLink to="/userManagement" className="btn btn-success">Hồ sơ cá nhân</NavLink>
        </div>
        <div className="col-8">
          <div className="row">
            <div className="thongTin">
              <NavLink to="" className="btn caNhan">Thông tin cá nhân</NavLink>
              <NavLink className="btn khoaHoc" to="/myCourse">
                Khóa học
              </NavLink>
            </div>
            <div className="col-8 left">
              <div className="form-group email">
                <p>
                  Email:<span>{userProfile.email}</span>
                </p>
              </div>
              <div className="form-group hoTen">
                <p>
                  Họ và tên:<span>{userProfile.hoTen}</span>
                </p>
              </div>
              <div className="form-group phone">
                <p>
                  Số điện thoại:<span>{userProfile.soDT}</span>
                </p>
              </div>
            </div>
            <div className="col-4 right">
              <div className="form-group taiKhoan">
                <p>
                  Tài khoản:<span>{userProfile.taiKhoan}</span>
                </p>
              </div>
              <div className="form-group nhom">
                <p>
                  Nhóm:<span>{userProfile.maNhom}</span>
                </p>
              </div>
              <div className="form-group doiTuong">
                <p>
                  Đối tượng:<span>{userProfile.maLoaiNguoiDung === 'GV'? <NavLink to='/admin' className='ms-2'>Đi đến trang quản lý</NavLink> : userProfile.maLoaiNguoiDung }</span>
                </p>
              </div>
              <button
                className="btn btn-warning"
                data-bs-target="#modalId"
                data-bs-toggle="modal"
                type="button"
              >
                Cập nhật
              </button>

              <form onSubmit={frm.handleSubmit}>
                <div
                  className="modal fade"
                  id="modalId"
                  tabIndex={1}
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  role="dialog"
                  aria-labelledby="modalTitleId"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sx"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="modalTitleId">
                          Chỉnh sửa thông tin cá nhân
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body">
                        <div className="modal-hoTen">
                          <p>Họ và tên</p>
                          <input type="text" placeholder="Họ và tên" name="hoTen" value={frm.values.hoTen} onChange={frm.handleChange} onBlur={frm.handleBlur}/>
                          {frm.errors.hoTen ? <p className='text text-danger'>{frm.errors.hoTen}</p> : ''}
                        </div>
                        <div className="modal-email">
                          <p>Email</p>
                          <input type="text" placeholder="Email" name="email" value={frm.values.email} onChange={frm.handleChange} onBlur={frm.handleBlur}/>
                          {frm.errors.email ? <p className='text text-danger'>{frm.errors.email}</p> : ''}
                        </div>
                        <div className="modal-taiKhoan">
                          <p>Tài khoản</p>
                          <input type="text" placeholder="Tài khoản" name="taiKhoan" value={frm.values.taiKhoan} onChange={frm.handleChange} onBlur={frm.handleBlur}/>
                          {frm.errors.taiKhoan ? <p className='text text-danger'>{frm.errors.taiKhoan}</p> : ''}
                        </div>
                        <div className="modal-matKhau">
                          <p>Mật khẩu</p>
                          <input type="password" placeholder="Mật khẩu" name="matKhau" value={frm.values.matKhau} onChange={frm.handleChange} onBlur={frm.handleBlur}/>
                          {frm.errors.matKhau ? <p className='text text-danger'>{frm.errors.matKhau}</p> : ''}
                        </div>
                        <div className="modal-phone">
                          <p>Số điện thoại</p>
                          <input type="text" placeholder="Số điện thoại" name="soDt" value={frm.values.soDt} onChange={frm.handleChange} onBlur={frm.handleBlur}/>
                          {frm.errors.soDt ? <p className='text text-danger'>{frm.errors.soDt}</p> : ''}
                        </div>
                        <div className="modal-maLoaiNguoiDung">
                          <p>Mã loại người dùng</p>
                           <select id="maLoaiNguoiDung" className="" name="maLoaiNguoiDung" value={frm.values.maLoaiNguoiDung} onChange={frm.handleChange} onBlur={frm.handleBlur}>
                            <option>Vui lòng chọn mã loại người dùng</option>
                            <option>HV</option>
                            <option>GV</option>
                          </select>
                          {frm.errors.maLoaiNguoiDung ? <p className='text text-danger'>{frm.errors.maLoaiNguoiDung}</p> : ''}
                        </div>
                        <div className="modal-maNhom">
                          <p>Mã nhóm</p>
                          <select id="maNhom" className="" name="maNhom" value={frm.values.maNhom} onChange={frm.handleChange} onBlur={frm.handleBlur}>
                            <option>Vui lòng chọn mã nhóm</option>
                            <option>GP01</option>
                            <option>GP02</option>
                            <option>GP03</option>
                            <option>GP04</option>
                            <option>GP05</option>
                            <option>GP06</option>
                            <option>GP07</option>
                            <option>GP08</option>
                            <option>GP09</option>
                            <option>GP010</option>
                          </select>
                          {frm.errors.maNhom ? <p className='text text-danger'>{frm.errors.maNhom}</p> : ''}
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-bs-dismiss="modal"
                        >
                          Đóng
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Cập nhật
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Optional: Place to the bottom of scripts */}
              </form>
            </div>
            <div className="kyNang">
              <h4>KỸ NĂNG CỦA TÔI</h4>
              <div className="row-kyNang">
                <div className="col-8">
                  <div className="row-HTML">
                    <div className="col-left">
                      <button className="btn btn-primary">HTML</button>
                    </div>
                    <div className="col-right">
                      <div className="content"></div>
                    </div>
                  </div>
                  <div className="row-CSS">
                    <div className="col-left">
                      <button className="btn">CSS</button>
                    </div>
                    <div className="col-right">
                      <div className="content"></div>
                    </div>
                  </div>
                  <div className="row-JS">
                    <div className="col-left">
                      <button className="btn">JS</button>
                    </div>
                    <div className="col-right">
                      <div className="content"></div>
                    </div>
                  </div>
                  <div className="row-REACT">
                    <div className="col-left">
                      <button className="btn">REACT</button>
                    </div>
                    <div className="col-right">
                      <div className="content"></div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="timeStudy">
                    <div className="timeStudyItem">
                      <i className="fas fa-user-clock mr-2"></i>
                      <div>
                        <h6>Giờ học</h6>
                        <p>120</p>
                      </div>
                    </div>
                    <div className="timeStudyItem">
                      <i className="fas fa-layer-group mr-2"></i>
                      <div>
                        <h6>Điểm tổng</h6>
                        <p>80</p>
                      </div>
                    </div>
                    <div className="timeStudyItem">
                      <i className="fas fa-swatchbook mr-2"></i>
                      <div>
                        <h6>Buổi học</h6>
                        <p>40</p>
                      </div>
                    </div>
                    <div className="timeStudyItem">
                      <i className="fas fa-signal mr-2"></i>
                      <div>
                        <h6>Cấp độ</h6>
                        <p>Trung cấp</p>
                      </div>
                    </div>
                    <div className="timeStudyItem">
                      <i className="fas fa-graduation-cap mr-2"></i>
                      <div>
                        <h6>Học lực</h6>
                        <p>Khá</p>
                      </div>
                    </div>
                    <div className="timeStudyItem">
                      <i className="fas fa-book mr-2"></i>
                      <div>
                        <h6>Bài tập</h6>
                        <p>100</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
