import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { DispatchType, RootState } from '../Redux/ConfigStore'
import { CourseModel, getCourseByCategoryApi } from '../Redux/Reducers/CourseReducer'
import '../Assets/Scss/CourseByCategory.scss'
import { error } from 'console'

type Props = {}

export default function CourseByCategory({ }: Props) {

    const { listCourseCatalog } = useSelector((state: RootState) => state.CourseReducer);
    const dispatch: DispatchType = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    const params: any = useParams()
    useEffect(() => {
        const action = getCourseByCategoryApi(params.tenDanhMuc)
        dispatch(action)
    }, [params.tenDanhMuc])

    const replaceImage = (error: any): void => {
        error.target.src = 'https://edulinks.vn/wp-content/uploads/2019/07/Web-Developer.jpg'
    }

    const renderKhoaHoc = (): JSX.Element[] => {
        return listCourseCatalog.map((course: CourseModel, index: number) => {
            return <div className="col-3" key={index}>
                <div className="card">
                    <img src={course.hinhAnh} onError={replaceImage} alt="..." />
                    <div className="card-body">
                        <h1>{course.biDanh}</h1>
                        <p>{course.moTa.length > 200 ? course.moTa.substring(0, 100) + '...' : course.moTa}</p>
                        <div className="row">
                            <div className="col-6 calendar">
                                <i className="fa-solid fa-calendar"><span>{course.ngayTao}</span></i>
                            </div>
                            <div className="col-6 eye">
                                <i className="fa-solid fa-eye"> <span>{course.luotXem}</span></i>
                            </div>
                        </div>
                        <NavLink className='btn btn-primary' to={`/chitiet/${course.maKhoaHoc}`}>Xem chi tiết</NavLink>
                    </div>
                </div>
            </div>
        })
    }

    return (
        <div className='container-fluid courseByCatalog'>
            <h2>Các khóa học phổ biến</h2>
            <div className="row">
                {renderKhoaHoc()}
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">«</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">4</a></li>
                    <li className="page-item"><a className="page-link" href="#">5</a></li>
                    <li className="page-item"><a className="page-link" href="#">6</a></li>
                    <li className="page-item"><a className="page-link" href="#">7</a></li>
                    <li className="page-item"><a className="page-link" href="#">8</a></li>
                    <li className="page-item"><a className="page-link" href="#">9</a></li>
                    <li className="page-item"><a className="page-link" href="#">10</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">»</span>
                        </a>
                    </li>
                </ul>
            </nav>

        </div>
    )
}