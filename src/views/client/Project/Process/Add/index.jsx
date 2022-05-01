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
import { useHistory, useLocation } from "react-router-dom";
import projectApi from "../../../../../api/Project";
import Dropdown from 'react-bootstrap/Dropdown'
import { DocTienBangChu } from "../../../../../utils/utils"
import moment from 'moment';
import swal2 from "sweetalert2";


function AddProcess(props) {
    // ----- tronweb
    let locationsq = useLocation().pathname.slice(1)
    locationsq = locationsq.slice(0, locationsq.indexOf("/"))
    console.log("locationsq", locationsq)
    const tronweb = window.tronWeb;
    // const HttpProvider = tronweb.providers.HttpProvider;
    // tronweb.eventServer = new HttpProvider("https://nile.trongrid.io")

    //---------------------------------------------------------------------------giá trị khởi tạo
    const location = useLocation().pathname;
    const projectObj = props.location.state
    console.log("projectObj", projectObj)
    console.log(moment(projectObj.enddate).utc().format())
    console.log("EndDate: ", projectObj.enddate)
    console.log("Second endDate: ", Math.round(projectObj.enddate.getTime() / 1000))
    const history = useHistory()

    //------------------------------------------------------------------------------------- useState
    const [listProcessValue, setListProcessValue] = useState([])
    const [urlPath, setUrlPath] = useState([])
    const [title, setTitle] = useState('')
    const [shortDescription, setshortDescription] = useState('')
    const [content, setContent] = useState('')
    const [amountNeed, setAmountNeed] = useState(0)
    const [imgValue, setImgValue] = useState([])
    const [indexProcess, setIndexProcess] = useState(-1)
    const [amountWord, setAmountWord] = useState('')

    //--------------------------------------------------------------------------------- useEffect

    useEffect(() => {
        setAmountWord(DocTienBangChu(amountNeed))
    }, [amountNeed])

    useEffect(() => {
        console.log("listProcessValue", listProcessValue)

    }, [listProcessValue])

    useEffect(() => {
        const btnUpdate = $('.updateProcess')
        if (Number(indexProcess) >= 0) {
            btnUpdate.removeClass('disabled')
        }
        else {
            btnUpdate.addClass('disabled')
        }
        console.log("indexProcess", indexProcess)
    }, [indexProcess])

    const [trxPrice, setTrxPrice] = useState();
    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=vnd")
            .then(res => res.json())
            .then(res => { setTrxPrice(res.tron.vnd) })
    }, [])
    //------------------------------------------------------------------------ function

    // xử lý hiện ảnh lên màn hình
    const handleMoreImg = (e) => {
        const file = e.target.files[0]
        file.review = URL.createObjectURL(file)
        setImgValue([...imgValue, file])
    }

    // xóa hình ảnh
    const handleDeleteImg = () => {
        var arr = [...imgValue]
        arr.pop()
        setImgValue(arr)
    }

    // xử lý thêm process vào danh sách 
    const handleAddProcess = () => {
        if (
            title !== "" &&
            shortDescription !== ""
            && amountNeed > 0) {
            setListProcessValue([...listProcessValue, {
                title,
                shortDescription,
                amountNeed,
            }])
            setTitle('')
            setshortDescription('')
            setAmountNeed(0)
            setIndexProcess(-1)
            $('.ajs-button.ajs-ok').css({ "background-color": "var(--admin-btn-color)" });

            swal2.fire({
                title: "Thông báo",
                text: `Thêm tiến trình vào dự án  ${projectObj.projectname} thành công`,
                icon: "success",
                confirmButtonColor: 'var(--love-color-1)'

            });

        }
        else {

            $('.ajs-button.ajs-ok').css({ "background-color": "var(--status-waiting-color)" });
            swal2.fire({
                title: "Thông báo",
                text: `Thêm tiến trình vào dự án ${projectObj.projectname}  thất bại !`,
                icon: "error",
                confirmButtonColor: 'var(--love-color-1)'

            });

        }

    }

    // lấy item của danh sách
    const calbackGetProcess = (index) => {
        setIndexProcess(index)
        setAmountNeed(listProcessValue[index].amountNeed)
        setTitle(listProcessValue[index].title)
        setshortDescription(listProcessValue[index].shortDescription)
    }

    // cập nhật process

    const handleUpdateProcess = () => {
        if (title !== "" && shortDescription !== "" && amountNeed > 0) {
            const arrProcess = [...listProcessValue]
            arrProcess[indexProcess] = {

                title,
                shortDescription,
                amountNeed,
            }
            setListProcessValue(arrProcess)
            setTitle('')
            setshortDescription('')
            setAmountNeed(0)
            setIndexProcess(-1)
            $('.ajs-button.ajs-ok').css({ "background-color": "var(--admin-btn-color)" });

            alertify.alert('Thông báo', `Sửa tiến trình của dự án  ${projectObj.projectname}  thành công!`);
        }
        else {
            $('.ajs-button.ajs-ok').css({ "background-color": "var(--status-waiting-color)" });
            alertify.alert('Thông báo', `Sửa tiến trình của dự án  ${projectObj.projectname}  thất bại !`);
        }

    }

    // xóa process
    const HandleDeleteProcess = (index) => {
        alertify.confirm('Thông báo', 'bạn có chắc muốn xóa tiến trình này',
            function () {
                const arr1 = [...listProcessValue.slice(0, index), ...listProcessValue.slice(index + 1)]
                setListProcessValue(arr1)
                alertify.success('xóa thành công')
            },
            function () {
                alertify.error('đã hủy xóa')

            });
    }

    // đẩy lên Api
    const handleCreateProject = () => {
        if (!!window.tronWeb === false) {
            swal2.fire({
                title: "Thông báo",
                text: "Vui lòng cài đặt TronLink để tạo dự án.",
                icon: "info",
                confirmButtonColor: 'var(--love-color-1)'

            });
        } else if ((window.tronWeb.ready && window.tronWeb.ready) === false) {
            // alertify.alert("Vui lòng đăng nhập TronLink để tạo dự án.")
            swal2.fire({
                title: "Thông báo",
                text: "Vui lòng đăng nhập TronLink để tạo dự án.",
                icon: "info",
                confirmButtonColor: 'var(--love-color-1)'

            });
        } else {
            createProjectSM();
        }
    }

    // Tạo dự án trên Smart Contract 
    async function createProjectSM() {
        try {


            // Quy đổi VND -> SUN (1 TRX = 1.000.000 SUN)
            const amountNeedVnd = listProcessValue.reduce(function (total, number) {
                return total + number.amountNeed
            }, 0);
            const amountNeedSun = Math.round((amountNeedVnd / trxPrice) * 1000000)
            console.log('SUN: ', amountNeedSun);

            const transaction = await tronweb.transactionBuilder.createSmartContract({
                abi: [{ "inputs": [{ "internalType": "uint256", "name": "_amountneed", "type": "uint256" }, { "internalType": "uint256", "name": "_endDate", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "sendFrom", "type": "address" }, { "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "string", "name": "messages", "type": "string" }], "name": "PayEnvent", "type": "event" }, { "inputs": [], "name": "AmountNeed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "AmountNow", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "Donate", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "EndDate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Refund", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "Timestap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "Withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "listMembers", "outputs": [{ "internalType": "address", "name": "addressDonate", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "stateMutability": "view", "type": "function" }],

                bytecode: "608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b5060405161063d38038061063d8339818101604052604081101561004d57600080fd5b508051602091820151604080516060810182523380825294810184905201819052600080546001600160a01b0319169093179092556001556002556105a6806100976000396000f3fe60806040526004361061006b5760003560e01c80631954f39e14610070578063195dd2c6146100b15780632a9ac5c8146100e057806333ac2627146101505780635b6b431d1461016f5780635d268629146101b3578063a09f2da2146101e2578063f66958f814610211575b600080fd5b34801561007c57600080fd5b50d3801561008957600080fd5b50d2801561009657600080fd5b5061009f610240565b60408051918252519081900360200190f35b3480156100bd57600080fd5b50d380156100ca57600080fd5b50d280156100d757600080fd5b5061009f610246565b3480156100ec57600080fd5b50d380156100f957600080fd5b50d2801561010657600080fd5b5061012d6004803603602081101561011d57600080fd5b50356001600160a01b031661024a565b604080516001600160a01b03909316835260208301919091528051918290030190f35b61016d6004803603602081101561016657600080fd5b503561026f565b005b34801561017b57600080fd5b50d3801561018857600080fd5b50d2801561019557600080fd5b5061016d600480360360208110156101ac57600080fd5b503561037c565b3480156101bf57600080fd5b50d380156101cc57600080fd5b50d280156101d957600080fd5b5061016d61045c565b3480156101ee57600080fd5b50d380156101fb57600080fd5b50d2801561020857600080fd5b5061009f610546565b34801561021d57600080fd5b50d3801561022a57600080fd5b50d2801561023757600080fd5b5061009f61054c565b60025490565b4290565b600360205260009081526040902080546001909101546001600160a01b039091169082565b60025442106102b3576040805162461bcd60e51b815260206004820152600b60248201526a141c9bda9958dd08115b9960aa1b604482015290519081900360640190fd5b336000908152600360205260409020546001600160a01b031661031b5760408051808201825233808252602080830185815260009283526003909152929020905181546001600160a01b0319166001600160a01b039091161781559051600190910155610334565b3360009081526003602052604090206001018054820190555b604080513381523060208201526060818301819052600790820152667375636365737360c81b608082015290516000805160206105518339815191529181900360a00190a150565b6000546001600160a01b03163314801561039857506001544710155b80156103a5575060025442115b6103e6576040805162461bcd60e51b815260206004820152600d60248201526c15da5d1a191c985dc811985a5b609a1b604482015290519081900360640190fd5b604051339082156108fc029083906000818181858888f19350505050158015610413573d6000803e3d6000fd5b50604080513081523360208201526060818301819052600790820152667375636365737360c81b608082015290516000805160206105518339815191529181900360a00190a150565b6002544211801561046e575060015447105b6104ad576040805162461bcd60e51b815260206004820152600b60248201526a1499599d5b990811985a5b60aa1b604482015290519081900360640190fd5b3360008181526003602052604080822060010154905181156108fc0292818181858888f193505050501580156104e7573d6000803e3d6000fd5b50336000818152600360209081526040808320600101929092558151308152908101929092526060828201819052600790830152667375636365737360c81b6080830152516000805160206105518339815191529181900360a00190a1565b60015490565b479056fe2335156a506d67c95b1da1ee5c172bc7a41bcaac9d6d892184d9976d37f2b40da264697066735822122072a6e6c89b2d9f1ae1d599c583540f51cf099da068326c3ca1d6a55a31d2e39a64736f6c63430007000033",
                feeLimit: 400000000,
                callValue: 0,
                userFeePercentage: 100,
                originEnergyLimit: 1000000,
                parameters: [amountNeedSun, Math.round(projectObj.enddate.getTime() / 1000)]
            }, tronweb.defaultAddress.hex);

            const signedTransaction = await tronweb.trx.sign(transaction)

            const contractInstance = await tronweb.trx.sendRawTransaction(signedTransaction)

            console.log("address sc: ", tronweb.address.fromHex(contractInstance.transaction.contract_address))
            console.log("amountNeedSun: ", amountNeedSun)
            console.log("Second timestap: ", Math.round(projectObj.enddate.getTime() / 1000))
            // if (typeof contractInstance.transaction.contract_address === "string") {
            handleFinal(tronweb.address.fromHex(contractInstance.transaction.contract_address))
            // }
        } catch (err) {
            console.error(err)
            swal2.fire({
                title: "Tạo dự án thất bại",
                text: "Vui lòng kiểm tra số dư ví.",
                icon: "error",
                confirmButtonColor: 'var(--love-color-1)'

            });
        }
    }

    // Lưu dự án vào database
    const handleFinal = async (addressSC) => {

        try {
            const data = {

                "title": projectObj.projectname,
                "shortDescription": projectObj.description,
                "projectStatus": 1,
                "friendlyUrl": projectObj.projecturl,
                "summary": projectObj.summary,
                "problemToAddress": projectObj.problem,
                "solution": projectObj.solution,
                "location": projectObj.address,
                "impact": projectObj.target,
                "endDate": moment(projectObj.enddate).utc().format(),
                "addressContract": addressSC,
                "amountNeed": listProcessValue.reduce(function (total, number) {
                    return total + number.amountNeed
                }, 0),
                "process": listProcessValue.map(function (item) {
                    return ({
                        "title": item.title,
                        "shortDescription": item.shortDescription,
                        "content": '',
                        "amountNeed": item.amountNeed,
                    })
                }),
                "category": (projectObj.category).map(function (item) {
                    return ({
                        "categoryId": Number(item)
                    })
                }),
                "banner": {
                    "fileName": projectObj.urlImg.fileName,
                    "filePath": projectObj.urlImg.filePath,
                    "friendlyUrl": projectObj.urlImg.friendlyUrl,
                    "note": projectObj.urlImg.note
                }

            }
            const response = await projectApi.createProject(data);
            console.log('data dự án: ', response.data)
            if (response.isSuccess) {

                swal2.fire({
                    title: "Tạo dự án thành công.",
                    html: `</br><a href="https://nile.tronscan.io/#/contract/${addressSC}" target="_blank" rel="noreferrer" class="base-color text-decoration-none text-success" }>Xem trên Blockchain</a>`,
                    icon: "success",
                    confirmButtonColor: 'var(--love-color-1)'

                });
                history.push(`/project-detail/${response.data}/${projectObj.projecturl}`)

            }
            else {
                // alertify.alert('Tạo dự án thất bại')
                swal2.fire({
                    title: "Tạo dự án thất bại.",
                    icon: "error",
                    confirmButtonColor: 'var(--love-color-1)'

                });
            }

        }
        catch (error) {
            swal2.fire({
                title: "Tạo dự án thất bại.",
                icon: "error",
                confirmButtonColor: 'var(--love-color-1)'

            });
        }

    }



    return (
        <>

            <div className={clsx(Style.main)}>
                <div id='nava' className="container-fluid p-4 mx-auto p-md-5 ">

                    <div className={clsx('row pt-3')}>
                        <div className="col-12 col-md-9">
                            <h3 className={clsx(Style.title_content, "pb-3")}>Thêm tiến trình</h3>

                            <div className={clsx(Style.information_wrap, 'row p-2 p-md-4 mb-3')}>
                                <h5>Thông tin</h5>
                                <div className={clsx('col-12 pt-1 pt-md-3 ')}>

                                    <label htmlFor="nameProject">Tiêu đề</label>
                                    <input value={title} onChange={(e) => setTitle(e.target.value)} className={clsx(Style.title, 'w-100 ps-2 pe-2 ')} id='nameProject' type="text" />
                                </div>
                                <div className={clsx(Style.editor, ' add-project_editor col-12 pt-3 removeImg')}>


                                    <label htmlFor="nameProject">Mô tả ngắn (shortDescriptiona)</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={shortDescription}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setshortDescription(data)

                                        }}
                                        config={{

                                            removePlugins: ['MediaEmbed', 'Table'],
                                        }}
                                    />

                                </div>
                                <div className={clsx('col-12 pt-3 ')}>

                                    <label htmlFor="nameProject">Số tiền cần thiết (VND)</label>
                                    <input value={amountNeed} onChange={(e) => {
                                        if (Number.isFinite(Number(e.target.value))) {
                                            setAmountNeed(Number(e.target.value))

                                        }
                                    }} className={clsx(Style.title, 'w-100 ps-2 pe-2 ')} id='nameProject' type="text" />
                                    <span className={clsx(Style.wrap_amountWord, 'mt-2 d-inline-block font-weight-bold')}>Thành tiền :
                                        <span className={clsx(Style.amountWord, 'text-danger')}> {amountWord} </span>
                                    </span>
                                </div>
                                <div className='d-flex justify-content-end container'>
                                    <button href="nava" onClick={handleAddProcess} className={clsx(Style.createbtn, 'btn me-2')}>Thêm</button>
                                    <button href="nava" onClick={handleUpdateProcess} className={clsx(Style.createbtn, 'btn updateProcess')}>Cập Nhật</button>

                                </div>

                            </div>


                        </div>
                        <div className="col-md-3 col-12">
                            <h3 className={clsx(Style.title_content, "pb-3")} >Danh sách tiến trình</h3>
                            <div className={clsx(Style.process_list, 'row ms-md-2')}>
                                <h5 className="pt-2 ps-3" style={{ color: "#666", fontSize: "1.1rem" }}>Tên dự án : {projectObj.projectname}</h5>
                                <div className="col-12 ps-2 pe-2">
                                    <table className="table">
                                        <thead>
                                            <tr style={{ color: "#666", fontSize: "0.857rem" }}>
                                                <th scope="col">#</th>
                                                <th scope="col">Tiêu đề</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                listProcessValue.map(function (item, index) {
                                                    return (
                                                        <>
                                                            <tr className={clsx(Style.itemProcess, "cursor-pointer")} >
                                                                <th onClick={() => { calbackGetProcess(index) }}>{index}</th>
                                                                <th onClick={() => { calbackGetProcess(index) }}>{item.title}</th>
                                                                <td className=" text-center align-middle ">


                                                                    <Dropdown className="d-inline mx-2" >
                                                                        <Dropdown.Toggle id="dropdown-autoclose-true" className={clsx(Style.btnDrop, "project-admin")}>
                                                                            <i className={clsx(Style.iconDrop, "text-light mdi mdi-dots-vertical font-18  text-primary")}></i>
                                                                        </Dropdown.Toggle>

                                                                        <Dropdown.Menu className={clsx(Style.listDrop)} style={{}}>
                                                                            <Dropdown.Item onClick={() => { HandleDeleteProcess(index) }} className={clsx(Style.itemDrop)}><i className="mdi mdi-window-restore pe-2"></i>Xóa</Dropdown.Item>
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
                                <button href="nava" onClick={handleCreateProject} className={clsx(Style.Btnfinal, 'btn')}>Hoàn thành</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default AddProcess;