import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SetInnerHTML from "./../../../../shares/setInnerHTML/index";
ArticalDetail.propTypes = {

};

function ArticalDetail(props) {
    const fakeDateArtical = {
        id: 115,
        proj_id: 91,
        title: "Vẫn bị kẹt trong cổng!",
        content: "<p>Các nhà tài trợ thân mến, chúng tôi hy vọng sẽ có thêm tin tức cho bạn vào lúc này, nhưng thật đáng tiếc là hiện tại xe cấp cứu vẫn đang mắc kẹt ở Mombasa, cảng nơi nó được dỡ hàng, cách bệnh viện 650 dặm. Đại lý nhập khẩu cho biết nó có vấn đề về máy móc, đây là một điều bất ngờ đối với chúng tôi. Chúng tôi có thể sẽ cần cử ai đó đến Mombasa để phân loại nó.</p><p>Số tiền huy động được thông qua chiến dịch GiveTrack này sẽ vẫn RẤT có giá trị đối với chi phí vận hành. Xe cấp cứu sẽ đến Mombasa, trên bờ biển Kenya, trong hai hoặc ba tuần tới, và sau đó chúng tôi sẽ sử dụng một số tiền từ chiến dịch này để chuyển xe từ Mombasa đến bệnh viện Whisper ở Jinja, Uganda.</p>",
        createTime: "2021-10-12T00:00:00.000Z",
        createUser: "Huỳnh Thảo",
        filePath: "https://wp-mktg.prod.getty1.net/istockcontentredesign/wp-content/uploads/sites/5/bfi_thumb/2021_Composite_2304x1274_hero.jpg-37i4184kuwatssx9bxo96d6at0qnxmhzifjt0wa2iz0qmzinw.jpeg"
    }

    return (
        <>
            <div id="header-artical" className="py-5 bg-light">
                <div className="container">
                    <div className="row">
                        <h1 className="fs-2">{fakeDateArtical.title}</h1>


                        <p className='m-0 fst-italic text-muted'><i className="mdi mdi-calendar-check me-1"></i>{moment(fakeDateArtical.createTime).format("DD/MM/YYYY")}</p>

                    </div>
                </div>
            </div>
            <div id="body-artical" className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <img className="img-fluid rounded-3" src={fakeDateArtical.filePath} alt="hình ảnh bài viết" />
                        </div>
                        <div className="col-12 p-5">
                            <SetInnerHTML text={fakeDateArtical.content} />
                            <div className="d-flex justify-content-end">

                                <p className='m-0 fst-italic text-muted'>{fakeDateArtical.createUser}<i className="mdi mdi-account-edit ms-1"></i></p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ArticalDetail;