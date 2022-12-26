import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { DispatchType, RootState } from '../Redux/ConfigStore'
import { CourseModel, getCourseByCategoryApi } from '../Redux/Reducers/CourseReducer'
import '../Assets/Scss/CourseByCategory.scss'

type Props = {}

export default function CourseByCategory({ }: Props) {

    const { listCourseCatalog } = useSelector((state: RootState) => state.CourseReducer);
    const dispatch: DispatchType = useDispatch();

    const replaceImage = (error: any): void => {
        error.target.src = 'https://edulinks.vn/wp-content/uploads/2019/07/Web-Developer.jpg'
    }




    const params: any = useParams()
    useEffect(() => {
        const action = getCourseByCategoryApi(params.tenDanhMuc)
        dispatch(action)
    }, [params.tenDanhMuc])





    const renderKhoaHoc = (): JSX.Element[] => {
        return listCourseCatalog.map((course: CourseModel, index: number) => {
            return <div className="col-3" key={index}>
                <div className="card">
                    <img src={course.hinhAnh} onError={replaceImage} alt="..." />
                    <div className="card-body">
                        <h1>{course.biDanh}</h1>
                        <p>{course.moTa.length > 200 ? course.moTa.substring(0, 100) + '...' : course.moTa || course.moTa.length < 10 ? `  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae natus voluptatum voluptates voluptate doloribus iste voluptatem` : course.moTa}</p>
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
        </div>
    )
}