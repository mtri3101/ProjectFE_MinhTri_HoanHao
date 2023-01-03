import React, { ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import "../Assets/Scss/UserManagement.scss";
import { useSelector, useDispatch } from "react-redux";
import { DispatchType, RootState } from "../Redux/ConfigStore";
import { getProfileUpdateApi, getUnSubcribeApi, searchUserApi, UnSubcribeUser, UserProfile } from "../Redux/Reducers/UserReducer";
import { useEffect } from "react";
import { CourseDetail } from "../Redux/Reducers/CourseReducer";
import { useFormik } from "formik";
import * as yup from "yup";

type Props = {};

export default function UserManagement({}: Props) {
  const { unSubcribeUser, userProfile, searchUser } = useSelector(
    (state: RootState) => state.UserReducer
  );
  const dispatch: DispatchType = useDispatch();
  const [keyword,setKeyword] = useState('')

  // useEffect(() => {
  //   if(keyword === ""){
  //     const actionAsync = getUnSubcribeApi();
  //     dispatch(actionAsync)
  //   }
  // }, []);
  
  useEffect(() => {
    if(keyword === ""){
      const actionAsync = getUnSubcribeApi();
      dispatch(actionAsync)
    }else{
      const action = searchUserApi(keyword);
      dispatch(action)
    }
  }, [keyword]);

  console.log(searchUser)

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target
    setKeyword(value)
  }

  const arrUser = unSubcribeUser.slice(0, 10);
  const arrSearchUser = searchUser.slice(0, 10);

  const renderUnSubcribeUser = () => {
    return arrUser.map((user: UnSubcribeUser, index: number) => {
      return (
        <tr className="content" key={index}>
          <td>{index + 1}</td>
          <td>{user.taiKhoan}</td>
          <td>{user.hoTen}</td>
          <td>{user.maLoaiNguoiDung}</td>
          <td>{user.email}</td>
          <td>{user.soDt}</td>
          <td className="py-2">
            <button
              className="ghiDanh btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#userReg"
            >
              Ghi danh
            </button>
            <button
              className="sua btn btn-primary mx-2"
              data-bs-toggle="modal"
              data-bs-target="#userUpdate"
            >
              Sửa
            </button>
            <button className="xoa btn btn-danger">Xóa</button>
          </td>
        </tr>
      );
    });
  };

  const frm = useFormik({
    initialValues: {
      hoTen: "",
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      maLoaiNguoiDung: "",
    },
    validationSchema: yup.object().shape({
      hoTen: yup.string().required("Vui lòng nhập vào họ tên !"),
      taiKhoan: yup.string().required("Vui lòng nhập vào tài khoản !"),
      matKhau: yup
        .string()
        .required("Vui lòng nhập vào mật khẩu !")
        .min(6, "Mật khẩu từ 6 - 20 ký tự !")
        .max(20, "Mật khẩu từ 6 - 20 ký tự !"),
      email: yup
        .string()
        .required("Vui lòng nhập vào email !")
        .email("Email không đúng định dạng !"),
      soDT: yup
        .number()
        .required("Vui lòng nhập vào số điện thoại !")
        .typeError("Số điện thoại phải là số !"),
      maLoaiNguoiDung: yup.string().required("Vui lòng chọn mã nhóm !"),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(values);
      const action = getProfileUpdateApi(values);
      dispatch(action);
    },
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-2">
          <NavLink to={"#"} className="course btn btn-success">
            Quản lý khóa học
          </NavLink>
          <br />
          <br />
          <NavLink to={"/userManagement"} className="user btn btn-success">
            Quản lý người dùng
          </NavLink>
        </div>
        <div className="col-10">
          <NavLink
            to={"/userManagement/addUser"}
            className="addCourse btn btn-success"
          >
            Thêm người dùng
          </NavLink>
          <form action="">
            <input
              onChange={handleChange}
              type="text"
              className="searchForm"
              placeholder="Nhập vào tài khoản hoặc họ tên người dùng..."
              name="search"
            />
            <button type="button" className="search btn btn-success ms-2">
              Tìm kiếm
            </button>
          </form>
          <table className="table">
            <tr className="title">
              <td>STT</td>
              <td>Tài khoản</td>
              <td>Họ tên</td>
              <td>Loại người dùng</td>
              <td>Email</td>
              <td>Số điện thoại</td>
              <td>Thao tác</td>
            </tr>
            {renderUnSubcribeUser()}
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div
        className="modal fade"
        id="userReg"
        tabIndex={-1}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="modalTitleId">
                Chọn người dùng
              </h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <select name="" id="">
                <option value="">Vui lòng chọn tên khóa học</option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
                <option value="">5</option>
              </select>
              <NavLink to={"#"} className="btn btn-warning mx-2">
                Ghi danh
              </NavLink>
              <hr className="hr" />
              <div className="hocVienXacThuc">
                <div className="col-left">
                  <h6>Khóa học chờ xác thực</h6>
                </div>
              </div>
              <table className="table">
                <tr className="title">
                  <td>STT</td>
                  <td>Tên khóa học</td>
                  <td>Chờ xác nhận</td>
                </tr>
                <tr className="content">
                  <td>1</td>
                  <td>Lập trình Front-end</td>
                  <td className="py-2">
                    <button className="xacThuc btn btn-primary bg-primary">
                      Xác thực
                    </button>
                    <button className="huy btn btn-danger bg-danger mx-2">Hủy</button>
                  </td>
                </tr>
              </table>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">«</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">»</span>
                    </a>
                  </li>
                </ul>
              </nav>
              <hr className="hr" />
              <div className="hocVienXacThuc">
                <div className="col-left">
                  <h6>Khóa học đã ghi danh</h6>
                </div>
              </div>
              <table className="table">
                <tr className="title">
                  <td>STT</td>
                  <td>Tên khóa học</td>
                  <td>Chờ xác nhận</td>
                </tr>
                <tr className="content">
                  <td>1</td>
                  <td>Lập trình Front-end</td>
                  <td className="py-2">
                    <button className="huy btn btn-danger bg-danger">Hủy</button>
                  </td>
                </tr>
              </table>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">«</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">»</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              <button type="button" className="btn btn-primary">
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="userUpdate"
        tabIndex={-1}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xs"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="modalTitleId">
                Cập nhật thông tin người dùng
              </h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form
                className="form-group-container"
                onSubmit={frm.handleSubmit}
              >
                <div className="container">
                  <div className="row">
                    <div className="form-group-hoTen">
                      <p>Họ tên</p>
                      <input
                        type="text"
                        placeholder="Vui lòng nhập vào họ tên"
                        name={"hoTen"}
                        onChange={frm.handleChange}
                        onBlur={frm.handleBlur}
                      />
                      {frm.errors.hoTen ? (
                        <p className="text text-danger">{frm.errors.hoTen}</p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group-taiKhoan">
                      <p>Tài khoản</p>
                      <input
                        type="text"
                        placeholder="Vui lòng nhập vào tài khoản"
                        name={"taiKhoan"}
                        onChange={frm.handleChange}
                        onBlur={frm.handleBlur}
                      />
                      {frm.errors.taiKhoan ? (
                        <p className="text text-danger">
                          {frm.errors.taiKhoan}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group-matKhau">
                      <p>Mật khẩu</p>
                      <input
                        type="password"
                        placeholder="Vui lòng nhập vào mật khẩu"
                        name={"matKhau"}
                        onChange={frm.handleChange}
                        onBlur={frm.handleBlur}
                      />
                      {frm.errors.matKhau ? (
                        <p className="text text-danger">{frm.errors.matKhau}</p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group-email">
                      <p>Email</p>
                      <input
                        type="text"
                        placeholder="Vui lòng nhập vào email "
                        name={"email"}
                        onChange={frm.handleChange}
                        onBlur={frm.handleBlur}
                      />
                      {frm.errors.email ? (
                        <p className="text text-danger">{frm.errors.email}</p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group-phone">
                      <p>Sô điện thoại</p>
                      <input
                        type="text"
                        placeholder="Vui lòng nhập vào số điện thoại"
                        name={"soDT"}
                        onChange={frm.handleChange}
                        onBlur={frm.handleBlur}
                      />
                      {frm.errors.soDT ? (
                        <p className="text text-danger">{frm.errors.soDT}</p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group-maLoaiNguoiDung">
                      <p>Mã loại người dùng</p>
                      <select
                        id="maLoaiNguoiDung"
                        className=""
                        name="maLoaiNguoiDung"
                        value={frm.values.maLoaiNguoiDung}
                        onChange={frm.handleChange}
                        onBlur={frm.handleBlur}
                      >
                        <option>Vui lòng chọn mã loại người dùng</option>
                        <option>HV</option>
                        <option>GV</option>
                      </select>
                      {frm.errors.maLoaiNguoiDung ? (
                        <p className="text text-danger">
                          {frm.errors.maLoaiNguoiDung}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              <button type="button" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
