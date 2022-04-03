import Style from "./Project.module.scss"

import clsx from "clsx"
import ProjectCard from "../../../shares/ProjectCard"
import Checkbox from "../../../shares/CheckBox"
import React, { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import { padding, style } from "@mui/system"
function ClientProject()
{
  // search
  const [search,setSearch]=useState('')
  // checkbox
    const statusArray=[
        {id:1,name:'đang chờ duyệt'},
        {id:2,name:'đang thực thi'},
        {id:3,name:'hoàng thành'}
      ]
      const categoryArray=[
        {id:1,name:'Thiên nhiên'},
        {id:2,name:'trẻ em'},
        {id:3,name:'Con người'}
      ]
    const [fillerStatusCheckbox,setFillerStatusCheckbox]= useState([])
    const [fillerCategotyCheckbox,setFillerCategotyCheckbox]= useState([])
  //
      const aa='50%'
    return(
        <>
        <div className="container-fluid w-100">
          <div className={clsx(Style.bannerRow,"row")}>
                  <div className={clsx(Style.bannerProject)} >
                      <div className={clsx(Style.bannerBlock)}>
                          <div className={clsx(Style.bannerTitle)}>
                              <h1 className={clsx(Style.bannerTitle)}>Danh Sách Các Dự Án</h1>
                              <span className={clsx(Style.bannerDescription)}>Tìm Kiếm Tất Cả Dự Án Đang Có Trên Website</span>
                          </div>
                          <div >

                          </div>
                          <div className={clsx(Style.bannerSearch)}>
                              <input className={clsx(Style.bannerInput,"input")} placeholder="Tên dự án"
                                onChange={(e)=>{setSearch(e.target.value)}}
                              ></input>
                              <button className={clsx(Style.bannerBtn, "btn btnPri")}>Tìm Kiếm</button>
                          </div>
                      </div>
                  </div>
            </div>
        </div>
        <div className="container-fluid w-100">
            <div className={clsx( Style.projectWrap,"row 4")}>
                {/* bộ lọc */} 
                <div className={clsx(Style.fillter,"col-lg-3 col-11 pb-3")}>
                  <h4 className={clsx(Style.filterTitle," ")}>Bộ Lọc</h4>
                    <div className={clsx(Style.fillerBlock,"row")}>
                        <div className="d-flex col-6 col-md-12" style={{flexDirection:'column'}}>
                          <h5 className={clsx(Style.fillterStatus)}>Trạng Thái</h5>
                          <Checkbox array={statusArray} state={[fillerStatusCheckbox,setFillerStatusCheckbox]}/>
                        </div>
                        <div className="d-flex col-6 col-md-12" style={{flexDirection:'column'}}>
                          <h5 className={clsx(Style.fillterStatus)}>Danh Mục</h5>
                          <Checkbox array={categoryArray} state={[fillerCategotyCheckbox,setFillerCategotyCheckbox]}/>
                        </div>
                    </div>
                </div>
                {/* danh sách dụ án */}
                <div className={clsx(Style.cardWrap, "col-lg-9 col-12 ps-md-5 pe-md-5 ps-2 pe-2")}>
                    <div className={clsx(Style.card,'col-md-6 col-12  ps-md-2 pe-md-2 ')}>
                      <div className={clsx(Style.cardBlock,"card")} >
                            <div className={clsx(Style.imgCard, "w-100 ")}>
                                <img src="https://api.givetrack.org/project/91/cover-image" className="card-img-top img-fluid" alt="..."/>
                            </div>
                            <div className={clsx(Style.bodyCard,"card-body")}>
                              <Link to="#" className={clsx(Style.linkCard)}>cứu trợ miền trung lũ lụt</Link>
                              <p className={clsx(Style.textCard,"card-text")}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                              <span style={{fontSize:'0.875rem' , color:'var(--status-done-color)'}}>{aa}</span>
                              <div className={clsx(Style.cardPercent,"w-100")}  >
                                  <div  className={clsx(Style.childrenPercent)} style={{width:aa}}></div>
                              </div>
                              <span style={{fontSize:'0.75rem' , color:'var(--status-done-color)'}}>đã huy động được 
                                <p className="ps-1 pe-1" style={{display:"inline-block", color:'var( --main-color)'}}> 100 </p> 
                                ngàn trong số 
                                <p className="ps-1 pe-1" style={{display:"inline-block", color:'var( --main-color)'}}> 2000 </p>
                                ngàn vnd 
                                </span>
                              <div className={clsx(Style.cardStatus,'w-100')}>
                                <image style={{fontSize:'1rem'}} src="https://www.givetrack.org/src/assets/images/Status.024958c3580c4acabddf044bf3bdda6d.svg"/>
                                <div className={clsx(Style.status)}>
                                  <label style={{fontSize:'0.625rem' ,lineHeight:'1.5rem', fontWeight:'500', color:'var( --main-color)'}}>Trạng thái</label>
                                  <strong style={{lineHeight:'1.5rem' ,fontSize:'0.857rem',fontWeight:'600'}}>đang thực thi</strong>
                                </div>
                              </div>
                            
                            </div>
                            <div className={clsx(Style.cardFooter)}>
                                <Link className={clsx(Style.cardFooterlink)} to='' >không biết ghi gì</Link>
                                <button className={clsx(Style.cardFooterBtn,"btn")}>Tổng Quang</button>
                            </div>  
                      </div>
                    </div>
                    <div className={clsx(Style.card,'col-md-6 col-12  ps-md-2 pe-md-2 ')}>
                      <div className={clsx(Style.cardBlock,"card")} >
                            <div className={clsx(Style.imgCard, "w-100 ")}>
                                <img src="https://api.givetrack.org/project/91/cover-image" className="card-img-top img-fluid" alt="..."/>
                            </div>
                            <div className={clsx(Style.bodyCard,"card-body")}>
                              <Link to="#" className={clsx(Style.linkCard)}>cứu trợ miền trung lũ lụt</Link>
                              <p className={clsx(Style.textCard,"card-text")}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                              <span style={{fontSize:'0.875rem' , color:'var(--status-done-color)'}}>{aa}</span>
                              <div className={clsx(Style.cardPercent,"w-100")}  >
                                  <div  className={clsx(Style.childrenPercent)} style={{width:aa}}></div>
                              </div>
                              <span style={{fontSize:'0.75rem' , color:'var(--status-done-color)'}}>đã huy động được 
                                <p className="ps-1 pe-1" style={{display:"inline-block", color:'var( --main-color)'}}> 100 </p> 
                                ngàn trong số 
                                <p className="ps-1 pe-1" style={{display:"inline-block", color:'var( --main-color)'}}> 2000 </p>
                                ngàn vnd 
                                </span>
                              <div className={clsx(Style.cardStatus,'w-100')}>
                                <image style={{fontSize:'1rem'}} src="https://www.givetrack.org/src/assets/images/Status.024958c3580c4acabddf044bf3bdda6d.svg"/>
                                <div className={clsx(Style.status)}>
                                  <label style={{fontSize:'0.625rem' ,lineHeight:'1.5rem', fontWeight:'500', color:'var( --main-color)'}}>Trạng thái</label>
                                  <strong style={{lineHeight:'1.5rem' ,fontSize:'0.857rem',fontWeight:'600'}}>đang thực thi</strong>
                                </div>
                              </div>
                            
                            </div>
                            <div className={clsx(Style.cardFooter)}>
                                <Link className={clsx(Style.cardFooterlink)} to='' >không biết ghi gì</Link>
                                <button className={clsx(Style.cardFooterBtn,"btn")}>Tổng Quang</button>
                            </div>  
                      </div>
                    </div>
                    <div className={clsx(Style.card,'col-md-6 col-12  ps-md-2 pe-md-2 ')}>
                      <div className={clsx(Style.cardBlock,"card")} >
                            <div className={clsx(Style.imgCard, "w-100 ")}>
                                <img src="https://api.givetrack.org/project/91/cover-image" className="card-img-top img-fluid" alt="..."/>
                            </div>
                            <div className={clsx(Style.bodyCard,"card-body")}>
                              <Link to="#" className={clsx(Style.linkCard)}>cứu trợ miền trung lũ lụt</Link>
                              <p className={clsx(Style.textCard,"card-text")}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                              <span style={{fontSize:'0.875rem' , color:'var(--status-done-color)'}}>{aa}</span>
                              <div className={clsx(Style.cardPercent,"w-100")}  >
                                  <div  className={clsx(Style.childrenPercent)} style={{width:aa}}></div>
                              </div>
                              <span style={{fontSize:'0.75rem' , color:'var(--status-done-color)'}}>đã huy động được 
                                <p className="ps-1 pe-1" style={{display:"inline-block", color:'var( --main-color)'}}> 100 </p> 
                                ngàn trong số 
                                <p className="ps-1 pe-1" style={{display:"inline-block", color:'var( --main-color)'}}> 2000 </p>
                                ngàn vnd 
                                </span>
                              <div className={clsx(Style.cardStatus,'w-100')}>
                                <image style={{fontSize:'1rem'}} src="https://www.givetrack.org/src/assets/images/Status.024958c3580c4acabddf044bf3bdda6d.svg"/>
                                <div className={clsx(Style.status)}>
                                  <label style={{fontSize:'0.625rem' ,lineHeight:'1.5rem', fontWeight:'500', color:'var( --main-color)'}}>Trạng thái</label>
                                  <strong style={{lineHeight:'1.5rem' ,fontSize:'0.857rem',fontWeight:'600'}}>đang thực thi</strong>
                                </div>
                              </div>
                            
                            </div>
                            <div className={clsx(Style.cardFooter)}>
                                <Link className={clsx(Style.cardFooterlink)} to='' >không biết ghi gì</Link>
                                <button className={clsx(Style.cardFooterBtn,"btn")}>Tổng Quang</button>
                            </div>  
                      </div>
                    </div>
                </div>
            </div>
            <div className={clsx(Style.btnWrap)} style={{display:'flex' ,justifyContent:'center' ,padding:'10px 10px 20px'}}>
                <button className={clsx(Style.ButtonSecondary,"btn")}>Xem Thêm</button>
            </div>
        </div>
          
           

        </>
    )
}
export default ClientProject