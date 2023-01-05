import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { DispatchType, RootState } from '../Redux/ConfigStore'
import { CourseModel, getArrCouseApi, getCoursePaginationApi } from '../Redux/Reducers/CourseReducer'
import '../Assets/Scss/CourseByCategory.scss'

type Props = {}

export default function Search({ }: Props) {
    const { paginateCourse } = useSelector((state: RootState) => state.CourseReducer)
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch: DispatchType = useDispatch()
    const params: any = useParams()


    useEffect(() => {
        console.log(currentPage)
        const action = getCoursePaginationApi(params.tuKhoa, currentPage, 8);
        dispatch(action)
    }, [currentPage, params.tuKhoa])



    const replaceImage = (error: any): void => {
        error.target.src = 'https://edulinks.vn/wp-content/uploads/2019/07/Web-Developer.jpg'
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


    const renderCourseSearch = (): JSX.Element[] => {
        return paginateCourse?.items?.map((course: CourseModel, index: number) => {
            return <div className="col-12 col-md-6 col-xxl-3 item" key={index}>
                <div className="card">
                    <img src={course?.hinhAnh} onError={replaceImage} alt="..." />
                    <div className="card-body">
                        <h1>{course?.biDanh}</h1>
                        <p>{course.moTa?.length > 200 ? course.moTa.substring(0, 100) + '...' : course?.moTa || course?.moTa?.length < 10 ? `  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae natus voluptatum voluptates voluptate doloribus iste voluptatem` : course?.moTa}</p>
                        <div className="row">
                            <div className="col-6 calendar">
                                <i className="fa-solid fa-calendar"><span>{course?.ngayTao}</span></i>
                            </div>
                            <div className="col-6 eye">
                                <i className="fa-solid fa-eye"> <span>{course?.luotXem}</span></i>
                            </div>
                        </div>
                        <NavLink to={`/chitiet/${course?.maKhoaHoc}`}>Xem chi tiết</NavLink>
                    </div>
                </div>
            </div>
        })
    }

    return (
        <div className='container-fluid courseByCatalog'>
            <div className="main">
                <h3>{paginateCourse.totalCount > 0 ? `Tìm thấy ${paginateCourse.totalCount} khóa học phù hợp` : 'Không tìm thấy khóa học phù hợp'}</h3>
                <div className="row">
                    {renderCourseSearch()}
                </div>
                {renderPagination()}
            </div>
        </div>
    )
}