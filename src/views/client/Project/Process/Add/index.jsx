import Style from "./Add.module.scss"
import default_img from "../../../../../assets/images/default_image.png"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import clsx from "clsx"
import React, { Component, useEffect, useState } from 'react'
import 'rsuite/dist/rsuite-rtl.min.css'
import * as $ from "jquery"
import Select from 'react-select'
import { set } from "date-fns";
import * as alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

    // select trạng thái
    var resultChange=false
function AddProcess(props){
    //------------------------------------------giá trị khởi tạo
    const projectObj=props.location.state
  
    
    // const processObj={
    //         urlPath:[],
    //         title:"",
    //         description:"",
    //         content:"",
    //         status:1,
    // }

    const filterStatus = [
        { value: '1', label: 'đang chờ duyệt' },
        { value: '2', label: 'đang thực thi' },
        { value: '3', label: 'hoàng thành' },
    ]
    //----------------------------------------------- useState
    // const [processValue,setProcessValue]= useState(processObj)
    const [listProcessValue,setListProcessValue]= useState([])
    const [urlPath,setUrlPath]= useState([])
    const [title,setTitle]= useState('')
    const [description,setDescription] =useState('')
    const [content,setContent]= useState('')
    const [inputStatus,setInputStatus]= useState(1)// lưu trạng thái tạm
    const [imgValue,setImgValue]= useState([])
    
    //------------------------------------------------ useEffect
    useEffect(()=>{
        // setProcessValue({...processValue,status:inputStatus.value})
    },[inputStatus])

    // useEffect(()=>{
    //     console.log(processValue)
      
    // },[processValue])

    useEffect(()=>{
        console.log("listProcessValue",listProcessValue)
        
    },[listProcessValue])
    
    useEffect(()=>{
        const btntMoreImg = $('.btntMoreImg')
        const btndeleteImg = $('.btndeleteImg')
        if(imgValue.length>=5)
        {   
            btntMoreImg.addClass('disabled')
        }
        else{
            btntMoreImg.removeClass('disabled')
        }
        if(imgValue.length>=1)
        {
            btndeleteImg.removeClass('disabled')
        }
        else{
            btndeleteImg.addClass('disabled')
        }
    },[imgValue])
    //------------------------------------------------ function
    // xử lý hiện ảnh lên màn hình
    const handleMoreImg=(e)=>{
        const file = e.target.files[0]
        file.review = URL.createObjectURL(file)
        setImgValue([...imgValue,file])
    }
    // xóa hình ảnh
    const handleDeleteImg= ()=>{
        var arr = [...imgValue]
        arr.pop()
        setImgValue(arr)
    }
    const handleAddProcess=()=>{
        if( imgValue.length>0 &&
            title.length > 8 &&
            description.length>8 &&
            content.length>8 &&
            inputStatus!=='')
        {
            setListProcessValue([...listProcessValue,{
                imgValue ,
                title,
                description,
                content,
                inputStatus}])
            setImgValue([])
            setUrlPath([])
            setTitle('')
            setDescription('')
            setContent('')
            setInputStatus(1)
             $('.ajs-button.ajs-ok').css({"background-color": "var(--admin-btn-color)"});

            alertify.alert('Thông báo', `Thêm tiến trình vào dự án  ${projectObj.projectname}  thành công!`);
        }
        else{
            $('.ajs-button.ajs-ok').css({"background-color": "var(--status-waiting-color)"});
            alertify.alert('Thông báo', `Thêm tiến trình vào dự án  ${projectObj.projectname}  thất bại !`);
        }
        
    }
    const calbackGetProcess=(index)=>{
        setImgValue(listProcessValue[index].imgValue)
        // setUrlPath(listProcessValue[index].urlPath)
        setTitle(listProcessValue[index].title)
        setDescription(listProcessValue[index].description)
        setContent(listProcessValue[index].content)
        setInputStatus(listProcessValue[index].inputStatus)
        // setProcessValue({...listProcessValue[index]})
    }

  
   
    return(
        <>
         <div className={clsx(Style.main)}>
            <div id='nava' className="container-fluid p-5 ">
                
                <div className={clsx('row pt-3')}>
                    <div className="col-12 col-md-9">
                        <h3 className={clsx(Style.title_content,"pb-3")}>Thêm tiến trình</h3>
                        <div className={clsx(Style.img_wrap,'row')}>
                            <h5 style={{fontSize:'1.2rem'}}>Hình Ảnh</h5>
                            
                            <div className="col-2">
                            {/* imgAvatar.review ?imgAvatar.review: */}
                                <img id="img-banner" src={imgValue.length>0?imgValue[0].review: default_img}  className={clsx(Style.img_item,"img-auto-size")}  />
                            </div>
                            
                            <div className="col-2">
                            {/* imgAvatar.review ?imgAvatar.review: */}
                                <img id="img-banner"src={imgValue.length>1?imgValue[1].review: default_img}   className={clsx(Style.img_item,"img-auto-size")}  />
                            </div>
                            <div className="col-2">
                            {/* imgAvatar.review ?imgAvatar.review: */}
                                <img id="img-banner" src={imgValue.length>2?imgValue[2].review: default_img}   className={clsx(Style.img_item,"img-auto-size")}   />
                            </div>
                            <div className="col-2">
                            {/* imgAvatar.review ?imgAvatar.review: */}
                                <img id="img-banner" src={imgValue.length>3?imgValue[3].review: default_img}   className={clsx(Style.img_item,"img-auto-size")}  />
                            </div>
                            <div className="col-2">
                            {/* imgAvatar.review ?imgAvatar.review: */}
                                <img id="img-banner" src={imgValue.length>4?imgValue[4].review: default_img}   className={clsx(Style.img_item,"img-auto-size")}  />
                            </div>
                           
                            <div className="col-2 position-relative">
                                <div className='w-100 h-100 d-flex justify-content-end flex-column align-items-center '>
                                    <button onClick={handleDeleteImg} className={clsx(Style.btnLessImg ,'btndeleteImg btn')}>
                                        xóa
                                    </button>
                                    <button   className={clsx(Style.btnMoreImg , 'btntMoreImg btn')}>
                                        <span style={{cursor:"pointer", position: "absolute",textAlign:"center",fontSize:"1rem",lineHeight:"1.7rem", width: "100%", left: "0", right: "0" }}>Thêm ảnh</span>
                                        <input onChange={handleMoreImg} className="imputImg" type="file" style={{ display:"inline-block",  cursor:"pointer",opacity: "0", width: '100%', height: "100%", cursor: "pointer" }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={clsx(Style.information_wrap,'row p-4')}>
                            <h5>Thông tin</h5>
                            <div className={clsx('col-12 pt-3 ')}>
                                
                                <label htmlFor="nameProject">Tiêu đề</label>
                                <input value={title} onChange={(e)=>setTitle(e.target.value)} className={clsx(Style.title,'w-100 ps-2 pe-2 ')} id='nameProject' type="text" />
                            </div>
                            <div className={clsx('col-12 pt-3')}>
                                {/* <div className={clsx(Style.editor,' add-project_editor removeImg')}> */}
                                    <label htmlFor="nameProject">Mô tả ngắn (descriptiona)</label>
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        data={description}
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            setDescription(data)
                                           
                                        } }
                                        config={{
                                          
                                            removePlugins :['MediaEmbed','Table'],
                                        }}
                                    />
                                {/* </div> */}
                                
                            </div>
                            <div className={clsx('col-12 pt-3')}>
                              
                                <div className={clsx(Style.editor,' add-project_editor removeImg')}>
                                    <label htmlFor="nameProject">Nội dung</label>
                                    <CKEditor
                                            editor={ ClassicEditor }
                                            data={content}
                            
                                            onChange={ ( event, editor ) => {
                                                const data = editor.getData();
                                                setContent(data)
                                            
                                            } }
                                            config={{
                                                // extraPlugins: [uploadPlugin],
                                                removePlugins :['image','MediaEmbed','Table'],
                                            }}
                                    
                                        />
                                </div>
                                
                            </div>
                            {/* <div className={clsx('col-12')}>
                               
                                <label htmlFor="nameProject">Trạng thái</label>
                                <div className="form-group">
                                    <Select defaultValue={inputStatus} onChange={setInputStatus} className={clsx( Style.Inputfocus)}  placeholder='trạng thái' options={filterStatus} />
                                </div>
                            </div> */}
                            <div className='d-flex justify-content-end container'>
                                <button href="nava" onClick={handleAddProcess} className={clsx(Style.createbtn,'btn')}>Thêm</button>
                            </div>
                        </div>
                       
                    </div>
                    <div className="col-md-3 col-12 ">
                        <h3 className={clsx(Style.title_content,"pb-3")} >Danh sách tiến trình</h3>
                        <div className={clsx(Style.process_list,'row ')}>
                            <h5 className="pt-2 ps-3" style={{color:"#666", fontSize:"1.1rem"}}>Tên dự án : {projectObj.projectname}</h5>
                            <div className="col-12 ps-2 pe-2">
                                <table className="table">
                                    <thead>
                                        <tr style={{color:"#666", fontSize:"0.857rem"}}>
                                            <th scope="col">#</th>
                                            <th scope="col">Tiêu đề</th>
                                          
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listProcessValue.map(function(item,index){
                                                return(
                                                    <>
                                                        <tr className={clsx(Style.itemProcess,"cursor-pointer")} onClick={()=>{calbackGetProcess(index)}}>
                                                            <th>{index}</th>
                                                            <th>{item.title}</th>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        
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