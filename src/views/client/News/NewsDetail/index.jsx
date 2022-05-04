import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import newsApi from '../../../../api/News';
import Loading from '../../../../shares/Loading';
import clsx from "clsx";
import newsBanner from '../../../../assets/images/news.png'
import Style from './NewsDetail.module.scss'
import moment from "moment";
import SetInnerHTML from "./../../../../shares/setInnerHTML/index";
NewsDetail.propTypes = {

};

function NewsDetail(props) {
    const { id, friendlyurl } = useParams()
    console.log(id, friendlyurl)
    const [newsInfo, setNewsInfo] = useState()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchDataNews = async () => {
            const response = await newsApi.get(id)
            if (response.isSuccess) {
                setNewsInfo(response.data)
                setIsLoading(false)
                console.log(response.data)
            }
        }
        fetchDataNews()
    }, [id])
    return (
        <>
            {
                isLoading ? <Loading /> : (
                    <div className="container py-5">
                        <img src={process.env.REACT_APP_URL + newsInfo.bannerPath}
                            onError={(e) => (e.target.onerror = null, e.target.src = newsBanner)}
                            className={clsx(Style.imgCard, 'mb-3 img-fluid')} alt="hình ảnh bài viết" />
                        <h1 className="fw-bold text-uppercase mt-5 mb-3">{newsInfo.title}</h1>

                        <p className='m-0 fst-italic '><i className="mdi mdi-account-edit me-2"></i>{newsInfo.createUser}</p>
                        <p className='m-0 fst-italic'><i className="mdi mdi-calendar-check me-2"></i>{moment(newsInfo.createTime).format("DD/MM/YYYY")}</p>
                        <div className="mt-5">
                            <SetInnerHTML text={newsInfo.shortDescription} />
                        </div>
                        <div className="mt-5">
                            <SetInnerHTML text={newsInfo.content} />
                        </div>

                    </div>
                )
            }
        </>
    );
}

export default NewsDetail;