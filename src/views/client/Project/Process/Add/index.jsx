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
                // abi: {
                //     "entrys": [
                //         {
                //             "inputs": [
                //                 {
                //                     "name": "_amountneed",
                //                     "type": "uint256"
                //                 },
                //                 {
                //                     "name": "_endDate",
                //                     "type": "uint256"
                //                 }
                //             ],
                //             "stateMutability": "Nonpayable",
                //             "type": "Constructor"
                //         },
                //         {
                //             "inputs": [
                //                 {
                //                     "name": "sendFrom",
                //                     "type": "address"
                //                 },
                //                 {
                //                     "name": "to",
                //                     "type": "address"
                //                 },
                //                 {
                //                     "name": "messages",
                //                     "type": "string"
                //                 }
                //             ],
                //             "name": "PayEnvent",
                //             "type": "Event"
                //         },
                //         {
                //             "inputs": [
                //                 {
                //                     "name": "_amount",
                //                     "type": "uint256"
                //                 }
                //             ],
                //             "name": "Donate",
                //             "stateMutability": "Payable",
                //             "type": "Function"
                //         },
                //         {
                //             "name": "Refund",
                //             "stateMutability": "Nonpayable",
                //             "type": "Function"
                //         },
                //         {
                //             "inputs": [
                //                 {
                //                     "name": "_amount",
                //                     "type": "uint256"
                //                 }
                //             ],
                //             "name": "Withdraw",
                //             "stateMutability": "Nonpayable",
                //             "type": "Function"
                //         },
                //         {
                //             "outputs": [
                //                 {
                //                     "name": "addressDonate",
                //                     "type": "address"
                //                 },
                //                 {
                //                     "name": "amount",
                //                     "type": "uint256"
                //                 }
                //             ],
                //             "inputs": [
                //                 {
                //                     "type": "address"
                //                 }
                //             ],
                //             "name": "listMembers",
                //             "stateMutability": "View",
                //             "type": "Function"
                //         }
                //     ]
                // },
                abi: {
                    "entrys": [
                        {
                            "inputs": [
                                {
                                    "name": "_amountneed",
                                    "type": "uint256"
                                },
                                {
                                    "name": "_endDate",
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
                                }
                            ],
                            "name": "Donate",
                            "stateMutability": "Payable",
                            "type": "Function"
                        },
                        {
                            "outputs": [
                                {
                                    "type": "uint256"
                                }
                            ],
                            "name": "EndDate",
                            "stateMutability": "View",
                            "type": "Function"
                        },
                        {
                            "name": "Refund",
                            "stateMutability": "Nonpayable",
                            "type": "Function"
                        },
                        {
                            "outputs": [
                                {
                                    "type": "uint256"
                                }
                            ],
                            "name": "Timestap",
                            "stateMutability": "View",
                            "type": "Function"
                        },
                        {
                            "inputs": [
                                {
                                    "name": "_amount",
                                    "type": "uint256"
                                }
                            ],
                            "name": "Withdraw",
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

                bytecode: "608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b50604051610a6c380380610a6c8339818101604052604081101561004d57600080fd5b81019080805190602001909291908051906020019092919050505060405180606001604052803373ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152506000808201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155604082015181600201559050505050610963806101096000396000f3fe6080604052600436106100555760003560e01c80631954f39e1461005a578063195dd2c61461009f5780632a9ac5c8146100e457806333ac2627146101805780635b6b431d146101ae5780635d26862914610203575b600080fd5b34801561006657600080fd5b50d3801561007357600080fd5b50d2801561008057600080fd5b50610089610234565b6040518082815260200191505060405180910390f35b3480156100ab57600080fd5b50d380156100b857600080fd5b50d280156100c557600080fd5b506100ce610240565b6040518082815260200191505060405180910390f35b3480156100f057600080fd5b50d380156100fd57600080fd5b50d2801561010a57600080fd5b5061014d6004803603602081101561012157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610248565b604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390f35b6101ac6004803603602081101561019657600080fd5b810190808035906020019092919050505061028c565b005b3480156101ba57600080fd5b50d380156101c757600080fd5b50d280156101d457600080fd5b50610201600480360360208110156101eb57600080fd5b8101908080359060200190929190505050610558565b005b34801561020f57600080fd5b50d3801561021c57600080fd5b50d2801561022957600080fd5b5061023261072c565b005b60008060020154905090565b600042905090565b60036020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905082565b6000600201544210610306576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f50726f6a65637420456e6400000000000000000000000000000000000000000081525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156104605760405180604001604052803373ffffffffffffffffffffffffffffffffffffffff16815260200182815250600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101559050506104b1565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600082825401925050819055505b7f2335156a506d67c95b1da1ee5c172bc7a41bcaac9d6d892184d9976d37f2b40d3330604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825260078152602001807f7375636365737300000000000000000000000000000000000000000000000000815250602001935050505060405180910390a150565b3373ffffffffffffffffffffffffffffffffffffffff166000800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161480156105bc57506000600101544710155b80156105cc575060006002015442115b61063e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807f5769746864726177204661696c0000000000000000000000000000000000000081525060200191505060405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610684573d6000803e3d6000fd5b507f2335156a506d67c95b1da1ee5c172bc7a41bcaac9d6d892184d9976d37f2b40d3033604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825260078152602001807f7375636365737300000000000000000000000000000000000000000000000000815250602001935050505060405180910390a150565b60006002015442118015610744575060006001015447105b6107b6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f526566756e64204661696c00000000000000000000000000000000000000000081525060200191505060405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff166108fc600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101549081150290604051600060405180830381858888f1935050505015801561083e573d6000803e3d6000fd5b506000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055507f2335156a506d67c95b1da1ee5c172bc7a41bcaac9d6d892184d9976d37f2b40d3033604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825260078152602001807f7375636365737300000000000000000000000000000000000000000000000000815250602001935050505060405180910390a156fea2646970667358221220a3a93ceb2d59666ab39658aaac456126ae3dbe940abe8248422adcba619ad52364736f6c634300070000330000000000000000000000000000000000000000000000000000000005f5e10000000000000000000000000000000000000000000000000000000000626e1a15",
                // bytecode: "608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506040516109b83803806109b88339818101604052604081101561004d57600080fd5b81019080805190602001909291908051906020019092919050505060405180606001604052803373ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152506000808201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002015590505050506108af806101096000396000f3fe60806040526004361061003f5760003560e01c80632a9ac5c81461004457806333ac2627146100e05780635b6b431d1461010e5780635d26862914610163575b600080fd5b34801561005057600080fd5b50d3801561005d57600080fd5b50d2801561006a57600080fd5b506100ad6004803603602081101561008157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610194565b604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390f35b61010c600480360360208110156100f657600080fd5b81019080803590602001909291905050506101d8565b005b34801561011a57600080fd5b50d3801561012757600080fd5b50d2801561013457600080fd5b506101616004803603602081101561014b57600080fd5b81019080803590602001909291905050506104a4565b005b34801561016f57600080fd5b50d3801561017c57600080fd5b50d2801561018957600080fd5b50610192610678565b005b60036020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905082565b6000600201544210610252576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f50726f6a65637420456e6400000000000000000000000000000000000000000081525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156103ac5760405180604001604052803373ffffffffffffffffffffffffffffffffffffffff16815260200182815250600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101559050506103fd565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600082825401925050819055505b7f2335156a506d67c95b1da1ee5c172bc7a41bcaac9d6d892184d9976d37f2b40d3330604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825260078152602001807f7375636365737300000000000000000000000000000000000000000000000000815250602001935050505060405180910390a150565b3373ffffffffffffffffffffffffffffffffffffffff166000800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614801561050857506000600101544710155b8015610518575060006002015442115b61058a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807f5769746864726177204661696c0000000000000000000000000000000000000081525060200191505060405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156105d0573d6000803e3d6000fd5b507f2335156a506d67c95b1da1ee5c172bc7a41bcaac9d6d892184d9976d37f2b40d3033604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825260078152602001807f7375636365737300000000000000000000000000000000000000000000000000815250602001935050505060405180910390a150565b60006002015442118015610690575060006001015447105b610702576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f526566756e64204661696c00000000000000000000000000000000000000000081525060200191505060405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff166108fc600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101549081150290604051600060405180830381858888f1935050505015801561078a573d6000803e3d6000fd5b506000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055507f2335156a506d67c95b1da1ee5c172bc7a41bcaac9d6d892184d9976d37f2b40d3033604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825260078152602001807f7375636365737300000000000000000000000000000000000000000000000000815250602001935050505060405180910390a156fea264697066735822122019ba29b456a9de455061acd934eef315b73cc730528e5b066a50e427e5137c8264736f6c63430007000033000000000000000000000000000000000000000000000000000000000000007b00000000000000000000000000000000000000000000000000000000626c7c00",
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