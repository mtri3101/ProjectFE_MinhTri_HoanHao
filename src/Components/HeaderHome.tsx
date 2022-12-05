import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Home from '../Pages/Home'
import '../Assets/Scss/HeaderHome.scss'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../Redux/ConfigStore'
import { CourseCategoryModel, getCourseCategoryApi } from '../Redux/Reducers/CourseReducer'

type Props = {}

export default function HeaderHome({ }: Props) {
  const { courseCategory } = useSelector((state: RootState) => state.CourseReducer);
  const dispatch: DispatchType = useDispatch();
  useEffect(() => {
    const actionAsync = getCourseCategoryApi();
    dispatch(actionAsync)
    console.log(courseCategory)
  }, [])

  const renderCourseCategory = (): JSX.Element[] => {
    return courseCategory.map((cate: CourseCategoryModel, index: number) => {
      return <li key={index}><NavLink className="dropdown-item" to='#'>{cate.tenDanhMuc}</NavLink></li>
    })
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light header-home">
      <div className="container-fluid ">
        <NavLink className="navbar-brand" to='/home'><img src="/img/logo.png" alt="" className='w-100' /></NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex form-custom">
            <input className="form-control me-2" type="search" placeholder="Tìm kiếm khóa học" />
            <button className="btn btn-outline-success" type="submit">Bắt đầu tìm</button>
          </form>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <a className="nav-link" href="#">Danh sách khóa học</a>
            </li> */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Danh sách khóa học
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {renderCourseCategory()}
              </ul>
            </li>
          </ul>
        </div>
        <NavLink className='btn btn-warning login' to='/login'>
          Đăng nhập
        </NavLink>
      </div>
    </nav>

  )
}