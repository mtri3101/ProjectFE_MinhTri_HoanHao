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
                <h3>B???n ???? ghi danh th??nh c??ng</h3>
            </div>
        } else {
            return <div className="modal-body">
                <div className="swal2-icon swal2-error swal2-animate-error-icon">
                    <span className="swal2-x-mark">
                        <span className="swal2-x-mark-line-left" />
                        <span className="swal2-x-mark-line-right" />
                    </span>
                </div>
                <h3>B???n ???? ghi danh kh??a h???c n??y r???i </h3>
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
                        <NavLink className='btn btn-primary' to={`/chitiet/${course.maKhoaHoc}`}>Xem chi ti???t</NavLink>
                    </div>
                </div>
            </div>
        })
    }

    return (
        <div className='container-fluid detail-page'>
            <h2 className='title'>Th??ng tin chi ti???t kh??a h???c</h2>
            <div className="modal fade" id="exampleModal" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        {renderContentModal(modalRender)}
                    </div>
                </div>
            </div>


            <div className="row main">
                <div className="col-7">
                    <h2>L???p tr??nh Front End c?? b???n ?????n n??ng cao</h2>
                    <div className='intro'>
                        <h3><span> V?? sao b???n n??n ch???n l???p tr??nh Front End?</span>
                            <br /><br />
                            ?????i v???i nh???ng ng?????i m???i khi mu???n tham gia v??o l???p tr??nh web ?????u c???m th???y kh?? kh??n khi kh??ng bi???t b???t ?????u t??? ????u. L???p tr??nh web c?? 3 h?????ng ch??nh: Front end, Back end v?? Fullstack. V???i Back end hay Full stack ????i h???i b???n ph???i c?? kinh nghi???m nh???t ?????nh trong l???p tr??nh v??? thu???t to??n v?? hi???u r?? c??c ng??n ng??? ph??t tri???n web. Th??ng qua kh??a h???c n??y, b???n s??? th???c h??nh qua c??c d??? ??n th???c t??? v?? bao g???m l??? tr??nh ph?? h???p cho ngay c??? ng?????i m???i b???t ?????u.
                        </h3>
                        <hr />
                    </div>
                    <div className="target">
                        <h3>M???c ti??u c???a kh??a h???c</h3>
                        <div className="row">
                            <div className="col-6">
                                <h4><i className="fa-solid fa-check"></i>N???m v???ng v?? v???n d???ng c??c k??? n??ng m???m (l??m vi???c nh??m, k??? n??ng giao ti???p, qu???n l?? th???i gian, task)</h4>
                                <h4><i className="fa-solid fa-check"></i>Th???c h??nh v?? t??m hi???u s??u c??c c??ng c??? l???p tr??nh</h4>
                                <h4><i className="fa-solid fa-check"></i>N???m v???ng v?? th???c h??nh k??? thu???t code, k??? n??ng ph??n t??ch gi???i quy???t v???n ?????</h4>
                            </div>
                            <div className="col-6">
                                <h4><i className="fa-solid fa-check"></i>N???m v???ng c??c ph????ng ph??p ????? tay ngh??? lu??n ???????c v???ng ch???c, ki???n th???c lu??n ???????c c???p nh???t</h4>
                                <h4><i className="fa-solid fa-check"></i>N???m r?? t??? ch???t c???a m???t l???p tr??nh vi??n chuy??n nghi???p</h4>
                                <h4><i className="fa-solid fa-check"></i>Hi???u v?? n???m c??c k??? n??ng c???n thi???t li??n quan ?????n ngh??? L???p tr??nh Fullstack</h4>
                            </div>
                        </div>
                    </div>
                    <div className='skill'>
                        <h3>Ki???n th???c trong kh??a h???c n??y</h3>
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
                            <h3>S??? h???c vi??n ???? ????ng k??: <span>{courseDetail?.soLuongHocVien === 0 ? 'Ch??a c??' : courseDetail?.soLuongHocVien} </span></h3>
                            <h3>Th???i gian h???c:<span> 150 gi???</span></h3>
                            <h3>Tr??nh ?????:<span> D??nh cho ng?????i m???i</span></h3>
                            <h3>Ng??y b???t ?????u: <span>{courseDetail?.ngayTao}</span></h3>
                            <NavLink to={'#'} className='btn btn-primary' onClick={handleRegister} data-bs-toggle="modal" data-bs-target="#exampleModal">????ng k?? ngay</NavLink>
                            <input placeholder='M?? gi???m gi??'></input>
                        </div>
                    </div>
                </div>
            </div>
            <div className='related-course'>
                <div className="main">
                    <h2>Nh???ng kh??a h???c kh??c b???n c?? th??? tham kh???o</h2>
                    <div className="row">
                        {renderCourseRelated()}
                    </div>
                </div>
            </div>
        </div>
    )
}