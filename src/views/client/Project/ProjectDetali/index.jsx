import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import clsx from "clsx";
import Style from "./ProjectDetail.module.scss"
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import Iframe from 'react-iframe'
ProjectDetail.propTypes = {

};

function ProjectDetail(props) {
    const fakeDataProject = {
        image: 'https://i.ytimg.com/vi/tSWzwHea7x0/hqdefault.jpg',
        projectName: 'Cứu trợ nạn đói khẩn cấp ở Châu Phi',
        shortDescription: 'Đảm bảo các gia đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19...',
        summary: 'Cuộc khủng hoảng COVID19 đã ảnh hưởng sâu sắc đến miền nam châu Phi và đặc biệt là các cộng đồng nông thôn phụ thuộc vào du lịch động vật hoang dã để kiếm sống. Các cộng đồng vốn đã dễ bị tổn thương hiện đang rơi vào tình trạng đói và nghèo hơn. Bạn có thể giúp cung cấp các gói thực phẩm để đảm bảo rằng 100 gia đình trong cộng đồng bên cạnh khu bảo tồn động vật hoang dã của chúng tôi có thể ăn trong tháng 10 như một phần của Chiến dịch Cứu trợ Đói đang diễn ra của chúng tôi. Chỉ cần 35 đô la là đủ để mua một gói thực phẩm lớn cho một gia đình trong một tháng. Sự hỗ trợ của bạn cũng giữ cho động vật hoang dã được an toàn, bằng cách đảm bảo những người đói không phải dùng đến săn trộm thịt rừng để giữ cho gia đình của họ có thức ăn.',
        problemToAddress: 'Cuộc khủng hoảng COVID19 đã tác động sâu sắc đến các cộng đồng dễ bị tổn thương mà chúng tôi làm việc cùng, những người sống cạnh hai khu bảo tồn động vật hoang dã của chúng tôi ở KwaZulu-Natal Nam Phi. Các tác động kinh tế của việc đóng cửa nghiêm ngặt của Nam Phi đang được cảm nhận rõ nét trong cộng đồng nông thôn của chúng tôi, gây ra mối đe dọa cho cả con người và việc bảo vệ động vật hoang dã. Nhiều người bị mất việc làm và thu nhập, khiến các gia đình vốn đã nghèo lại càng thêm đói và nghèo. Các thành viên cộng đồng đang làm việc xa nhà trong thành phố đã trở lại để đóng cửa, gây thêm áp lực cho các gia đình và nguồn lực của họ. Trẻ em nói riêng có nguy cơ phụ thuộc vào bữa ăn hàng ngày từ trường học, nơi đã đóng cửa.',
        solution: `Là một phần của chương trình Hỗ trợ cộng đồng của Quỹ Ngày mai hoang dã, chúng tôi nhanh chóng bắt tay vào hành động để tổ chức một chương trình cứu trợ nạn đói khẩn cấp. Chúng tôi đã gây quỹ đủ cho đợt giao hàng đầu tiên vào tháng 5 cho 63 gia đình có nhu cầu.

        Mục tiêu của chúng tôi là gây quỹ bổ sung để cung cấp cho ít nhất 100 gia đình những gói thực phẩm khẩn cấp mỗi tháng. Những bưu kiện này sẽ chứa các nhu yếu phẩm như gạo, rau, dầu, và cá hộp và sẽ giữ cho các gia đình được ăn trong một tháng. Chúng tôi đang làm việc trực tiếp với ban lãnh đạo truyền thống của cộng đồng (Nduna) để giúp xác định những gia đình cần nhất. Bất kỳ khoản tiền nào được huy động cao hơn mục tiêu của chúng tôi sẽ cho phép chúng tôi mở rộng phạm vi hoạt động của chương trình.
        
        Mỗi bưu kiện đều có ghi chú từ quỹ Ngày mai hoang dã với dòng chữ Zulu nói "Umuntu ngumuntu ngabuntu" có nghĩa là "Người là vì người", một thông điệp về tình đoàn kết và sự sẻ chia nhân văn của chúng ta trong thời điểm khó khăn này.`,
        category: ['Lũ lụt', 'Thiên tai', 'Con người'],
        location: 'Phường Trảng Dài, Thành phố Biên Hòa, tỉnh Đồng Nai',
        impact: '500 người dân Châu Phi',
        dateStart: '02/01/2022',
        dateEnd: '10/11/2022',
        amountNeed: '3005000000',
        status: 'Đang thực thi',
        userCreateId: '981',
        userCreateName: 'Huỳnh Thảo',
        userType: 'Cá nhân'
    }
    const amountNow = '2100000000' // từ smart contract

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
    // Amount
    const amountNowFormat = Number(amountNow)
    const amountNeedFormat = Number(fakeDataProject.amountNeed)
    const progress = Math.floor((amountNowFormat / amountNeedFormat) * 100)

    // URL map location
    const urlLocation = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDEhyx111_aA4TIk0BPHGyLTOZnIFChjGc&q=" + fakeDataProject.location.replaceAll(' ', '+');
    console.log(urlLocation)
    return (
        <>
            {/* Header dự án  */}
            
            <div className={clsx(Style.headerProject, 'py-3 p-md-5 ')}>
                <div className="container d-flex justify-content-between">
                    <div className="row">

                        <div className="col-12 col-lg-4">
                            <div className="row text-center">

                                <div className="col-12">
                                    <img className="img-fluid" src="https://i.ytimg.com/vi/tSWzwHea7x0/hqdefault.jpg" alt="project img" />
                                </div>
                                <div className=" col-12">
                                    {
                                        fakeDataProject.category.map((item, index) =>
                                            <span key={index} className="d-inline-block me-1 me-md-4 "><i className={clsx(Style.color, 'mdi mdi-label-outline pe-1 pe-md-2')}></i>{item}</span>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className=" col-12 col-lg-7 offset-lg-1">
                            <div className={clsx(Style.color, 'd-flex my-3 my-lg-0')}>
                                <i className="mdi mdi-account-multiple-outline fs-1 me-3"></i>
                                <div className="">
                                    <p className="mb-0">{fakeDataProject.userType}</p>
                                    <Link to={`/profile/${fakeDataProject.userCreateId}`} className={clsx(Style.color, 'text-decoration-none')}>{fakeDataProject.userCreateName}</Link>
                                </div>
                            </div>
                            <h1>{fakeDataProject.projectName}</h1>
                            <p>{fakeDataProject.shortDescription}</p>
                            <div className="ProgressBarContent my-3 my-lg-0">
                                <p className={clsx(Style.color, 'mb-1')}>Tiến trình</p>
                                <ProgressBar striped now={progress} label={`${progress} %`} />
                                <span>{formatNumber(amountNowFormat)} / {formatNumber(amountNeedFormat)} VNĐ</span>
                            </div>
                            <div className="my-4 d-flex justify-content-between">

                                <div className="border-start px-3 d-flex flex-column">
                                    <span ><i className="mdi mdi-history pe-2"></i>Trạng thái</span>
                                    <span className={clsx(Style.color, 'text-uppercase')}>{fakeDataProject.status}</span>
                                </div>
                                <Button className={clsx(Style.backgroundColor, 'px-5 text-light border-0')}><i className='mdi mdi-heart-outline me-1'></i>Theo dõi</Button>
                            </div>
                            <Button className={clsx(Style.backgroundColor, 'px-5 text-light border-0 w-100 fw-bold')}><i className='mdi mdi-currency-btc me-1'></i>Quyên góp</Button>

                        </div>

                    </div>
                </div>
            </div>

            {/* Thanh menu chi tiết dự án  */}
            <div className={clsx(Style.projectDetailMenu)}>
                <div className="container">

                    <Nav className=" justify-content-center">
                        <Nav.Link className={clsx(Style.projectDetailItem, ' text-muted text-decoration-none')} as={NavLink} to="#overview">Giới thiệu</Nav.Link>
                        <Nav.Link className={clsx(Style.projectDetailItem, ' text-muted text-decoration-none')} as={NavLink} to="#process">Tiến trình</Nav.Link>
                        <Nav.Link className={clsx(Style.projectDetailItem, ' text-muted text-decoration-none')} as={NavLink} to="#artical">Cập nhật mới nhất</Nav.Link>
                        <Nav.Link className={clsx(Style.projectDetailItem, ' text-muted text-decoration-none')} as={NavLink} to="#donation">Người quyên góp</Nav.Link>
                    </Nav>
                </div>
            </div>

            {/* Tổng quan dự án  */}
            <div id="overview" className="py-5 ">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <h2>Giới thiệu về dự án</h2>
                            <div className={clsx(Style.line)}><hr /></div>
                            <div className='my-5'>
                                <h3 className={clsx(Style.color, 'mb-4')}><i className='mdi mdi-format-page-break me-3'></i>Tổng quan</h3>
                                <p>{fakeDataProject.summary}</p>
                            </div>
                            <div className='my-5'>
                                <h3 className={clsx(Style.color, 'mb-4')}><i className='mdi mdi-alert-outline me-3'></i>Vấn đề cần giải quyết</h3>
                                <p>{fakeDataProject.problemToAddress}</p>
                            </div>
                            <div className='my-5'>
                                <h3 className={clsx(Style.color, 'mb-4')}><i className='mdi mdi-lightbulb-on-outline me-3'></i>Giải pháp</h3>
                                <p>{fakeDataProject.solution}</p>
                            </div>
                        </div>
                        <div className="col-12 col-lg-5 offset-lg-1 ">

                            <Iframe url={urlLocation}
                                width="100%"
                                height="450px"
                                display="initial"
                                position="relative"
                                allow="fullscreen" />
                            <div className='container border p-4 bg-light'>
                                <h4 className='fs-6 lh-base'><i className='mdi mdi-map-marker-outline me-2'></i>{fakeDataProject.location}</h4>
                                <div className="row">

                                    <div className='col-12 col-lg-6 '>
                                        <div className="p-2">
                                            <p className='m-0 mt-3 fs-5'>Quản lý dự án</p>
                                            <p className='m-0 fw-light '>{fakeDataProject.userCreateName}</p>
                                            <p className='m-0 mt-3 fs-5'>Loại dự án</p>
                                            <ul className='m-0 fw-light '>{fakeDataProject.category.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}</ul>
                                            <p className='m-0 mt-3 fs-5'>Đối tượng cần hỗ trợ</p>
                                            <p className='m-0 fw-light '>{fakeDataProject.impact}</p>
                                        </div>
                                    </div>
                                    <div className='col-12 col-lg-6'>
                                        <div className="p-2">
                                            <p className='m-0 mt-3 fs-5'>Ngày bắt đầu</p>
                                            <p className='m-0 fw-light '>{fakeDataProject.dateStart}</p>
                                            <p className='m-0 mt-3 fs-5'>Ngày kết thúc</p>
                                            <p className='m-0 fw-light '>{fakeDataProject.dateEnd}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectDetail;