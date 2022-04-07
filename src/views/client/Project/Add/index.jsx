import Style from "./Add.module.scss"
import clsx from 'clsx'
import default_img from "../../../../assets/images/default_image.png"
import React, { Component,useEffect,useMemo, useState } from 'react';
import { MakeUrl,removeUnicode } from '../../../../utils/utils';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select'
import alertify from 'alertifyjs';
import projectApi from "../../../../api/Project";
import { DatePicker } from 'rsuite';
import { addDays } from 'date-fns';
import moment from 'moment';

const API_URL = "https://77em4-8080.sse.codesandbox.io";
const UPLOAD_ENDPOINT = "upload_files";


function AddProject(){

    const projectObj={
        urlImg:'',
        projectname:'',
        projecturl:'',
        description:'',
        summary:'',
        problem:'',
        solution:'',
        category:[],
        address:'',
        target:'',
        enddate:'',
        moneyNeeded:''
    }
    const categoryOptions = useMemo(
        () => [
          { value: "1", label: "Apple" },
          { value: "2", label: "Banana" },
          { value: "3", label: "Orange" },
          { value: "4", label: "Berry" },
        ],
        []
      );
    const imgFormat=['jpeg','gif','png','tiff','raw','psd','jpg']

    //................................................ useState
    const [imgAvatar,setImgAvatar]= useState('') // ảnh hiện ra màn hình
    const [imgValue,setImgValue]=useState('')   // ảnh dùng để add vào formData
    const [selected, setSelected] = useState([]);// lưu các giá trị danh mục
    const [projectValue,setProjectValue]=useState({...projectObj}) // dữ liệu đẩy lên API
    
    //............................................useEffect
    // lưu đường dẩn ảnh vào trong "projectValue" để đẩy lên API
    useEffect(async()=>{
        if(imgValue!=='')
        {
            // kiểm tra định dạng ảnh
            let resultimg= imgFormat.find(function(item){
                return removeUnicode((imgValue.name).slice((imgValue.name).lastIndexOf('.')+1))===removeUnicode(item)
            })
            // đẩy hình ảnh lên data và lưu lại đường dẩn ảnh tại database
            if(resultimg)
            {
                let form = new FormData();
                // console.log(imgValue,'imgValue')
                form.append('Image',imgValue);
                form.append('TypeImage',"project");
                const response = await projectApi.uploadFile(form);
                setProjectValue({...projectValue,urlImg: response.data})
                if (response.isSuccess) {
                    localStorage.setItem('user-token', JSON.stringify(response.data))
                    
                }
                else {
                    alertify.alert('upload ảnh thất bại')
                }
            }
            else{
                alertify.alert('chỉ nhận file ảnh có đuôi là jpeg,gif,png,tiff,raw,psd')
                setImgAvatar('')
                setImgValue('')
            }
        }
    },[useEffect])
    // xử lý input
    useEffect(()=>{
       
        setProjectValue({...projectValue,projecturl:MakeUrl(projectValue.projectname)})
    },[projectValue.projectname])
    useEffect(()=>{
       
        projectValue.category=selected.map(function(item){
            return item.value
        })
        // console.log(projectValue)
    },[projectValue][selected])
    
    //.......................................... function
    //upload img  của ckeditor
    function uploadAdapter(loader) {
        return {
          upload: () => {
            return new Promise((resolve, reject) => {
              const body = new FormData();
              loader.file.then((file) => {
                body.append("files", file);
                // let headers = new Headers();
                // headers.append("Origin", "http://localhost:3000");
                fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
                  method: "post",
                  body: body
                  // mode: "no-cors"
                })
                  .then((res) => res.json())
                  .then((res) => {
                    resolve({
                      default: `${API_URL}/${res.filename}`
                    });
                  })
                  .catch((err) => {
                    reject(err);
                  });
              });
            });
          }
        };
    }

    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
          return uploadAdapter(loader);
        };
    }
    // xử lý lấy ảnh hiện lên màn hình
    const handlePreviewAvatar = (e) => {
        setImgValue(e.target.files[0])
        const file = e.target.files[0]
        file.review = URL.createObjectURL(file)
        setImgAvatar(file)
    }
    console.log(imgAvatar,'imgAvatar')
    console.log(imgValue,'imgValue')
    // tạo project
    const handleCreate=()=>{

    }

    
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }
    const CustomDatePicker = ({ placement }) => (
        <DatePicker placement={placement} placeholder={new Date} 
        format='dd/MM/yyyy' defaultValue={new Date}  disabledDate={disabledDate}
        />
    );
    return(
        <>
        <div className={clsx(Style.main,'addprojectmain')}>
            <div className={clsx(Style.titleWrap,'container')}>
                <div className='row'>
                    <div className='col-12'>
                        <h3 className={clsx(Style.title)}>Tạo dự án</h3>
                    </div>
                </div>
            </div>
            {/* chọn hình ảnh */}
            <div className={clsx(Style.imgavatar,'container w-100')}>
                <div className='row p-4'>
                    <span className={clsx(Style.imgTaitle)}>Chọn hình đại diện</span>
                    <div className="col-12 ">
                        {/* src={imgAvatar.review ? imgAvatar.review : default_img} */}
                        <img id="img-banner" src={imgAvatar.review ?imgAvatar.review: default_img}  className={clsx(Style.imgavatar_item,"img-auto-size")}  onerror="this.src='/default_image.png'" />
                        <div className='w-100 d-flex justify-content-end'>
                            <button  className={clsx(Style.btnMoreImg,'btn')}>
                                <span style={{cursor:"pointer", position: "absolute",textAlign:"center",fontSize:"1rem",lineHeight:"1.7rem", width: "100%", left: "0", right: "0" }}>Chọn hình đại điện</span>
                                <input type="file" onChange={handlePreviewAvatar} style={{  cursor:"pointer",opacity: "0", width: '100%', height: "100%", cursor: "pointer" }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx(Style.information,'container')}>
                <div className='row p-4'>
                    <h3>Thông tin</h3>
                    <div className='col-12 '>
                        <label htmlFor="nameProject">Tên dự án</label>
                        <input value={projectValue.projectname} onChange={(e)=>{setProjectValue({...projectValue,projectname:e.target.value})}} className={clsx(Style.nameProject,'w-100 ps-2 pe-2 ')} id='nameProject' type="text" />
                    </div>
                    <div className='col-12 mt-2'>
                        <label htmlFor="urlProject">Đường dẫn</label>
                        <input value={projectValue.projecturl} onChange={(e)=>{setProjectValue({...projectValue,projecturl:e.target.value})}} className={clsx(Style.urlProject,'w-100 ps-2 pe-2')} id='urlProject' type="text" />
                    </div>
                    <div className='col-12 mt-2'>
                        <label>Mô tả ngắn (description)</label>
                        
                        <input value={projectValue.description} onChange={(e)=>{setProjectValue({...projectValue,description:e.target.value})}} className={clsx(Style.urlProject,'w-100 ps-2 pe-2')} id='urlProject' type="text" />
                    </div>
                </div>
            </div>
            <div className={clsx(Style.detailWrap,"container")}>
                <div className="row p-4">
                    <div className="col-12 ">
                        <h3>Chi tiết dự án</h3>
                        <label>Tóm lược</label>
                        <div className="add-project_editor removeImg">
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        data={projectValue.summary}
                               
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            setProjectValue({...projectValue,summary:data})
                                          
                                        } }
                                        config={{
                                            extraPlugins: [uploadPlugin],
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
                                        data={projectValue.problem}
                           
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            setProjectValue({...projectValue,problem:data})
                                        
                                        } }
                                        config={{
                                            extraPlugins: [uploadPlugin],
                                            removePlugins :['image','MediaEmbed','Table'],
                                        }}
                                  
                                    />
                        </div>
                    </div> <div className="col-12 mt-3">
                        <label>Giải pháp</label>
                        <div className="add-project_editor removeImg">
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        data={projectValue.solution}
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            setProjectValue({...projectValue,solution:data})
                                           
                                        } }
                                        config={{
                                            extraPlugins: [uploadPlugin],
                                            removePlugins :['MediaEmbed','Table'],
                                        }}
                                    />
                        </div>
                    </div>
                    <div className='col-12 mt-3 w-100'>
                        <label>Danh mục</label>   
                        <Select value={selected}  onChange={setSelected} className={clsx(Style.category,'w-100')} options={categoryOptions} defaultValue={categoryOptions} isMulti />
                    </div>
                    <div className='col-12 mt-3'>
                        <label>Vị trí</label>
                        <input  value={projectValue.address} onChange={(e)=>{setProjectValue({...projectValue,address:e.target.value})}} className={clsx(Style.address,'w-100 ps-2 pe-2')} id='nameProject' type="text" />
                    </div>
                    <div className='col-12 mt-3'>
                        <label>Đối tượng cần hỗ trơ</label>
                        <input  value={projectValue.target} onChange={(e)=>{setProjectValue({...projectValue,target:e.target.value})}} className={clsx(Style.target,'w-100 ps-2 pe-2')} id='nameProject' type="text" />
                    </div>
                    <div className='col-12 mt-3 datepicker-addProject' >
                        <label className='d-block'>Ngày kết thúc kêu gọi</label>
                        <CustomDatePicker  placement="rightEnd"/>
                        {/* <input  value={projectValue.enddate} onChange={(e)=>{setProjectValue({...projectValue,enddate:e.target.value})}}className={clsx(Style.finaldate,'w-100 ps-2 pe-2')} id='nameProject' type="text" /> */}
                    </div>
                    {/* <div className='col-12'>
                        <label>Số tiền kêu gọi</label>
                        <input  value={projectValue.moneyNeeded} onChange={(e)=>{setProjectValue({...projectValue,moneyNeeded:e.target.value})}}className={clsx(Style.moneyNeeded,'w-100 ps-2 pe-2')} id='nameProject' type="text" />
                    </div> */}
                </div>
            </div>
            <div className='d-flex justify-content-end container'>
                <button onClick={handleCreate} className={clsx(Style.createbtn,'btn')}>Tiếp tục</button>
            </div>
        </div>
        
           
        </>
    )
}
export default AddProject