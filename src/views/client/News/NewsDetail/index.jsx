import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from "react-router-dom";
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
    const [newsArray, setNewsArray] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        // Lấy tin tức hiện tại 
        const fetchDataNews = async () => {
            const response = await newsApi.get(id)
            if (response.isSuccess) {
                setNewsInfo(response.data)
                setIsLoading(false)
                console.log(response.data)
            }
        }
        // lấy danh sách News
        const fetchDataArrayNews = async () => {
            const params = {
                status: 2
            }
            const response = await newsApi.getAll(params)
            if (response.isSuccess) {
                setNewsArray(response.data)
                console.log('array news: ', response.data)

            }
        }
        fetchDataArrayNews()
        fetchDataNews()
    }, [id])
    return (
        <>
            {
                isLoading ? <Loading /> : (
                    <div className="container py-5">
                        <div className="row">

                            <div className="col-12 col-lg-8 border shadow p-3 rounded-3">

                                <div className="text-center">

                                    <img src={process.env.REACT_APP_URL + newsInfo.bannerPath}
                                        onError={(e) => (e.target.onerror = null, e.target.src = newsBanner)}
                                        className={clsx(Style.imgCard, 'mb-3 img-fluid w-100')} alt="hình ảnh bài viết" />
                                </div>
                                <h1 className="fw-bold text-uppercase mt-5 mb-3 fs-3">{newsInfo.title}</h1>

                                <p className='m-0 fst-italic '><i className="mdi mdi-account-edit me-2"></i>{newsInfo.createUser}</p>
                                <p className='m-0 fst-italic'><i className="mdi mdi-calendar-check me-2"></i>{moment(newsInfo.createTime).format("DD/MM/YYYY")}</p>
                                <div className="mt-5">
                                    <SetInnerHTML text={newsInfo.shortDescription} />
                                </div>
                                <div className="mt-5">
                                    <SetInnerHTML text={newsInfo.content} />
                                </div>

                            </div>
                            <div className="col-12 col-lg-4  ">
                                <div className="p-3 shadow-sm rounded-3 border">

                                    {/* {
                                        newsArray
                                            .filter((item) => item.id % 3 === 0)
                                            .map((item, index) => (
                                                <div key={index} className={clsx(Style.newsItem, 'border p-2 d-flex flex-column rounded-3 mb-3 ')}>
                                                    <Link to={{ pathname: '/news/' + item.id + '/' + item.friendlyUrl }} onClick={() => { window.scrollTo(0, 0) }} >
                                                        <img src={process.env.REACT_APP_URL + item.bannerPath}
                                                            onError={(e) => (e.target.onerror = null, e.target.src = newsBanner)}
                                                            className={clsx(Style.imgCardItem, 'mb-3 w-100 ')} alt="hình ảnh bài viết" />
                                                    </Link>
                                                    <Link to={{ pathname: '/news/' + item.id + '/' + item.friendlyUrl }} onClick={() => { window.scrollTo(0, 0) }} className={clsx(Style.linkItem, "text-decoration-none ")} >{item.title}</Link>

                                                </div>
                                            ))

                                    } */}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default NewsDetail;