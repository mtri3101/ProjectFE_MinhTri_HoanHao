import { $CombinedState } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import '../Assets/Scss/Detail.scss'
import { DispatchType, RootState } from '../Redux/ConfigStore'
import { CourseModel, getArrCouseApi, getCourseDetailApi } from '../Redux/Reducers/CourseReducer'
import { getProfileApi } from '../Redux/Reducers/UserReducer'

type Props = {}

export default function Detail({ }: Props) {
    const { arrCourse } = useSelector((state: RootState) => state.CourseReducer);
    const { courseDetail } = useSelector((state: RootState) => state.CourseReducer);
    const { userProfile } = useSelector((state: RootState) => state.UserReducer)
    const dispatch: DispatchType = useDispatch();
    const params: any = useParams()

    useEffect(() => {
        const action = getProfileApi();
        dispatch(action)
    }, [])

    useEffect(() => {
        const action = getArrCouseApi();
        dispatch(action)
    }, [])

    useEffect(() => {
        const action = getCourseDetailApi(params.maKhoaHoc);
        dispatch(action)
    }, [params.maKhoaHoc])

    const openModal = () => {
        return <div id="myModal" className="modal fade" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <p>Modal body text goes here.<span className="badge">By <a href="https://webdevrahul007.w3spaces.com/" />Rahul jangid</span></p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    }


    const handleRegister = () => {
        const detail = {
            "maKhoaHoc": params.maKhoaHoc,
            "taiKhoan": userProfile.taiKhoan,
        }
        // const action = getRegisterCourseApi(detail);
        // dispatch(action);
        // alert("Bạn đã đăng ký khóa học thành công")

    }



    const replaceImage = (error: any): void => {
        error.target.src = 'https://edulinks.vn/wp-content/uploads/2019/07/Web-Developer.jpg'
    }

    const relatedCourse = arrCourse.slice(0, 4);

    const renderCourseRelated = (): JSX.Element[] => {
        return relatedCourse.map((course: CourseModel, index: number) => {
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
        <div className='container-fluid detail-page'>
            <h2 className='title'>Thông tin chi tiết khóa học</h2>
            <div className="row main">
                <div className="col-7">
                    <h2>Lập trình Front End cơ bản đến nâng cao</h2>
                    <div className='intro'>
                        <h3><span> Vì sao bạn nên chọn lập trình Front End?</span>
                            <br /><br />
                            Đối với những người mới khi muốn tham gia vào lập trình web đều cảm thấy khó khăn khi không biết bắt đầu từ đâu. Lập trình web có 3 hướng chính: Front end, Back end và Fullstack. Với Back end hay Full stack đòi hỏi bạn phải có kinh nghiệm nhất định trong lập trình về thuật toán và hiểu rõ các ngôn ngữ phát triển web. Thông qua khóa học này, bạn sẽ thực hành qua các dự án thực tế và bao gồm lộ trình phù hợp cho ngay cả người mới bắt đầu.
                        </h3>
                        <hr />
                    </div>
                    <div className="target">
                        <h3>Mục tiêu của khóa học</h3>
                        <div className="row">
                            <div className="col-6">
                                <h4><i className="fa-solid fa-check"></i>Nắm vững và vận dụng các kỹ năng mềm (làm việc nhóm, kỹ năng giao tiếp, quản lý thời gian, task)</h4>
                                <h4><i className="fa-solid fa-check"></i>Thực hành và tìm hiểu sâu các công cụ lập trình</h4>
                                <h4><i className="fa-solid fa-check"></i>Nắm vững và thực hành kỹ thuật code, kỹ năng phân tích giải quyết vấn đề</h4>
                            </div>
                            <div className="col-6">
                                <h4><i className="fa-solid fa-check"></i>Nắm vững các phương pháp để tay nghề luôn được vững chắc, kiến thức luôn được cập nhật</h4>
                                <h4><i className="fa-solid fa-check"></i>Nắm rõ tố chất của một lập trình viên chuyên nghiệp</h4>
                                <h4><i className="fa-solid fa-check"></i>Hiểu và nắm các kỹ năng cần thiết liên quan đến nghề Lập trình Fullstack</h4>
                            </div>
                        </div>
                    </div>
                    <div className='skill'>
                        <h3>Kiến thức trong khóa học này</h3>
                        <div>
                            <img src="/img/html.png" alt="html_image" />
                            <img src="/img/css.png" alt="css_image" />
                            <img src="/img/js.png" alt="js_image" />
                            <img src="/img/bootstrap.png" alt="bootstrap_image" />
                            <img src="/img/git.png" alt="git_image" />
                            <img src="/img/es6.png" alt="es6_image" />
                            <img src="/img/sass.png" alt="sass_image" />
                            <img src="/img/api.png" alt="api_image" />
                            <img src="/img/react.svg.png" alt="react_image" />
                            <img src="/img/typescript.png" alt="typescript_image" />
                        </div>
                    </div>
                </div>
                <div className="col-5">
                    <div className="card">
                        <img src={courseDetail?.hinhAnh} alt="" className='w-100' />
                        <div className="card-body">
                            <h2>10.000.000</h2>
                            <h3>Số học viên đã đăng ký: <span>{courseDetail?.soLuongHocVien === 0 ? 'Chưa có' : courseDetail?.soLuongHocVien} </span></h3>
                            <h3>Thời gian học:<span> 150 giờ</span></h3>
                            <h3>Trình độ:<span> Dành cho người mới</span></h3>
                            <h3>Ngày bắt đầu: <span>{courseDetail?.ngayTao}</span></h3>
                            <NavLink to={'#'} className='btn btn-primary'>Đăng ký ngay</NavLink>
                            <input placeholder='Mã giảm giá'></input>
                        </div>
                    </div>
                </div>
            </div>
            <div className='related-course'>
                <h2>Những khóa học khác bạn có thể tham khảo</h2>
                <div className="row">
                    {renderCourseRelated()}
                </div>
            </div>
        </div>
    )
}