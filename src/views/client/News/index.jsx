import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import newsApi from '../../../api/News'
import Loading from '../../../shares/Loading';
import clsx from "clsx";
import Style from './News.module.scss'
import newsBanner from '../../../assets/images/news.png'
import { Link } from "react-router-dom";
import moment from "moment";
import * as $ from 'jquery'
import SetInnerHTML from "./../../../shares/setInnerHTML/index";
News.propTypes = {

};

function News(props) {
    const [isLoading, setIsLoading] = useState(true)

    const [categoryArray, setCategoryArray] = useState([])
    const [newsArray, setNewsArray] = useState([])
    const [fillerCategoryCheckbox, setFillerCategoryCheckbox] = useState(0)
    const [filterSearch, setFilterSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(0)

    // Lấy danh mục News
    useEffect(() => {
        const fetchDataCategory = async () => {
            const response = await newsApi.getCategoryNews()
            if (response.isSuccess) {
                setCategoryArray(response.data)
                console.log('category: ', response.data)
            }
        }
        fetchDataCategory()
    }, [])

    // lấy danh sách News
    useEffect(() => {
        const fetchDataNews = async () => {
            const params = {
                keyword: filterSearch,
                pageindex: currentPage,
                categoryid: fillerCategoryCheckbox,
                status: 2
            }
            const response = await newsApi.getAll(params)
            if (response.isSuccess) {
                setNewsArray(response.data)
                setIsLoading(false)
                console.log('news: ', response.data)

            }
        }
        fetchDataNews()
    }, [filterSearch, currentPage, fillerCategoryCheckbox])

    const handleSearch = () => {
        const value = $('.inputSearch').val()
        setFilterSearch(value)
    }
    return (
        <>
            {
                isLoading ? <Loading /> : (
                    <>

                        <img className={clsx(Style.bannerNews)} src={newsBanner} alt="" />
                        <div className="py-5 px-3 px-lg-5">
                            <div className="container">
                                <div className="row">
                                    {/* Danh Mục */}
                                    <div className="col-12 col-md-3">

                                        <div className='d-flex '>
                                            <input type="text" className="w-100 inputSearch px-3 " placeholder="Tên bài viết..." />
                                            <button className="ms-3 w-50 text-white bg-base-color rounded-3" onClick={handleSearch}>Tìm Kiếm</button>
                                        </div>
                                        <div className="my-5" >
                                            <h5 className="text-uppercase">Danh Mục</h5>
                                            <div className='mt-3'>
                                                <input type='radio' checked={fillerCategoryCheckbox === 0} onChange={() => setFillerCategoryCheckbox(0)} className='me-2' />
                                                <label className='m-0' htmlFor={0} >Tất cả</label>
                                            </div>
                                            {
                                                categoryArray.map((item) =>
                                                (
                                                    <div key={item.id} className='mt-2'>
                                                        <input type='radio' checked={fillerCategoryCheckbox === item.id} onChange={() => setFillerCategoryCheckbox(item.id)} className='me-2' />
                                                        <label className='m-0' htmlFor={item.id} >{item.categoryName}</label>
                                                    </div>
                                                )
                                                )
                                            }
                                        </div>
                                    </div>
                                    {/* Tin tức */}
                                    <div className="col-12 col-md-9">
                                        <div className="row">
                                            {
                                                newsArray.map((item, index) => (
                                                    <div key={index} className="col-12 col-md-6 col-xxl-4 my-3">
                                                        <div className={clsx(Style.newsItem, 'border shadow p-3')}>
                                                            <Link to={{ pathname: '/news/' + item.id + '/' + item.friendlyUrl }} onClick={() => { window.scrollTo(0, 0) }} >
                                                                <img src={process.env.REACT_APP_URL + item.bannerPath}
                                                                    onError={(e) => (e.target.onerror = null, e.target.src = newsBanner)}
                                                                    className={clsx(Style.imgCard, 'mb-3')} alt="hình ảnh bài viết" />
                                                            </Link>
                                                            <Link to={{ pathname: '/news/' + item.id + '/' + item.friendlyUrl }} onClick={() => { window.scrollTo(0, 0) }} className={clsx(Style.link, "text-uppercase text-decoration-none text-dark")} >{item.title}</Link>
                                                            <div className="d-flex justify-content-between my-3">

                                                                <p className='m-0 fst-italic '><i className="mdi mdi-account-edit me-1"></i>{item.createUser}</p>
                                                                <p className='m-0 fst-italic'>{moment(item.createTime).format("DD/MM/YYYY")}<i className="mdi mdi-calendar-check ms-1"></i></p>
                                                            </div>
                                                            <div className={clsx(Style.shortDescription, "")}>
                                                                <SetInnerHTML text={item.shortDescription} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))

                                            }
                                        </div>
                                        <div className="w-100 mt-5 d-flex justify-content-center ">
                                            <div>
                                                <button onClick={() => setCurrentPage(currentPage != 0 ? currentPage - 1 : currentPage)} className={clsx(Style.prevBtn, 'prevBtn px-2')}>
                                                    <span className="mdi mdi-chevron-double-left"></span>
                                                </button>
                                                <span className="px-3 text-secondary">{currentPage}</span>
                                                <button onClick={() => setCurrentPage(currentPage + 1)} className={clsx(Style.nextBtn, 'nextBtn px-2')}>
                                                    <span className="mdi mdi-chevron-double-right"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </>
                )
            }
        </>
    );
}

export default News;