import Style from './Edit.module.scss'
import clsx from "clsx"
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select'
import projectApi from '../../../../api/Project'
import categoryApi from "../../../../api/Category";
import { useEffect, useState } from 'react'
import { useHistory,useLocation } from 'react-router-dom'
import { MakeUrl,removeUnicode } from '../../../../utils/utils';
import alertify from 'alertifyjs'
import { Link, useParams } from 'react-router-dom';
import swal from "sweetalert";

import moment from "moment";
import * as $ from "jquery"
import parseISOWithOptions from 'date-fns/fp/parseISOWithOptions';
function EditProjectUser(prop){
    console.log("prop",prop)
    let { id,friendlyurl } = useParams();
    //----------------------------------- 
    const history= useHistory()
    const locations = useLocation().pathname
    // let idUrl= locations.slice(locations.indexOf("project/")+1,locations.lastIndexOf("/"))
    // idUrl=idUrl.slice(idUrl.lastIndexOf("/")+1)
    const imgFormat=['jpeg','gif','png','tiff','raw','psd','jpg']

    //---------------------------------- useState
    const [projectValue,setProjectValue]= useState({
        bannerPath:'',
        title:'',
        status:'',
        friendlyUrl:'',
        shortDescription:'',
        summary:"",
        problemToAddress:"",
        solution:"",
        category:[],
        location:"",
        impact:"",
    })
    const [bannerPath,setBannerPath]=useState('')
    const [title,setTitle]=useState('')
    const [friendlyUrl,setFriendlyUrl]=useState('')
    const [shortDescription,setShortDescription]=useState('')
    const [summary,setSummary]=useState('')
    const [problemToAddress,setProblemToAddress]=useState('')
    const [solution,setSolution]=useState('')
    const [category,setCategory]=useState([])
    const [location ,setLocation]=useState('')
    const [impact,setImpact]=useState('')
    const [imgValue,setImgValue]=useState('')
   
    const [categoryOptions,setCategoryOptions]= useState([])

    //----------------------------------useEffect
    // get value from api
    useEffect(()=>{
        console.log("projectValue",projectValue)
    },[projectValue])
    useEffect(()=>{
        const getProject=async()=>{
           try{
                const response = await projectApi.get(id)
                if (response.isSuccess) {
                    setProjectValue(response.data)
                    
                }
                else {
                    alertify.alert('l???i load d??? li???u')
                }
           }
           catch(e)
           {
                console.error(e)
           }
        }
        getProject()
    },[])

    // get category from api
    useEffect(async()=>{
        const getAllUsers = async () => {
            try {
                const response = await categoryApi.getall(1);
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
        setFriendlyUrl(MakeUrl(title))
    },[title])

    useEffect(async()=>{
        if(imgValue!=='')
        {
            // ki???m tra ?????nh d???ng ???nh
            let resultimg= imgFormat.find(function(item){
                return removeUnicode((imgValue.name).slice((imgValue.name).lastIndexOf('.')+1))===removeUnicode(item)
            })
            // ?????y h??nh ???nh l??n data v?? l??u l???i ???????ng d???n ???nh t???i database
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
                if (!response.isSuccess) {
                    alertify.alert('upload ???nh th???t b???i')
                }
            }
            else{
                alertify.alert('ch??? nh???n file ???nh c?? ??u??i l?? jpeg,gif,png,tiff,raw,psd')
                resultimg=''
            }
        }
    },[imgValue])

    // ??nh s??? c??c gi?? tr??? 
    useEffect(()=>{
        setBannerPath(projectValue.bannerPath)
        setTitle(projectValue.title)
        setFriendlyUrl(projectValue.friendlyUrl)
        setShortDescription(projectValue.shortDescription)
        setSummary(projectValue.summary)
        setProblemToAddress(projectValue.problemToAddress)
        setSolution(projectValue.solution)
        setLocation(projectValue.location)
        setCategory(
            projectValue.category.map(function(item){
                return{
                    value:item.categoryId,
                    label:item.categoryName
                }
            }))
        setImpact(projectValue.impact)
    },[projectValue])

    useEffect(()=>{
        for(let i = 0; i< projectValue.category.length;i++)
        {
            for(let j=0 ; j<categoryOptions.length;j++){
                if(projectValue.category[i]===categoryOptions[j].label)
                {
                    setCategory(categoryOptions[j])
                }
            }
        }
    },[categoryOptions])
    //---------------------------------- function

    //l??u h??nh ???nh v??o bi???n
    const handlePreviewAvatar= (e)=>{
        setImgValue(e.target.files[0])
    }

    // c???p nh???t d??? li???u l??n API
    const handleIpdate =async()=>{
        if(
            bannerPath !=='' &&  
            title !=='' &&  
            friendlyUrl !=='' &&  
            shortDescription !=='' &&  
            summary!=='' &&  
            problemToAddress !=='' &&  
            solution !=='' &&  
            category.length>0 &&  
            location !=='' &&  
            impact !==''  )
            {
                const data ={
                    "id":id,
                    "title": title,
                    "shortDescription": shortDescription,
                    "friendlyUrl": friendlyUrl,
                    "projectStatus":projectValue.status,
                    "summary": summary,
                    "problemToAddress": problemToAddress,
                    "solution":solution,
                    "location": location,
                    "impact": impact,
                    "banner": {
                      "fileName": bannerPath.slice(bannerPath.lastIndexOf("\\")+1),
                      "filePath":bannerPath ,
                      "friendlyUrl": bannerPath.slice(bannerPath.lastIndexOf('\\')+1),
                      "note": "Banner Project"
                    },
                    "category": category.map(function (item) {
                            return ({
                                "categoryId": item.value
                            })
                    })
                } 
                console.log("data",data)
                const repons= await projectApi.editProject(data)
                if(repons.isSuccess)
                {
                    swal({
                        title: "Th??ng b??o",
                        text: "c???p nh???t d??? ??n th??nh c??ng.",
                        icon: "info",
                        button: {
                            className: "bg-base-color"
                        }
                    });
                    let path=''
                    if(location.includes('admin'))
                    {
                        path =`/admin/project-detail/${id}/${friendlyurl}`
                    }
                    else{
                        path =`/project-detail/${id}/${friendlyurl}`
                    }
                    history.push(path)
                    window.scrollTo(0, 0)
                }
                else{
                    alertify.alert('c???p nh???t d??? ??n th???t b???i')
                }
            }
            else{
              
                alertify.alert('c???p nh???t d??? ??n th???t b???i')
                return false
            }
    }
    return(
        <>
            <div className={clsx(Style.main,'addprojectmain')}>
                    <div className={clsx(Style.titleWrap,'container')}>
                        <div className='row w-100'>
                            <div className='col-12'>
                                <h3 className={clsx(Style.title,"px-2 px-md-1")}>S???a d??? ??n</h3>
                            </div>
                        </div>
                    </div>
                    {/* ch???n h??nh ???nh */}
                    <div className={clsx(Style.imgavatar,'container w-100')}>
                        <div className='row p-md-4 p-1'>
                            <span className={clsx(Style.imgTaitle)}>Ch???n h??nh ?????i di???n</span>
                            <div className="col-12 ">
                                <div className="w-100">
                                    <img id="img-banner" src={process.env.REACT_APP_URL + bannerPath}  className={clsx(Style.imgavatar_item,"mx-auto d-block img-fluid")}  />
                                </div>
                                <div className='w-100 d-flex justify-content-end'>
                                    <button  className={clsx(Style.btnMoreImg,'btn')}>
                                        <span style={{cursor:"pointer", position: "absolute",textAlign:"center",fontSize:"1rem",lineHeight:"1.7rem", width: "100%", left: "0", right: "0" }}>Ch???n h??nh ?????i ??i???n</span>
                                        <input type="file" onChange={(e)=>{handlePreviewAvatar(e)}} style={{  cursor:"pointer",opacity: "0", width: '100%', height: "100%", cursor: "pointer" }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={clsx(Style.information,'container')}>
                        <div className='row  p-md-4 p-1'>
                            <h3>Th??ng tin</h3>
                            <div className='col-12 '>
                                <label htmlFor="nameProject">T??n d??? ??n</label>
                                <input value={title} onChange={(e)=>{setTitle(e.target.value)}}  className={clsx(Style.nameProject,'w-100 ps-2 pe-2 ')} id='nameProject' type="text" />
                            </div>
                            <div className='col-12 mt-2'>
                                <label htmlFor="urlProject">???????ng d???n</label>
                                <input value={friendlyUrl}   onChange={(e)=>{setFriendlyUrl(e.target.value)}} className={clsx(Style.urlProject,'w-100 ps-2 pe-2')} id='urlProject' type="text" />
                            </div>
                            <div className='col-12 mt-2'>
                                <label>M?? t??? ng???n (description)</label>
                                <input value={shortDescription}  onChange={(e)=>{setShortDescription(e.target.value)}}  className={clsx(Style.urlProject,'w-100 ps-2 pe-2')} id='urlProject' type="text" />
                            </div>
                        </div>
                    </div>
                    <div className={clsx(Style.detailWrap,"container")}>
                        <div className="row  p-md-4 p-1">
                            <div className="col-12 ">
                                <h3>Chi ti???t d??? ??n</h3>
                                <label>T??m l?????c</label>
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
                                <label>V???n ????? c???n gi???i quy???t</label>
                                <div className="add-project_editor removeImg">
                                            <CKEditor
                                                editor={ ClassicEditor }
                                                data={problemToAddress}                           
                                                onChange={ ( event, editor ) => {
                                                    const data = editor.getData();
                                                    setProblemToAddress(data)
                                                } }
                                                config={{
                                                    removePlugins :['image','MediaEmbed','Table'],
                                                }}
                                            />
                                </div>
                            </div> <div className="col-12 mt-3">
                                <label>Gi???i ph??p</label>
                                <div className="add-project_editor removeImg">
                                            <CKEditor
                                                editor={ ClassicEditor }
                                                data={solution}
                                                onChange={ ( event, editor ) => {
                                                    const data = editor.getData();
                                                    setSolution(data)
                                                } }
                                                config={{
                                                    removePlugins :['image','MediaEmbed','Table'],
                                                }}
                                            />
                                </div>
                            </div>
                            <div className='col-12 mt-3 w-100'>
                                <label>Danh m???c</label>   
                                <Select value={category} onChange={setCategory} options={categoryOptions} defaultValue={categoryOptions} className={clsx(Style.category,'w-100')}isMulti ></Select>
                            </div>
                            <div className='col-12 mt-3'>
                                <label>V??? tr??</label>
                                <input value={location} onChange={(e)=>{setLocation(e.target.value)}} className={clsx(Style.address,'w-100 ps-2 pe-2')} id='nameProject' type="text" />
                            </div>
                            <div className='col-12 mt-3'>
                                <label>?????i t?????ng c???n h??? tr??</label>
                                <input value={impact} onChange={(e)=>{setImpact(e.target.value)}}  className={clsx(Style.target,'w-100 ps-2 pe-2')} id='nameProject' type="text" />
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end container'>              
                        <div className='d-flex justify-content-end container'>
                            <button href="nava" onClick={handleIpdate} className={clsx(Style.Btnfinal, 'btn')}>Ho??n th??nh</button>
                        </div>
                    </div>
            </div> 
        </>
    )
}
export default EditProjectUser