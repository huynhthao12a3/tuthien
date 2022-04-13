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
  const handleSearch = () => {
    const value = $('.input').val()
    setFilterSearch(value)
  }
  // checkbox
  const [fillerStatusCheckbox, setFillerStatusCheckbox] = useState(0)
  const [fillerCategoryCheckbox, setFillerCategoryCheckbox] = useState(0)

  console.log('status :', fillerStatusCheckbox)
  console.log('category :', fillerCategoryCheckbox)
  const [projectList, setProjectList] = useState([])
  const [categoryArray, setCategoryArray] = useState([])

  // Lấy danh sách project
  useEffect(() => {
    const fetchDataProjectList = async () => {
      const params = {
        keyword: filterSearch,
        categoryid: fillerCategoryCheckbox,
        status: fillerStatusCheckbox
      }
      const response = await projectApi.getAll(params)
      if (response.isSuccess) {
        setProjectList(response.data)
        console.log('danh sách project: ', response.data)
      }
    }

    fetchDataProjectList()
  }, [fillerStatusCheckbox, fillerCategoryCheckbox, filterSearch])

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
  // const fakeData
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  // Amount


  const amountNowFormat = Number("1000000000")
  const amountNeedFormat = Number("2100000000")
  const progress = Math.floor((amountNowFormat / amountNeedFormat) * 100)

  return (
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
            <div className="col-12 col-md-3 border-start p-3 m-0 ">
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
            <div className="col-12 col-md-9 m-0">
              <div className="row">

                {/* Danh sách dự án  */}
                {
                  projectList.map((item, index) => (
                    <div key={index} className={clsx(Style.projectItem, 'col-12  col-md-6 p-2 p-lg-4')}>
                      <div className={clsx(Style.projectWrapItem, " shadow d-flex flex-column")}>
                        <div className="w-100 ">
                          <img src={process.env.REACT_APP_URL + item.bannerPath} className={clsx(Style.imgCard)} alt="hình ảnh dự án" />
                        </div>
                        <div className="p-3 " >
                          <Link to={"/project-detail/" + item.id + "/" + item.friendlyUrl} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.titleProject, " d-block my-4 text-decoration-none text-uppercase fs-5 fw-bold text-dark")}>{item.title}</Link>
                          <div className={clsx(Style.shortDescription)}>
                            <SetInnerHTML text={item.shortDescription} />
                          </div>
                          <div className="ProgressBarContent px-3 my-4  bg-light rounded-3">
                            <p className={clsx(Style.baseColor, 'mb-1')}>Tiến trình</p>
                            <ProgressBar striped now={Math.floor((Number(item.amountNow + '1') / Number(item.amountNow + '10')) * 100)} label={`${Math.floor((Number(item.amountNow + '1') / Number(item.amountNow + '10')) * 100)} %`} />
                            <span className="fw-bold text-muted">{formatNumber(item.amountNow)} / {formatNumber(item.amountNeed)} VNĐ</span>
                          </div>
                          <div className="border-start px-3 py-1 my-3 d-flex flex-column ">
                            <span ><i className="mdi mdi-history fs-5 pe-2"></i>Trạng thái</span>
                            <span className={clsx(Style.baseColor, 'text-uppercase')}>{item.status === 1 ? "Đang chờ duyệt" : (item.status === 2 ? "Đang thực thi" : "Đã hoàn thành")}</span>
                          </div>
                          <div className='d-flex flex-column flex-xl-row align-items-center  justify-content-between '>
                            <div className="d-flex align-items-center ">
                              <span><i className="mdi mdi-account-multiple-outline fs-5 me-1 pe-2"></i></span>
                              <p className='text-decoration-none m-0 text-uppercase'>{item.userCreate}</p>
                            </div>
                            <Link to={"/project-detail/" + item.id + "/" + item.friendlyUrl} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.btnDetail, 'text-muted text-decoration-none bg-white px-4 py-2 fw-bold')}>Xem chi tiết</Link>
                          </div>


                        </div>
                      </div>
                    </div>
                  ))
                }





              </div>

              {/* Xem Thêm  */}
              <div className="w-100 mt-5 d-flex justify-content-center">
                <button className={clsx(Style.ButtonSecondary, "py-2 px-3 fw-bold text-light")}>Xem Thêm</button>
              </div>
            </div>
          </div>
        </div>

      </div>



      {/* <div className={clsx(Style.projectWrap, "row 4")}> */}
      {/* bộ lọc */}
      {/* <div className={clsx(Style.fillter, "col-lg-3 col-11 pb-3")}>
            <h4 className={clsx(Style.filterTitle, " ")}>Bộ Lọc</h4>
            <div className={clsx(Style.fillerBlock, "row")}>
              <div className="d-flex col-6 col-md-12" style={{ flexDirection: 'column' }}>
                <h5 className={clsx(Style.fillterStatus)}>Trạng Thái</h5>
                <Radio array={statusArray} start={[fillerStatusCheckbox, setFillerStatusCheckbox]} /> */}

      {/* <Checkbox array={statusArray} state={[fillerStatusCheckbox, setFillerStatusCheckbox]} /> */}
      {/* </div>
              <div className="d-flex col-6 col-md-12" style={{ flexDirection: 'column' }}>
                <h5 className={clsx(Style.fillterStatus)}>Danh Mục</h5>
                <Radio array={categoryArray} start={[fillerCategoryCheckbox, setFillerCategoryCheckbox]} />

              </div>
            </div>
          </div> */}
      {/* danh sách dụ án */}
      {/* <div className={clsx(Style.cardWrap, "col-lg-9 col-12 ps-md-5 pe-md-5 ps-2 pe-2")}>
            <div className={clsx(Style.card, 'col-md-6 col-12  ps-md-2 pe-md-2 ')}>
              <div className={clsx(Style.cardBlock, "card")} >
                <div className={clsx(Style.imgCard, "w-100 ")}>
                  <img src="https://api.givetrack.org/project/91/cover-image" className="card-img-top img-fluid" alt="..." />
                </div>
                <div className={clsx(Style.bodyCard, "card-body")}>
                  <Link to="#" className={clsx(Style.linkCard)}>cứu trợ miền trung lũ lụt</Link>
                  <p className={clsx(Style.textCard, "card-text")}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <span style={{ fontSize: '0.875rem', color: 'var(--status-done-color)' }}>{aa}</span>
                  <div className={clsx(Style.cardPercent, "w-100")}  >
                    <div className={clsx(Style.childrenPercent)} style={{ width: aa }}></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--status-done-color)' }}>đã huy động được
                    <p className="ps-1 pe-1" style={{ display: "inline-block", color: 'var( --main-color)' }}> 100 </p>
                    ngàn trong số
                    <p className="ps-1 pe-1" style={{ display: "inline-block", color: 'var( --main-color)' }}> 2000 </p>
                    ngàn vnd
                  </span>
                  <div className={clsx(Style.cardStatus, 'w-100')}>
                    <image style={{ fontSize: '1rem' }} src="https://www.givetrack.org/src/assets/images/Status.024958c3580c4acabddf044bf3bdda6d.svg" />
                    <div className={clsx(Style.status)}>
                      <label style={{ fontSize: '0.625rem', lineHeight: '1.5rem', fontWeight: '500', color: 'var( --main-color)' }}>Trạng thái</label>
                      <strong style={{ lineHeight: '1.5rem', fontSize: '0.857rem', fontWeight: '600' }}>đang thực thi</strong>
                    </div>
                  </div>

                </div>
                <div className={clsx(Style.cardFooter)}>
                  <Link className={clsx(Style.cardFooterlink)} to='' >không biết ghi gì</Link>
                  <button className={clsx(Style.cardFooterBtn, "btn")}>Tổng Quang</button>
                </div>
              </div>
            </div>
            <div className={clsx(Style.card, 'col-md-6 col-12  ps-md-2 pe-md-2 ')}>
              <div className={clsx(Style.cardBlock, "card")} >
                <div className={clsx(Style.imgCard, "w-100 ")}>
                  <img src="https://api.givetrack.org/project/91/cover-image" className="card-img-top img-fluid" alt="..." />
                </div>
                <div className={clsx(Style.bodyCard, "card-body")}>
                  <Link to="#" className={clsx(Style.linkCard)}>cứu trợ miền trung lũ lụt</Link>
                  <p className={clsx(Style.textCard, "card-text")}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <span style={{ fontSize: '0.875rem', color: 'var(--status-done-color)' }}>{aa}</span>
                  <div className={clsx(Style.cardPercent, "w-100")}  >
                    <div className={clsx(Style.childrenPercent)} style={{ width: aa }}></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--status-done-color)' }}>đã huy động được
                    <p className="ps-1 pe-1" style={{ display: "inline-block", color: 'var( --main-color)' }}> 100 </p>
                    ngàn trong số
                    <p className="ps-1 pe-1" style={{ display: "inline-block", color: 'var( --main-color)' }}> 2000 </p>
                    ngàn vnd
                  </span>
                  <div className={clsx(Style.cardStatus, 'w-100')}>
                    <image style={{ fontSize: '1rem' }} src="https://www.givetrack.org/src/assets/images/Status.024958c3580c4acabddf044bf3bdda6d.svg" />
                    <div className={clsx(Style.status)}>
                      <label style={{ fontSize: '0.625rem', lineHeight: '1.5rem', fontWeight: '500', color: 'var( --main-color)' }}>Trạng thái</label>
                      <strong style={{ lineHeight: '1.5rem', fontSize: '0.857rem', fontWeight: '600' }}>đang thực thi</strong>
                    </div>
                  </div>

                </div>
                <div className={clsx(Style.cardFooter)}>
                  <Link className={clsx(Style.cardFooterlink)} to='' >không biết ghi gì</Link>
                  <button className={clsx(Style.cardFooterBtn, "btn")}>Tổng Quang</button>
                </div>
              </div>
            </div>
            <div className={clsx(Style.card, 'col-md-6 col-12  ps-md-2 pe-md-2 ')}>
              <div className={clsx(Style.cardBlock, "card")} >
                <div className={clsx(Style.imgCard, "w-100 ")}>
                  <img src="https://api.givetrack.org/project/91/cover-image" className="card-img-top img-fluid" alt="..." />
                </div>
                <div className={clsx(Style.bodyCard, "card-body")}>
                  <Link to="#" className={clsx(Style.linkCard)}>cứu trợ miền trung lũ lụt</Link>
                  <p className={clsx(Style.textCard, "card-text")}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <span style={{ fontSize: '0.875rem', color: 'var(--status-done-color)' }}>{aa}</span>
                  <div className={clsx(Style.cardPercent, "w-100")}  >
                    <div className={clsx(Style.childrenPercent)} style={{ width: aa }}></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--status-done-color)' }}>đã huy động được
                    <p className="ps-1 pe-1" style={{ display: "inline-block", color: 'var( --main-color)' }}> 100 </p>
                    ngàn trong số
                    <p className="ps-1 pe-1" style={{ display: "inline-block", color: 'var( --main-color)' }}> 2000 </p>
                    ngàn vnd
                  </span>
                  <div className={clsx(Style.cardStatus, 'w-100')}>
                    <image style={{ fontSize: '1rem' }} src="https://www.givetrack.org/src/assets/images/Status.024958c3580c4acabddf044bf3bdda6d.svg" />
                    <div className={clsx(Style.status)}>
                      <label style={{ fontSize: '0.625rem', lineHeight: '1.5rem', fontWeight: '500', color: 'var( --main-color)' }}>Trạng thái</label>
                      <strong style={{ lineHeight: '1.5rem', fontSize: '0.857rem', fontWeight: '600' }}>đang thực thi</strong>
                    </div>
                  </div>

                </div>
                <div className={clsx(Style.cardFooter)}>
                  <Link className={clsx(Style.cardFooterlink)} to='' >không biết ghi gì</Link>
                  <button className={clsx(Style.cardFooterBtn, "btn")}>Tổng Quang</button>
                </div>
              </div>
            </div>
          </div> */}
      {/* </div> */}


    </>
  )
}
export default ClientProject