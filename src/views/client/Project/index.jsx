import Style from "./Project.module.scss"

import clsx from "clsx"
import ProjectCard from "../../../shares/ProjectCard"
import Checkbox from "../../../shares/CheckBox"
import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { padding, style } from "@mui/system"
import Radio from "../../../shares/Radio"
import ProgressBar from "react-bootstrap/ProgressBar";
import projectApi from '../../../api/Project'
import SetInnerHTML from "./../../../shares/setInnerHTML/index";
import * as $ from 'jquery'
import charityBanner from '../../../assets/images/charity_banner.jpg'
import Loading from "../../../shares/Loading"
import * as utils from '../../../utils/utils.js';

function ClientProject() {



  const statusArray = [
    { id: 1, name: 'Đang chờ duyệt' },
    { id: 2, name: 'Đang thực thi' },
    { id: 3, name: 'Hoàn thành' }
  ]
  // const categoryArray = [
  //   { id: 1, name: 'Thiên nhiên' },
  //   { id: 2, name: 'Trẻ em' },
  //   { id: 3, name: 'Con người' },
  //   { id: 4, name: 'Thiên tai' },
  //   { id: 5, name: 'Xây nhà' },
  //   { id: 6, name: 'Xây nhà 1' },
  //   { id: 7, name: 'Xây nhà 2' }
  // ]

  // search
  const [filterSearch, setFilterSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const handleSearch = () => {
    const value = $('.input').val()
    setFilterSearch(value)
  }
  // checkbox
  const [fillerStatusCheckbox, setFillerStatusCheckbox] = useState(0)
  const [fillerCategoryCheckbox, setFillerCategoryCheckbox] = useState(0)

  // console.log('status :', fillerStatusCheckbox)
  // console.log('category :', fillerCategoryCheckbox)
  const [projectList, setProjectList] = useState([])
  const [categoryArray, setCategoryArray] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // console.log('currentpage:', currentPage)

  // Lấy danh sách project
  useEffect(() => {
    const fetchDataProjectList = async () => {
      const params = {
        keyword: filterSearch,
        categoryid: fillerCategoryCheckbox,
        status: fillerStatusCheckbox,
        currentpage: currentPage
      }
      const response = await projectApi.getAll(params)
      if (response.isSuccess) {
        setProjectList(response.data)
        // setCurrentPage(0)
        setIsLoading(false)
        console.log('danh sách project: ', response.data)
      }
    }
    fetchDataProjectList()
  }, [fillerStatusCheckbox, fillerCategoryCheckbox, filterSearch, currentPage])

  // useEffect(() => {
  //   const fetchDataProjectList = async () => {
  //     const params = {
  //       keyword: filterSearch,
  //       categoryid: fillerCategoryCheckbox,
  //       status: fillerStatusCheckbox,
  //       currentpage: currentPage
  //     }
  //     const response = await projectApi.getAll(params)
  //     if (response.isSuccess) {
  //       setProjectList([...projectList, ...response.data])
  //       console.log('danh sách project: ', projectList)
  //     }
  //   }
  //   fetchDataProjectList()
  // }, [currentPage])

  // Lấy danh mục
  useEffect(() => {
    const fetchDataCategory = async () => {
      const response = await projectApi.getCategoryProject()
      if (response.isSuccess) {
        setCategoryArray(response.data)
        console.log('category: ', response.data)
      }
    }
    fetchDataCategory()
  }, [])
  // Lấy giá TRX
  const [trxPrice, setTrxPrice] = useState();
  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=vnd")
      .then(res => res.json())
      .then(res => { setTrxPrice(res.tron.vnd) })
  }, [])

  // Amount


  const amountNowFormat = Number("1000000000")
  const amountNeedFormat = Number("2100000000")
  const progress = Math.floor((amountNowFormat / amountNeedFormat) * 100)

  return (
    <>
      {
        isLoading ? <Loading /> : (
          <>

            <div className="container-fluid w-100">
              <div className={clsx(Style.bannerRow, "row")}>
                <div className={clsx(Style.bannerProject)} >
                  <div className={clsx(Style.bannerBlock)}>
                    <div className={clsx(Style.bannerTitle)}>
                      <h1 className={clsx(Style.bannerTitle)}>Danh Sách Các Dự Án</h1>
                      <span className={clsx(Style.bannerDescription)}>Tìm Kiếm Tất Cả Dự Án Đang Có Trên Website</span>
                    </div>
                    <div >

                    </div>
                    <div className={clsx(Style.bannerSearch)}>
                      <input className={clsx(Style.bannerInput, "input")} placeholder="Tên dự án" />
                      <button className={clsx(Style.bannerBtn, "btn text-white ")} onClick={handleSearch}>Tìm Kiếm</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid ">
              <div className="p-3 p-lg-5">

                <div className="row">

                  {/* Bộ lọc  */}
                  <div className="col-12 col-md-3 col-xl-2 border-start p-3 m-0 ">
                    <h4 className="text-uppercase fw-bold">Bộ Lọc</h4>
                    <div className="my-3" >
                      <h5 className="" >Trạng Thái</h5>
                      {/* <Radio array={statusArray} start={[fillerStatusCheckbox, setFillerStatusCheckbox]} /> */}
                      <div className='mt-2'>
                        <input type='radio' checked={fillerStatusCheckbox === 0} onChange={() => setFillerStatusCheckbox(0)} className='me-2' />
                        <label className='m-0' htmlFor={0} >Tất cả</label>
                      </div>
                      {

                        statusArray.map((item) =>
                        (
                          <div key={item.id} className='mt-2'>
                            <input type='radio' checked={fillerStatusCheckbox === item.id} onChange={() => setFillerStatusCheckbox(item.id)} className='me-2' />
                            <label className='m-0' htmlFor={item.id} >{item.name}</label>
                          </div>
                        )
                        )
                      }
                    </div>
                    <div className="my-3" >
                      <h5 className="">Danh Mục</h5>
                      {/* <Radio array={categoryArray} start={[fillerCategoryCheckbox, setFillerCategoryCheckbox]} /> */}
                      <div className='mt-2'>
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
                  <div className="col-12 col-md-9 col-xl-10 m-0">
                    <div className="row">

                      {/* Danh sách dự án  */}
                      {
                        projectList.map((item, index) => (
                          <div key={index} className={clsx(Style.projectItem, 'col-12  col-md-6 col-xxl-4 p-3 p-md-4')}>
                            <div className={clsx(Style.projectWrapItem, "overflow-hidden shadow d-flex flex-column")}>
                              <div className="w-100 ">
                                <img src={process.env.REACT_APP_URL + item.bannerPath}
                                  onError={(e) => (e.target.onerror = null, e.target.src = charityBanner)}
                                  className={clsx(Style.imgCard)} alt="hình ảnh dự án" />
                              </div>
                              <div className="p-3 d-flex flex-column flex-grow-1 justify-content-around " >
                                <Link to={"/project-detail/" + item.id + "/" + item.friendlyUrl} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.titleProject, "  my-2 text-decoration-none text-uppercase fs-5 fw-bold text-dark")}>{item.title}</Link>
                                <div className={clsx(Style.shortDescription)}>
                                  <SetInnerHTML text={item.shortDescription} />
                                </div>
                                <div className="mt-4">

                                  <div className="ProgressBarContent px-3 my-2  bg-light rounded-3">
                                    <p className={clsx(Style.baseColor, 'mb-1')}>Tiến trình</p>
                                    <ProgressBar striped now={Math.floor(((Number(item.amountNow) * trxPrice) / Number(item.amountNeed)) * 100) + 10} label={`${Math.floor(((Number(item.amountNow) * trxPrice) / Number(item.amountNeed)) * 100)} %`} />
                                    <span>{utils.formatNumber((Number(item.amountNow) * trxPrice).toFixed(2))} / {utils.formatNumber(item.amountNeed)} VNĐ</span>
                                  </div>
                                  <div className="border-start px-3 py-1 my-2 d-flex flex-column ">
                                    <span ><i className="mdi mdi-history fs-5 pe-2"></i>Trạng thái</span>
                                    <span className={clsx(Style.baseColor, 'text-uppercase')}>{item.status === 1 ? "Đang chờ duyệt" : (item.status === 2 ? "Đang thực thi" : "Đã hoàn thành")}</span>
                                  </div>
                                  <div className='d-flex flex-column flex-xl-row align-items-center  justify-content-between '>
                                    <div className="d-flex align-items-center ">
                                      <span><i className="mdi mdi-account-multiple-outline fs-5 me-1 "></i></span>
                                      <p className='text-decoration-none m-0 '>{item.userCreate}</p>
                                    </div>
                                    <Link to={"/project-detail/" + item.id + "/" + item.friendlyUrl} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.btnDetail, 'text-muted text-decoration-none bg-white px-4 py-2 fw-bold')}>Xem chi tiết</Link>
                                  </div>
                                </div>


                              </div>
                            </div>
                          </div>
                        ))
                      }





                    </div>

                    {/* Xem Thêm  */}
                    {/* <div className="w-100 mt-5 d-flex justify-content-center">
                <button className={clsx(Style.ButtonSecondary, "py-2 px-3 fw-bold text-light")} onClick={() => setCurrentPage(currentPage + 1)}>Xem Thêm</button>
              </div> */}

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



          </>
        )
      }
    </>
  )
}
export default ClientProject