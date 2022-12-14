import React from 'react'
import "../Assets/Scss/Register.scss"
import {  useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { getRegisterApi, RegisterAction } from '../Redux/Reducers/UserReducer'
import { DispatchType, RootState } from '../Redux/ConfigStore'
type Props = {}

export default function Register({}: Props) {
  const { userRegister } = useSelector((state: RootState) => state.UserReducer);
  const dispatch: DispatchType = useDispatch();
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
    onSubmit: (values) => {
      console.log(values);
      const action = getRegisterApi(values);
      dispatch(action);
    }
  });
  return (
    <form className='form-group-container' onSubmit={frm.handleSubmit}>
      <h3>Đăng Ký</h3>
      <div className='container'>
        <div className='row'>
            <div className='form-group-hoTen'>
              <p>Họ tên</p>
              <input type="text" placeholder='Vui lòng nhập vào họ tên' name={"hoTen"} onChange={frm.handleChange} onBlur={frm.handleBlur}/>
              {frm.errors.hoTen ? <p className='text text-danger'>{frm.errors.hoTen}</p> : ''}
            </div>
            <div className='form-group-taiKhoan'>
              <p>Tài khoản</p>
              <input type="text" placeholder='Vui lòng nhập vào tài khoản' name={"taiKhoan"} onChange={frm.handleChange} onBlur={frm.handleBlur}/>
              {frm.errors.taiKhoan ? <p className='text text-danger'>{frm.errors.taiKhoan}</p> : ''}
            </div>
            <div className='form-group-matKhau'>
              <p>Mật khẩu</p>
              <input type="password" placeholder='Vui lòng nhập vào mật khẩu' name={"matKhau"} onChange={frm.handleChange} onBlur={frm.handleBlur}/>
              {frm.errors.matKhau ? <p className='text text-danger'>{frm.errors.matKhau}</p> : ''}
            </div>
            <div className='form-group-email'>
              <p>Email</p>
              <input type="text" placeholder='Vui lòng nhập vào email ' name={"email"} onChange={frm.handleChange} onBlur={frm.handleBlur}/>
              {frm.errors.email ? <p className='text text-danger'>{frm.errors.email}</p> : ''}
            </div>
            <div className='form-group-phone'>
              <p>Sô điện thoại</p>
              <input type="text" placeholder='Vui lòng nhập vào số điện thoại' name={"soDT"} onChange={frm.handleChange} onBlur={frm.handleBlur}/>
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
                <option>GP010</option>
              </select>
              {frm.errors.maNhom ? <p className='text text-danger'>{frm.errors.maNhom}</p> : ''}
            </div>
        </div>
        <div className='button'>
        <button className='btn btn-primary' type='submit'>Đăng ký</button>
        </div>
      </div>
    </form>
  )
}