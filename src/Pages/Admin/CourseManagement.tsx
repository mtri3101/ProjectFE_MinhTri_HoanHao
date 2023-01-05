import React, { useEffect, useState, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { DispatchType, RootState } from '../../Redux/ConfigStore'
import { AddCourse, addCourseApi, CourseModel, deleteCourseApi, getCoursePaginationApi } from '../../Redux/Reducers/CourseReducer'
import '../../Assets/Scss/Admin/Course.scss'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { getCourseStudentApi, getWaitingStudentApi, UnSubcribeUser } from '../../Redux/Reducers/UserReducer'

type Props = {}

export default function CourseManagement({ }: Props) {
    const { paginateCourse } = useSelector((state: RootState) => state.CourseReducer)
    const { courseStudent } = useSelector((state: RootState) => state.UserReducer)
    const { listWaitingStudent } = useSelector((state: RootState) => state.UserReducer)
    const [currentPage, setCurrentPage] = useState(1)
    const [valueSearch, setValueSearch] = useState('')
    const dispatch: DispatchType = useDispatch()

    const value = localStorage.getItem("userLogin")


    //paginateCourse useEffect
    useEffect(() => {
        const action = getCoursePaginationApi('', currentPage, 5)
        dispatch(action)
    }, [currentPage])

    const searchCourse = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setValueSearch(value)
    }

    const renderCourse = () => {
        if (!valueSearch) {
            return paginateCourse?.items?.map((course: CourseModel, index: number) => {
                return <tr key={index}>
                    <td>{index += 1}</td>
                    <td>{course.maKhoaHoc}</td>
                    <td>{course.tenKhoaHoc}</td>
                    <td> <img src={course.hinhAnh} alt="..." className='w-100' style={{ width: '100px', height: '50px' }} /> </td>
                    <td>{course.luotXem}</td>
                    <td>{course.nguoiTao.hoTen}</td>
                    <td>
                        <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#modalGhiDanh" onClick={() => openModalGhiDanh(course.maKhoaHoc)}>Ghi danh</button>
                        <button className='btn btn-warning mx-3'>Sửa</button>
                        <button className='btn btn-danger' onClick={() => deleteCourse(course.maKhoaHoc)}>Xóa</button>
                    </td>
                </tr>
            })
        } else {
            const arrSearch = paginateCourse?.items?.filter((course: CourseModel) => course.tenKhoaHoc.toLowerCase().includes(valueSearch.toLowerCase()) || course.maKhoaHoc.toLowerCase().includes(valueSearch.toLowerCase()));
            return arrSearch.map((course: CourseModel, index: number) => {
                return <tr key={index}>
                    <td>{index += 1}</td>
                    <td>{course.maKhoaHoc}</td>
                    <td>{course.tenKhoaHoc}</td>
                    <td> <img src={course.hinhAnh} alt="..." className='w-100' style={{ width: '100px', height: '50px' }} /> </td>
                    <td>{course.luotXem}</td>
                    <td>{course.nguoiTao.hoTen}</td>
                    <td>
                        <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#modalGhiDanh" onClick={() => openModalGhiDanh(course.maKhoaHoc)}>Ghi danh</button>
                        <button className='btn btn-warning mx-3'>Sửa</button>
                        <button className='btn btn-danger' onClick={() => deleteCourse(course.maKhoaHoc)}>Xóa</button>
                    </td>
                </tr>
            })
        }

    }

    const renderPagination = () => {
        if (paginateCourse.totalPages >= 2) {
            return (<nav aria-label="Page navigation example"  >
                <ul className="pagination" >
                    {currentPage === 1 ? <li className="page-item inactive" ><a className="page-link" href="#">Previous</a></li> : <li className="page-item"><a className="page-link" href="#" onClick={prevPage}>Previous</a></li>}
                    {renderPage()}
                    {currentPage === paginateCourse.totalPages ? <li className="page-item inactive" ><a className="page-link" href="#">Next</a></li> : <li className="page-item"><a className="page-link" href="#" onClick={nextPage}>Next</a></li>}
                </ul>
            </nav>)
        }
    }

    const renderPage = () => {
        const arr = []
        for (let i = 1; i <= paginateCourse.totalPages; i++) {
            const li = <li className="page-item" key={i} value={i} onClick={() => handleClickPage(i)}><a className="page-link" href="#" >{i}</a></li>
            arr.push(li)
        }
        return arr
    }

    const nextPage = () => {
        if (currentPage !== paginateCourse.totalPages) {
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
            maKhoaHoc: '',
            danhGia: 0,
            tenKhoaHoc: '',
            ngayTao: '',
            maNhom: '',
            moTa: '',
            luotXem: 0,
            danhMucKhoaHoc: '',
            hinhAnh: ''
        },
        validationSchema: yup.object().shape({
            maKhoaHoc: yup.string().required('Vui lòng nhập vào mã khóa học !'),
            danhGia: yup.string().required('Vui lòng nhập vào đánh giá !'),
            tenKhoaHoc: yup.string().required('Vui lòng nhập vào tên khóa học !'),
            ngayTao: yup.string().required('Vui lòng nhập vào ngày tạo khóa học !'),
            hinhAnh: yup.string().required('Vui lòng nhập vào link hình ảnh !'),
            moTa: yup.string().required('Vui lòng nhập vào mô tả khóa học !'),
            luotXem: yup.string().required('Vui lòng nhập vào lượt xem khóa học !'),
        }),
        onSubmit: (values, { resetForm }) => {
            if (value !== null) {
                const id = JSON.parse(value)
                const body: AddCourse = {
                    maKhoaHoc: values.maKhoaHoc,
                    biDanh: values.tenKhoaHoc,
                    tenKhoaHoc: values.tenKhoaHoc,
                    moTa: values.moTa,
                    luotXem: values.luotXem,
                    danhGia: values.danhGia,
                    hinhAnh: values.hinhAnh,
                    maNhom: values.maNhom,
                    ngayTao: values.ngayTao,
                    maDanhMucKhoaHoc: values.danhMucKhoaHoc,
                    taiKhoanNguoiTao: id.taiKhoan
                }
                const action = addCourseApi(body);
                dispatch(action)
            }
            resetForm();

        }
    });

    const openModalGhiDanh = (maKhoaHoc: string) => {
        getWaitingStudent(maKhoaHoc)
        getCourseStudent(maKhoaHoc)
    }

    const getWaitingStudent = (maKhoaHoc: string) => {
        const data = JSON.parse(maKhoaHoc)
        const action = getWaitingStudentApi(data);
        dispatch(action)
    }

    const renderWaitingStudent = (): JSX.Element[] => {
        return listWaitingStudent.map((user: UnSubcribeUser, index: number) => {
            return <tr className='content' key={index}>
                <td>{index}</td>
                <td>{user.hoTen}</td>
                <td className='py-2'>
                    <button className='xacThuc btn btn-primary mx-2'>Xác thực</button>
                    <button className='huy btn btn-danger'>Hủy</button>
                </td>
            </tr>
        })
    }

    const getCourseStudent = (maKhoaHoc: string) => {
        const data = JSON.parse(maKhoaHoc)
        const action = getCourseStudentApi(data);
        dispatch(action)
    }

    const renderCourseStudent = (): JSX.Element[] => {
        return courseStudent.map((student: UnSubcribeUser, index: number) => {
            return <tr className='content' key={index}>
                <td>{index}</td>
                <td>{student.hoTen}</td>
                <td className='py-2'>
                    <button className='huy btn btn-danger'>Hủy</button>
                </td>
            </tr>
        })
    }

    const deleteCourse = (maKhoaHoc: string) => {
        const action = deleteCourseApi(maKhoaHoc)
        dispatch(action)
    }

    return (
        <div >
            <button className='btn btn-success my-3' data-bs-toggle="modal" data-bs-target="#addCourseModal" >Thêm khóa học</button>

            <div className="modal fade admin-course" id="addCourseModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Quản lý khóa học</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <h2>Thêm khóa học</h2>
                            <form className='row' onSubmit={frm.handleSubmit}>
                                <div className="col-6">
                                    <div className='form-group'>
                                        <i className="fa-solid fa-barcode"></i>
                                        <input type='input' className='form-control' placeholder='Mã khóa học' name='maKhoaHoc' id='maKhoaHoc' onChange={frm.handleChange} onBlur={frm.handleBlur} />
                                        {frm.errors.maKhoaHoc ? <p className='text text-danger mt-1'>{frm.errors.maKhoaHoc}</p> : ''}
                                    </div>
                                    <div className='form-group '>
                                        <i className="fa-solid fa-list-check "></i>
                                        <select className='form-control' placeholder='Danh mục khóa học' name='danhMucKhoaHoc' id="danhMucKhoaHoc" value={frm.values.danhMucKhoaHoc} onChange={frm.handleChange} onBlur={frm.handleBlur} >
                                            <option value="" label='Danh mục khóa học'></option>
                                            <option label='Lập trình FrontEnd'>FrontEnd</option>
                                            <option label='Lập trình BackEnd'>BackEnd</option>
                                            <option label='Lập trình Fullstack'>FullStack</option>
                                            <option label='Lập trình Mobile'>DiDong</option>
                                            <option label='Thiết kế website'>Design</option>
                                            <option label='Tư duy lập trình'>TuDuy</option>
                                        </select>
                                        <i className="fa-solid fa-chevron-down"></i>
                                    </div>
                                    <div className='form-group'>
                                        <i className="fa-solid fa-user-check"></i>
                                        <input type="input" className='form-control' placeholder='Đánh giá' name='danhGia' id='danhGia' onChange={frm.handleChange} onBlur={frm.handleBlur} />
                                    </div>
                                    <div className='form-group'>
                                        <i className="fa-solid fa-user-plus"></i>
                                        <select className='form-control' name='maNhom' id="maNhom" value={frm.values.maNhom} onChange={frm.handleChange} onBlur={frm.handleBlur} placeholder="Mã nhóm">
                                            <option>Mã nhóm</option>
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
                                            <option>GP11</option>
                                            <option>GP12</option>
                                            <option>GP13</option>
                                            <option>GP14</option>
                                            <option>GP15</option>
                                        </select>
                                        <i className="fa-solid fa-chevron-down"></i>
                                        {frm.errors.maNhom ? <p className='text text-danger'>{frm.errors.maNhom}</p> : ''}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <i className="fa-solid fa-user"></i>
                                        <input type='input' className='form-control' placeholder='Tên khóa học' name='tenKhoaHoc' id='tenKhoaHoc' onChange={frm.handleChange} onBlur={frm.handleBlur} />
                                        {frm.errors.tenKhoaHoc ? <p className='text text-danger'>{frm.errors.tenKhoaHoc}</p> : ''}
                                    </div>
                                    <div className="form-group">
                                        <i className="fa-regular fa-calendar"></i>
                                        <input type='input' className='form-control' placeholder='Ngày tạo' id='ngayTao' name='ngayTao' onChange={frm.handleChange} onBlur={frm.handleBlur} />
                                        {frm.errors.ngayTao ? <p className='text text-danger'>{frm.errors.ngayTao}</p> : ''}
                                    </div>
                                    <div className="form-group">
                                        <i className="fa-solid fa-eye"></i>
                                        <input type="input" className='form-control' placeholder='Lượt xem' id='luotXem' name='luotXem' onChange={frm.handleChange} onBlur={frm.handleBlur} />
                                        {frm.errors.luotXem ? <p className='text text-danger'>{frm.errors.luotXem}</p> : ''}
                                    </div>
                                    <div className="form-group">
                                        <i className="fa-solid fa-image"></i>
                                        <input type="input" className='form-control' placeholder='Nhập link hình ảnh' id='hinhAnh' name='hinhAnh' onChange={frm.handleChange} onBlur={frm.handleBlur} />
                                        {frm.errors.hinhAnh ? <p className='text text-danger'>{frm.errors.hinhAnh}</p> : ''}
                                    </div>
                                </div>
                                <h2>Mô tả khóa học</h2>
                                <textarea name='moTa' id='moTa' placeholder='Hãy viết mô tả khóa học ở đây' onChange={frm.handleChange} onBlur={frm.handleBlur} />
                                {frm.errors.moTa ? <p className='text text-danger'>{frm.errors.moTa}</p> : ''}
                                <button type="submit" className="btn btn-primary btn-submit" >Thêm</button>
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
                    type="text"
                    className="searchForm"
                    placeholder="Nhập vào tên khóa học hoặc mã khóa học"
                    name="search"
                    onChange={searchCourse}
                />
                <button type='button' className='search btn btn-success ms-2'>Tìm kiếm</button>
            </form>
            <table className='table'>
                <thead>
                    <tr className='title'>
                        <td>STT</td>
                        <td>Mã khóa học</td>
                        <td>Tên khóa học</td>
                        <td style={{ maxWidth: '500px' }}>Hình ảnh</td>
                        <td>Lượt xem</td>
                        <td>Người tạo</td>
                        <td style={{ minWidth: '265px' }}>Thao tác</td>
                    </tr>
                </thead>
                <tbody>
                    {renderCourse()}
                </tbody>
            </table>
            {renderPagination()}
            {/* <!-- Modal --> */}
            <div className="modal fade" id="modalGhiDanh" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
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
                            <NavLink to={"#"} className="btn btn-warning mx-2">Ghi danh</NavLink>
                            <hr className='hr' />
                            <div className='hocVienXacThuc'>
                                <div className='col-left'>
                                    <h6>Học viên chờ xác thực</h6>
                                </div>
                            </div>
                            <table className='table'>
                                <thead>
                                    <tr className='title'>
                                        <td>STT</td>
                                        <td>Tên Học viên</td>
                                        <td>Chờ xác nhận</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderWaitingStudent()}
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-end">
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">«</span>
                                        </a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">»</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                            <hr className='hr' />
                            <div className='hocVienXacThuc'>
                                <div className='col-left'>
                                    <h6>Học viên đã ghi danh</h6>
                                </div>
                            </div>
                            <table className='table'>
                                <thead>
                                    <tr className='title'>
                                        <td>STT</td>
                                        <td>Tên khóa học</td>
                                        <td>Chờ xác nhận</td>
                                    </tr>
                                </thead>
                                <tbody>

                                    {renderCourseStudent()}
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-end">
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">«</span>
                                        </a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">»</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" className="btn btn-primary">Lưu</button>
                        </div>
                    </div>
                </div>
            </div>


        </div >
    )
}