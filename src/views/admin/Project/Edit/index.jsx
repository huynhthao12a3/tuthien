import Style from "./Edit.module.scss"
import clsx from 'clsx'
import default_img from "../../../../assets/images/default_image.png"
import React, { Component,useEffect,useMemo, useState } from 'react';
import { MakeUrl,removeUnicode } from '../../../../utils/utils';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select'
import alertify from 'alertifyjs';

const API_URL = "https://77em4-8080.sse.codesandbox.io";
const UPLOAD_ENDPOINT = "upload_files";
function EditProject()
{
    //................................................ giá trị đầu vào 
    // lấy đường dẫn url
    let hrefUrl =window.location.href
    const projectObj={
        urlImg:'https://images.pexels.com/photos/36762/scarlet-honeyeater-bird-red-feathers.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
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
    const imgFormat=['jpeg','gif','png','tiff','raw','psd','jpg']
    const categoryOptions = useMemo(
        () => [
          { value: "1", label: "Apple" },
          { value: "2", label: "Banana" },
          { value: "3", label: "Orange" },
          { value: "4", label: "Berry" },
        ],
        []
    );
    // -----------------------------------------------------useState
    const [idProject,setIdProject]= useState('') // lưu id project
    const [imgAvatar,setImgAvatar]= useState('') // ảnh hiện ra màn hình
    const [imgValue,setImgValue]=useState('')   // ảnh dùng để add vào formData
    const [selected, setSelected] = useState([]);// lưu các giá trị danh mục
    const [projectValue,setProjectValue]=useState({...projectObj}) // dữ liệu đẩy lên API

    //.....................................................useEffect
    // lưu ảnh vào trong "projectValue" để đẩy lên API
    useEffect(async()=>{
        if(imgAvatar!=='')
        {
            // kiểm tra định dạng ảnh
            let resultimg= imgFormat.find(function(item){
                return removeUnicode((imgAvatar.name).slice((imgAvatar.name).lastIndexOf('.')+1))===removeUnicode(item)
            })
            // đẩy hình ảnh lên data và lưu lại đường dẩn ảnh tại database
            // if(resultimg)
            // {
            //     let form = new FormData();
            //     form.append('files',imgValue);
            //     const response = await ProjectAPI.uploadImg(form);
            //     setProjectValue({...projectValue,urlImg: response.data})
            //     if (response.isSuccess) {
            //         localStorage.setItem('user-token', JSON.stringify(response.data))
                    
            //     }
            //     else {
            //         alertify.alert('upload ảnh thất bại')
            //     }
            // }
            // else{
            //     alertify.alert('chỉ nhận file ảnh có đuôi là jpeg,gif,png,tiff,raw,psd')
            //     setImgAvatar('')
            //     setImgValue('')
            // }
        }
    },[imgAvatar])
    // get data lên 
    useEffect(()=>{
        // setIdProject(hrefUrl.slice(hrefUrl.lastIndexOf('/')+1))
        // const getProject= async()=>{
        //     try{
        //         const response = await projectApi.get(idProject)
        //         if(response.isSuccess){
        //             localStorage.setItem('user-token', JSON.stringify(response.valueid))
        //             setProjectValue(response.data)
        //         }
        //         else{
        //             alertify.alert('lỗi load dữ liệu')
        //         }
        //     }
        //     catch (e) {
        //         console.error(e)
        //     }
           
        // }
        // getProject()
    },[idProject])
    // xử lý cho các ipnut
    useEffect(()=>{
        projectValue.projecturl= MakeUrl(projectValue.projectname)
        projectValue.category=selected.map(function(item){
            return item.value
        })
        console.log(projectValue)
    },[projectValue][selected])

    //.....................................................function
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
    const handlePreviewAvatar = async (e) => {
        const file = e.target.files[0];
        setProjectValue({...projectValue, urlImg:e.target.files[0]})
        setImgValue(e.target.files[0])
        file.review = URL.createObjectURL(file)
        setImgAvatar(file)
    }
     //cập nhật thông tin 
    const handleEditProject =async () => {
        // try {
        //     let data = {
        //         'postId':Number(idPost),
        //         "bannerPath": pannerPath,
        //         "title": titleValue,
        //         "friendlyUrl": linkValue,
        //         "subTitle": subTitle,
        //         "categoryId": indexCategory,
        //         "status": indexStatus,
        //         "note": noteValue,
        //         "content": editorValue,
        //         "thumbNailImage": "string"
        //     }
        //     const response = await projectApi.update(data);
        //     if (response.isSuccess) {
        //         alertify.alert('sửa bảng thành công')
        //     }
        //     else {
        //         alertify.alert('sửa bảng tin thất bại')
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    return(
        <div className="flex-grow-1">
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
                <div className='row'>
                    <span className={clsx(Style.imgTaitle)}>chọn hình đại diện</span>
                    <div className="col-12">
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
                <div className='row'>
                    <h3>Thông tin</h3>
                    <div className='col-12'>
                        <label htmlFor="nameProject">Tên dự án</label>
                        <input value={projectValue.projectname} onChange={(e)=>{setProjectValue({...projectValue,projectname:e.target.value})}} className={clsx(Style.nameProject,'w-100 ps-2 pe-2')} id='nameProject' type="text" />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="urlProject">Đường dẫn</label>
                        <input value={projectValue.projecturl} onChange={(e)=>{setProjectValue({...projectValue,projecturl:e.target.value})}} className={clsx(Style.urlProject,'w-100 ps-2 pe-2')} id='urlProject' type="text" />
                    </div>
                    <div className='col-12'>
                        <label>Mô tả ngắn (description seo)</label>
                        {/* <Select options={options} defaultValue={options} isMulti /> */}
                        <div className="add-project_editor">
                            <CKEditor
                                editor={ ClassicEditor }
                                data={projectValue.description}
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    setProjectValue({...projectValue,description:data})
                                } }
                                config={{
                                    extraPlugins: [uploadPlugin]
                                  }}
                              
                               
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx(Style.detailWrap,"container")}>
                <div className="col-12">
                    <h3>Chi tiết dự án</h3>
                    <label>Tóm lược</label>
                    <div className="add-project_editor">
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={projectValue.summary}
                                    // onReady={ editor => {
                                    //     // You can store the "editor" and use when it is needed.
                                    //     // console.log( 'Editor is ready to use!', editor );
                                    // } }
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        setProjectValue({...projectValue,summary:data})
                                        // setEditorValue(data)
                                        //console.log( { event, editor, data } );
                                        // console.log('setEditorValue',editorValue)
                                    } }
                                    // onBlur={ ( event, editor ) => {
                                    //     console.log( 'Blur.', editor );
                                    // } }
                                    // onFocus={ ( event, editor ) => {
                                    //     console.log( 'Focus.', editor );
                                    // 
                                // } 
                                // }
                                />
                    </div>
                </div>
                <div className="col-12">
                    <label>Vấn đề cần giải quyết</label>
                    <div className="add-project_editor">
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={projectValue.problem}
                                   
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        setProjectValue({...projectValue,problem:data})
                                      
                                    } }
                                  
                                />
                    </div>
                </div> <div className="col-12">
                    <label>Giải pháp</label>
                    <div className="add-project_editor">
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={projectValue.solution}
                                   
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        setProjectValue({...projectValue,solution:data})
                               
                                    } }
                              
                                />
                    </div>
                </div>
                <div className='col-12'>
                    <label>Danh mục</label>   
                    <Select value={selected}  onChange={setSelected} className={clsx(Style.category,'w-100 ps-2 pe-2')} options={categoryOptions} defaultValue={categoryOptions} isMulti />
                </div>
                <div className='col-12'>
                    <label>Vị trí</label>
                    <input  value={projectValue.address} onChange={(e)=>{setProjectValue({...projectValue,address:e.target.value})}} className={clsx(Style.address,'w-100 ps-2 pe-2')} id='nameProject' type="text" />
                </div>
                <div className='col-12'>
                    <label>Đối tượng cần hỗ trơ</label>
                    <input  value={projectValue.target} onChange={(e)=>{setProjectValue({...projectValue,target:e.target.value})}} className={clsx(Style.target,'w-100 ps-2 pe-2')} id='nameProject' type="text" />
                </div>
                <div className='col-12'>
                    <label>Ngày kết thúc kêu gọi</label>
                    <input  value={projectValue.enddate} onChange={(e)=>{setProjectValue({...projectValue,enddate:e.target.value})}}className={clsx(Style.finaldate,'w-100 ps-2 pe-2')} id='nameProject' type="text" />
                </div>
                {/* <div className='col-12'>
                    <label>Số tiền kêu gọi</label>
                    <input  value={projectValue.moneyNeeded} onChange={(e)=>{setProjectValue({...projectValue,moneyNeeded:e.target.value})}}className={clsx(Style.moneyNeeded,'w-100 ps-2 pe-2')} id='nameProject' type="text" />
                </div> */}
            </div>
            <div className='d-flex justify-content-end container'>
                <button onClick={handleEditProject} className={clsx(Style.createbtn,'btn')}>cập nhật</button>
            </div>
        </div>
        
        </div>
    )
}
export default EditProject