import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DispatchType, RootState } from '../Redux/ConfigStore'
import { CourseModel, getArrCouseApi } from '../Redux/Reducers/CourseReducer'
import '../Assets/Scss/CourseByCategory.scss'
type Props = {}

export default function Search({ }: Props) {
    const { arrCourse } = useSelector((state: RootState) => state.CourseReducer)
    const dispatch: DispatchType = useDispatch()
    const params: any = useParams()



    useEffect(() => {
        const action = getArrCouseApi();
        dispatch(action)
    }, [])


    console.log(arrCourse)
    console.log(params.tuKhoa.toLowerCase())


    const arrKeyword: any = arrCourse.filter((course: CourseModel) => course.tenKhoaHoc.toLocaleLowerCase().includes(params.tuKhoa.toLowerCase()));
    console.log(arrKeyword);

    const replaceImage = (error: any): void => {
        error.target.src = 'https://edulinks.vn/wp-content/uploads/2019/07/Web-Developer.jpg'
    }

    const renderCourseSearch = (): JSX.Element => {
        return arrKeyword.map((course: CourseModel, index: number) => {
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
                        <button className='btn btn-primary'>Xem chi tiết</button>
                    </div>
                </div>
            </div>
        })
    }
    return (
        <div className='container-fluid courseByCatalog'>
            <h3>{arrKeyword.length > 0 ? `Tìm thấy ${arrKeyword.length} khóa học phù hợp` : 'Không tìm thấy khóa học phù hợp'}</h3>
            <div className="row">
                {renderCourseSearch()}
            </div>
        </div>
    )
}