import Style from './Edit.module.scss'
import clsx from "clsx"
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select'
import { DatePicker } from 'rsuite';
import projectApi from '../../../../api/Project'
import categoryApi from "../../../../api/Category";
import { useEffect, useState } from 'react'
import { useHistory,useLocation } from 'react-router-dom'
import { MakeUrl,removeUnicode } from '../../../../utils/utils';
import alertify from 'alertifyjs'
import { Link, useParams } from 'react-router-dom';

import moment from "moment";
import * as $ from "jquery"
function EditProjectUser(){
    //----------------------------------- 
    const history= useHistory()
    const locations = useLocation().pathname
    let idUrl= locations.slice(locations.indexOf("project/")+1,locations.lastIndexOf("/"))
    idUrl=idUrl.slice(idUrl.lastIndexOf("/")+1)
    console.log("idUrl",idUrl)
    const imgFormat=['jpeg','gif','png','tiff','raw','psd','jpg']
    //---------------------------------- useState
    const [projectValue,setProjectValue]= useState({
        bannerPath:'',
        title:'',
        friedlyUrl:'',
        shortDescription:'',
        summary:"",
        problemToAddress:"",
        solution:"",
        category:[],
        location:"",
        impact:"",
        endDate:"",
    })
    const [bannerPath,setBannerPath]=useState('')
    const [title,setTitle]=useState('')
    const [friedlyUrl,setFriedlyUrl]=useState('')
    const [shortDescription,setShortDescription]=useState('')
    const [summary,setSummary]=useState('')
    const [problemToAddress,setProblemToAddress]=useState('')
    const [solution,setSolution]=useState('')
    const [category,setCategory]=useState([])
    const [location ,setLocation]=useState('')
    const [impact,setImpact]=useState('')
    const [imgValue,setImgValue]=useState('')
    const [endDate,setEndDate]=useState(new Date())
   
    const [categoryOptions,setCategoryOptions]= useState([])
    //----------------------------------useEffect
    // get value from api
    useEffect(()=>{
        const getProject=async()=>{
           try{
                const response = await projectApi.get(idUrl)
                console.log("repons",response)
                if (response.isSuccess) {
                    setProjectValue(response.data)
                }
                else {
                    alertify.alert('lỗi load dữ liệu')
                }
           }
           catch(e)
           {
                console.error(e)
           }
        }
        getProject()
    },[])
    // get category
    useEffect(async()=>{
        const getAllUsers = async () => {
            try {
                const response = await categoryApi.getProject();
                setCategoryOptions(response.data.map((item)=>{
                    return({
                        value:item.id,
                        label:item.categoryName
                    })
                }))
            }
            catch (e) {
                console.error(e)
            }
        }
        getAllUsers()
    },[])

    useEffect(()=>{
        console.log("enđate",endDate)
    },[endDate])
    useEffect(()=>{
        setFriedlyUrl(title)
    },[title])
    useEffect(()=>{
        setBannerPath(projectValue.bannerPath)
        setTitle(projectValue.title)
        setFriedlyUrl(projectValue.friendlyUrl)
        setShortDescription(projectValue.shortDescription)
        setSummary(projectValue.summary)
        setProblemToAddress(projectValue.problemToAddress)
        setSolution(projectValue.solution)
        setLocation(projectValue.location)
        setImpact(projectValue.impact)
        setEndDate(projectValue.endDate)
        console.log("friedlyUrl",projectValue.friedlyUrl)
    },[projectValue])
    useEffect(()=>{
        for(let i = 0; i< projectValue.category.length;i++)
        {
            for(let j=0 ; j<categoryOptions.length;j++ ){
                if(projectValue.category[i]===categoryOptions[j].label)
                {
                    setCategory(categoryOptions[j])
                }
            }
        }
    },[categoryOptions])

    // //---------------------------------- function
    function disabledDate(current) {
        // return current && current < moment().endOf('day');
    }
    const CustomDatePicker = ({ placement }) => (
       
        <DatePicker placement={placement} 
        // format='dd/MM/yyyy'
        format="dd/MM/yyyy" 
        // defaultValue={endDate}
        // selected={'2022-08-11T09:12:22.737'}
        onChange={(e)=>{setEndDate(e)}}
        disabledDate={disabledDate}
        />
    );
    const handlePreviewAvatar= async(e)=>{
        setImgValue(e.target.files[0])
        console.log("imgValue",imgValue)
        if(imgValue!=='')
        {
            // kiểm tra định dạng ảnh
            let resultimg= imgFormat.find(function(item){
                return removeUnicode((imgValue.name).slice((imgValue.name).lastIndexOf('.')+1))===removeUnicode(item)
            })
            // đẩy hình ảnh lên data và lưu lại đường dẩn ảnh tại database
            console.log("resultimg",resultimg)
            if(resultimg)
            {
                let form = new FormData();
                // console.log(imgValue,'imgValue')
                form.append('Image',imgValue);
                form.append('TypeImage',"project");

                const response = await projectApi.uploadFile(form);
                setBannerPath(response.data.filePath)
                console.log("response",response)
                if (response.isSuccess) {
                }
                else {
                    alertify.alert('upload ảnh thất bại')
                }
            }
            else{
                alertify.alert('chỉ nhận file ảnh có đuôi là jpeg,gif,png,tiff,raw,psd')
                resultimg=''
            }
        }

    }
    const handlecheckValues =()=>{
        // to={{` pathname: '/bai-viet/' + item.id + '/' + item.title` }}
        return  {pathname:`/update-process/${idUrl}`,state:projectValue }
        // if(
        //     project.bannerPath !=='' &&  
        //     project.title !=='' &&  
        //     project.friedlyUrl !=='' &&  
        //     project.shortDescription !=='' &&  
        //     project.summary !=='' &&  
        //     project.problemToAddress !=='' &&  
        //     project.solution !=='' &&  
        //     project.category.length>0 &&  
        //     project.location !=='' &&  
        //     project.impact !=='' &&  
        //     project.endDate !=='')
        //     {
        //         // $('.ajs-button.ajs-ok').css({"background-color": "var(--admin-btn-color)"});
        //         // alertify.alert('Thông báo', `Thành công`);
    
               
        //     }
        //     else{
              
        //         // $('.ajs-button.ajs-ok').css({"background-color": "var(--status-waiting-color)"});
        //         // alertify.alert('Thông báo', `vui lòng không bỏ trống các trường `);
        //         console.log('0111111111111111111111111111111')
        //         return false
        //     }
    }
    return(
        <>
  <div className={clsx(Style.main,'addprojectmain')}>
            <div className={clsx(Style.titleWrap,'container')}>
                <div className='row w-100'>
                    <div className='col-12'>
                        <h3 className={clsx(Style.title,"px-2 px-md-1")}>Sửa dự án</h3>
                    </div>
                </div>
            </div>
            {/* chọn hình ảnh */}
            <div className={clsx(Style.imgavatar,'container w-100')}>
                <div className='row p-md-4 p-1'>
                    <span className={clsx(Style.imgTaitle)}>Chọn hình đại diện</span>
                    <div className="col-12 ">
                        {/* src={imgAvatar.review ? imgAvatar.review : default_img} */}
                        <div className="w-100">
                            <img id="img-banner" src={process.env.REACT_APP_URL + bannerPath}  className={clsx(Style.imgavatar_item,"mx-auto d-block img-fluid")}  />
                        </div>
                        <div className='w-100 d-flex justify-content-end'>
                            <button  className={clsx(Style.btnMoreImg,'btn')}>
                                <span style={{cursor:"pointer", position: "absolute",textAlign:"center",fontSize:"1rem",lineHeight:"1.7rem", width: "100%", left: "0", right: "0" }}>Chọn hình đại điện</span>
                                <input type="file" onChange={(e)=>{handlePreviewAvatar(e)}} style={{  cursor:"pointer",opacity: "0", width: '100%', height: "100%", cursor: "pointer" }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={clsx(Style.information,'container')}>
                <div className='row  p-md-4 p-1'>
                    <h3>Thông tin</h3>
                    <div className='col-12 '>
                        <label htmlFor="nameProject">Tên dự án</label>
                        {/* value={projectValue.projectname} */}
                        {/* onChange={(e)=>{setProjectValueValue({...projectValue,projectname:e.target.value})}}  */}
                        <input value={title} onChange={(e)=>{setTitle(e.target.value)}}  className={clsx(Style.nameProject,'w-100 ps-2 pe-2 ')} id='nameProject' type="text" />
                    </div>
                    <div className='col-12 mt-2'>
                        <label htmlFor="urlProject">Đường dẫn</label>
                        {/* value={projectValue.projecturl} */}
                        {/* onChange={(e)=>{setProjectValueValue({...projectValue,projecturl:e.target.value})}}  */}
                        <input value={friedlyUrl}   onChange={(e)=>{setFriedlyUrl(e.target.value)}} className={clsx(Style.urlProject,'w-100 ps-2 pe-2')} id='urlProject' type="text" />
                    </div>
                    <div className='col-12 mt-2'>
                        <label>Mô tả ngắn (description)</label>
                        {/* value={projectValue.description} */}
                        {/* onChange={(e)=>{setProjectValueValue({...projectValue,description:e.target.value})}}  */}
                        <input value={shortDescription}  onChange={(e)=>{setShortDescription(e.target.value)}}  className={clsx(Style.urlProject,'w-100 ps-2 pe-2')} id='urlProject' type="text" />
                    </div>
                </div>
            </div>
            <div className={clsx(Style.detailWrap,"container")}>
                <div className="row  p-md-4 p-1">
                    <div className="col-12 ">
                        <h3>Chi tiết dự án</h3>
                        <label>Tóm lược</label>
                        <div className="add-project_editor removeImg">
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        data={summary}
                               
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            setSummary(data)
                                          
                                        } }
                                        config={{
                                          
                                            removePlugins :['image','MediaEmbed','Table'],
                                        }}
                                  
                                    />
                        </div>
                    </div>
                    <div className="col-12 mt-3">
                        <label>Vấn đề cần giải quyết</label>
                        <div className="add-project_editor removeImg">
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        data={problemToAddress}
                           
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            setProblemToAddress(data)
                                        
                                        } }
                                        config={{
                                            // extraPlugins: [uploadPlugin],
                                            removePlugins :['image','MediaEmbed','Table'],
                                        }}
                                  
                                    />
                        </div>
                    </div> <div className="col-12 mt-3">
                        <label>Giải pháp</label>
                        <div className="add-project_editor removeImg">
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        data={solution}
                           
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            setSolution(data)
                                        } }
                                        config={{
                                            // extraPlugins: [uploadPlugin],
                                            removePlugins :['image','MediaEmbed','Table'],
                                        }}
                                  
                                    />
                        </div>
                    </div>
                    <div className='col-12 mt-3 w-100'>
                        <label>Danh mục</label>   
                        {/* value={selected}  */}
                        {/* onChange={setSelected}  */}
                        {/* options={categoryOptions} defaultValue={categoryOptions}  */}
                        {/* <Select value={category} onChange={setCategory} options={categoryOptions} defaultValue={categoryOptions} className={clsx(Style.category,'w-100')}isMulti /> */}
                    </div>
                    <div className='col-12 mt-3'>
                        <label>Vị trí</label>
                        {/*  */}
                        <input value={location} onChange={(e)=>{setLocation(e.target.value)}} className={clsx(Style.address,'w-100 ps-2 pe-2')} id='nameProject' type="text" />
                    </div>
                    <div className='col-12 mt-3'>
                        <label>Đối tượng cần hỗ trơ</label>
                        {/* value={projectValue.target} onChange={(e)=>{setProjectValueValue({...projectValue,target:e.target.value})}} */}
                        <input value={impact} onChange={(e)=>{setImpact(e.target.value)}}  className={clsx(Style.target,'w-100 ps-2 pe-2')} id='nameProject' type="text" />
                    </div>
                    <div className='col-12 mt-3 datepicker-addProject' >
                        <label className='d-block'>Ngày kết thúc kêu gọi</label>
                        <span className='d-inline-block mb-2 mt-3 text-info'>ngày hết hạn : {moment(endDate).calendar('dd/MM/yyyy')}</span><br/>
                        <span className=' text-infoa'>thay đổi ngày kết thúc: </span><CustomDatePicker  placement="rightEnd"/>
                        {/* <input  value={projectValue.enddate} onChange={(e)=>{setProjectValueValue({...projectValue,enddate:e.target.value})}}className={clsx(Style.finaldate,'w-100 ps-2 pe-2')} id='nameProject' type="text" /> */}
                    </div>
                    {/* <div className='col-12'>
                        <label>Số tiền kêu gọi</label>
                        <input  value={projectValue.moneyNeeded} onChange={(e)=>{setProjectValueValue({...projectValue,moneyNeeded:e.target.value})}}className={clsx(Style.moneyNeeded,'w-100 ps-2 pe-2')} id='nameProject' type="text" />
                    </div> */}
                </div>
            </div>
            <div className='d-flex justify-content-end container'>              
            {/* <Link  to={handlecheckValues} 
             className={clsx(Style.createbtn,'btn')}>Tiếp tục</Link> */}
               <Link to={{
                        pathname: `/update-process/${idUrl}/title1`,
                        state: "item" // chuyền dữ liệu qua Update-process
                    }} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.createbtn,'btn')}>TIếp tục</Link>
                       
            </div>
        </div> 
        </>
    )
}
export default EditProjectUser