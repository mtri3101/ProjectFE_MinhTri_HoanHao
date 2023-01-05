import React, { useEffect, useState } from 'react'
import "../Assets/Scss/Register.scss"
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserApi, getProfileApi, getRegisterApi, getUserListApi, UserList } from '../Redux/Reducers/UserReducer'
import { DispatchType, RootState } from '../Redux/ConfigStore'
import { NavLink } from 'react-router-dom'
type Props = {}

export default function Register({ }: Props) {
  const { allUser } = useSelector((state: RootState) => state.UserReducer);
  const dispatch: DispatchType = useDispatch();
  const [checkValid, setCheckValid] = useState('')

  useEffect(() => {
    const action = getAllUserApi()
    dispatch(action)
  }, [])


  const frm = useFormik({
    initialValues: {
      hoTen: '',
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDT: '',
      maNhom: '',
    },
    validationSchema: yup.object().shape({
      hoTen: yup.string().required('Vui lòng nhập vào họ tên !'),
      taiKhoan: yup.string().required('Vui lòng nhập vào tài khoản !'),
      matKhau: yup.string().required('Vui lòng nhập vào mật khẩu !').min(6, 'Mật khẩu từ 6 - 20 ký tự !').max(20, 'Mật khẩu từ 6 - 20 ký tự !'),
      email: yup.string().required('Vui lòng nhập vào email !').email('Email không đúng định dạng !'),
      soDT: yup.number().required('Vui lòng nhập vào số điện thoại !').typeError('Số điện thoại phải là số !'),
      maNhom: yup.string().required('Vui lòng chọn mã nhóm !')
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const action = getRegisterApi(values);
      dispatch(action);
      const indexId = allUser.findIndex((user: UserList) => user.taiKhoan === values.taiKhoan)
      const indexEmail = allUser.findIndex((user: UserList) => user.email === values.email)
      if (indexId !== -1) {
        const validId = 'id'
        setCheckValid(validId)
        return
      }
      if (indexEmail !== -1) {
        const validEmail = 'email'
        setCheckValid(validEmail)
        return
      }
      const passValid = 'ok'
      setCheckValid(passValid)
    }
  });

  const renderModalContent = (checkValid: string) => {
    if (checkValid === 'id') {
      return <div className="modal-body">
        <div className="swal2-icon swal2-error swal2-animate-error-icon">
          <span className="swal2-x-mark">
            <span className="swal2-x-mark-line-left" />
            <span className="swal2-x-mark-line-right" />
          </span>
        </div>
        <h3>Tài khoản đã có người sử dụng</h3>
      </div>

    }
    if (checkValid === 'email') {
      return <div className="modal-body">
        <div className="swal2-icon swal2-error swal2-animate-error-icon">
          <span className="swal2-x-mark">
            <span className="swal2-x-mark-line-left" />
            <span className="swal2-x-mark-line-right" />
          </span>
        </div>
        <h3>Email đã có người sử dụng</h3>
      </div>
    }
    if (checkValid === 'ok') {
      return <div className="modal-body">
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip" />
            <span className="icon-line line-long" />
            <div className="icon-circle" />
            <div className="icon-fix" />
          </div>
        </div>
        <h3>Bạn đã đăng ký tài khoản thành công</h3>
        <NavLink to='/login' className='mt-3 d-block text-center ' onClick={routeToLogin}>Đến trang đăng nhập</NavLink>
      </div>
    }
  }

  const routeToLogin = () => {
    window.location.href = '/login'
  }


  return (
    <>
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            {renderModalContent(checkValid)}
          </div>
        </div>
      </div>
      <form className='form-group-container' onSubmit={frm.handleSubmit}>
        <h3>Đăng Ký</h3>
        <div className='container'>
          <div className='row'>
            <div className='form-group-hoTen'>
              <p>Họ tên</p>
              <input type="text" placeholder='Vui lòng nhập vào họ tên' name={"hoTen"} onChange={frm.handleChange} onBlur={frm.handleBlur} />
              {frm.errors.hoTen ? <p className='text text-danger'>{frm.errors.hoTen}</p> : ''}
            </div>
            <div className='form-group-taiKhoan'>
              <p>Tài khoản</p>
              <input type="text" placeholder='Vui lòng nhập vào tài khoản' name={"taiKhoan"} onChange={frm.handleChange} onBlur={frm.handleBlur} />
              {frm.errors.taiKhoan ? <p className='text text-danger'>{frm.errors.taiKhoan}</p> : ''}
            </div>
            <div className='form-group-matKhau'>
              <p>Mật khẩu</p>
              <input type="password" placeholder='Vui lòng nhập vào mật khẩu' name={"matKhau"} onChange={frm.handleChange} onBlur={frm.handleBlur} />
              {frm.errors.matKhau ? <p className='text text-danger'>{frm.errors.matKhau}</p> : ''}
            </div>
            <div className='form-group-email'>
              <p>Email</p>
              <input type="text" placeholder='Vui lòng nhập vào email ' name={"email"} onChange={frm.handleChange} onBlur={frm.handleBlur} />
              {frm.errors.email ? <p className='text text-danger'>{frm.errors.email}</p> : ''}
            </div>
            <div className='form-group-phone'>
              <p>Sô điện thoại</p>
              <input type="text" placeholder='Vui lòng nhập vào số điện thoại' name={"soDT"} onChange={frm.handleChange} onBlur={frm.handleBlur} />
              {frm.errors.soDT ? <p className='text text-danger'>{frm.errors.soDT}</p> : ''}
            </div>
            <div className='form-group-maNhom'>
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
                <option>GP10</option>
              </select>
              {frm.errors.maNhom ? <p className='text text-danger'>{frm.errors.maNhom}</p> : ''}
            </div>
          </div>
          <div className='button'>
            <button className='btn btn-primary' type='submit' data-bs-toggle="modal" data-bs-target="#exampleModal">Đăng ký</button>
          </div>
        </div>
      </form>
    </>
  )
}
