
import React from 'react';
import PropTypes from 'prop-types';
import Style from './ClientFooter.module.scss';
import clsx from 'clsx';
ClientFooter.propTypes = {

};

function ClientFooter(props) {
    return (
        <div className={clsx(Style.wrapFooter, " w-100 d-flex justify-content-start p-3 ")}>
            <div className='row d-flex'>
                <div className={ clsx(Style.about, "col-3 ps-5 pe-5")}>
                    <span className={clsx(Style.title)}>Giới Thiệu</span>
                    <p className={clsx(Style.content)}>Chúng tôi tận dụng Bitcoin và công nghệ Blockchain để tài trợ cho các dự án toàn cầu có tác động đến môi trường và sức khỏe cộng đồng cao bằng cách sử dụng một nền tảng quyên góp hoàn toàn minh bạch.
                      <br/>  
                        Được cung cấp bởi rsk.<br/>
                        Được xây dựng bởi KOIBANX.<br/>
                        Được thiết kế bởi ATIX Labs.<br/>
                        Được duy trì và cải tiến bởi ZIRCONTech.
                    </p>
                </div>
                <div className={ clsx(Style.contact, "col-3 ps-5 pe-5")}>
                    <span className={clsx(Style.title)}>Liên Hệ</span>
                    <p className={clsx(Style.content)}>CHUNG
                        contact@givetrack.org
                        Các tổ chức phi chính phủ<br/>

                        ngo@givetrack.org
                        HỖ TRỢ KỸ THUẬT<br/>

                        support@givetrack.org
                    </p>
                </div>
                <div className={ clsx(Style.infomation, "col-3 ps-5 pe-5")}>
                    <span className={clsx(Style.title)}>Thông Tin</span>
                    <p className={clsx(Style.content)}>Câu hỏi thường gặp
                    Điều khoản sử dụng
                    Chính sách bảo mật
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ClientFooter;