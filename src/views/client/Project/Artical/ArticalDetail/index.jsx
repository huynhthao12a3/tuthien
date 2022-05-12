import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SetInnerHTML from "../../../../../shares/setInnerHTML/index";
import articalApi from '../../../../../api/Artical';
import { useParams } from "react-router-dom";
import Loading from '../../../../../shares/Loading';
ArticalDetail.propTypes = {

};

function ArticalDetail(props) {
    const fakeDateArtical = {
        id: 115,
        proj_id: 91,
        title: "Hỗ trợ xe cấp cứu!",
        content: "<p>Các nhà tài trợ thân mến, chúng tôi hy vọng sẽ có thêm tin tức cho bạn vào lúc này, nhưng thật đáng tiếc là hiện tại xe cấp cứu vẫn đang mắc kẹt ở Mombasa, cảng nơi nó được dỡ hàng, cách bệnh viện 650 dặm. Đại lý nhập khẩu cho biết nó có vấn đề về máy móc, đây là một điều bất ngờ đối với chúng tôi. Chúng tôi có thể sẽ cần cử ai đó đến Mombasa để phân loại nó.</p><p>Số tiền huy động được thông qua chiến dịch Tấm Lòng Vàng này sẽ vẫn RẤT có giá trị đối với chi phí vận hành. Xe cấp cứu sẽ đến Mombasa, trên bờ biển Kenya, trong hai hoặc ba tuần tới, và sau đó chúng tôi sẽ sử dụng một số tiền từ chiến dịch này để chuyển xe từ Mombasa đến bệnh viện Whisper ở Jinja, Uganda.</p>",
        createTime: "2021-10-12T00:00:00.000Z",
        createUser: "Huỳnh Thảo",
        banner: "http://www.benhviendktinhquangninh.vn/images/users/images/0M7A8311.JPG"
    }
    const { id, friendlyurl } = useParams()
    // console.log("params:", useParams())
    const [dataArtical, setDataArtical] = useState()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchDataArtical = async () => {
            const response = await articalApi.get(id)
            if (response.isSuccess) {
                setDataArtical(response.data)
                setIsLoading(false)
                console.log(response.data)
            }
        }
        fetchDataArtical()
    }, [id])

    return (
        <>
            {isLoading ? <Loading /> : (
                <>
                    <div id="header-artical" className="py-5 bg-light">
                        <div className="container">
                            <div className="row">
                                <h1 className="fs-2">{dataArtical.title}</h1>



                            </div>
                        </div>
                    </div>
                    <div id="body-artical" className="py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-md-3 text-center">
                                    <img className="img-fluid rounded-3" src={process.env.REACT_APP_URL + dataArtical.banner} alt="hình ảnh bài viết" />
                                </div>
                                <div className="col-12 col-md-6 p-5 pt-md-0">
                                    <SetInnerHTML text={dataArtical.content} />


                                </div>
                                <div className="col-12 col-md-3">
                                    <div className="d-flex flex-column justify-content-end">
                                        <p className='m-0 fst-italic text-muted'><i className="mdi mdi-account-edit me-1"></i>{dataArtical.userCreate}</p>
                                        <p className='m-0 fst-italic text-muted'><i className="mdi mdi-calendar-check me-1"></i>{moment(dataArtical.createTime).format("DD/MM/YYYY")}</p>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </>
            )}

        </>
    );
}

export default ArticalDetail;