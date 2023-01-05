import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import "../Assets/Scss/Admin/AdminTemplate.scss"
type Props = {}

export default function AddUser({ }: Props) {

    useEffect(() => {
        // @ts-ignore
        const data = JSON.parse(localStorage.getItem('userLogin'))
        if (!data) {
            alert('Vui lòng đăng nhập')
            window.location.href = '/login'
        }else{
            if (data.maLoaiNguoiDung !== 'GV') {
                alert('Bạn không có quyền truy cập vào trang này')
                window.location.href = '/home'
            }
        }
    }, [])


    return (
        <div className='container admin'>
            <div className='row'>
                <div className='col-1'>
                    <NavLink to="/admin/quanlykhoahoc" className="course btn btn-success">Quản lý khóa học</NavLink><br /><br />
                    <NavLink to="/admin/quanlynguoidung" className="user btn btn-success">Quản lý người dùng</NavLink>
                </div>
                <div className="col-11">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}