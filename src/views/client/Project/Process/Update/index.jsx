import Style from "./Update.module.scss"
import default_img from "../../../../../assets/images/default_image.png"
import clsx from "clsx";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useState ,useEffect} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { DocTienBangChu } from "../../../../../utils/utils";
import * as $ from "jquery"
import Select from 'react-select'
import * as alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import Dropdown from 'react-bootstrap/Dropdown'

function UpdateProcess(){
    //-------------------------------------------------------- giá trị khởi tạo
    const process={
        title:'cứu trợ miền trung',
        shortDescription:"cứu trợ j đó",
    }
    const  location  = useLocation().pathname;
    const listTypeExpen=[
        { value: '1', label: 'Thanh toán' },
      ]
    //---------------------------------------------------------- hook
    const [processValue,setProcessValue]=useState(process)
    const [imgValue,setImgValue]= useState([])
    const [content,setContent]= useState('')
    const [indexExpense,setIndexExpense]=useState(-1)
    // expense
    const [description,setDescription]= useState('')
    const [typeEpen, setTypeEpen] = useState(listTypeExpen[0]);
    const [amountNeed,setAmountNeed] = useState(0)
    const [amountWord,setAmountWord] = useState('')
    const [listExpense,setListExpense]= useState([])

    //---------------------------------------------------------- useEffect
    useEffect(()=>{
        const btnUpdate =$('.updateProcess')
        if(Number(indexExpense) >= 0)
        {
            btnUpdate.removeClass('disabled')
        }
        else{
            btnUpdate.addClass('disabled')
        }
        console.log("indexProcess",indexExpense)
    },[indexExpense])

    useEffect(()=>{
        setAmountWord(DocTienBangChu(amountNeed))
    },[amountNeed])

    useEffect(()=>{
        const btntMoreImg = $('.btntMoreImg')
        const btndeleteImg = $('.btndeleteImg')
        if(location==="/add-process")
        {
            btntMoreImg.addClass('disabled')
            btndeleteImg.addClass('disabled')
        }
        else{
            if(imgValue.length>=5){ btntMoreImg.addClass('disabled')}
            else{ btntMoreImg.removeClass('disabled') }
            if(imgValue.length>=1) { btndeleteImg.removeClass('disabled') }
            else{ btndeleteImg.addClass('disabled') }
        }
    },[imgValue])
    //---------------------------------------------------------- function
   
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

    // thêm expense vào danh sách
    const handleAddProcess=()=>{
        if( description !== "" && typeEpen !=="" &&  amountNeed>0 )
        {
            setListExpense([...listExpense,{
                id:0,
                description,
                typepen:typeEpen,
                amount:amountNeed,
            }])
           
            setDescription('')
            setTypeEpen(listTypeExpen[0])
            setAmountNeed(0)
            setIndexExpense(-1)
             $('.ajs-button.ajs-ok').css({"background-color": "var(--admin-btn-color)"});

            alertify.alert('Thông báo', `Thêm chi tiêu vào tiến trình  ${processValue.title}  thành công!`);
        }
        else{
            $('.ajs-button.ajs-ok').css({"background-color": "var(--status-waiting-color)"});
            alertify.alert('Thông báo', `Thêm chi tiêu vào tiến trình ${processValue.title}  thất bại !`);
        }
    }


    // lấy item của danh sách
    const calbackGetProcess=(index)=>{
        setDescription(listExpense[index].description)
        setTypeEpen(listExpense[index].typepen)
        setAmountNeed(listExpense[index].amount)
        setIndexExpense(index)
    }
   
    // cập nhật expense
    const handleUpdateProcess =()=>{
        console.log(123)
        if( description !== "" && typeEpen !=="" &&  amountNeed>0 )
        {
            const arrExpense=[...listExpense]

            arrExpense[indexExpense]={
                id:0,
                description,
                typepen:typeEpen,
                amount:amountNeed,
            }
            setListExpense(arrExpense)
            setDescription('')
            setTypeEpen(listTypeExpen[0])
            setAmountNeed(0)
            setIndexExpense(-1)
             $('.ajs-button.ajs-ok').css({"background-color": "var(--admin-btn-color)"});

            alertify.alert('Thông báo', `sửa bảng chi tiêu của tiến trình ${processValue.title}  thành công!`);
        }
        else{
            $('.ajs-button.ajs-ok').css({"background-color": "var(--status-waiting-color)"});
            alertify.alert('Thông báo', `sửa bảng chi tiêu của tiến trình ${processValue.title}  thất bại !`);
        }
    }
    
    // xóa process
    const HandleDeleteProcess =(index)=>{
        alertify.confirm('Thông báo','bạn có chắc muốn xóa tiến trình này', 
            function(){
                const arr1 =[...listExpense.slice(0,index),...listExpense.slice(index+1)]
                setListExpense(arr1)
                alertify.success('xóa thành công') 
            },
            function()
            { 
                alertify.error('đã hủy xóa')
            });
    }
    return(
        <>
        <div className={clsx(Style.main)}>
           <div id='nava' className="container-fluid p-5 ">
               
               <div className={clsx('row pt-3')}>
                   <div className="col-12 ">
                       <h3 className={clsx(Style.title_content,"pb-3")}>Cập nhật tiến trình </h3>
                    {/* hình ảnh */}
                       <div className={clsx(Style.img_wrap,'row')}>
                           <h5 style={{fontSize:'1.2rem'}}>Hình Ảnh</h5>
                           <div className="col-2">
                               <img id="img-banner" src={imgValue.length>0?imgValue[0].review: default_img}  className={clsx(Style.img_item,"img-auto-size")}  />
                           </div>
                           <div className="col-2">
                               <img id="img-banner"src={imgValue.length>1?imgValue[1].review: default_img}   className={clsx(Style.img_item,"img-auto-size")}  />
                           </div>
                           <div className="col-2">
                               <img id="img-banner" src={imgValue.length>2?imgValue[2].review: default_img}   className={clsx(Style.img_item,"img-auto-size")}   />
                           </div>
                           <div className="col-2">
                               <img id="img-banner" src={imgValue.length>3?imgValue[3].review: default_img}   className={clsx(Style.img_item,"img-auto-size")}  />
                           </div>
                           <div className="col-2">
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
                        {/* thông tin */}
                        <div className={clsx(Style.information_wrap,'row p-4')}>
                            <h5>Thông tin</h5>
                        {/* tên tiến trình */}
                            <div className={clsx('col-12 pt-3 ')}>
                                <label htmlFor="nameProject">Tên tiến trình</label>
                                <input value={processValue.title} onChange={(e)=>setProcessValue({...processValue,title: e.target.value})} className={clsx(Style.title,'w-100 ps-2 pe-2 ')} id='nameProject' type="text" />
                            </div>
                        {/* mô tả ngắn tiến trình  */}
                            <div className={clsx('col-12 pt-3')}>
                                <div className={clsx(Style.editor,' removeImg')}>
                                    <label htmlFor="nameProject">Mô tả ngắn tiến trình</label>
                                    <CKEditor
                                            editor={ ClassicEditor }
                                            data={processValue.shortDescription}
                                            onChange={ ( event, editor ) => {
                                                const data = editor.getData();
                                                setProcessValue({...processValue,shortDescription:data})
                                            } }
                                            config={{
                                                removePlugins :['image','MediaEmbed','Table'],
                                            }}
                                        />
                                </div>
                            </div>
                        {/* nội dung tiến trình */}
                            <div className={clsx('col-12 pt-3')}>
                                <div className={clsx(Style.editor,' add-project_editor removeImg')}>
                                    <label htmlFor="nameProject">Nội dung tiến trình</label>
                                    <CKEditor
                                            editor={ ClassicEditor }
                                            data={content}
                                            onChange={ ( event, editor ) => {
                                                const data = editor.getData();
                                                setContent(data)
                                            } }
                                            config={{
                                                removePlugins :['image','MediaEmbed','Table'],
                                            }}
                                        />
                                </div>
                            </div>
                        {/* số tiền cần thiết cho tiến trình */}
                            <div className={clsx('col-12 pt-3 ')}>   
                                    <label htmlFor="amound">Số tiền cần thiết cho tiến trình (VND)</label>
                                    <input id='amound' value={amountNeed} onChange={(e)=>{if(Number.isFinite(Number(e.target.value))){
                                            setAmountNeed(Number(e.target.value))} }} className={clsx(Style.title,'w-100 ps-2 pe-2 ')}  type="text" />
                                    <span className={clsx(Style.wrap_amountWord,'mt-2 d-inline-block font-weight-bold')}>Thành tiền : 
                                        <span className={clsx(Style.amountWord,'text-danger')}> {amountWord} </span>
                                    </span>
                            </div>
                        </div>
               
                        {/* danh sách  */}
                       
                     </div>
               </div>
           
                       <div className={clsx("row pe-4 pt-4 ")}>
                           
                            <div className="col-9">
                            <h3 className={clsx(Style.title_content,"pb-3")} >Chi tiêu</h3>
                                    {/* chi tiêu */}
                                    <div className={clsx(Style.expense_wrap,'row p-4')}>
                                                               
                                                            {/* mô tả ngắn phần chi tiêu */}
                                                                <div className={clsx('col-12 pt-3')}>
                                                                    <div className={clsx(Style.editor,' add-project_editor removeImg')}>
                                                                        <label htmlFor="nameProject">Mô tả ngắn cho phần chi tiêu</label>
                                                                        <CKEditor
                                                                                editor={ ClassicEditor }
                                                                                data={description}                         
                                                                                onChange={ ( event, editor ) => {
                                                                                    const data = editor.getData();
                                                                                    setDescription(data)                                           
                                                                                } }
                                                                                config={{                                               
                                                                                    removePlugins :['image','MediaEmbed','Table'],
                                                                                }}
                                                                            />
                                                                    </div>
                                                            {/* hình thức chi tiêu  */}
                                                                    <div className={clsx('col-12 pt-3 ')}>
                                                                        <label >Hình thức chi tiêu</label>
                                                                        <div className="form-group">
                                                                            <Select defaultValue={typeEpen} onChange={setTypeEpen} className={clsx( Style.Inputfocus)} placeholder='loại' options={listTypeExpen} />
                                                                        </div>
                                                                    </div>
                                                            {/* sô tiền đã dùng */}
                                                                    <div className={clsx('col-12 pt-3 ')}>   
                                                                        <label htmlFor="amound">Số tiền đã dùng (VND)</label>
                                                                        <input id='amound' value={amountNeed} onChange={(e)=>{if(Number.isFinite(Number(e.target.value))){
                                                                                setAmountNeed(Number(e.target.value))} }} className={clsx(Style.title,'w-100 ps-2 pe-2 ')}  type="text" />
                                                                        <span className={clsx(Style.wrap_amountWord,'mt-2 d-inline-block font-weight-bold')}>Thành tiền : 
                                                                            <span className={clsx(Style.amountWord,'text-danger')}> {amountWord} </span>
                                                                        </span>
                                                                    </div>

                                                                </div>
                                                                <div className='d-flex justify-content-end container'>
                                                                
                                                                    <button href="nava" onClick={handleAddProcess}  className={clsx(Style.createbtn,'btn me-2')}>Thêm</button>
                                                                    <button href="nava" onClick={handleUpdateProcess} className={clsx(Style.createbtn,'btn updateProcess')}>Cập Nhật</button>
                                                                    {/* onClick={handleUpdateProcess} className={clsx(Style.createbtn,'btn updateProcess')} */}
                                                                    {/* <button href="nava">Cập Nhật</button> */}
                                                                </div>
                                                            </div>
                            </div> 

                            <div className="col-3">
                                <h3 className={clsx(Style.title_content,"pb-3")} >Danh sách tiến trình</h3>
                                <div className={clsx(Style.process_list,'row ')}>
                                {/* {projectObj.projectname} */}
                                    <h5 className="pt-2 ps-3" style={{color:"#666", fontSize:"1.1rem"}}>Tên tiến trình: </h5>
                                    <div className="col-12 ps-2 pe-2">
                                        <table className="table">
                                            <thead>
                                                <tr style={{color:"#666", fontSize:"0.857rem"}}>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Số tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                        listExpense.map(function(item,index){
                                                            return(
                                                                <>
                                                                    <tr className={clsx(Style.itemProcess,"cursor-pointer")} >
                                                                        <th onClick={()=>{calbackGetProcess(index)}}>{index}</th>
                                                                        <th onClick={()=>{calbackGetProcess(index)}}>{item.amount}</th>
                                                                        <td className=" text-center align-middle ">
                                                                                <Dropdown className="d-inline mx-2" >
                                                                                    <Dropdown.Toggle id="dropdown-autoclose-true" className={clsx(Style.btnDrop, "project-admin" )}>
                                                                                            <i className={clsx(Style.iconDrop, "text-light mdi mdi-dots-vertical font-18  text-primary")}></i>
                                                                                    </Dropdown.Toggle>

                                                                                    <Dropdown.Menu className={clsx(Style.listDrop)} style={{}}>
                                                                                        <Dropdown.Item onClick={()=>{HandleDeleteProcess(index)}}  className={clsx(Style.itemDrop)}><i className="mdi mdi-window-restore pe-2"></i>Xóa</Dropdown.Item>
                                                                                    </Dropdown.Menu>
                                                                                </Dropdown>
                                                                            </td>
                                                                    </tr>
                                                                    
                                                                </>
                                                            )
                                                        })
                                                    }
                                                
                                            </tbody>
                                        </table>
                                    </div>       
                                </div>
                            <div className='d-flex justify-content-end container'>
                                {/* onClick={handleFinal} */}
                                <button href="nava" className={clsx(Style.Btnfinal,'btn')}>Hoàn thành</button>
                            </div>
                       </div>
                    </div>
                </div>  
            
            
       </div>
       </>
    )
}
export default UpdateProcess