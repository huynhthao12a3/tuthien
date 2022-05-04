import Style from './ModalCreateArtical.module.scss'
import { Button,Modal,Form } from "react-bootstrap";
import projectApi from "../../api/Project";
import clsx from 'clsx';
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MakeUrl,removeUnicode } from '../../utils/utils';
import SetInnerHTML from "../../shares/setInnerHTML"
import Zoom from 'react-medium-image-zoom'
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import articalApi from '../../api/Artical'
function ModalCreateArtical(props){
    const imgFormat = [ 'gif', 'png', 'tiff', 'raw', 'psd', 'jpg']
    const {state,id,objValue,status,up,...e}=props
    const [update,setUpdate]=up
    console.log('up',update)
    const [show,setShow]= state
    const [obj,setObj]=objValue
    console.log("obj",obj)
    const [imgArtical,setImgArtical]= useState('')
    const handleClose=()=>{
        setShow(false)
    }
    const handleAccept=async()=>{
        console.log(obj.articalId)
        
        if(status===1)
        {
            if(obj.title!==""&&obj.content!=='')
            {
                try{
                    const data={
                        'id':obj.id,
                        "title": obj.title,
                        "content": obj.content,
                        "banner": {
                          "fileName": obj.banner.fileName,
                          "filePath": obj.banner.filePath,
                          "friendlyUrl": obj.banner.friendlyUrl,
                          "note": obj.banner.note
                        }
                    }
                   
                    const respon = await articalApi.editArtical(data)
                    if(respon.isSuccess)
                    {
                        Swal.fire('Chỉnh dửa bài viết thành công')
                        setUpdate(!update)
                        handleClose()
                    }
                    else{
                        Swal.fire('Chỉnh dửa bài viết thất bại')
                    }
                    
                }
                catch(e)
                {
                    console.error(e)
                }
            }
           
        }else{

        }
    } 
    useEffect(async()=>{
        console.log("img",imgArtical)
        if (imgArtical !== '') {
            // kiểm tra định dạng ảnh
            let resultimg = imgFormat.find(function (item) {
                return removeUnicode((imgArtical.name).slice((imgArtical.name).lastIndexOf('.') + 1)) === removeUnicode(item)
            })
            // đẩy hình ảnh lên data và lưu lại đường dẩn ảnh tại database
            if (resultimg) {
                let form = new FormData();
                // console.log(imgValue,'imgValue')
                form.append('Image', imgArtical);
                form.append('TypeImage', "artical");

                const response = await articalApi.uploadFile(form);
                    setObj({ ...obj,banner:{
                        'fileName':response.data.fileName,
                        "filePath":response.data.filePath,
                        "friendlyUrl":response.data.friendlyUrl,
                        "note":response.data.note}})
                console.log(obj)
                if (response.isSuccess) {
                }
                else {
                    Swal.fire('upload ảnh thất bại')
                }
            }
            else {
                Swal.fire('chỉ nhận file ảnh có đuôi là jpeg,gif,png,tiff,raw,psd')
                setImgArtical('')
            }
        }
    },[imgArtical])
    useEffect(()=>{
        console.log('ádsadsad',obj)
    },[obj])
    const handleChangAvatar= (e)=>{
        setImgArtical(e.target.files[0])
    }
    return(
        <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title className="text-black-50">{status===1?'Sửa':'Tạo'} bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body className="container-fluid ">
            <div className="row p-3">
                <div className={clsx(Style.imgAccountUpdate, "col-4 me-end")}>

                    <img className={clsx(Style.img_item1, "mx-auto d-block img-fluid")}
                        src={process.env.REACT_APP_URL+ obj.banner.filePath} alt="" />
                    <div className="w-100 d-flex justify-content-end">
                        <button className={clsx(Style.btnMoreImg, 'btn')}>
                            <span style={{ cursor: "pointer", position: "absolute", textAlign: "center", fontSize: "1rem", lineHeight: "1.7rem", width: "100%", left: "0", right: "0" }}>Chọn hình ảnh</span>
                            <input type="file" onChange={handleChangAvatar} style={{ cursor: "pointer", opacity: "0", width: '100%', height: "100%", cursor: "pointer" }} />
                        </button>
                    </div>
                    
                </div>

                <Form className="col-8 ">
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Tên bài viết</Form.Label>
                        <Form.Control className="border border-secondary"
                            value={obj.title}
                            onChange={(e) => { setObj({ ...obj, title: e.target.value }) }}
                            type="text"
                            placeholder="tiêu đề bải viết"
                            autoFocus
                        />
                    </Form.Group>
                
                    <Form.Group className="col-12 px-2 d-inline-block " controlId="">
                        <Form.Label>Nội dung</Form.Label>
                        <div className="add-project_editor removeImg">
                            <CKEditor
                                editor={ClassicEditor}
                                data={obj.content}

                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setObj({ ...obj, content: data })
                                }}
                                config={{

                                    removePlugins: ['image', 'MediaEmbed', 'Table'],
                                }}

                            />
                        </div>
                    
                    </Form.Group>

                </Form>
                

            
            </div>

        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-end">
        
            <div>
                <Button className="me-2" variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button  variant="primary" onClick={() => { handleAccept() }}>
                    { 
                        status===1?'Hoàn thành':'Tạo'
                    }
                </Button>
            </div>

        </Modal.Footer>
        </Modal>

    )
}
export default ModalCreateArtical