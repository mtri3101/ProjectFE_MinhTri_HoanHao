import React, { ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../Assets/Scss/Admin/UserManagement.scss";
import { useSelector, useDispatch } from "react-redux";
import { DispatchType, RootState } from "../../Redux/ConfigStore";
import { AddUser, addUserApi, getProfileUpdateApi, getUnSubcribeApi, getUserPaginationApi, SearchUser, searchUserApi, UnSubcribeUser } from "../../Redux/Reducers/UserReducer";
import { useEffect } from "react";
import { addCourseApi, CourseApprove, CourseCategoryModel, CourseDetail, deleteCourseApi, getCourseApproveApi, getWaitingCourseApi, WaitingCourse } from "../../Redux/Reducers/CourseReducer";
import { useFormik } from "formik";
import * as yup from "yup";

type Props = {};

export default function UserManagement({ }: Props) {
  const { unSubcribeUser, paginateUser, addUser } = useSelector(
    (state: RootState) => state.UserReducer
  );
  const { courseApprove, waitingCourse } = useSelector(
    (state: RootState) => state.CourseReducer
  );
  const [currentPage, setCurrentPage] = useState(1)
  const [valueSearch, setValueSearch] = useState('')
  const dispatch: DispatchType = useDispatch();
  const [keyword, setKeyword] = useState('')

  const value = localStorage.getItem("userLogin")

  useEffect(() => {
    const action = getUserPaginationApi(currentPage, 10)
    dispatch(action)
  }, [currentPage])

  const userSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValueSearch(value)
  }


  const renderUser = () => {
    if (!valueSearch) {
      return paginateUser?.items?.map((user: UnSubcribeUser, index: number) => {
        return <tr key={index}>
          <td>{index += 1}</td>
          <td>{user.taiKhoan}</td>
          <td>{user.hoTen}</td>
          <td>{user.maLoaiNguoiDung}</td>
          <td>{user.email}</td>
          <td>{user.soDt}</td>
          <td>
            <button className='btn btn-success my-1 ghiDanh' data-bs-toggle="modal" data-bs-target="#modalGhiDanh" onClick={() => openModalGhiDanh(user.taiKhoan)}>Ghi danh</button>
            <button className='btn btn-primary mx-3 my-1 sua'>Sửa</button>
            <button className='btn btn-danger my-1 xoa' onClick={() => deleteCourse(user.taiKhoan)}>Xóa</button>
          </td>
        </tr>
      })
    } else {
      const arrSearch = paginateUser?.items?.filter((user: UnSubcribeUser) => user.taiKhoan.toLowerCase().includes(valueSearch.toLowerCase()) || user.hoTen.toLowerCase().includes(valueSearch.toLowerCase()));
      console.log(valueSearch)
      return arrSearch.map((user: UnSubcribeUser, index: number) => {
        return <tr key={index}>
          <td>{index += 1}</td>
          <td>{user.taiKhoan}</td>
          <td>{user.hoTen}</td>
          <td>{user.maLoaiNguoiDung}</td>
          <td>{user.email}</td>
          <td>{user.soDt}</td>
          <td>
            <button className='btn btn-success my-1 ghiDanh' data-bs-toggle="modal" data-bs-target="#modalGhiDanh" onClick={() => openModalGhiDanh(user.taiKhoan)}>Ghi danh</button>
            <button className='btn btn-primary mx-3 my-1 sua'>Sửa</button>
            <button className='btn btn-danger xoa' onClick={() => deleteCourse(user.taiKhoan)}>Xóa</button>
          </td>
        </tr>
      })
    }

  }

  const renderPagination = () => {
    if (paginateUser.totalPages >= 2) {
      return (<nav aria-label="Page navigation example"  >
        <ul className="pagination" >
          {currentPage === 1 ? <li className="page-item inactive" ><a className="page-link" href="#">Previous</a></li> : <li className="page-item"><a className="page-link" href="#" onClick={prevPage}>Previous</a></li>}
          {renderPage()}
          {currentPage === paginateUser.totalPages ? <li className="page-item inactive" ><a className="page-link" href="#">Next</a></li> : <li className="page-item"><a className="page-link" href="#" onClick={nextPage}>...Next</a></li>}
        </ul>
      </nav>)
    }
  }

  const renderPage = () => {
    const arr = []
    for (let i = 1; i <= 28; i++) {
      const li = <li className="page-item" key={i} value={i} onClick={() => handleClickPage(i)}><a className="page-link" href="#" >{i}</a></li>
      arr.push(li)
    }
    return arr
  }

  const nextPage = () => {
    if (currentPage !== paginateUser.totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage)
    }
  }

  const prevPage = () => {
    if (currentPage !== 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage)
    }
  }

  const handleClickPage = (value: number) => {
    const pageValue = value
    setCurrentPage(pageValue);
  }

  const frm = useFormik({
    initialValues: {
      hoTen: "",
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "",
      maNhom: "",
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
      soDt: yup
        .number()
        .required("Vui lòng nhập vào số điện thoại !")
        .typeError("Số điện thoại phải là số !"),
      maLoaiNguoiDung: yup.string().required("Vui lòng chọn mã loại người dùng !"),
      // maNhom: yup.string().required("Vui lòng nhập vào mã nhóm !"),
    }),
    // validateOnChange: false,
    // validateOnBlur: false,

    onSubmit: (values, { resetForm }) => {
      console.log(values)
      // if (value !== null) {
      //     const body: AddUser = {
      //       taiKhoan: values.taiKhoan,
      //       matKhau: values.matKhau,
      //       hoTen: values.hoTen,
      //       soDt: values.soDt,
      //       maLoaiNguoiDung: values.maLoaiNguoiDung,
      //       maNhom: values.maNhom,
      //       email: values.email,
      //     }
      //     const action = addUserApi(body);
      //     dispatch(action)
      // }
      // resetForm();

    }
  });

  const openModalGhiDanh = (maKhoaHoc: string) => {
    getWaitingCourse(maKhoaHoc)
    getCourseApprove(maKhoaHoc)

  }

  const getWaitingCourse = (maKhoaHoc: string) => {
    const data = JSON.parse(maKhoaHoc)
    const action = getWaitingCourseApi(data);
    dispatch(action)
  }

  const renderWaitingCourse = (): JSX.Element[] => {
    return waitingCourse.map((course: WaitingCourse, index: number) => {
      return <tr className='content' key={index}>
        <td>{index + 1}</td>
        <td>{course.tenKhoaHoc}</td>
        <td className='py-2'>
          <button className='xacThuc btn btn-primary mx-2'>Xác thực</button>
          <button className='huy btn btn-danger'>Hủy</button>
        </td>
      </tr>
    })
  }

  const getCourseApprove = (maKhoaHoc: string) => {
    const data = JSON.parse(maKhoaHoc)
    const action = getCourseApproveApi(data);
    dispatch(action)
  }

  const renderCourseApprove = (): JSX.Element[] => {
    return courseApprove.map((student: CourseApprove, index: number) => {
      return <tr className='content' key={index}>
        <td>{index + 1}</td>
        <td>{student.tenKhoaHoc}</td>
        <td className='py-2'>
          <button className='huy btn btn-danger'>Hủy</button>
        </td>
      </tr>
    })
  }

  const deleteCourse = (maKhoaHoc: string) => {
    const action = deleteCourseApi(maKhoaHoc)
    dispatch(action)
    console.log(maKhoaHoc)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-10">
          <button className='btn btn-success my-3' data-bs-toggle="modal" data-bs-target="#addUserModal" >Thêm người dùng</button>
          <div className="modal fade admin-course" id="addUserModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Quản lý người dùng</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <h2>Thêm người dùng</h2>
                  <form className='row' onSubmit={frm.handleSubmit}>
                    <div className='col-6 left'>
                      <div className='form-group'>
                        <p className='mb-1 mt-3'>Tài khoản</p>
                        <input type='input' className='form-control' name="taiKhoan" id='taiKhoan' value={frm.values.taiKhoan} onChange={frm.handleChange} onBlur={frm.handleBlur} />
                        {frm.errors.taiKhoan ? <p className='text text-danger'>{frm.errors.taiKhoan}</p> : ''}
                      </div>
                      <div className='form-group matKhau'>
                        <p className='mb-1 mt-3'>Mật khẩu</p>
                        <input className='form-control' type="password" name="matKhau" id='matKhau' value={frm.values.matKhau} onChange={frm.handleChange} onBlur={frm.handleBlur} />
                        {frm.errors.matKhau ? <p className='text text-danger'>{frm.errors.matKhau}</p> : ''}
                      </div>
                      <div className='form-group hoTen'>
                        <p className='mb-1 mt-3'>Họ tên</p>
                        <input className='form-control' name="hoTen" id="hoTen" type='input' value={frm.values.hoTen} onChange={frm.handleChange} onBlur={frm.handleBlur} />
                        {frm.errors.hoTen ? <p className='text text-danger'>{frm.errors.hoTen}</p> : ''}
                      </div>
                    </div>
                    <div className='col-6 right'>
                      <div className='form-group email'>
                        <p className='mb-1 mt-3'>Email</p>
                        <input type='input' className='form-control' name="email" id="email"  value={frm.values.email} onChange={frm.handleChange} onBlur={frm.handleBlur} />
                        {frm.errors.email ? <p className='text text-danger'>{frm.errors.email}</p> : ''}
                      </div>
                      <div className='form-group soDt'>
                        <p className='mb-1 mt-3'>Số điện thoại</p>
                        <input type='input' className='form-control' name="soDt" id="soDt" value={frm.values.soDt} onChange={frm.handleChange} onBlur={frm.handleBlur} />
                        {frm.errors.soDt ? <p className='text text-danger'>{frm.errors.soDt}</p> : ''}
                      </div>
                      <div className='form-group maLoaiNguoiDung'>
                        <p className='mb-1 mt-3'>Loại người dùng</p>
                        <select name="maLoaiNguoiDung" id="maLoaiNguoiDung" value={frm.values.maLoaiNguoiDung} onChange={frm.handleChange} onBlur={frm.handleBlur}>
                          <option>Vui lòng chọn loại người dùng</option>
                          <option>HV</option>
                          <option>GV</option>
                        </select>
                        {frm.errors.maLoaiNguoiDung ? <p className='text text-danger'>{frm.errors.maLoaiNguoiDung}</p> : ''}
                      </div>
                    </div>
                    <div className='form-group btn-them'>
                      <button type='submit' className='btn btn-primary'>Thêm</button>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                </div>
              </div>
            </div>
          </div>
          <form action="">
            <input
              onChange={userSearch}
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
            <thead>
              <tr className="title">
                <td>STT</td>
                <td>Tài khoản</td>
                <td>Họ tên</td>
                <td>Loại người dùng</td>
                <td>Email</td>
                <td>Số điện thoại</td>
                <td>Thao tác</td>
              </tr>
            </thead>
            <tbody>
              {renderUser()}
            </tbody>

          </table>
          {renderPagination()}
        </div>
      </div>
      <div
        className="modal fade"
        id="modalGhiDanh"
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
                <option value="">Lập trình front-end</option>
                <option value="">Lập trình back-end</option>
                <option value="">Lập trình mobile</option>
                <option value="">Lập trình java</option>
                <option value="">Tư duy lập trình</option>
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
                <thead>
                  <tr className="title">
                    <td>STT</td>
                    <td>Tên khóa học</td>
                    <td>Chờ xác nhận</td>
                  </tr>
                </thead>
                <tbody>
                  {renderWaitingCourse()}
                </tbody>
              </table>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-start">
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
                <thead>
                  <tr className="title">
                    <td>STT</td>
                    <td>Tên khóa học</td>
                    <td>Chờ xác nhận</td>
                  </tr>
                </thead>
                <tbody>
                  {renderCourseApprove()}
                </tbody>
              </table>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-start">
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
                      {frm.errors.soDt ? (
                        <p className="text text-danger">{frm.errors.soDt}</p>
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
