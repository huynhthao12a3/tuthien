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
import swal from "sweetalert";


function AddProcess(props) {
    // ----- tronweb
    let locationsq = useLocation().pathname.slice(1)
    locationsq=locationsq.slice(0,locationsq.indexOf("/"))
    console.log("locationsq",locationsq)
    const tronweb = window.tronWeb;
    const HttpProvider = tronweb.providers.HttpProvider;
    tronweb.eventServer = new HttpProvider("https://nile.trongrid.io")

    //---------------------------------------------------------------------------giá trị khởi tạo
    const location = useLocation().pathname;
    const projectObj = props.location.state
    console.log("projectObj", projectObj)
    console.log(moment(projectObj.enddate).utc().format())
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

            swal({
                title: "Thông báo",
                text: `Thêm tiến trình vào dự án  ${projectObj.projectname} thành công`,
                icon: "info",
                button: {
                    className: "bg-base-color"
                }
            });
           
        }
        else {

            $('.ajs-button.ajs-ok').css({ "background-color": "var(--status-waiting-color)" });
            swal({
                title: "Thông báo",
                text: `Thêm tiến trình vào dự án ${projectObj.projectname}  thất bại !`,
                icon: "error",
                button: {
                    className: "bg-base-color"
                }
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
            swal({
                title: "Thông báo",
                text: "Vui lòng cài đặt TronLink để tạo dự án.",
                icon: "info",
                button: {
                    className: "bg-base-color"
                }
            });
        } else if ((window.tronWeb.ready && window.tronWeb.ready) === false) {
            // alertify.alert("Vui lòng đăng nhập TronLink để tạo dự án.")
            swal({
                title: "Thông báo",
                text: "Vui lòng đăng nhập TronLink để tạo dự án.",
                icon: "info",
                button: {
                    className: "bg-base-color"
                }
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
                abi: {
                    "entrys": [
                        {
                            "inputs": [
                                {
                                    "name": "_amountneed",
                                    "type": "uint256"
                                }
                            ],
                            "stateMutability": "Nonpayable",
                            "type": "Constructor"
                        },
                        {
                            "inputs": [
                                {
                                    "name": "sendFrom",
                                    "type": "address"
                                },
                                {
                                    "name": "to",
                                    "type": "address"
                                },
                                {
                                    "name": "messages",
                                    "type": "string"
                                }
                            ],
                            "name": "PayEnvent",
                            "type": "Event"
                        },
                        {
                            "inputs": [
                                {
                                    "name": "_amount",
                                    "type": "uint256"
                                },
                                {
                                    "name": "_gmail",
                                    "type": "string"
                                }
                            ],
                            "name": "DonateProject",
                            "stateMutability": "Payable",
                            "type": "Function"
                        },
                        {
                            "inputs": [
                                {
                                    "name": "_useraddress",
                                    "type": "address"
                                }
                            ],
                            "name": "RefundDonate",
                            "stateMutability": "Nonpayable",
                            "type": "Function"
                        },
                        {
                            "inputs": [
                                {
                                    "name": "_useraddress",
                                    "type": "address"
                                },
                                {
                                    "name": "_amount",
                                    "type": "uint256"
                                }
                            ],
                            "name": "WithDraw",
                            "stateMutability": "Nonpayable",
                            "type": "Function"
                        },
                        {
                            "outputs": [
                                {
                                    "name": "addressDonate",
                                    "type": "address"
                                },
                                {
                                    "name": "amount",
                                    "type": "uint256"
                                },
                                {
                                    "name": "gmail",
                                    "type": "string"
                                }
                            ],
                            "inputs": [
                                {
                                    "type": "address"
                                }
                            ],
                            "name": "listMembers",
                            "stateMutability": "View",
                            "type": "Function"
                        }
                    ]
                },
                bytecode: "608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50604051610f7f380380610f7f833981810160405281019061004c9190610110565b60405180606001604052803373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001600015158152506000808201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020160006101000a81548160ff02191690831515021790555090505050610163565b60008151905061010a8161014c565b92915050565b60006020828403121561012657610125610147565b5b6000610134848285016100fb565b91505092915050565b6000819050919050565b600080fd5b6101558161013d565b811461016057600080fd5b50565b610e0d806101726000396000f3fe60806040526004361061003f5760003560e01c806314b43ca4146100445780632a9ac5c814610087578063658459b2146100e0578063d22dbcf814610123575b600080fd5b34801561005057600080fd5b50d3801561005d57600080fd5b50d2801561006a57600080fd5b5061008560048036038101906100809190610857565b61013f565b005b34801561009357600080fd5b50d380156100a057600080fd5b50d280156100ad57600080fd5b506100c860048036038101906100c391906107fd565b610277565b6040516100d793929190610a2b565b60405180910390f35b3480156100ec57600080fd5b50d380156100f957600080fd5b50d2801561010657600080fd5b50610121600480360381019061011c919061082a565b610349565b005b61013d60048036038101906101389190610897565b610456565b005b3373ffffffffffffffffffffffffffffffffffffffff166000800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161480156101b4575060011515600060020160009054906101000a900460ff161515145b6101f3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ea90610a69565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610239573d6000803e3d6000fd5b507f2335156a506d67c95b1da1ee5c172bc7a41bcaac9d6d892184d9976d37f2b40d303360405161026b9291906109b3565b60405180910390a15050565b60036020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020180546102c690610c02565b80601f01602080910402602001604051908101604052809291908181526020018280546102f290610c02565b801561033f5780601f106103145761010080835404028352916020019161033f565b820191906000526020600020905b81548152906001019060200180831161032257829003601f168201915b5050505050905083565b8073ffffffffffffffffffffffffffffffffffffffff166108fc600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101549081150290604051600060405180830381858888f193505050501580156103d1573d6000803e3d6000fd5b506000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055507f2335156a506d67c95b1da1ee5c172bc7a41bcaac9d6d892184d9976d37f2b40d303360405161044b9291906109ef565b60405180910390a150565b600073ffffffffffffffffffffffffffffffffffffffff16600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156105d35760405180606001604052803373ffffffffffffffffffffffffffffffffffffffff16815260200183815260200182815250600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020190805190602001906105ca929190610695565b5090505061062d565b81600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160008282546106259190610afb565b925050819055505b6000600101544710610658576001600060020160006101000a81548160ff0219169083151502179055505b7f2335156a506d67c95b1da1ee5c172bc7a41bcaac9d6d892184d9976d37f2b40d33306040516106899291906109b3565b60405180910390a15050565b8280546106a190610c02565b90600052602060002090601f0160209004810192826106c3576000855561070a565b82601f106106dc57805160ff191683800117855561070a565b8280016001018555821561070a579182015b828111156107095782518255916020019190600101906106ee565b5b509050610717919061071b565b5090565b5b8082111561073457600081600090555060010161071c565b5090565b600061074b61074684610aae565b610a89565b90508281526020810184848401111561076757610766610cf7565b5b610772848285610bc0565b509392505050565b60008135905061078981610d92565b61079281610b51565b905092915050565b6000813590506107a981610da9565b6107b281610b63565b905092915050565b600082601f8301126107cf576107ce610cf2565b5b81356107df848260208601610738565b91505092915050565b6000813590506107f781610dc0565b92915050565b60006020828403121561081357610812610d01565b5b60006108218482850161077a565b91505092915050565b6000602082840312156108405761083f610d01565b5b600061084e8482850161079a565b91505092915050565b6000806040838503121561086e5761086d610d01565b5b600061087c8582860161079a565b925050602061088d858286016107e8565b9150509250929050565b600080604083850312156108ae576108ad610d01565b5b60006108bc858286016107e8565b925050602083013567ffffffffffffffff8111156108dd576108dc610cfc565b5b6108e9858286016107ba565b9150509250929050565b6108fc81610b51565b82525050565b600061090d82610adf565b6109178185610aea565b9350610927818560208601610bcf565b61093081610d06565b840191505092915050565b6000610948600583610aea565b915061095382610d17565b602082019050919050565b600061096b600783610aea565b915061097682610d40565b602082019050919050565b600061098e600f83610aea565b915061099982610d69565b602082019050919050565b6109ad81610bb6565b82525050565b60006060820190506109c860008301856108f3565b6109d560208301846108f3565b81810360408301526109e68161095e565b90509392505050565b6000606082019050610a0460008301856108f3565b610a1160208301846108f3565b8181036040830152610a2281610981565b90509392505050565b6000606082019050610a4060008301866108f3565b610a4d60208301856109a4565b8181036040830152610a5f8184610902565b9050949350505050565b60006020820190508181036000830152610a828161093b565b9050919050565b6000610a93610aa4565b9050610a9f8282610c34565b919050565b6000604051905090565b600067ffffffffffffffff821115610ac957610ac8610cc3565b5b610ad282610d06565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b6000610b0682610bb6565b9150610b1183610bb6565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610b4657610b45610c65565b5b828201905092915050565b6000610b5c82610b75565b9050919050565b6000610b6e82610b75565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600074ffffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015610bed578082015181840152602081019050610bd2565b83811115610bfc576000848401525b50505050565b60006002820490506001821680610c1a57607f821691505b60208210811415610c2e57610c2d610c94565b5b50919050565b610c3d82610d06565b810181811067ffffffffffffffff82111715610c5c57610c5b610cc3565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f6572726f72000000000000000000000000000000000000000000000000000000600082015250565b7f7375636365737300000000000000000000000000000000000000000000000000600082015250565b7f726566756e642073756363657373210000000000000000000000000000000000600082015250565b610d9b81610b95565b8114610da657600080fd5b50565b610db281610b95565b8114610dbd57600080fd5b50565b610dc981610bb6565b8114610dd457600080fd5b5056fea26474726f6e58221220506f47f21e8a0a4fda14c902c2000fa8b8bacdb5bf925278a22108748f73a1f664736f6c6343000806003300000000000000000000000000000000000000000000000000000000001e8480",
                feeLimit: 400000000,
                callValue: 0,
                userFeePercentage: 100,
                originEnergyLimit: 1000000,
                parameters: [amountNeedSun]
            }, tronweb.defaultAddress.hex);

            const signedTransaction = await tronweb.trx.sign(transaction)

            const contractInstance = await tronweb.trx.sendRawTransaction(signedTransaction)

            console.log("address sc: ", tronweb.address.fromHex(contractInstance.transaction.contract_address))
            // if (typeof contractInstance.transaction.contract_address === "string") {
            handleFinal(tronweb.address.fromHex(contractInstance.transaction.contract_address))
            // }
        } catch (err) {
            console.error(err)
            swal({
                title: "Tạo dự án thất bại",
                text: "Vui lòng kiểm tra số dư ví.",
                icon: "error",
                button: {
                    className: "bg-base-color"
                }
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

                // alertify.alert('Tạo dự án thành công')
                swal({
                    title: "Tạo dự án thành công",
                    icon: "success",
                    button: {
                        className: "bg-base-color"
                    }
                });
                history.push(`/project-detail/${response.data}/${projectObj.projecturl}`)

            }
            else {
                // alertify.alert('Tạo dự án thất bại')
                swal({
                    title: "thông báo",
                    text:"tạo dự án thất bại",
                    icon: "error",
                    button: {
                        className: "bg-base-color"
                    }
                });
            }

        }
        catch (error) {
            console.log(error);
        }

        // const sm = await tronweb.contract().at(process.env.REACT_APP_SMART_CONTRACT_ADDRESS)
        // let result = await sm.CreateProject(id, 'huynhthao@gmail.com', amountNeedSun).send()
        //     .then((res) => 
        //     {
        //         console.log('CreateProject: ', res)
        //         if (typeof res === 'string') {
        //             swal({
        //                 title: "Tạo dự án thành công",
        //                 icon: "success",
        //                 button: {
        //                     className: "bg-base-color"
        //                 }
        //             });
        //             if(locationsq="admin")
        //             {
        //                 history.push(`/admin/project-detail/${id}/${projectObj.projecturl}`)
        //             }
        //             else{
        //                 history.push(`/project-detail/${id}/${projectObj.projecturl}`)
        //             }
        //         }
        //     }
        // )
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
                                <button href="nava" onClick={handleCreateProject} className={clsx(Style.Btnfinal, 'btn')}>Hoàng thành</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default AddProcess;