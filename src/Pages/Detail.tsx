import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import '../Assets/Scss/Detail.scss'
import { DispatchType, RootState } from '../Redux/ConfigStore'
import { CourseModel, getArrCouseApi, getCourseDetailApi } from '../Redux/Reducers/CourseReducer'
import { CourseDetail, getProfileApi, getRegisterCourseApi } from '../Redux/Reducers/UserReducer'
import '../Assets/Scss/Modal.scss'

type Props = {}

export default function Detail({ }: Props) {
    const { arrCourse } = useSelector((state: RootState) => state.CourseReducer);
    const { courseDetail } = useSelector((state: RootState) => state.CourseReducer);
    const { userProfile } = useSelector((state: RootState) => state.UserReducer)
    const [modalRender, setModalRender] = useState(false)
    const params: any = useParams()


    const dispatch: DispatchType = useDispatch();

    useEffect(() => {
        const action = getProfileApi();
        dispatch(action)
    }, [userProfile.chiTietKhoaHocGhiDanh])

    const detail = {
        "maKhoaHoc": params.maKhoaHoc,
        "taiKhoan": userProfile.taiKhoan,
    }


    useEffect(() => {
        const action = getArrCouseApi();
        dispatch(action)
    }, [])

    useEffect(() => {
        const action = getCourseDetailApi(params.maKhoaHoc);
        dispatch(action)
    }, [params.maKhoaHoc])



    const handleRegister = () => {
        const index = userProfile.chiTietKhoaHocGhiDanh.findIndex((item: CourseDetail) => item.maKhoaHoc === params.maKhoaHoc)
        if (index === -1) {
            const action = getRegisterCourseApi(detail);
            dispatch(action);
            setModalRender(true)
        }
        if (index !== -1) {
            setModalRender(false)
        }
    }



    const renderContentModal = (check: boolean) => {
        if (check) {
            return <div className="modal-body">
                <div className="success-checkmark">
                    <div className="check-icon">
                        <span className="icon-line line-tip" />
                        <span className="icon-line line-long" />
                        <div className="icon-circle" />
                        <div className="icon-fix" />
                    </div>
                </div>
                <h3>Bạn đã ghi danh thành công</h3>
            </div>
        } else {
            return <div className="modal-body">
                <div className="swal2-icon swal2-error swal2-animate-error-icon">
                    <span className="swal2-x-mark">
                        <span className="swal2-x-mark-line-left" />
                        <span className="swal2-x-mark-line-right" />
                    </span>
                </div>
                <h3>Bạn đã ghi danh khóa học này rồi </h3>
            </div>
        }
    }



    const replaceImage = (error: any): void => {
        error.target.src = 'https://edulinks.vn/wp-content/uploads/2019/07/Web-Developer.jpg'
    }

    const relatedCourse = arrCourse.slice(0, 4);

    const renderCourseRelated = (): JSX.Element[] => {
        return relatedCourse.map((course: CourseModel, index: number) => {
            return <div className="col-12 col-md-6 col-xxl-3 item" key={index}>
                <div className="card">
                    <img src={course.hinhAnh} onError={replaceImage} alt="..." />
                    <div className="card-body">
                        <h1>{course.biDanh}</h1>
                        <p>{course.moTa?.length > 200 ? course.moTa.substring(0, 100) + '...' : course.moTa}</p>
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
            <div className="modal fade" id="exampleModal" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        {renderContentModal(modalRender)}
                    </div>
                </div>
            </div>


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
                            <img src="/img/react.png" alt="react_image" />
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
                            <NavLink to={'#'} className='btn btn-primary' onClick={handleRegister} data-bs-toggle="modal" data-bs-target="#exampleModal">Đăng ký ngay</NavLink>
                            <input placeholder='Mã giảm giá'></input>
                        </div>
                    </div>
                </div>
            </div>
            <div className='related-course'>
                <div className="main">
                    <h2>Những khóa học khác bạn có thể tham khảo</h2>
                    <div className="row">
                        {renderCourseRelated()}
                    </div>
                </div>
            </div>
        </div>
    )
}