import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import Style from './Profile.module.scss'
import Table from 'react-bootstrap/Table'
import projectApi from '../../../api/Project'
import Loading from '../../../shares/Loading';
import moment from 'moment';
import * as utils from '../../../utils/utils.js'
ClientProfile.propTypes = {

};

function ClientProfile(props) {
    const [projectList, setProjectList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const fakeData = {
        id: 3,
        avatar: "\\uploads\\Images\\user\\04052022_015730_pexels-photo-7492325.jpg",
        fullName: "Huỳnh Văn Thảo",
        email: "thao321@gmail.com",
        phoneNumber: "0987654321",
        address: "kp5, phường Trảng dài, tp Biên Hòa, tỉnh Đồng Nai.",
        type: 2,
        status: 2,
        isAdmin: false
    }

    useEffect(() => {
        const fetchProjectList = async () => {
            const params = {
                userid: fakeData.id,
                currentpage: 1
            }
            const response = await projectApi.getOwnerProject(params)
            if (response.isSuccess) {
                setProjectList(response.data)
                setIsLoading(false)
            }
        }
        fetchProjectList()
    }, [])
    return (
        <>

            {
                isLoading ? <Loading /> : (
                    <div className={clsx(Style.wrapProfile, "py-5")}>
                        <div className="container py-5">
                            <div className="row">
                                {/* Thông tin cá nhân  */}
                                <div className="col-12 col-md-4">
                                    <div className={clsx(Style.userInfo, 'shadow p-4')}>
                                        <div className="w-100">
                                            <img src={process.env.REACT_APP_URL + fakeData.avatar} alt="" className="img-fluid rounded-3" />
                                        </div>
                                        <h2 className="text-center fs-3 py-3">{fakeData.fullName}</h2>
                                        <h3 className="text-center fs-4 fw-light ">{fakeData.type === 1 ? "Tổ chức" : "Cá nhân"}</h3>
                                        <hr></hr>
                                        <p><strong>Email:</strong> {fakeData.email}</p>
                                        <p><strong>Số điện thoại:</strong> {fakeData.phoneNumber}</p>
                                        <p><strong>Địa chỉ:</strong> {fakeData.address}</p>
                                        <div className="text-center pt-3">
                                            <button className="bg-base-color px-4 py-2 rounded-3 text-white">Chỉnh sửa thông tin</button>
                                        </div>
                                    </div>
                                </div>
                                {/* Danh sách dự án cá nhân  */}
                                <div className="col-12 col-md-8">
                                    <div className={clsx(Style.projectInfo, 'shadow p-4')}>
                                        <div>
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Tên dự án</th>
                                                        <th>Ngày tạo</th>
                                                        <th>Ngày kết thúc</th>
                                                        <th>Số tiền cần (VNĐ)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        projectList.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{item.title}</td>
                                                                <td>{moment(item.createTime).format('DD/MM/YYYY')}</td>
                                                                <td>{moment(item.endDate).format('DD/MM/YYYY')}</td>
                                                                <td>{utils.formatNumber(item.amountNeed)}</td>
                                                            </tr>
                                                        ))

                                                    }

                                                </tbody>
                                            </Table>

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