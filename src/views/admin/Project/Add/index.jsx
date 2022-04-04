import clsx from 'clsx'
import Style from './Add.module.scss'
import default_img from "../../../../assets/images/default_image.png"
import React, { Component,useEffect,useMemo, useState } from 'react';
import { MakeUrl } from '../../../../utils/utils';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select'

const API_URL = "https://77em4-8080.sse.codesandbox.io";
const UPLOAD_ENDPOINT = "upload_files";
function AddProject(){
    //upload img ckeditor
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
    //

    const [imgAvatar,setImgAvatar]= useState('')
    const [selected, setSelected] = useState([]);
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
    const [projectValue,setProjectValue]=useState({...projectObj})

    const handlePreviewAvatar = async (e) => {
        const file = e.target.files[0];
        setProjectValue({...projectValue, urlImg:e.target.files[0]})
        // setImgValue(e.target.files[0])
        file.review = URL.createObjectURL(file)
        setImgAvatar(file)
    }
    useEffect(()=>{
        projectValue.projecturl= MakeUrl(projectValue.projectname)
        projectValue.category=selected.map(function(item){
            return item.value
        })
        console.log(projectValue.category)
    },[projectValue][selected])
    
    
    const options = useMemo(
        () => [
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "orange", label: "Orange" },
          { value: "berry", label: "Berry" },
        ],
        []
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
                <div className='row'>
                    <span className={clsx(Style.imgTaitle)}>chọn hình đại diện</span>
                    <div className="col-12">
                        {/* src={imgPost.review ? imgPost.review : default_img} */}
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
                                //   onReady={(editor) => {}}
                                //   onBlur={(event, editor) => {}}
                                //   onFocus={(event, editor) => {}}
                               
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx(Style.detailWrap,"container")}>
                <div className="col-12">
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
                                    // onReady={ editor => {
                                    //     // You can store the "editor" and use when it is needed.
                                    //     // console.log( 'Editor is ready to use!', editor );
                                    // } }
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        setProjectValue({...projectValue,problem:data})
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
                </div> <div className="col-12">
                    <label>Giải pháp</label>
                    <div className="add-project_editor">
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={projectValue.solution}
                                    // onReady={ editor => {
                                    //     // You can store the "editor" and use when it is needed.
                                    //     // console.log( 'Editor is ready to use!', editor );
                                    // } }
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        setProjectValue({...projectValue,solution:data})
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
                <div className='col-12'>
                    <label>Danh mục</label>   
                    <Select value={selected}  onChange={setSelected} className={clsx(Style.category,'w-100 ps-2 pe-2')} options={options} defaultValue={options} isMulti />
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
                <div className='col-12'>
                    <label>Số tiền kêu gọi</label>
                    <input  value={projectValue.moneyNeeded} onChange={(e)=>{setProjectValue({...projectValue,moneyNeeded:e.target.value})}}className={clsx(Style.moneyNeeded,'w-100 ps-2 pe-2')} id='nameProject' type="text" />
                </div>
            </div>
            <div className='d-flex justify-content-end container'>
                <button className={clsx(Style.createbtn,'btn')}>Tạo dự án</button>
            </div>
        </div>
        
           
        </>
    )
}
export default AddProject