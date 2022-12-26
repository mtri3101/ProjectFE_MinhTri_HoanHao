import React from 'react'
import '../Assets/Scss/Footer.scss'

type Props = {}

export default function FooterHome({ }: Props) {

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
    return (
        <div>
            <div className="container-fluid footer-home reveal">
                <div className="row">
                    <div className="col-12 col-md-6 col-xl-3 contact">
                        <h1>E-learning</h1>
                        <a href='tel:0123456789'><i className="fa-solid fa-phone"></i>0123-456-789</a>
                        <p><i className="fa-solid fa-location-dot"></i>Thành phố Hồ Chí Minh</p>
                        <a href='mailto:elearning@example.com'><i className="fa-regular fa-envelope"></i>elearning@example.com</a>
                    </div>
                    <div className="col-12 col-md-6 col-xl-3 link">
                        <h2>Các khóa học</h2>
                        <h3>Front End</h3>
                        <h3>Back End</h3>
                        <h3>Full stack</h3>
                        <h3>Tư duy lập trình</h3>
                        <h3>Lập trình di động</h3>
                        <h3>Thiết kế web</h3>
                    </div>
                    <div className="col-12 col-md-6 col-xl-3 link">
                        <h2>Các liên kết</h2>
                        <h3>Trang chủ</h3>
                        <h3>Thông tin</h3>
                        <h3>Dịch vụ</h3>
                        <h3>Fanpage</h3>
                        <h3>Nhóm</h3>
                        <h3>Blog</h3>
                    </div>
                    <div className="col-12 col-md-6 col-xl-3 support">
                        <h2>Đăng ký tư vấn khóa học</h2>
                        <input type="text" placeholder='Họ và tên' />
                        <input type="text" placeholder='Số điện thoại' />
                        <input type="text" placeholder='Email' />
                    </div>
                </div>
            </div>
        </div>
    )
}