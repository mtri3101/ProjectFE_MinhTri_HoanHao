import React from 'react'
import { NavLink } from 'react-router-dom'
import "../Assets/Scss/UserManagement.scss"
import { useSelector, useDispatch } from 'react-redux'
import { DispatchType, RootState } from '../Redux/ConfigStore'
import { getUnSubcribeApi, UnSubcribeUser } from '../Redux/Reducers/UserReducer'
import { useEffect } from 'react'

type Props = {}

export default function UserManagement({ }: Props) {
    const { unSubcribeUser } = useSelector((state: RootState) => state.UserReducer)
    const dispatch: DispatchType = useDispatch()
    console.log(unSubcribeUser)

    // useEffect(() => {
    //     const actionAsync = getUnSubcribeApi()
    //     dispatch(actionAsync)
    // }, [])

    const renderUnSubcribeUser = () => {
        return unSubcribeUser.map((user: UnSubcribeUser, index: number) => {
            return <tr className='content' key={index}>
                <td>1</td>
                <td>{user.taiKhoan}</td>
                <td>123456</td>
                <td>{user.hoTen}</td>
                <td>haotrinh@gmail.com</td>
                <td>19009090</td>
                <td className='py-2'>
                    <button className='ghiDanh btn btn-warning' data-bs-toggle="modal" data-bs-target="#modalId">Ghi danh</button>
                    <button className='sua btn btn-primary mx-2'>Sửa</button>
                    <button className='xoa btn btn-danger'>Xóa</button>
                </td>
            </tr>
        })
    }

    return (
        <div className='container'>
            <div className='row'>
                <div>
                    <NavLink to={'#'} className="addCourse btn btn-success">Thêm người dùng</NavLink>
                    <form action="">
                        <input
                            type="text"
                            className="searchForm"
                            placeholder="Nhập vào tài khoản hoặc họ tên người dùng..."
                            name="search"
                        />
                        <button type='button' className='search btn btn-success ms-2'>Tìm kiếm</button>
                    </form>
                    <table className='table'>
                        <tr className='title'>
                            <td>STT</td>
                            <td>Tài khoản</td>
                            <td>Mật khẩu</td>
                            <td>Họ tên</td>
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
            </div>
            <div className="modal fade" id="modalId" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="modalTitleId">Chọn người dùng</h6>
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
                                    <h6>Khóa học chờ xác thực</h6>
                                </div>
                            </div>
                            <table className='table'>
                                <tr className='title'>
                                    <td>STT</td>
                                    <td>Tên khóa học</td>
                                    <td>Chờ xác nhận</td>
                                </tr>
                                <tr className='content'>
                                    <td>1</td>
                                    <td>Lập trình Front-end</td>
                                    <td className='py-2'>
                                        <button className='xacThuc btn btn-primary mx-2'>Xác thực</button>
                                        <button className='huy btn btn-danger'>Hủy</button>
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
                                    <h6>Khóa học đã ghi danh</h6>
                                </div>
                            </div>
                            <table className='table'>
                                <tr className='title'>
                                    <td>STT</td>
                                    <td>Tên khóa học</td>
                                    <td>Chờ xác nhận</td>
                                </tr>
                                <tr className='content'>
                                    <td>1</td>
                                    <td>Lập trình Front-end</td>
                                    <td className='py-2'>
                                        <button className='huy btn btn-danger'>Hủy</button>
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
        </div>
    )
}