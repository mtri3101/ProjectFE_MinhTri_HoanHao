import React, { useEffect, useState } from "react";
import "../Assets/Scss/Login.scss";
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'
import { getProfileApi, getUserListApi, loginApi, UserList, UserProfile } from '../Redux/Reducers/UserReducer'
import { DispatchType, RootState } from '../Redux/ConfigStore'
import { history } from '../index';
import axios, { AxiosError } from "axios";
type Props = {};

export default function Login({ }: Props) {
  const { userProfile } = useSelector((state: RootState) => state.UserReducer)
  const [check, setCheck] = useState(false)
  const [userId, setUserId] = useState('')
  const { userList } = useSelector((state: RootState) => state.UserReducer)
  const dispatch: DispatchType = useDispatch();
  useEffect(() => {
    const action = getProfileApi();
    dispatch(action)
  }, [userProfile])
  // console.log('userProfile', userProfile)

  useEffect(() => {
    const action = getUserListApi(userId);
    dispatch(action)
  }, [userId, userList])
  // console.log(userList)



  const handleInput = (event: any) => {
    const { value } = event.target
    setUserId(value)
  }


  const frm = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    validationSchema: yup.object().shape({
      taiKhoan: yup.string().required('Vui lòng nhập vào tài khoản !'),
      matKhau: yup.string().required('Vui lòng nhập vào mật khẩu !').min(6, 'Mật khẩu từ 6 - 20 ký tự !').max(20, 'Mật khẩu từ 6 - 20 ký tự !'),
    }),
    onSubmit: (values) => {
      if (AxiosError.ERR_BAD_RESPONSE) {
        console.log('123')
      }
      setUserId(values.taiKhoan);
      const action = loginApi(values);
      dispatch(action);
      if (userList[0]?.taiKhoan) {
        setCheck(true)
        setTimeout(goToProfile, 3000)
      } else {
        setCheck(false)
      }

    }
  });
  const goToProfile = () => {
    if (userProfile.hoTen) {
      history.push('/profile')
    }
    return <div className='form-container'>
      <div className='form-control-taiKhoan'>
        <p>Tài Khoản</p>
        <input placeholder="Vui lòng nhập vào tài khoản" type="text" name='taiKhoan' id='taiKhoan' onChange={frm.handleChange} onBlur={frm.handleBlur} onInput={handleInput} />
        {frm.errors.taiKhoan ? <p className='text text-danger mt-1'>{frm.errors.taiKhoan}</p> : ''}
      </div>
      <div className='form-control-matKhau'>
        <p>Mật Khẩu</p>
        <input placeholder="Vui lòng nhập vào mật khẩu" type="password" name='matKhau' id='matKhau' onChange={frm.handleChange} onBlur={frm.handleBlur} />
        {frm.errors.matKhau ? <p className='text text-danger'>{frm.errors.matKhau}</p> : ''}
      </div>
      <div className='form-control-btn text-center mt-3'>
        <NavLink to="/register" className='me-4 text-decoration-none'>Đăng Ký</NavLink>
        <button className='btn btn-warning' type="submit" >Đăng Nhập</button>
      </div>
      <div>
      </div>
    </div>
  }




  const renderModal = (test: boolean) => {
    if (test) {
      return <h2>OK</h2>
    } else {
      return <h2>Fail</h2>
    }
  }

  return (
    <div className="loginBody">
      <form className='form-group' onSubmit={frm.handleSubmit}>
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              {renderModal(check)}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        <h3 className='login'>Đăng Nhập</h3>
        {goToProfile()}
      </form>
    </div>
  );
}
