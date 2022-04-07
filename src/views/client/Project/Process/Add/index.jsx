import Style from "./Add.module.scss"
import default_img from "../../../../../assets/images/default_image.png"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import clsx from "clsx"
import React, { Component, useEffect, useState } from 'react'
import 'rsuite/dist/rsuite-rtl.min.css'
import Select from 'react-select'
    // select trạng thái
  
function AddProcess(props){
    const filterStatus = [
        { value: '1', label: 'đang chờ duyệt' },
        { value: '2', label: 'đang thực thi' },
        { value: '3', label: 'hoàng thành' },
    ]
    const [inputStatus,setInputStatus]= useState('')
    return(
        <>
         <div className={clsx(Style.main)}>
            <div className="container-fluid p-5 ">
                
                <div className={clsx('row pt-3')}>
                    <div className="col-8 ">
                        <h3 className={clsx(Style.title_content,"pb-3")}>Thêm tiến trình</h3>
                        <div className={clsx(Style.img_wrap,'row')}>
                            <h5 style={{fontSize:'1.2rem'}}>Hình Ảnh</h5>
                            <div className="col-2">
                            {/* imgAvatar.review ?imgAvatar.review: */}
                                <img id="img-banner" src={ default_img}  className={clsx(Style.img_item,"img-auto-size")}  onerror="this.src='/default_image.png'" />
                            </div>
                            <div className="col-2">
                            {/* imgAvatar.review ?imgAvatar.review: */}
                                <img id="img-banner" src={ default_img}  className={clsx(Style.img_item,"img-auto-size")}  onerror="this.src='/default_image.png'" />
                            </div>
                            <div className="col-2">
                            {/* imgAvatar.review ?imgAvatar.review: */}
                                <img id="img-banner" src={ default_img}  className={clsx(Style.img_item,"img-auto-size")}  onerror="this.src='/default_image.png'" />
                            </div>
                            <div className="col-2">
                            {/* imgAvatar.review ?imgAvatar.review: */}
                                <img id="img-banner" src={ default_img}  className={clsx(Style.img_item,"img-auto-size")}  onerror="this.src='/default_image.png'" />
                            </div>
                            <div className="col-2">
                            {/* imgAvatar.review ?imgAvatar.review: */}
                                <img id="img-banner" src={ default_img}  className={clsx(Style.img_item,"img-auto-size")}  onerror="this.src='/default_image.png'" />
                            </div>
                        
                            <div className="col-2 position-relative">
                                <div className='w-100 h-100 d-flex justify-content-end align-items-center'>
                                    <button  className={clsx(Style.btnMoreImg ,'btn')}>
                                        <span style={{cursor:"pointer", position: "absolute",textAlign:"center",fontSize:"1rem",lineHeight:"1.7rem", width: "100%", left: "0", right: "0" }}>Thêm ảnh</span>
                                        <input type="file" style={{  cursor:"pointer",opacity: "0", width: '100%', height: "100%", cursor: "pointer" }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={clsx(Style.information_wrap,'row p-4')}>
                            <h5>Thông tin</h5>
                            <div className={clsx('col-12 pt-3 ')}>
                                
                                <label htmlFor="nameProject">Tiêu đề</label>
                                <input className={clsx(Style.title,'w-100 ps-2 pe-2 ')} id='nameProject' type="text" />
                            </div>
                            <div className={clsx('col-12 pt-3')}>
                                <div className={clsx(Style.editor,' add-project_editor removeImg')}>
                                    <label htmlFor="nameProject">Mô tả ngắn (description)</label>
                                    <CKEditor
                                            editor={ ClassicEditor }
                                            // data={projectValue.problem}
                            
                                            // onChange={ ( event, editor ) => {
                                            //     const data = editor.getData();
                                            //     setProjectValue({...projectValue,problem:data})
                                            
                                            // } }
                                            config={{
                                                // extraPlugins: [uploadPlugin],
                                                removePlugins :['image','MediaEmbed','Table'],
                                            }}
                                    
                                        />
                                </div>
                                
                            </div>
                            <div className={clsx('col-12 pt-3')}>
                              
                                <div className={clsx(Style.editor,' add-project_editor removeImg')}>
                                    <label htmlFor="nameProject">Nội dung</label>
                                    <CKEditor
                                            editor={ ClassicEditor }
                                            // data={projectValue.problem}
                            
                                            // onChange={ ( event, editor ) => {
                                            //     const data = editor.getData();
                                            //     setProjectValue({...projectValue,problem:data})
                                            
                                            // } }
                                            config={{
                                                // extraPlugins: [uploadPlugin],
                                                removePlugins :['image','MediaEmbed','Table'],
                                            }}
                                    
                                        />
                                </div>
                                
                            </div>
                            <div className={clsx('col-12')}>
                               
                                <label htmlFor="nameProject">Trạng thái</label>
                                <div className="form-group">
                                    <Select defaultValue={inputStatus} onChange={setInputStatus} className={clsx( Style.Inputfocus)}  placeholder='trạng thái' options={filterStatus} />
                                </div>
                            </div>
                            <div className='d-flex justify-content-end container'>
                                <button className={clsx(Style.createbtn,'btn')}>Thêm</button>
                            </div>
                        </div>
                       
                    </div>
                    <div className="col-4 ">
                        <h3 className={clsx(Style.title_content,"pb-3")} >Danh sách tiến trình</h3>
                        <div className={clsx(Style.process_list,'row ')}>
                            <h5 className="pt-2 ps-3" style={{color:"#666", fontSize:"1.1rem"}}>(Tên dự án)</h5>
                            <div className="col-12 ps-2 pe-2">
                                <table class="table">
                                    <thead>
                                        <tr style={{color:"#666", fontSize:"0.857rem"}}>
                                            <th scope="col">#</th>
                                            <th scope="col">Tiêu đề</th>
                                            <th scope="col">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        
                                        
                                    </tbody>
                                </table>
                            </div>
                                
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
        </>
    )
}
export default AddProcess