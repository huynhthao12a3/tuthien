import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import Style from './Profile.module.scss'
import Table from 'react-bootstrap/Table'
import projectApi from '../../../api/Project'
import Loading from '../../../shares/Loading';
import moment from 'moment';
import * as utils from '../../../utils/utils.js'
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import clientUser from '../../../api/User/Client';
ClientProfile.propTypes = {

};

function ClientProfile(props) {
    const [projectList, setProjectList] = useState([])
    const [userInfo, setUserInfo] = useState({
        id: 3,
        avatar: "\\uploads\\Images\\user\\04052022_015730_pexels-photo-7492325.jpg",
        fullName: "Huỳnh Văn Thảo",
        email: "thao321@gmail.com",
        phoneNumber: "0987654321",
        address: "kp5, phường Trảng dài, tp Biên Hòa, tỉnh Đồng Nai."
    })
    const [isLoading, setIsLoading] = useState(true)
    const [currentpage, setCurrentpage] = useState(0)


    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await clientUser.getUserInfo();
            if (response.isSuccess) {
                setUserInfo(response.data)
                setIsLoading(false)
                console.log(response.data)

            }
        }
        fetchUserInfo()
    }, [])
    useEffect(() => {
        const fetchProjectList = async () => {
            const params = {
                currentpage: currentpage
            }
            const response = await projectApi.getOwnerProject(params)
            if (response.isSuccess) {
                setProjectList(response.data)
                setIsLoading(false)
            }
        }
        fetchProjectList()
    }, [currentpage])


    return (
        <>

            {
                isLoading ? <Loading /> : (
                    <div className={clsx(Style.wrapProfile, "py-5")}>
                        <div className="container py-5">
                            <div className="row">
                                {/* Thông tin cá nhân  */}
                                <div className="col-12 col-lg-3">
                                    <div className={clsx(Style.userInfo, 'shadow p-4')}>
                                        <div className="w-100 text-center">
                                            <img src={process.env.REACT_APP_URL + userInfo.avatar} alt="" className="img-fluid rounded-3" />
                                        </div>
                                        <h2 className="text-center fs-3 py-3">{userInfo.fullName}</h2>
                                        <h3 className="text-center fs-4 fw-light ">{userInfo.type === 1 ? "Tổ chức" : "Cá nhân"}</h3>
                                        <hr></hr>
                                        <p><strong>Email:</strong> {userInfo.email}</p>
                                        <p><strong>Số điện thoại:</strong> {userInfo.phoneNumber}</p>
                                        <p><strong>Địa chỉ:</strong> {userInfo.address}</p>
                                        <div className="text-center pt-3">
                                            <button className="bg-base-color px-4 py-2 rounded-3 text-white">Chỉnh sửa thông tin</button>
                                        </div>
                                    </div>
                                </div>
                                {/* Danh sách dự án cá nhân  */}
                                <div className="col-12 col-lg-9 mt-4 mt-lg-0">
                                    <div className={clsx(Style.projectInfo, 'shadow p-4')}>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th className={clsx(Style.tableTh)}>Tên dự án</th>
                                                    <th className={clsx(Style.tableTh, 'text-end')}>Ngày tạo</th>
                                                    <th className={clsx(Style.tableTh, 'text-end')}>Ngày kết thúc</th>
                                                    <th className={clsx(Style.tableTh, 'text-end')}>Số tiền cần (VNĐ)</th>
                                                    <th className={clsx(Style.tableTh, 'text-end')}></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    projectList.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td >{item.title}</td>
                                                            <td className="text-end">{moment(item.createTime).format('DD/MM/YYYY')}</td>
                                                            <td className="text-end">{moment(item.endDate).format('DD/MM/YYYY')}</td>
                                                            <td className="text-end">{utils.formatNumber(item.amountNeed)}</td>
                                                            <td>
                                                                <Link to={"/project-detail/" + item.id + "/" + item.friendlyUrl} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.btnDetail, 'text-muted ')}>Xem chi tiết</Link>
                                                                <i className="mdi mdi-arrow-right-drop-circle-outline ms-1"></i>
                                                            </td>
                                                        </tr>
                                                    ))

                                                }

                                            </tbody>
                                        </Table>

                                        <div className="d-flex">
                                            <div>
                                                <button onClick={() => setCurrentpage(currentpage != 0 ? currentpage - 1 : currentpage)} className={clsx(Style.prevBtn, 'prevBtn bg-info px-2')}>
                                                    <span className="mdi mdi-chevron-double-left"></span>
                                                </button>
                                                <span className="px-3 text-secondary">{currentpage}</span>
                                                <button onClick={() => setCurrentpage(currentpage + 1)} className={clsx(Style.nextBtn, 'nextBtn bg-info px-2')}>
                                                    <span className="mdi mdi-chevron-double-right"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    );
}

export default ClientProfile;