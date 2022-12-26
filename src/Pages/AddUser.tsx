import React from 'react'
import { NavLink } from 'react-router-dom'
import "../Assets/Scss/AddUser.scss"
import {  useFormik } from 'formik'
import * as yup from 'yup'
type Props = {}

export default function AddUser({}: Props) {

    const frm = useFormik({
        initialValues: {
          maKhoaHoc: '',
          tenKhoaHoc: '',
          danhGia: '',
          luotXem: '',
          tenDanhMuc: '',
          nguoiTao: '',
          ngayTao: '',
          hinhAnh: '',
          moTa: ''
        },
        validationSchema: yup.object().shape({
          maKhoaHoc: yup.string().required('Vui lòng nhập mã khóa học !'),
          tenKhoaHoc: yup.string().required('Vui lòng nhập tên khóa học !'),
          danhGia: yup.number().required('Vui lòng nhập vào đánh giá !'),
          luotXem: yup.number().required('Vui lòng nhập vào lượt xem !'),
          tenDanhMuc: yup.string().required('Vui lòng nhập tên danh mục'),
          nguoiTao: yup.string().required('Vui lòng chọn người tạo !'),
          ngayTao: yup.string().required('Vui lòng nhập ngày tạo !'),
          hinhAnh: yup.string().required('Vui lòng nhập hình ảnh !')
        }),
        onSubmit: (values) => {
          console.log(values);
        //   const action = getRegisterApi(values);
        //   dispatch(action);
        }
    })

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-2'>
                <NavLink to="#" className="course btn btn-success">Quản lý khóa học</NavLink><br /><br />
                <NavLink to={"/userManagement"} className="user btn btn-success">Quản lý người dùng</NavLink>
            </div>
            <div className='col-10'>
                <h3>Thêm khóa học</h3>
                <form className='container' onSubmit={frm.handleSubmit}>
                    <div className='row'>
                        <div className='col-6 left'>
                            <div className='form-group maKhoaHoc'>
                                <p className='mb-1 mt-3'>Mã khóa học</p>
                                <input className='form-control' name={"maKhoaHoc"} value={frm.values.maKhoaHoc} onChange={frm.handleChange} onBlur={frm.handleBlur} />
                                {frm.errors.maKhoaHoc ? <p className='text text-danger'>{frm.errors.maKhoaHoc}</p> : ''}
                            </div>
                            <div className='form-group tenKhoaHoc'>
                                <p className='mb-1 mt-3'>Tên khóa học</p>
                                <input className='form-control' name={"tenKhoaHoc"} value={frm.values.tenKhoaHoc} onChange={frm.handleChange} onBlur={frm.handleBlur} />
                                {frm.errors.tenKhoaHoc ? <p className='text text-danger'>{frm.errors.tenKhoaHoc}</p> : ''}
                            </div>
                            <div className='form-group tenDanhMuc'>
                                <p className='mb-1 mt-3'>Danh mục khóa học</p>
                                <select name="tenDanhMuc" id="tenDanhMuc">
                                    <option value="">Vui lòng chọn khóa học</option>
                                    <option value="">Lập trình Front-end</option>
                                    <option value="">Lập trình Back-end</option>
                                    <option value="">Lập trình di động</option>
                                    <option value="">Thiết kế web</option>
                                    <option value="">Lập trình Full-Stack</option>
                                    <option value="">Tư duy lập trình</option>
                                </select>
                                {frm.errors.tenDanhMuc ? <p className='text text-danger'>{frm.errors.tenDanhMuc}</p> : ''}
                            </div>
                            <div className='form-group ngayTao'>
                                <p className='mb-1 mt-3'>Ngày tạo</p>
                                <input className='form-control' name={"ngayTao"} value={frm.values.ngayTao} onChange={frm.handleChange} onBlur={frm.handleBlur} />
                                {frm.errors.ngayTao ? <p className='text text-danger'>{frm.errors.ngayTao}</p> : ''}
                            </div>
                        </div>
                        <div className='col-6 right'>
                            <div className='form-group danhGia'>
                                <p className='mb-1 mt-3'>Đánh giá</p>
                                <input className='form-control' name={"danhGia"} value={frm.values.danhGia} onChange={frm.handleChange} onBlur={frm.handleBlur} />
                                {frm.errors.danhGia ? <p className='text text-danger'>{frm.errors.danhGia}</p> : ''}
                            </div>
                            <div className='form-group luotXem'>
                                <p className='mb-1 mt-3'>Lượt xem</p>
                                <input className='form-control' name={"luotXem"} value={frm.values.luotXem} onChange={frm.handleChange} onBlur={frm.handleBlur} />
                                {frm.errors.luotXem ? <p className='text text-danger'>{frm.errors.luotXem}</p> : ''}
                            </div>
                            <div className='form-group nguoiTao'>
                                <p className='mb-1 mt-3'>Người tạo</p>
                                <select name="nguoiTao" id="nguoiTao">
                                    <option value="">Vui lòng chọn người tạo</option>
                                    <option value="">Trịnh Phạm Hoàn Hảo</option>
                                    <option value="">Lâm Tăng Minh Trí</option>
                                </select>
                                {frm.errors.nguoiTao ? <p className='text text-danger'>{frm.errors.nguoiTao}</p> : ''}
                            </div>
                            <div className='form-group hinhAnh'>
                                <p className='mb-1 mt-3'>Hình ảnh</p>
                                <input className='form-control' name={"hinhAnh"} value={frm.values.hinhAnh} onChange={frm.handleChange} onBlur={frm.handleBlur} />
                                {frm.errors.hinhAnh ? <p className='text text-danger'>{frm.errors.hinhAnh}</p> : ''}
                            </div>
                        </div>
                        <div className='form-group btn-capNhat'>  
                            <button type='submit' className='btn btn-primary'>Cập nhật</button>
                         </div>
                         <div className='form-group moTa'>
                            <p className='mb-1 mt-3'>Mô tả</p>
                            <textarea name="moTa" id="moTa" cols={123} rows={10} value={frm.values.moTa}></textarea>
                         </div>
                         <div className='form-group btn-themLuu'>  
                            <button type='submit' className='btn btn-primary'>Thêm</button>
                            <button type='submit' className='btn btn-success mx-3'>Lưu</button>
                         </div>
                    </div>
                </form>
            </div>     
        </div>
    </div>
  )
}