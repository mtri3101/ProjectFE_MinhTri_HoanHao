import React, { useState } from "react";
import "../Assets/Scss/Login.scss";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { loginApi, UserProfile } from "../Redux/Reducers/UserReducer";
import { DispatchType, RootState } from "../Redux/ConfigStore";
import { history } from "../index";

type Props = {};

export default function Login({}: Props) {
  const { userProfile } = useSelector((state: RootState) => state.UserReducer);
  const dispatch: DispatchType = useDispatch();

  const frm = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: yup.object().shape({
      taiKhoan: yup.string().required("Vui lòng nhập vào tài khoản !"),
      matKhau: yup
        .string()
        .required("Vui lòng nhập vào mật khẩu !")
        .min(6, "Mật khẩu từ 6 - 20 ký tự !")
        .max(20, "Mật khẩu từ 6 - 20 ký tự !"),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const action = loginApi(values);
      dispatch(action);
    }
  });

  const renderContentModal = () => {
    if(userProfile.hoTen){
      return <div className="modal fade" id="exampleModal" tabIndex={-1}>
      <div className="modal-dialog">
          <div className="modal-content">
              <div className="modal-body">
                  <div className="success-checkmark">
                      <div className="check-icon">
                          <span className="icon-line line-tip" />
                          <span className="icon-line line-long" />
                          <div className="icon-circle"/>
                          <div className="icon-fix"/>
                      </div>
                  </div>
                  <h3>Bạn đã đăng nhập thành công</h3>
              </div>
          </div>
      </div>
  </div>
  }else{
    return <div className="modal fade" id="exampleModal" tabIndex={-1}>
      <div className="modal-dialog">
          <div className="modal-content">
              <div className="modal-body">
                  <div className="fail-checkmark">
                      <div className="check-icon">
                          <span className="icon-line line-tip" />
                          <span className="icon-line line-long" />
                          <div className="icon-circle"/>
                          <div className="icon-fix"/>
                      </div>
                  </div>
                  <h3>Bạn đã đăng nhập thất bại</h3>
              </div>
          </div>
      </div>
  </div>
    }
  }

  return (
    <div className="loginBody">
      <form className="form-group" onSubmit={frm.handleSubmit}>
        <h3 className="login">Đăng Nhập</h3>
        {renderContentModal()}
        <div className="form-container">
          <div className="form-control-taiKhoan">
            <p>Tài Khoản</p>
            <input
              placeholder="Vui lòng nhập vào tài khoản"
              type="text"
              name="taiKhoan"
              id="taiKhoan"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
            />
            {frm.errors.taiKhoan ? (
              <p className="text text-danger mt-1">{frm.errors.taiKhoan}</p>
            ) : (
              ""
            )}
          </div>
          <div className="form-control-matKhau">
            <p>Mật Khẩu</p>
            <input
              placeholder="Vui lòng nhập vào mật khẩu"
              type="password"
              name="matKhau"
              id="matKhau"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
            />
            {frm.errors.matKhau ? (
              <p className="text text-danger">{frm.errors.matKhau}</p>
            ) : (
              ""
            )}
          </div>
          <div className="form-control-btn text-center mt-3">
            <NavLink to="/register" className="me-4 text-decoration-none">
              Đăng Ký
            </NavLink>
            <button className="btn btn-warning" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Đăng Nhập
            </button>
          </div>
          <div>
          </div>
        </div>
      </form>
    </div>
  );
}
