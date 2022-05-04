import Style from "./ModalArticalDetai.module.scss"
import { Button,Modal,Form } from "react-bootstrap";
import projectApi from "../../api/Project";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import clsx from "clsx";
import SetInnerHTML from "../../shares/setInnerHTML"
import Zoom from 'react-medium-image-zoom'
import ModalCreateArtical from "../ModalCreatArtical";

function ModalArticalDetai(prop){
    // useState ,data 
    const {state,id,...e}=prop
    const [show,setShow]= state
    const [showUpdateArtical,setShowUpdateArtical] = useState(false)
    const [update,setUpdate]=useState(false)
    const [obj,setObj]= useState( {
        'articalId':0,
        'banner':'',
        'content':'',
        'title':''
    })
    const [arr,setArr]=useState({
        'title':'',
        'articals':[
            {
                'articalId':0,
                'banner':'',
                'content':'',
                'title':''
            }
        ]

        
    })
    
    // hiển thị modal chỉnh sửa bài viết
    const handleShowUpdateArtical=()=>{
        setShowUpdateArtical(true)
        console.log(showUpdateArtical)
    }
    useEffect(async()=>{      
           try{
                const response = await projectApi.get(id)
                if (response.isSuccess) {
                    setArr(response.data)
                    
                }
                else {
                    Swal.fire('lỗi load dữ liệu')
                }
           }
           catch(e)
           {
                console.error(e)
           }
          
    },[update])
    useEffect(()=>{
        console.log('change up',update)
    },[update])
    console.log('id',id)
    return(
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                size='xl'
              
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title" className="text-black-50">
                  Bài viết:  {arr.title}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div id="process" className={clsx(Style.process, 'py-5')} >
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <h2>Bài viết của dự án</h2>
                                        <div className={clsx(Style.line)}><hr /></div>
                                    </div>
                                 
                                </div>

                                {/* Tab content  */}
                                <div id={clsx(Style.tabContent)} className="row ">
                                    <div className="col-12">
                                        <ul className="nav nav-pills my-5 flex-nowrap overflow-auto" id="pills-tab" role="tablist">
                                            {
                                                arr.articals.map((item, index) => (
                                                    <li key={"nav-item" + index} className={clsx(Style.navItem, 'd-flex align-items-center ')} role="presentation">
                                                        <button className={clsx("bg-transparent px-3 px-lg-4  border  rounded-pill ", index === 0 ? "active" : "")} id={"pills-" + index + '-tab'} data-bs-toggle="pill" data-bs-target={"#pills-" + index} type="button" role="tab" aria-controls={"pills-" + index} aria-selected={index == 0 ? "true" : "false"}>
                                                            <div style={{ borderBottom: "1px dashed #ccc" }} className="fw-bold text-white">
                                                                T{index + 1}
                                                            </div>
                                                            <div style={{ fontSize: '12px' }} className=" text-muted ">Bài_Viết</div>
                                                        </button>
                                                        {index < arr.articals.length - 1 ? <div className={clsx(Style.tabLine)}></div> : ""}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            {
                                                arr.articals.map((item, index,arr) => (
                                                    <div key={"tab-content" + index} className={clsx("tab-pane fade", index === 0 ? "show active" : "")} id={"pills-" + index} role="tabpanel" aria-labelledby={"pills-" + index + "-tab"}>

                                                        <div className={clsx(Style.baseColor, 'd-flex flex-column flex-md-row justify-content-between align-items-center my-5')}>
                                                            
                                                            <div style={{maxWidth:"650px"}}>
                                                                <h3 className="d-block w-100">Tên bài viết: {item.title}</h3>
                                                                <div className={clsx(Style.imgAccount, "d-block w-100")}>
                                                                    
                                                                    <img id="img-banner1" src={ process.env.REACT_APP_URL +item.banner }
                                                                     className={clsx(Style.img_item, "rounded float-start border border-1 img-fluid img-auto-size ")} />
                                                                    <div className=" conten-head d-inline-block px-3"style={{maxWidth:"450px"}} >
                                                                        
                                                                            <span className="text-white">
                                                                                <b>Nội Dung:</b>
                                                                                <SetInnerHTML  text={item.content}/>
                                                                            </span>
                                                                            
                                                                       
                                                                    </div>
                                                                </div>
                                                                
                                                            </div>
                                                            
                                                            <button  
                                                                onClick={()=>{setObj({
                                                                    'id':item.articalId,
                                                                    "title": item.title,
                                                                    "content": item.content,
                                                                    "banner": {
                                                                      
                                                                      "fileName": "string",
                                                                      "filePath": item.banner,
                                                                      "friendlyUrl": "string",
                                                                      "note": "string"
                                                                    }
                                                                })
                                                             
                                                                    handleShowUpdateArtical()}} 
                                                                className={clsx(Style.baseColor, Style.editBtn, "align-self-end  my-2 py-2 px-2 px-lg-3 fw-light rounded-3 text-center   text-uppercase text-decoration-none")} >
                                                                    <i className="mdi mdi-tooltip-edit me-2" style={{minWidth:'200px'}}></i>
                                                                Chỉnh sửa bài viết
                                                            </button>


                                                        </div>

                                                      

                                                      

                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </Modal.Body>
            </Modal>
            {
                (showUpdateArtical)?<ModalCreateArtical state={[showUpdateArtical,setShowUpdateArtical]} id={arr.id} objValue={[obj,setObj]} status={1}
                up={[update,setUpdate]}/>:null
            }
        </>
    )
}
export default ModalArticalDetai