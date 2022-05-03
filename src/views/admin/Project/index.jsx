
import Style from "./Project.module.scss"
import clsx from "clsx"
import { margin, style } from "@mui/system"
import React, { useEffect, useState } from 'react'
import 'rsuite/dist/rsuite-rtl.min.css'
import Dropdown from 'react-bootstrap/Dropdown'
import * as $ from "jquery"
import Select from 'react-select'
import { useHistory,useLocation } from 'react-router-dom'
import { MakeUrl,removeUnicode } from '../../../utils/utils';
import { Link } from "react-router-dom";
import categoryApi from "../../../api/Category";
import projectApi from "../../../api/Project";
import moment from "moment";
import { Button,Modal,Form } from "react-bootstrap";
import SetInnerHTML from "../../../shares/setInnerHTML"
import Zoom from 'react-medium-image-zoom'
import Swal from 'sweetalert2'
import Loading from "../../../shares/Loading"
import articalApi from "../../../api/Artical"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
function Project(){
    const locations = useLocation().pathname
    const imgDefault="\\uploads\\Images\\project\\02052022_043453_default-image-620x600.jpg"
    const imgFormat = [ 'gif', 'png', 'tiff', 'raw', 'psd', 'jpg']
    //-------------------------------------------------------
    const arr=[
        {
        "id": 10,
        "title": "cứu trợ miền trung",
        "createDate":'23/09/2021',
        "endDate":'23/09/2021',
        "userCreate": "trần văn thuận",
        "status": 1,
        },
    ]
    // select trạng thái
    const filterStatus = [
        { value: '0', label: 'Tất cả' },
        { value: '1', label: 'đang chờ duyệt' },
        { value: '2', label: 'đang thực thi' }, 
        { value: '3', label: 'hoàn thành' },
    ]
    const objArtical={
        "title": "",
        "content": "",
        "banner": {
          "fileName": "",
          "filePath": "",
          "friendlyUrl": "",
          "note": ""
        }
    }

    //--------------------------------------------------------- useState 
    // selector
    const [categoryOptions,setCategoryOptions]= useState([{value:0,label:'Tất cả'}])

    const [arrayProject, setArrayProject] = useState(arr)
    const [inputSearch,setInputSearch]= useState('')
    const [inputCategoty,setInputCategoty]= useState(categoryOptions[0])
    const [inputStatus,setInputStatus]= useState(filterStatus[0])
    const [currentpage,setCurrentpage]= useState(0)
    const [isAccept,setIsAccept] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [showAtical,setShowAtical]= useState(false)
    const [showTransaction,setShowTransaction]= useState(false)
    const [show, setShow] = useState(false);
    const [imgValueArtical,setImgValueArtical]= useState('')
    const [createArtical,setCreateArtical]=useState(objArtical)
    const [projectNameTransaction,setProjectNameTransaction]=useState('')
    const [transactionValues,setTransactionValues]= useState([{
        amount: '',
        currency: "",
        hash: "",
        projectId: '',
        projectName: "",
        userAvatar: "\\uploads\\Images\\User_Avatars\\28042022_030444_anymous_icon.png",
        userName: ""}]
    )
    // đừng có mở thg này ra :<
    const [projectDetail,setProjectDetail]= useState(
        {
            "userCreateId": 1,
            "title": "444444  - Cứu trợ nạn đ1ói khẩn cấp ở Châu Phi",
            "shortDescription": "<p>Đảm bảo các gia đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID1 19...</p>",
            "addressContract": "asdasxddasddasdasddsa",
            "friendlyUrl": "444444  - Cứu trợ nạn đ1ói khẩn cấp ở Châu Phi",
            "category": [
              {
                "categoryId": 2,
                "categoryName": "Trẻ em"
              },
              {
                "categoryId": 3,
                "categoryName": "Khí hậu"
              },
              {
                "categoryId": 4,
                "categoryName": "Khắc phục thiên tai"
              },
              {
                "categoryId": 5,
                "categoryName": "Phát triển kinh tế"
              }
            ],
            "userCreate": "Huỳnh Khang",
            "createTime": "0001-01-01T00:00:00",
            "amountNow": 9,
            "amountNeed": 0,
            "status": 0,
            "summary": "<p>Đảm bảo các gia1 đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19...</p>",
            "problemToAddress": "<p>Đảm bảo 2các gia đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19...</p>",
            "solution": "<p>Đảm bảo các gia đì3nh dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19...</p>",
            "location": "tp biên hòa, việt nam",
            "impact": "500 người dân",
            "endDate": "2022-08-11T09:12:22.737",
            "userType": 0,
            "bannerPath": "\\uploads\\Images\\test\\10042022_032942_pf.png",
            "isEdit": false,
            "processes": [
              {
                "processId": 3,
                "title": "process 3",
                "status": 1,
                "shortDescription": "<p>Đảm bảo các gia đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19...</p>",
                "content": "string",
                "amountNeed": 100000000,
                "listImages": [],
                "expenses": [
                  {
                    "expenseId": 69,
                    "description": "<p>1</p>",
                    "amount": 1,
                    "createTime": "2022-04-14T03:58:18.4635746",
                    "listFiles": null
                  }
                ]
              },
              {
                "processId": 4,
                "title": "process 4",
                "status": 1,
                "shortDescription": "<p>Đảm bảo các gia đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19...</p>",
                "content": "string",
                "amountNeed": 100000000,
                "listImages": [],
                "expenses": []
              },
              {
                "processId": 5,
                "title": "process 5",
                "status": 1,
                "shortDescription": "<p>Đảm bảo các gia đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19...</p>",
                "content": "string",
                "amountNeed": 100000000,
                "listImages": [],
                "expenses": [
                  {
                    "expenseId": 70,
                    "description": "<p>12312321312321312</p>",
                    "amount": 123123123123,
                    "createTime": "2022-04-14T04:07:07.1437925",
                    "listFiles": null
                  },
                 
                ]
              }
            ],
            "files": null,
            "articals": [],
            "transaction": [
              {
                "userName": "huỳnh văn thảo",
                "userAvatar": "\\uploads\\Images\\user\\11042022_114751_4.png",
                "projectId": 4,
                "projectName": "444444  - Cứu trợ nạn đ1ói khẩn cấp ở Châu Phi",
                "amount": 1,
                "currency": "TRX",
                "hash": "6f47680ecd756193d4897bc83d23d92f8499523a944cdfe41fba048c41491354"
              },
            
            ]
          })
    //----------------------------------------------------useEffect
    useEffect(()=>{
    console.log("categoryOptions",categoryOptions)

    },[categoryOptions])

    useEffect(()=>{
        console.log("arrayProject",arrayProject)
        },[arrayProject])
    // get projectlist from api
    useEffect(async()=>{
        const data={
            "keyword":inputSearch,
            "categoryid":inputCategoty.value,
            "status":inputStatus.value,
            "currentpage":currentpage
        }
        const repons= await projectApi.getAll(data)
        console.log("repons",repons.data)
        if(repons.isSuccess)
        {
            setIsLoading(false)
            setArrayProject(repons.data)
        }
    },[inputSearch,inputCategoty,inputStatus,currentpage,isAccept])

    useEffect(async()=>{
        const getAllUsers = async () => {
            try {
                const response = await categoryApi.getProject();

                setCategoryOptions([{value:0,label:'Tất cả'},...response.data.map((item)=>{
                    return({
                        value:item.id,
                        label:item.categoryName
                    })
                })])
            }
            catch (e) {
                console.error(e)
            }
        }
        getAllUsers()
    },[])
    useEffect(async()=>{
        console.log("img",imgValueArtical)
        if (imgValueArtical !== '') {
            // kiểm tra định dạng ảnh
            let resultimg = imgFormat.find(function (item) {
                return removeUnicode((imgValueArtical.name).slice((imgValueArtical.name).lastIndexOf('.') + 1)) === removeUnicode(item)
            })
            // đẩy hình ảnh lên data và lưu lại đường dẩn ảnh tại database
            if (resultimg) {
                let form = new FormData();
                // console.log(imgValue,'imgValue')
                form.append('Image', imgValueArtical);
                form.append('TypeImage', "new");

                const response = await projectApi.uploadFile(form);
                setCreateArtical({ ...createArtical,banner:{
                    "filePath":response.data.filePath,
                    "fileName":response.data.fileName,
                    "friendlyUrl":response.data.friendlyUrl,
                    "note":response.data.note}
                })
                console.log(createArtical)
                if (response.isSuccess) {
                }
                else {
                    Swal.fire('upload ảnh thất bại')
                }
            }
            else {
                Swal.fire('chỉ nhận file ảnh có đuôi là jpeg,gif,png,tiff,raw,psd')
                setImgValueArtical('')
            }
        }
    },[imgValueArtical])
    // useEffect(()=>{
    //     setInputDate($(".rs-picker-toggle-value")[0].innerHTML)
    // },[inputSearch ,inputCategoty , inputStatus ,inputTopic ,inputDate])
   
    //-------------------------------------------- funtion

    // xử lý hiện labe của 
    function HandleGetLable(filterlist,index){
        return(
            filterlist.find(function(itemCategoty){
                if (itemCategoty.value==(index+'')){
                    return itemCategoty
                }
            })
        )
    }

    const handleAcceptProject=async(id,status)=>
    {
        if(status===1)
        {
            const accept = async()=>{
            
                const respon= await projectApi.upStatusProject(id)
                if(respon.isSuccess)
                {
                    Swal.fire(respon.message)
                    setIsAccept(!isAccept)
                }
                else{
                    Swal.fire(respon.message)
                }
                
            }
            try{
                Swal.fire({
                    title: 'Bạn có Chắc?',
                    text: "Bạn muốn duyệt dự án này!",
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok!'
                }).then((result) => {
                    if (result.isConfirmed) {
                    accept()
                    }
                })
               
            }
            catch(e)
            {
                console.error(e)
            }
        }
        else{
            Swal.fire("Bạn đã duyệt dự án này trước đó")
        }
       
    }

    const Label = props => {
        return <label style={{ display: 'block', marginTop: 10 }} {...props} />;
    };
    

    const handleClose = () => setShow(false);
    const handleShow = async function(id){
        try{

            const respon= await projectApi.get(id)
            if(respon.isSuccess)
            {
                setProjectDetail(respon.data)
                console.log("setProjectDetail",projectDetail)
                setShow(true);
            }
           
        }
        catch(e)
        {
            console.error(e)
        }
    }

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    // ẩn hiện modal bài viết
    const handleCloseArtical = () => setShowAtical(false);
    const handleShowArtical =function(itemId){
        setCreateArtical(objArtical)
        setCreateArtical({...createArtical,id:itemId})
        setImgValueArtical('')
        setShowAtical(true);
    }
    const handleCreateArtical=async()=>{
        console.log("data",createArtical.banner.fileName)
        console.log(createArtical)
        if(
            createArtical.title!=="",
            createArtical.shortDescription!=="",
            createArtical.content!=="",
            createArtical.friendlyUrl!=="",
            createArtical.banner.filePath!==""
        ){
                const data ={
                    'id':createArtical.id,
                    "tilte": createArtical.title,
                    "content": createArtical.content,
                    // "friendlyUrl":createArtical.friendlyUrl,
                    "banner": {
                        "fileName": createArtical.banner.fileName,
                        "filePath": createArtical.banner.filePath,
                        "friendlyUrl": createArtical.banner.friendlyUrl,
                        "note": createArtical.banner.note
                    }
                }
               
                const respon = await articalApi.createArtical(data)
                if(respon.isSuccess)
                {
                    Swal.fire("Tạo bài viết thành công")
                    setIsAccept(!isAccept)
                    handleCloseArtical()
                }
                else{
                    Swal.fire("tạo bài viết thất bại")
                }    
            
        }
        else{
            Swal.fire("Vui lòng nhập đủ thông tin")
        }
      
    
    }
    const handleChangAvatar= (e)=>{
        setImgValueArtical(e.target.files[0])
    }
    // transaction
    const handleCloseTransaction = () => setShowTransaction(false);
    const handleShowTransaction=async(ProjectTitle,projectId)=>{
        setProjectNameTransaction(ProjectTitle)
        try
        {
            const respons= await projectApi.getTransaction(projectId)
            console.log("respons",respons)
            if(respons.isSuccess)
            {   
                setTransactionValues(respons.data)
                setShowTransaction(true)
            }
            else{
                Swal.fire(`lấy dữ liệu lịch sử giao dịch của dự án ${ProjectTitle} thất bại`)
            }
        }
        catch(e)
        {
            console.error(e)
        }
        
        
    }
    return(
        <>
           {
                isLoading ? <Loading /> : ""
            }
            <div className={clsx(Style.project,"main-manage container-fluid w-100")}>
                <div className="container-fluid w-100 pe-5">
                    <div className={clsx('row')}>
                        <div className={clsx(Style.titleBlock, ' w-100 main-top col-12 pt-4 pb-4')}>
                            <h3 className={clsx(Style.titleProject)}>Quản lý dự án</h3>
                            <Link to={"/admin/add-project"} target="_blank" className={clsx(Style.btnCreateProject,"btn")}>
                            <i className="mdi mdi-plus-circle me-1"></i>
                            Tạo Dự Án </Link>
                        </div>
                    </div>
                </div>
                <div className={clsx('row')}>
                    <div className={clsx(Style.filterBlock, 'filter col-3')}>
                        <div className={Style.filterBlockSpan}>
                            <div className={''}>
                                <h5 className={clsx(Style.searchContent,'')}>Tìm kiếm</h5>
                                <div className="form-group">
                                    <input value={inputSearch} onChange={(e)=>{setInputSearch(e.target.value)}} id="ipt-text-search" type="text" className={clsx(Style.searchInput, Style.Inputfocus, 'form-control')}  placeholder="Tìm theo tên dự án" autoComplete="off" />
                                </div>
                            </div>
                            <div className={'mt-4'}>
                                <h5 className={clsx(Style.searchContent,'')}>Danh mục</h5>
                                <div className="form-group">
                                    <Select defaultValue={inputCategoty} onChange={setInputCategoty}  className={clsx( Style.Inputfocus)} placeholder='danh mục' options={categoryOptions} />
                                </div>
                            </div>
                            <div className={'mt-4'}>
                                <h5 className={clsx(Style.searchContent,'')}>Trạng thái</h5>
                                <div className="form-group">
                                    <Select defaultValue={inputStatus} onChange={setInputStatus} className={clsx( Style.Inputfocus)}  placeholder='trạng thái' options={filterStatus} />
                                </div>
                            </div>
                           
                           
                        </div>
                    </div>
                    <div className={clsx('list col-9')}>
                        <div className={clsx(Style.listPoject)}>
                            <div className="page-aside-right">
                                <div className={clsx(Style.table_responsive, 'table-responsive')}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Mã dự án</th>
                                                <th scope="col">Tên dự án</th>
                                                <th scope="col">Người tạo</th>
                                                <th scope="col">Ngày tạo</th>
                                                <th scope="col">Ngày kết thúc</th>
                                                <th scope="col">Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                arrayProject.map(function(item,index,arr){
                                                    return(
                                                        <tr key={index} style={{lineHeight:'2rem'}}>
                                                            <th key={index+'index'} scope="row">{index}</th>
                                                            <td key={index+"id"}>{item.id}</td>
                                                            <td key={index+"title"} className={clsx(Style.titleshow)}>{item.title.length>30?(item.title.slice(0,30)+'...'):item.title}</td>
                                                            <td key={index+"useCreate"}>{item.userCreate}</td>
                                                            <td key={index+'createDate'}>{moment(item.createTime).format("DD/MM/YYYY") }</td>
                                                            <td key={index+'endate'}>{moment(item.endDate).format("DD/MM/YYYY") }</td>
                                                            {/* filterStatus[item.status] */}
                                                            <td key={index+'status'}>
                                                                <span className={clsx(Style.StatusItem, 'position-relative', item.status===1 ? 'waitingStatus': ( item.status=== 2 ? 'doingStatus' : 'doneStatus') )}>{ HandleGetLable(filterStatus,item.status).label}
                                                                    <div  className={clsx(Style.changeStatus,'changeStatus')}>
                                                                        <span>duyệt dự án</span>
                                                                    </div>
                                                                </span> 
                                                            </td>
                                                          
                                                            <td key={index+'dropdow'} className=" text-center align-middle ">
                                                                <Dropdown className="d-inline mx-2" >
                                          
                                                                    <Dropdown.Toggle id="dropdown-autoclose-true" className={clsx(Style.btnDrop, "project-admin" )}
                                                                    style={{position:'relative',height:'30px' ,backgroundColor:'transparent', border:'none' }}>
                                                                                <i className={clsx(Style.iconDrop, "text-light mdi mdi-dots-vertical font-18 text-primary")}></i>
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu className={clsx(Style.listDrop)} style={{}}>
                                                                        <Dropdown.Item 
                                                                         className={clsx( Style.itemDrop,"align-self-end  rounded-3  text-dark text-decoration-none")}
                                                                         onClick={()=>{ handleAcceptProject(item.id,item.status)}}><i className="mdi mdi-playlist-check"></i>
                                                                            Duyệt dự án
                                                                       </Dropdown.Item>
                                                                        <Dropdown.Item  as={Link} to={"/admin/project-detail/" + item.id + "/" + MakeUrl(item.title)} target="_blank"
                                                                         className={clsx( Style.itemDrop,"align-self-end  rounded-3  text-dark text-decoration-none")}
                                                                         onClick={()=>{ window.scrollTo(0, 0)}}><i className="mdi mdi-window-restore "></i>
                                                                            Chi tiết
                                                                       </Dropdown.Item>
                                                                        {/* <Dropdown.Divider /> */}
                                                                        <Dropdown.Item as={Link} target="_blank"  to={{ pathname: `/admin/update-project/${item.id}/${item.title}`, state:locations}} className={clsx(Style.itemDrop,"align-self-end  rounded-3  text-dark text-decoration-none")}><i className="mdi mdi-lock-reset "></i>
                                                                            Sửa Dự Án
                                                                        </Dropdown.Item>
                                                                      
                                                                        {/* <Dropdown.Divider /> */}
                                                    
                                                                        <Dropdown.Item onClick={()=>{handleShow(item.id)}}  className={clsx(Style.itemDrop)}><i className="mdi mdi-lock-reset "></i>Sửa Tiến trình</Dropdown.Item>
                                                                        <Dropdown.Item onClick={()=>{handleShowArtical(item.id)}} className={clsx(Style.itemDrop,"align-self-end  rounded-3  text-dark text-decoration-none")}>
                                                                        <i className="mdi mdi-plus-circle-outline"></i>
                                                                            Tạo bài viết
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item onClick={()=>{handleShowTransaction(item.title,item.id)}} className={clsx(Style.itemDrop,"align-self-end  rounded-3  text-dark text-decoration-none")}>
                                                                        <i className="mdi mdi-swap-horizontal"></i>
                                                                            Xem lịch sử giao dịch
                                                                        </Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </td>
                                                                
                                                            
                                                        </tr>

                                                        )
                                                })
                                            }
                                            
                                            
                                        </tbody>
                                    </table>
                                    <div className="d-flex">
                                            <div>
                                                <button onClick={()=>setCurrentpage(currentpage!=0?currentpage-1:currentpage)} className={clsx( Style.prevBtn,'bg-info px-2')}>
                                                <span className="mdi mdi-chevron-double-left"></span>
                                                </button>
                                                <span className="px-3 text-secondary">{currentpage}</span>
                                                <button onClick={()=>setCurrentpage(currentpage+1)} className={clsx( Style.nextBtn,'bg-info px-2')}>
                                                <span className="mdi mdi-chevron-double-right"></span>
                                                </button>
                                            </div>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
                {/* modal chọn tiến trình                        */}
                <Modal size='xl' show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Chọn tiếng trình để sửa</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div id="process" className={clsx(Style.process, 'py-5')} >
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <h2>Tiến trình dự án</h2>
                                        <div className={clsx(Style.line)}><hr /></div>
                                    </div>
                                    <div className="col-12 col-lg-6 text-end border-end">
                                        <p className={clsx(Style.baseColor, 'm-0 fs-5')}>Mục tiêu của chúng tôi</p>
                                        <p className={clsx(Style.foreignColor, 'm-0')}>{formatNumber(projectDetail.amountNeed)} VNĐ</p>
                                    </div>
                                </div>

                                {/* Tab content  */}
                                <div id={clsx(Style.tabContent)} className="row ">
                                    <div className="col-12">
                                        <ul className="nav nav-pills my-5 flex-nowrap overflow-auto" id="pills-tab" role="tablist">
                                            {
                                                projectDetail.processes.map((item, index) => (
                                                    <li key={"nav-item" + index} className={clsx(Style.navItem, 'd-flex align-items-center ')} role="presentation">
                                                        <button className={clsx("bg-transparent px-3 px-lg-4  border  rounded-pill ", index === 0 ? "active" : "")} id={"pills-" + index + '-tab'} data-bs-toggle="pill" data-bs-target={"#pills-" + index} type="button" role="tab" aria-controls={"pills-" + index} aria-selected={index == 0 ? "true" : "false"}>
                                                            <div style={{ borderBottom: "1px dashed #ccc" }} className="fw-bold text-white">
                                                                T{index + 1}
                                                            </div>
                                                            <div style={{ fontSize: '12px' }} className=" text-muted ">{formatNumber(Number(item.amountNeed))}</div>
                                                        </button>
                                                        {index < projectDetail.processes.length - 1 ? <div className={clsx(Style.tabLine)}></div> : ""}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            {
                                                projectDetail.processes.map((item, index,arr) => (
                                                    <div key={"tab-content" + index} className={clsx("tab-pane fade", index === 0 ? "show active" : "")} id={"pills-" + index} role="tabpanel" aria-labelledby={"pills-" + index + "-tab"}>

                                                        <div className={clsx(Style.baseColor, 'd-flex flex-column flex-md-row justify-content-between align-items-center my-5')}>
                                                            <div className="d-flex  align-items-center align-self-start">
                                                                <i className="mdi mdi-chart-donut fs-1 me-3 pe-3 border-end"></i>
                                                                <div className="">
                                                                    <p className="mb-0  text-uppercase">Trạng thái</p>
                                                                    <p className={clsx(Style.foreignColor, 'm-0 fs-5 text-uppercase')}>{item.status === 1 ? "Chưa bắt đầu" : (item.status === 2 ? "Đang thực thi" : "Đã hoàn thành")}</p>
                                                                </div>
                                                            </div>
                                                            {
                                                                //  
                                                                    <Link  to={{
                                                                        pathname: `/admin/update-process/${item.processId}`,
                                                                        state: item // chuyền dữ liệu qua Update-process
                                                                    }} onClick={() => window.scrollTo(0, 0)} className={clsx(Style.baseColor, Style.editBtn, "align-self-end  my-2 py-2 px-4 px-lg-5 fw-light rounded-3 text-center   text-uppercase text-decoration-none")} ><i className="mdi mdi-tooltip-edit me-2"></i>Chỉnh sửa tiến trình</Link>
                                                               
                                                            }

                                                        </div>

                                                        <div className='my-5'>
                                                            <h2 className={clsx(Style.baseColor, Style.title, 'fs-4 text-uppercase')}>{item.title}</h2>
                                                            <SetInnerHTML text={item.shortDescription} />
                                                        </div>

                                                        <div className="row mt-5">
                                                            {
                                                                item.content ?
                                                                    <div className="col-12 col-lg-6">
                                                                        <div className="mb-5">
                                                                            <h3 className="fs-5 mb-4 text-uppercase">Nội dung</h3>
                                                                            <SetInnerHTML text={item.content} />
                                                                        </div>
                                                                        <div className="mb-5">
                                                                            <h3 className="fs-5 mb-4 text-uppercase">Hình ảnh</h3>
                                                                            {
                                                                                item.listImages.length > 0 ?
                                                                                    item.listImages.map((itemImage, index) => (
                                                                                        <span key={"image" + index} className="p-3">
                                                                                            <Zoom>
                                                                                                <img src={process.env.REACT_APP_URL + '/' + itemImage.filePath} width="100px" height="100px" alt="" />
                                                                                            </Zoom>
                                                                                        </span>
                                                                                    )) : ""
                                                                            }
                                                                        </div>

                                                                    </div> : ""
                                                            }
                                                            {
                                                                item.expenses.length > 0 ?
                                                                    <div className="col-12 col-lg-6">
                                                                        <div className="">
                                                                            <h3 className="fs-5 mb-4 text-uppercase">Chi phí</h3>
                                                                            {/* Danh sách chi phí  */}
                                                                            {
                                                                                item.expenses.map((itemExpense, index) => (
                                                                                    <div key={index} className={clsx(Style.expenseCard, 'p-2')}>
                                                                                        <div className={clsx(Style.expenseHeader, Style.foreignColor, 'd-flex justify-content-between fs-5')}>
                                                                                            <span className='text-uppercase m-0'>Tổng chi</span>
                                                                                            <span className='text-uppercase m-0'>{formatNumber(Number(itemExpense.amount))} VNĐ</span>
                                                                                        </div>
                                                                                        <div className={clsx(Style.expenseBody, 'p-4 bg-white text-dark')}>
                                                                                            <div className="expense-body-header d-flex justify-content-around flex-column flex-md-row">
                                                                                                <span className="">
                                                                                                    <div className={clsx(Style.foreignColor, 'mb-2')}><i className="mdi mdi-calendar-check me-1"></i>Ngày</div>
                                                                                                    <div>{moment(itemExpense.createTime).format("DD/MM/YYYY")}</div>
                                                                                                </span>
                                                                                                <span className="">
                                                                                                    <div className={clsx(Style.foreignColor, 'mb-2')}><i className="mdi mdi-magnify me-1"></i>Loại</div>
                                                                                                    <div>Thanh Toán</div>
                                                                                                </span>
                                                                                                <span className="">
                                                                                                    <div className={clsx(Style.foreignColor, 'mb-2')}><i className="mdi mdi-coin me-1"></i>Số tiền</div>
                                                                                                    <div>{itemExpense.amount} vnd</div>
                                                                                                </span>
                                                                                                <span className="">
                                                                                                    <div className={clsx(Style.foreignColor)}><i className="mdi mdi-file-check me-1"></i>Hóa đơn</div>
                                                                                                    <div className="text-md-center">
                                                                                                        <a href={itemExpense.list} download className={clsx(Style.foreignColor)}><i className="mdi mdi-briefcase-download fs-4"></i></a>
                                                                                                    </div>
                                                                                                </span>
                                                                                            </div>

                                                                                            <div className="expense-body-desc my-5">
                                                                                                <p className={clsx(Style.foreignColor, 'm-0 mb-2')}><i className="mdi mdi-eye-outline me-1"></i>Mô tả</p>
                                                                                                <SetInnerHTML text={itemExpense.description} />
                                                                                            </div>
                                                                                            <div className="expense-body-transaction">
                                                                                                <p className={clsx(Style.foreignColor, 'm-0')}><i className="mdi mdi-repeat me-1"></i>Lịch sử giao dịch</p>
                                                                                                <a href={"https://tronscan.org/#/contract/" + projectDetail.addressContract} target="_blank" rel="noreferrer" className={clsx(Style.baseColor, 'text-decoration-none')}>Xem trên Blockchain</a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                ))
                                                                            }

                                                                        </div>
                                                                    </div> : ""
                                                            }


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

                    <Modal.Footer>
                   
                    </Modal.Footer>
                </Modal>

                {/* modal tạo bài viết */}
                <Modal size="xl" show={showAtical} onHide={handleCloseArtical}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-black-50">Tạo bảng tin</Modal.Title>
                </Modal.Header>
                <Modal.Body className="container-fluid ">
                    <div className="row p-3">
                        <div className={clsx(Style.imgAccountUpdate, "col-4 me-end")}>

                            <img className={clsx(Style.img_item1, "mx-auto d-block img-fluid")}
                                src={(createArtical.banner.filePath)?process.env.REACT_APP_URL+createArtical.banner.filePath:process.env.REACT_APP_URL+imgDefault} alt="" />
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
                                    value={createArtical.title}
                                    onChange={(e) => { setCreateArtical({ ...createArtical, title: e.target.value }) }}
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
                                        data={createArtical.content}

                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setCreateArtical({ ...createArtical, content: data })
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
                        <Button className="me-2" variant="secondary" onClick={handleCloseArtical}>
                            Đóng
                        </Button>
                        <Button  variant="primary" onClick={() => { handleCreateArtical() }}>
                            Tạo
                        </Button>
                    </div>

                </Modal.Footer>
                </Modal>

                {/* modal xem đóng góp */}
                <Modal
                    size='xl'
                    show={showTransaction}
                    onHide={handleCloseTransaction}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <div className="py-2 px-3">

                         <Modal.Title className="text-black-50">Lịch sử giao dịch của dự án: {projectNameTransaction}</Modal.Title>
                    </div>
                    {/* <Modal.Header closeButton>
                    </Modal.Header> */}
                    <Modal.Body>
                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col"className={clsx(Style.lh, "text-center")} >#</th>
                                                <th scope="col"className={clsx(Style.lh, "text-center")} >Ảnh đại diện</th>
                                                <th scope="col"className={clsx(Style.lh, "text-center")} >Người đóng góp</th>
                                                <th scope="col"className={clsx(Style.lh, "text-center")} >Số tiền đóng góp</th>
                                                <th scope="col"className={clsx(Style.lh, "text-center")} >Đơn vị tiền tệ</th> 
                                                <th scope="col"className={clsx(Style.lh, "text-center")} >Mã giao dịch</th> 
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                transactionValues.map(function(item,index,arr){
                                                    return(
                                                        <tr key={index} style={{lineHeight:'2rem'}}>
                                                            <th key={index+'index'}  className={clsx(Style.lh, "text-center")} scope="row">{index}</th>
                                                            <td key={index + 'ing'}>
                                                                <div className={clsx(Style.imgAccount, " text-center  mx-auto d-block")}>
                                                                    <img id="img-banner1" src={ process.env.REACT_APP_URL +item.userAvatar }
                                                                     className={clsx(Style.img_item, " rounded-circle border border-1 img-fluid img-auto-size ")} />
                                                                </div>
                                                            </td>

                                                            <td key={index+"id"} className={clsx(Style.lh, "text-center")} >{item.userName}</td>
                                                            <td key={index+"title"} className={clsx(Style.titleshow,"text-center")}>{item.amount}</td>
                                                            <td key={index+"useCreate"} className={clsx(Style.lh, "text-center")}>TRX</td>
                                                            <td key={index+"hash"} className={clsx(Style.hash, "text-center")}>
                                                                <a href={"https://nile.tronscan.org/#/transaction/" + item.hash} 
                                                                target="_blank" rel="noreferrer" className={clsx(Style.baseColor, "m-0 d-block text-center text-decoration-none")}> {item.hash.slice(0,30)+'...'}</a>
                                                               
                                                            </td>
                                                        </tr>

                                                        )
                                                })
                                            }
                                            
                                            
                                        </tbody>
                                    </table>        
                    </Modal.Body>
                    <div className="d-flex justify-content-end pb-2 px-2">
                        <Button variant="secondary" className="" style={{width:'150px'}} onClick={handleCloseTransaction}>
                            Đóng
                        </Button>
                    </div>
                    {/* <Modal.Footer>
                    <Button variant="primary">Understood</Button>
                    </Modal.Footer> */}
                </Modal>
            </div>
           
        </>
    )
}

export default Project