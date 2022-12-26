import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import '../Assets/Scss/Home.scss'
import { useSelector, useDispatch } from 'react-redux'
import { DispatchType, RootState } from '../Redux/ConfigStore'
import { CourseModel, getArrCouseApi } from '../Redux/Reducers/CourseReducer'
import CountUp from 'react-countup'
import 'animate.css'
type Props = {}


export default function Home({ }: Props) {

  const { arrCourse } = useSelector((state: RootState) => state.CourseReducer)
  const dispatch: DispatchType = useDispatch()

  const reveal = () => {
    let reveals = document.querySelectorAll(".reveal")
    for (let i = 0; i < reveals.length; i++) {
      let windowHeight = window.innerHeight;
      let elementTop = reveals[i].getBoundingClientRect().top;
      let elementVisible = 10;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

  window.addEventListener("scroll", reveal);
  reveal()

  useEffect(() => {
    const actionAsync = getArrCouseApi()
    dispatch(actionAsync)
  }, [])
  const homeArrCourse = arrCourse.slice(20, 28)

  window.onload = function () {

  }



  const renderCourse = (): JSX.Element[] => {
    return homeArrCourse.map((course: CourseModel, index: number) => {
      return <div className="col-12 col-md-6 col-xxl-3 item" key={index}>
        <div className="card">
          <img src={course.hinhAnh} alt="..." className='w-100' />
          <div className="card-body">
            <h1>{course.tenKhoaHoc.replaceAll("-", " ")}</h1>
            <p>{course.moTa.length > 200 ? course.moTa.substring(0, 100) + '...' : course.moTa || course.moTa.length < 10 ? `  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae natus voluptatum voluptates voluptate doloribus iste voluptatem` : course.moTa}</p>
            <div className="row">
              <div className="col-6 calendar">
                <i className="fa-solid fa-calendar"><span>{course.ngayTao}</span></i>
              </div>
              <div className="col-6 eye">
                <i className="fa-solid fa-eye"><span>{course.luotXem}</span></i>
              </div>
            </div>
            <NavLink to={`/chitiet/${course.maKhoaHoc}`} >Xem chi tiết</NavLink>

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
                <div className="col-6 left-content  ">
                  <h1>E-learning</h1>
                  <h2>Chào mừng bạn đã đến với hệ thống E-learning</h2>
                  <p>Hãy ấn bắt đầu để tìm hiểu ngay khóa học phù hợp nhất cho mình</p>
                  <a href='#new-courses'>Bắt đầu</a>
                </div>
                <div className="col-6 right-image">
                  <img src="./img/carousel.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="welcome reveal">
        <div className="rec"></div>
        <div className="main">
          <div className="content">
            <h2>Welcome to E-learning</h2>
            <p>E-learning là trung tâm đào tạo lập trình trực tuyến hàng đầu hiện nay, chuyên cung cấp các lập trình viên cho các công ty công nghệ và được nhiều nơi tin tưởng. E-learning đã có hơn 10000 học viên ghi danh từ khắp nơi trên đất nước, với hình thức online và qua các video record. Chương trình được thiết kế phù hợp cho các bạn muốn theo ngành lập trình từ những kiến thức cơ bản nhất cho đến những dự án thực tế. </p>
            <a href="#new-courses">Tìm hiểu ngay</a>
          </div>
        </div>
        <div className="rec"></div>
      </div>
      <div className="person reveal">
        <h2>Hãy đến với E-learning nếu như</h2>
        <div className="row">
          <div className="col-12 col-lg-4 item">
            <div className="card">
              <img src="img/home/stress.png" alt="" />
              <h3>Bạn chưa có định hướng</h3>
              <p>Nếu như bạn vẫn chưa xác định được tương lai của mình thì hãy tham khảo qua các khóa học của E-learning để có thể tham gia vào ngành lập trình hot nhất hiện nay</p>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <div className="col-12 col-lg-4 item">
            <div className="card  dark-bg">
              <img src="img/home/money-bag.png" alt="" />
              <h3>Bạn muốn tăng thu nhập</h3>
              <p>Nếu như bạn làm việc không ngừng nghỉ nhưng vẫn chưa đạt mức mong muốn thì hãy đến với lập trình - một trong những ngành có thu nhập ổn định nhất.</p>
              <i className="fa-solid fa-arrow-right mid-arrow"></i>
            </div>
          </div>
          <div className="col-12 col-lg-4 item">
            <div className="card">
              <img src="img/home/grow.png" alt="" />
              <h3>Bạn muốn phát triển bản thân</h3>
              <p>Bạn muốn học lập trình nhưng không biết bắt đầu từ đâu? Hãy tham gia các lớp học của E-learning, sẽ luôn có những lớp dành cho người mới cho đến những người có kinh nghiệm</p>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="benefit reveal">
        <div className="row main">
          <div className="col-3">
            <p>Vì sao bạn nên chọn E-learning ?</p>
          </div>
          <div className="col-9">
            <div className="row">
              <div className="col-12 col-xl-6 col-xxl-4 item">
                <div className="card light-card">
                  <h2>01</h2>
                  <h3>Dự án thực tế</h3>
                  <p>Thay vì dạy lý thuyết khó hiểu, E-learning tập trung vào các dự án mà các công ty đang cần, giúp học viên không cảm thấy khó khăn khi vừa bước chân vào các doanh nghiệp.</p>
                </div>
              </div>
              <div className="col-12 col-xl-6 col-xxl-4 item">
                <div className="card">
                  <h2>02</h2>
                  <h3>Nâng cao teamwork</h3>
                  <p>Đối với các project, các học viên được làm theo nhóm để nâng cao khả năng teamwork, vì vậy các bạn luôn biết cách làm việc trong môi trường doanh nghiệp.</p>

                </div>
              </div>
              <div className="col-12 col-xl-6 col-xxl-4 item">
                <div className="card light-card">
                  <h2>03</h2>
                  <h3>Lộ trình rõ ràng</h3>
                  <p>Lộ trình học được biên soạn bởi những chuyên gia về lập trình, giúp các học viên đi từ dễ đến khó mà không cảm thấy hoang mang. Bất kỳ ai cũng có thể tiếp cận đến với ngành lập trình dù chưa có kiến thức cơ bản.</p>
                </div>
              </div>
              <div className="col-12 col-xl-6 col-xxl-4 item">
                <div className="card">
                  <h2>04</h2>
                  <h3>Giảng viên chuyên nghiệp</h3>
                  <p>Đội ngũ giảng viên tại E-learning đều là những người đang làm việc tại các công ty lớn, có kinh nghiệm nhiều năm trong việc giảng dạy và luôn nắm bắt kịp thời những xu hướng mới nhất.</p>
                </div>
              </div>
              <div className="col-12 col-xl-6 col-xxl-4 item">
                <div className="card light-card">
                  <h2>05</h2>
                  <h3>Đội ngũ hỗ trợ</h3>
                  <p>Trong quá trình học, khi gặp khó khăn các học viên có thể liên hệ các mentor trong lớp để được giải đáp thắc mắc cũng như nâng cao khả năng giải quyết vấn đề.</p>
                </div>
              </div>
              <div className="col-12 col-xl-6 col-xxl-4 item">
                <div className="card">
                  <h2>06</h2>
                  <h3>Thời gian linh hoạt</h3>
                  <p>Điểm cộng của việc học online là bạn có thể chủ động được thời gian, hoàn toàn có thể vừa làm vừa học mà không ảnh hưởng nhiều đến công việc.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
      <div className="statistic reveal">
        <div className="main">
          <div className="row content">
            <div className="col-4">
              <div className='number'>
                <CountUp end={10000} enableScrollSpy={true} />
                <p>Học viên đã đăng ký</p>
              </div>

              <div className='number'>
                <CountUp end={400} enableScrollSpy={true} />
                <p>Giảng viên nhiều kinh nghiệm</p>
              </div>
            </div>
            <div className="col-4 mid-col">
              <img src="img/home/statistics.svg" alt="..." />
            </div>
            <div className="col-4">
              <div className='number'>
                <CountUp end={1000} enableScrollSpy={true} />
                <p>Khóa học đã được khai giảng</p>
              </div>
              <div className='number'>
                <CountUp end={10} start={0} enableScrollSpy={true} />
                <p>Chi nhánh khắp cả nước</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='new-courses reveal' id="new-courses">
        <div className="main">
          <h3>Các khóa học mới nhất</h3>
          <div className="row">
            {renderCourse()}
          </div>
        </div>
      </div>
    </div>
  )
}


