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
    // console.log("Second endDate: ", Math.round(projectObj.enddate.getTime() / 1000))
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
                text: `Thêm tiến trình thành công`,
                icon: "success",
                confirmButtonColor: 'var(--love-color-1)'

            });

        }
        else {

            $('.ajs-button.ajs-ok').css({ "background-color": "var(--status-waiting-color)" });
            swal2.fire({
                title: "Thông báo",
                text: `Thêm tiến trình thất bại !`,
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

            alertify.alert('Thông báo', `Sửa tiến trình thành công!`);
        }
        else {
            $('.ajs-button.ajs-ok').css({ "background-color": "var(--status-waiting-color)" });
            alertify.alert('Thông báo', `Sửa tiến trình thất bại !`);
        }

    }

    // xóa process
    const HandleDeleteProcess = (index) => {
        alertify.confirm('Thông báo', 'Bạn có chắc muốn xóa tiến trình này',
            function () {
                const arr1 = [...listProcessValue.slice(0, index), ...listProcessValue.slice(index + 1)]
                setListProcessValue(arr1)
                alertify.success('Xóa thành công')
            },
            function () {
                alertify.error('Đã hủy xóa')

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
        if ((await tronweb.trx.getBalance(tronweb.defaultAddress.base58)) > 150000000) {


            try {
                console.log('utc: ', moment(projectObj.enddate).utc().format())
                projectObj.enddate.setUTCHours(0, 0, 0, 0)
                console.log('endate: ', projectObj.enddate)
                console.log('endate timestap: ', (projectObj.enddate.getTime().toString()).slice(0, -3))
                console.log('SM enddate: ', projectObj.enddate.getTime().toString().slice(0, -3))

                // Quy đổi VND -> SUN (1 TRX = 1.000.000 SUN)
                const amountNeedVnd = listProcessValue.reduce(function (total, number) {
                    return total + number.amountNeed
                }, 0);
                const amountNeedTrx = Math.round(amountNeedVnd / trxPrice)
                console.log('TRX: ', amountNeedTrx);

                const transaction = await tronweb.transactionBuilder.createSmartContract({
                    // abi: [{ "inputs": [{ "internalType": "uint256", "name": "_amountneed", "type": "uint256" }, { "internalType": "uint256", "name": "_endDate", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "sendFrom", "type": "address" }, { "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "string", "name": "messages", "type": "string" }], "name": "PayEnvent", "type": "event" }, { "inputs": [], "name": "AmountNeed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "AmountNow", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "Donate", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "EndDate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Refund", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "Timestap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "Withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "listMembers", "outputs": [{ "internalType": "address", "name": "addressDonate", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "stateMutability": "view", "type": "function" }],
                    // bytecode: "608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b5060405161063d38038061063d8339818101604052604081101561004d57600080fd5b508051602091820151604080516060810182523380825294810184905201819052600080546001600160a01b0319169093179092556001556002556105a6806100976000396000f3fe60806040526004361061006b5760003560e01c80631954f39e14610070578063195dd2c6146100b15780632a9ac5c8146100e057806333ac2627146101505780635b6b431d1461016f5780635d268629146101b3578063a09f2da2146101e2578063f66958f814610211575b600080fd5b34801561007c57600080fd5b50d3801561008957600080fd5b50d2801561009657600080fd5b5061009f610240565b60408051918252519081900360200190f35b3480156100bd57600080fd5b50d380156100ca57600080fd5b50d280156100d757600080fd5b5061009f610246565b3480156100ec57600080fd5b50d380156100f957600080fd5b50d2801561010657600080fd5b5061012d6004803603602081101561011d57600080fd5b50356001600160a01b031661024a565b604080516001600160a01b03909316835260208301919091528051918290030190f35b61016d6004803603602081101561016657600080fd5b503561026f565b005b34801561017b57600080fd5b50d3801561018857600080fd5b50d2801561019557600080fd5b5061016d600480360360208110156101ac57600080fd5b503561037c565b3480156101bf57600080fd5b50d380156101cc57600080fd5b50d280156101d957600080fd5b5061016d61045c565b3480156101ee57600080fd5b50d380156101fb57600080fd5b50d2801561020857600080fd5b5061009f610546565b34801561021d57600080fd5b50d3801561022a57600080fd5b50d2801561023757600080fd5b5061009f61054c565b60025490565b4290565b600360205260009081526040902080546001909101546001600160a01b039091169082565b60025442106102b3576040805162461bcd60e51b815260206004820152600b60248201526a141c9bda9958dd08115b9960aa1b604482015290519081900360640190fd5b336000908152600360205260409020546001600160a01b031661031b5760408051808201825233808252602080830185815260009283526003909152929020905181546001600160a01b0319166001600160a01b039091161781559051600190910155610334565b3360009081526003602052604090206001018054820190555b604080513381523060208201526060818301819052600790820152667375636365737360c81b608082015290516000805160206105518339815191529181900360a00190a150565b6000546001600160a01b03163314801561039857506001544710155b80156103a5575060025442115b6103e6576040805162461bcd60e51b815260206004820152600d60248201526c15da5d1a191c985dc811985a5b609a1b604482015290519081900360640190fd5b604051339082156108fc029083906000818181858888f19350505050158015610413573d6000803e3d6000fd5b50604080513081523360208201526060818301819052600790820152667375636365737360c81b608082015290516000805160206105518339815191529181900360a00190a150565b6002544211801561046e575060015447105b6104ad576040805162461bcd60e51b815260206004820152600b60248201526a1499599d5b990811985a5b60aa1b604482015290519081900360640190fd5b3360008181526003602052604080822060010154905181156108fc0292818181858888f193505050501580156104e7573d6000803e3d6000fd5b50336000818152600360209081526040808320600101929092558151308152908101929092526060828201819052600790830152667375636365737360c81b6080830152516000805160206105518339815191529181900360a00190a1565b60015490565b479056fe2335156a506d67c95b1da1ee5c172bc7a41bcaac9d6d892184d9976d37f2b40da264697066735822122072a6e6c89b2d9f1ae1d599c583540f51cf099da068326c3ca1d6a55a31d2e39a64736f6c63430007000033",
                    // abi: [{ "inputs": [{ "internalType": "uint256", "name": "_amountneed", "type": "uint256" }, { "internalType": "uint256", "name": "_endDate", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "sendFrom", "type": "address" }, { "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "string", "name": "messages", "type": "string" }], "name": "PayEnvent", "type": "event" }, { "inputs": [], "name": "AmountNeed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "AmountNow", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "Donate", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "EndDate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Refund", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "Timestap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "Withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "listMembers", "outputs": [{ "internalType": "address", "name": "addressDonate", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "stateMutability": "view", "type": "function" }],
                    // bytecode: "608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506040516106953803806106958339818101604052604081101561004d57600080fd5b50805160209182015160408051608081018252338082529481018490529081018290526000606090910181905280546001600160a01b0319169093179092556001556002556003805460ff191690556105ea806100ab6000396000f3fe60806040526004361061007b5760003560e01c80635b6b431d1161004e5780635b6b431d1461017f5780635d268629146101c3578063a09f2da2146101f2578063f66958f8146102215761007b565b80631954f39e14610080578063195dd2c6146100c15780632a9ac5c8146100f057806333ac262714610160575b600080fd5b34801561008c57600080fd5b50d3801561009957600080fd5b50d280156100a657600080fd5b506100af610250565b60408051918252519081900360200190f35b3480156100cd57600080fd5b50d380156100da57600080fd5b50d280156100e757600080fd5b506100af610256565b3480156100fc57600080fd5b50d3801561010957600080fd5b50d2801561011657600080fd5b5061013d6004803603602081101561012d57600080fd5b50356001600160a01b031661025a565b604080516001600160a01b03909316835260208301919091528051918290030190f35b61017d6004803603602081101561017657600080fd5b503561027f565b005b34801561018b57600080fd5b50d3801561019857600080fd5b50d280156101a557600080fd5b5061017d600480360360208110156101bc57600080fd5b50356103b5565b3480156101cf57600080fd5b50d380156101dc57600080fd5b50d280156101e957600080fd5b5061017d6104ac565b3480156101fe57600080fd5b50d3801561020b57600080fd5b50d2801561021857600080fd5b506100af6105aa565b34801561022d57600080fd5b50d3801561023a57600080fd5b50d2801561024757600080fd5b506100af6105b0565b60025490565b4290565b600460205260009081526040902080546001909101546001600160a01b039091169082565b60025442106102c3576040805162461bcd60e51b815260206004820152600b60248201526a141c9bda9958dd08115b9960aa1b604482015290519081900360640190fd5b336000908152600460205260409020546001600160a01b031661032b5760408051808201825233808252602080830185815260009283526004909152929020905181546001600160a01b0319166001600160a01b039091161781559051600190910155610344565b3360009081526004602052604090206001018054820190555b600154471061035b576003805460ff191660011790555b604080513381523060208201526060818301819052600790820152667375636365737360c81b608082015290517f2335156a506d67c95b1da1ee5c172bc7a41bcaac9d6d892184d9976d37f2b40d9181900360a00190a150565b6000546001600160a01b0316331480156103d0575060025442115b80156103e3575060035460ff1615156001145b610424576040805162461bcd60e51b815260206004820152600d60248201526c15da5d1a191c985dc811985a5b609a1b604482015290519081900360640190fd5b604051339082156108fc029083906000818181858888f19350505050158015610451573d6000803e3d6000fd5b50604080513081523360208201526060818301819052600790820152667375636365737360c81b608082015290517f2335156a506d67c95b1da1ee5c172bc7a41bcaac9d6d892184d9976d37f2b40d9181900360a00190a150565b600254421180156104c0575060035460ff16155b6104ff576040805162461bcd60e51b815260206004820152600b60248201526a1499599d5b990811985a5b60aa1b604482015290519081900360640190fd5b3360008181526004602052604080822060010154905181156108fc0292818181858888f19350505050158015610539573d6000803e3d6000fd5b50336000818152600460209081526040808320600101929092558151308152908101929092526060828201819052600790830152667375636365737360c81b6080830152517f2335156a506d67c95b1da1ee5c172bc7a41bcaac9d6d892184d9976d37f2b40d9181900360a00190a1565b60015490565b479056fea2646970667358221220ad48c68c615fe7ba61f021884347fb0dc6f01344925711e144b56c2cf22136f264736f6c63430007000033",
                    // abi: [{ "inputs": [{ "internalType": "uint256", "name": "_amountneed", "type": "uint256" }, { "internalType": "uint256", "name": "_endDate", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "sendFrom", "type": "address" }, { "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "string", "name": "messages", "type": "string" }], "name": "PayEnvent", "type": "event" }, { "inputs": [], "name": "AmountNeed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "AmountNow", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "Donate", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "EndDate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Refund", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "Result", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Timestap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "Withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "listMembers", "outputs": [{ "internalType": "address", "name": "addressDonate", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "stateMutability": "view", "type": "function" }],
                    // bytecode: "608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506040516107033803806107038339818101604052604081101561004d57600080fd5b50805160209182015160408051608081018252338082529481018490529081018290526000606090910181905280546001600160a01b0319169093179092556001556002556003805460ff19169055610658806100ab6000396000f3fe6080604052600436106100865760003560e01c80635b6b431d116100595780635b6b431d1461018a5780635d268629146101ce578063a09f2da2146101fd578063f4e5d5991461022c578063f66958f81461026f57610086565b80631954f39e1461008b578063195dd2c6146100cc5780632a9ac5c8146100fb57806333ac26271461016b575b600080fd5b34801561009757600080fd5b50d380156100a457600080fd5b50d280156100b157600080fd5b506100ba61029e565b60408051918252519081900360200190f35b3480156100d857600080fd5b50d380156100e557600080fd5b50d280156100f257600080fd5b506100ba6102a4565b34801561010757600080fd5b50d3801561011457600080fd5b50d2801561012157600080fd5b506101486004803603602081101561013857600080fd5b50356001600160a01b03166102a8565b604080516001600160a01b03909316835260208301919091528051918290030190f35b6101886004803603602081101561018157600080fd5b50356102cd565b005b34801561019657600080fd5b50d380156101a357600080fd5b50d280156101b057600080fd5b50610188600480360360208110156101c757600080fd5b5035610403565b3480156101da57600080fd5b50d380156101e757600080fd5b50d280156101f457600080fd5b506101886104fa565b34801561020957600080fd5b50d3801561021657600080fd5b50d2801561022357600080fd5b506100ba6105f8565b34801561023857600080fd5b50d3801561024557600080fd5b50d2801561025257600080fd5b5061025b6105fe565b604080519115158252519081900360200190f35b34801561027b57600080fd5b50d3801561028857600080fd5b50d2801561029557600080fd5b506100ba61061e565b60025490565b4290565b600460205260009081526040902080546001909101546001600160a01b039091169082565b6002544210610311576040805162461bcd60e51b815260206004820152600b60248201526a141c9bda9958dd08115b9960aa1b604482015290519081900360640190fd5b336000908152600460205260409020546001600160a01b03166103795760408051808201825233808252602080830185815260009283526004909152929020905181546001600160a01b0319166001600160a01b039091161781559051600190910155610392565b3360009081526004602052604090206001018054820190555b60015447106103a9576003805460ff191660011790555b604080513381523060208201526060818301819052600790820152667375636365737360c81b608082015290517f2335156a506d67c95b1da1ee5c172bc7a41bcaac9d6d892184d9976d37f2b40d9181900360a00190a150565b6000546001600160a01b03163314801561041e575060025442115b8015610431575060035460ff1615156001145b610472576040805162461bcd60e51b815260206004820152600d60248201526c15da5d1a191c985dc811985a5b609a1b604482015290519081900360640190fd5b604051339082156108fc029083906000818181858888f1935050505015801561049f573d6000803e3d6000fd5b50604080513081523360208201526060818301819052600790820152667375636365737360c81b608082015290517f2335156a506d67c95b1da1ee5c172bc7a41bcaac9d6d892184d9976d37f2b40d9181900360a00190a150565b6002544211801561050e575060035460ff16155b61054d576040805162461bcd60e51b815260206004820152600b60248201526a1499599d5b990811985a5b60aa1b604482015290519081900360640190fd5b3360008181526004602052604080822060010154905181156108fc0292818181858888f19350505050158015610587573d6000803e3d6000fd5b50336000818152600460209081526040808320600101929092558151308152908101929092526060828201819052600790830152667375636365737360c81b6080830152517f2335156a506d67c95b1da1ee5c172bc7a41bcaac9d6d892184d9976d37f2b40d9181900360a00190a1565b60015490565b60025460009042118015610619575060035460ff1615156001145b905090565b479056fea264697066735822122074da58bc75b0e1a96bb3d341659ca7fef426dc6e0d368074a8e5197278f6851c64736f6c63430007000033",
                    abi: [{ "inputs": [{ "internalType": "uint256", "name": "_amountneed", "type": "uint256" }, { "internalType": "uint256", "name": "_endDate", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "sendFrom", "type": "address" }, { "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "string", "name": "messages", "type": "string" }], "name": "PayEnvent", "type": "event" }, { "inputs": [], "name": "AmountNeed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "AmountNow", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "Donate", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "EndDate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Refund", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "Result", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Timestap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "Withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "listMembers", "outputs": [{ "internalType": "address", "name": "addressDonate", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "stateMutability": "view", "type": "function" }],
                    bytecode: "608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506040516106dd3803806106dd8339818101604052604081101561004d57600080fd5b50805160209182015160408051608081018252338082529481018490529081018290526000606090910181905280546001600160a01b0319169093179092556001556002556003805460ff19169055610632806100ab6000396000f3fe6080604052600436106100765760003560e01c80631954f39e1461007b578063195dd2c6146100bc5780632a9ac5c8146100eb57806333ac26271461015b5780635b6b431d1461017a5780635d268629146101be578063a09f2da2146101ed578063f4e5d5991461021c578063f66958f81461025f575b600080fd5b34801561008757600080fd5b50d3801561009457600080fd5b50d280156100a157600080fd5b506100aa61028e565b60408051918252519081900360200190f35b3480156100c857600080fd5b50d380156100d557600080fd5b50d280156100e257600080fd5b506100aa610294565b3480156100f757600080fd5b50d3801561010457600080fd5b50d2801561011157600080fd5b506101386004803603602081101561012857600080fd5b50356001600160a01b0316610298565b604080516001600160a01b03909316835260208301919091528051918290030190f35b6101786004803603602081101561017157600080fd5b50356102bd565b005b34801561018657600080fd5b50d3801561019357600080fd5b50d280156101a057600080fd5b50610178600480360360208110156101b757600080fd5b50356103e1565b3480156101ca57600080fd5b50d380156101d757600080fd5b50d280156101e457600080fd5b506101786104c6565b3480156101f957600080fd5b50d3801561020657600080fd5b50d2801561021357600080fd5b506100aa6105b2565b34801561022857600080fd5b50d3801561023557600080fd5b50d2801561024257600080fd5b5061024b6105b8565b604080519115158252519081900360200190f35b34801561026b57600080fd5b50d3801561027857600080fd5b50d2801561028557600080fd5b506100aa6105d8565b60025490565b4290565b600460205260009081526040902080546001909101546001600160a01b039091169082565b6002544210610301576040805162461bcd60e51b815260206004820152600b60248201526a141c9bda9958dd08115b9960aa1b604482015290519081900360640190fd5b336000908152600460205260409020546001600160a01b03166103695760408051808201825233808252602080830185815260009283526004909152929020905181546001600160a01b0319166001600160a01b039091161781559051600190910155610382565b3360009081526004602052604090206001018054820190555b6001544710610399576003805460ff191660011790555b604080513381523060208201526060818301819052600790820152667375636365737360c81b608082015290516000805160206105dd8339815191529181900360a00190a150565b6000546001600160a01b0316331480156103fc575060025442115b801561040f575060035460ff1615156001145b610450576040805162461bcd60e51b815260206004820152600d60248201526c15da5d1a191c985dc811985a5b609a1b604482015290519081900360640190fd5b604051339082156108fc029083906000818181858888f1935050505015801561047d573d6000803e3d6000fd5b50604080513081523360208201526060818301819052600790820152667375636365737360c81b608082015290516000805160206105dd8339815191529181900360a00190a150565b600254421180156104da575060035460ff16155b610519576040805162461bcd60e51b815260206004820152600b60248201526a1499599d5b990811985a5b60aa1b604482015290519081900360640190fd5b3360008181526004602052604080822060010154905181156108fc0292818181858888f19350505050158015610553573d6000803e3d6000fd5b50336000818152600460209081526040808320600101929092558151308152908101929092526060828201819052600790830152667375636365737360c81b6080830152516000805160206105dd8339815191529181900360a00190a1565b60015490565b600254600090421180156105d3575060035460ff1615156001145b905090565b479056fe2335156a506d67c95b1da1ee5c172bc7a41bcaac9d6d892184d9976d37f2b40da2646970667358221220dc70e21c270908ca20e0c8f89167f0fde6d7dc2401ca369361c9df3ae10f38a364736f6c63430007000033",
                    feeLimit: 400000000,
                    callValue: 0,
                    userFeePercentage: 100,
                    originEnergyLimit: 1000000,
                    parameters: [amountNeedTrx * 1000000, projectObj.enddate.getTime().toString().slice(0, -3)]
                }, tronweb.defaultAddress.hex);

                const signedTransaction = await tronweb.trx.sign(transaction)

                const contractInstance = await tronweb.trx.sendRawTransaction(signedTransaction)

                console.log("address sc: ", tronweb.address.fromHex(contractInstance.transaction.contract_address))
                console.log("amountNeedTrx: ", amountNeedTrx)
                // console.log("Second timestap: ", Math.round(projectObj.enddate.getTime() / 1000))
                // if (typeof contractInstance.transaction.contract_address === "string") {
                handleFinal(tronweb.address.fromHex(contractInstance.transaction.contract_address), amountNeedTrx)
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
        } else {
            swal2.fire({
                title: "Thông báo",
                text: "Số dư ví không đủ",
                icon: "info",
                confirmButtonColor: 'var(--love-color-1)'

            });
        }
    }

    // Lưu dự án vào database
    const handleFinal = async (addressSC, amountNeedTrx) => {

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
                "endDate": projectObj.enddate,
                "addressContract": addressSC,
                "amountNeed": listProcessValue.reduce(function (total, number) {
                    return total + number.amountNeed
                }, 0),
                "amountTRXNeed": amountNeedTrx,
                "process": listProcessValue.map(function (item) {
                    return ({
                        "title": item.title,
                        "shortDescription": item.shortDescription,
                        "content": '',
                        "amountNeed": item.amountNeed,
                        "status": 1
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
                    text: `Vui lòng chờ Quản trị viên duyệt dự án.`,
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
                                                        <tr key={index} className={clsx(Style.itemProcess, "cursor-pointer")} >
                                                            <th onClick={() => { calbackGetProcess(index) }}>{index + 1}</th>
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