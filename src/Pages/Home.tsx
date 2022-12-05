import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import '../Assets/Scss/Home.scss'
import { useSelector, useDispatch } from 'react-redux'
import { DispatchType, RootState } from '../Redux/ConfigStore'
import { CourseModel, getArrCouseApi } from '../Redux/Reducers/CourseReducer'
import { array } from 'yup'
type Props = {}

export default function Home({ }: Props) {

  const { arrCourse } = useSelector((state: RootState) => state.CourseReducer)
  const dispatch: DispatchType = useDispatch()

  useEffect(() => {
    const actionAsync = getArrCouseApi()
    dispatch(actionAsync)
  }, [])
  const homeArrCourse = arrCourse.slice(20,28)

  const renderCourse = (): JSX.Element[] => {
    return homeArrCourse.map((course: CourseModel, index: number) => {
      return <div className="col-3" key={index}>
        <div className="card">
          <img src={course.hinhAnh} alt="..." className='w-100' />
          <div className="card-body">
            <h1>{course.biDanh.replaceAll("-"," ")}</h1>
            <p>{course.moTa.length > 200 ? course.moTa.substring(0,100) + '...' : course.moTa}</p>
            <div className="row">
              <div className="col-6">
                <i className="fa-solid fa-calendar"> {course.ngayTao}</i>
              </div>
              <div className="col-6">
                <i className="fa-solid fa-eye"> {course.luotXem}</i>
              </div>
            </div>
            <button className='btn btn-primary'>Xem chi tiết</button>

          </div>
          <div className="outer-circle">
            <div className="inner-circle"></div>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <p>HOT</p>
          </div>
        </div>
      </div>
    })
  }

  return (
    <div className='container-fluid home-page'>
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="carousel-banner">
              <div className="row">
                <div className="col-6 left-content">
                  <h1>E-learning</h1>
                  <h2>Chào mừng bạn đã đến với hệ thống E-learning</h2>
                  <p>Hãy ấn bắt đầu để tìm hiểu ngay khóa học phù hợp nhất cho mình</p>
                  <NavLink to='#' >Bắt đầu</NavLink>
                </div>
                <div className="col-6 right-image">
                  <img src="./img/carousel.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='new-courses'>
        <h3>Các khóa học mới nhất</h3>
        <div className="row">
          {renderCourse()}
        </div>
      </div>
    </div>
  )
}