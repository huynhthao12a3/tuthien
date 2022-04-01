
import React from 'react';
import PropTypes from 'prop-types';
import Style from './ClientFooter.module.scss';
import clsx from 'clsx';
ClientFooter.propTypes = {

};

function ClientFooter(props) {
    return (
        <div className={clsx(Style.wrapFooter, " w-100 d-flex justify-content-start p-3 ps-5 pe-5 ")}>
            <div className='row d-flex w-100'>
                <div className={ clsx(Style.about, "col-6 col-lg-3")}>
                    <span className={clsx(Style.title)}>Liên hệ</span>
                    <p className={clsx(Style.content)}>
                        TẤM LÒNG VÀNG
                      <br/>  
                       Địa chỉ: KP5, Phường Trảng Dài ,Thành<br/>
                        phố Biên Hòa, Tỉnh Đồng Nai<br/>
                        Hotline 0909001122<br/>
                        Email: iotfoftwarevn@gmail.com
                    </p>
                </div>
                <div className={ clsx(Style.contact, "col-6  col-lg-3")}>
                    <span className={clsx(Style.title)}>Thông tin</span>
                    <p className={clsx(Style.content)}>Giới thiệu<br/>
                        hướng dẫn quyên góp
                        <br/>
                        Hướng dẫn tạo dự án
                    </p>
                </div>
                <div className={ clsx(Style.infomation, "col-6  col-lg-3 d-flex")}>
                    <span className={clsx(Style.title)}>Theo dõi chúng tôi</span>
                    <a href='' style={{fonSize:'1rem', color:'#E4E4E4' ,margin:'4px 0px 0px'} } >
                        <span style={{fontSize:"1rem",color:'#E4E4E4',paddingRight:'5px' }} class="mdi mdi-facebook"></span>
                        facebook
                    </a>
                    <a  href='' style={{fonSize:'1rem', color:'#E4E4E4'} } >
                        <span style={{fontSize:"1rem",color:'#E4E4E4',paddingRight:'5px' }}class="mdi mdi-arrow-left-drop-circle"></span>
                        
                        youtobe
                    </a>
                    <a  href='' style={{fonSize:'1rem', color:'#E4E4E4'} } >
                       
                        <span style={{fontSize:"1rem",color:'#E4E4E4',paddingRight:'5px' }} class="mdi mdi-instagram"></span>
                        instagram
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ClientFooter;