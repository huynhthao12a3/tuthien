import Style from './Dashboard.module.scss'
import React, { Component, useState } from 'react';
import * as $ from 'jquery'
import { Chart, registerables } from 'chart.js';
import { useEffect } from 'react'
import { DatePicker } from 'rsuite';
import adminUser from '../../../api/User/Admin';
import Swal from 'sweetalert2';
import {
  Chart as ChartJs,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Select from 'react-select'
import { now } from 'moment';
import { months } from 'moment';
import { set } from 'date-fns';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

// các biến ko thể thay đổi giá trị bang đầu
let date = new Date()
let getYear = date.getFullYear()
let years = [{ value: 2022, label: 2022 },]
let dataMonth = []
let labels = []

function AdminDashboard() {
  //--------------------------------------- các biến 
  const arr = {
    "ratingProjects": [
      {
        "fullName": "Huỳnh Văn Thảo",
        "sumProjectCreated": 3
      },
    ],
    "ratingDonated": [
      {
        "fullName": "Huỳnh Văn Thảo",
        "sumAmountDonated": 1424
      },
    ]
  }
  const objDashBoad = {
    "amountDonated": "5772.00 TRX",
    "projectCreated": 4,
    "donated": 18,
    "projectCompleted": 0,
    "projectImlementation": 3,
    "projectWaitting": 1,
    "lockUsers": 0,
    "donatedInMonth": [
      {
        "donated": 0,
        "month": 0
      }
    ]
  }


  //-----------------------------------------useState()

  const [dataDashBoard, setDataDashBoard] = useState(objDashBoad)// lưu dữ liệu từ api tră về
  const [isChange, setIsChange] = useState(true)  // giúp load lại dữ liệu 
  const [arrayUsers, setArrayUsers] = useState(arr) // lưu dữ liệu từ api user trả về
  const [yearvalue, setYearvalue] = useState(years[0]) //lưu giá trị trả về từ select years

  //--------------------------------------------useEffect 

  // lấy dữ liệu từ api trả về 
  useEffect(async () => {
    try {
      const params = { "Year": yearvalue.label }
      const respons = await adminUser.getStatistical(params)
      if (respons.isSuccess) {
        setDataDashBoard(respons.data)
      }
      else {
        Swal.fire('Load dữ liệu thất bại')
      }
    }
    catch (e) {
      console.log(e)
    }
  }, [yearvalue])

  // lấy dữ liệu từ api user trả về 
  useEffect(async () => {
    try {
      const respons = await adminUser.getAllDashBoardRatings()
      if (respons.isSuccess) {
        setArrayUsers(respons.data)
      }
      else {
        Swal.fire('Load dữ liệu lên thất bại')
      }
    }
    catch (e) {
      console.error(e)
    }

  }, [])

  // lấy dữ liệu cho select year
  useEffect(() => {
    for (let i = 2022 + 1; i <= getYear; i++) {
      years.push({ value: i, label: i },)
    }
  }, [])

  // lấy ngày với số lước donat cho biểu đồ
  useEffect(() => {
    dataMonth = []
    labels = []
    for (let i = dataDashBoard.donatedInMonth.length - 1; i >= 0; i--) {
      dataMonth.push(dataDashBoard.donatedInMonth[i].month + '/' + yearvalue.label)
      labels.push(dataDashBoard.donatedInMonth[i].donated)
    }
    setIsChange(!isChange)
  }, [dataDashBoard])

  useEffect(() => {
    const data = {
      labels: dataMonth,
      datasets: [
        {
          label: 'Số lượt góp',
          data: labels,
          backgroundColor: '#5494FE'
        },

      ]
    }
    const config = {
      type: 'bar',
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: `¤ Tổng số lượt quyên góp hàng tháng ¤`,
            color: '#6c757d',
            font: {
              size: 24,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 20
            }
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          },

        }
      }

    };
    $("canvas#myChart").remove();
    $("div.chart-report").append('<canvas id="myChart"></canvas>')
    let myChart = new Chart(document.getElementById('myChart'), config);
  }, [isChange])

  // Hủy Chart cũ và tạo Chart mới
  useEffect(() => {

  }, [])


  function HandleGetLable(filterlist, index) {
    return (
      filterlist.find(function (itemCategoty) {
        if (itemCategoty.value === (index + '')) {
          return itemCategoty
        }
      })
    )
  }


  return (
    <>

      <div className='container'>
        <div className='row mt-5' >
          <div className="col-lg-3 ">
            <div className='card-cv shadow-sm p-3 mb-3 bg-body rounded bg-white p-4 d-flex justify-content-between text-decoration-none'>
              <div className={clsx('col-9')}>
                <h5 className='text-secondary'>Tổng số dự án</h5>
                <span className=' text-secondary font-weight-bold'><b className='' style={{ fontSize: '1.5rem' }}>{dataDashBoard.projectCreated}</b> dự án</span>
              </div>
              <div className={clsx('col-3 d-flex justify-content-end ')}>
                <span className="mdi mdi-projector-screen px-2 mb-2 text-white rounded "
                  style={{ fontSize: '1.5rem', backgroundColor: '#2bb9c4', maxHeight: '40px' }}></span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 ">
            <div className='card-cv shadow-sm p-3 mb-2 bg-body rounded bg-white p-4 d-flex justify-content-between text-decoration-none'>
              <div className={clsx('col-9')}>
                <h5 className='text-secondary'>Số dự án chờ duyệt</h5>
                <span className=' text-secondary font-weight-bold'><b className='' style={{ fontSize: '1.5rem' }}>{dataDashBoard.projectWaitting}</b> dự án</span>
              </div>
              <div className={clsx('col-3 d-flex justify-content-end ')}>
                <span className="mdi mdi-projector-screen px-2 mb-2 text-white rounded "
                  style={{ fontSize: '1.5rem', backgroundColor: '#FA6767', maxHeight: '40px' }}></span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 ">
            <div className='card-cv shadow-sm p-3 mb-3 bg-body rounded bg-white p-4 d-flex justify-content-between text-decoration-none'>
              <div className={clsx('col-9')}>
                <h5 className='text-secondary'>Số dự án đang chạy</h5>
                <span className=' text-secondary font-weight-bold'><b className='' style={{ fontSize: '1.5rem' }}>{dataDashBoard.projectImlementation}</b> dự án</span>
              </div>
              <div className={clsx('col-3 d-flex justify-content-end ')}>
                <span className="mdi mdi-projector-screen px-2 mb-2 text-white rounded "
                  style={{ fontSize: '1.5rem', backgroundColor: '#fa6800', maxHeight: '40px' }}></span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 ">
            <div className='card-cv shadow-sm p-3 mb-3 bg-body rounded bg-white p-4 d-flex justify-content-between text-decoration-none'>
              <div className={clsx('col-9')}>
                <h5 className='text-secondary'>Dự án hoàn thành</h5>
                <span className=' text-secondary font-weight-bold'><b className='' style={{ fontSize: '1.5rem' }}>{dataDashBoard.projectCompleted}</b> dự án</span>
              </div>
              <div className={clsx('col-3 d-flex justify-content-end ')}>
                <span className="mdi mdi-projector-screen px-2 mb-2 text-white rounded "
                  style={{ fontSize: '1.5rem', backgroundColor: '#2bb9c4', maxHeight: '40px' }}></span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 ">
            <div className='card-cv shadow-sm p-3 mb-3 bg-body rounded bg-white p-4 d-flex justify-content-between text-decoration-none'>
              <div className={clsx('col-9')}>
                <h5 className='text-secondary'>Tổng số lượt quyên góp</h5>
                <span className=' text-secondary font-weight-bold'><b className='' style={{ fontSize: '1.3rem' }}>{dataDashBoard.donated}</b> Lượt</span>
              </div>
              <div className={clsx('col-3 d-flex justify-content-end ')}>
                <span className="mdi mdi-format-align-center px-2 mb-2 text-white rounded "
                  style={{ fontSize: '1.5rem', backgroundColor: '#2bb9c4', maxHeight: '40px' }}></span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 ">
            <div className='card-cv shadow-sm p-3 mb-3 bg-body rounded bg-white p-4 d-flex justify-content-between text-decoration-none'>
              <div className={clsx('col-9')}>
                <h5 className='text-secondary'>Tổng số tiền quyên góp</h5>
                <span className=' text-secondary font-weight-bold'><b className='' style={{ fontSize: '1.3rem' }}>{dataDashBoard.amountDonated.slice(0, dataDashBoard.amountDonated.lastIndexOf(' '))}</b> TRX</span>
              </div>
              <div className={clsx('col-3 d-flex justify-content-end ')}>

                <span className="mdi mdi-database-plus px-2 mb-2 text-white rounded "
                  style={{ fontSize: '1.5rem', backgroundColor: '#2bb9c4', maxHeight: '40px' }}></span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 ">
            <div className='card-cv shadow-sm p-3 mb-3 bg-body rounded bg-white p-4 d-flex justify-content-between text-decoration-none'>
              <div className={clsx('col-9')}>
                <h5 className='text-secondary'>Tài khoản đang bị khóa</h5>
                <span className=' text-secondary font-weight-bold'><b className='' style={{ fontSize: '1.3rem' }}>{dataDashBoard.lockUsers}</b> tài khoản</span>
              </div>
              <div className={clsx('col-3 d-flex justify-content-end ')}>
                <span className="mdi mdi-account-box px-2 mb-2 text-white rounded "
                  style={{ fontSize: '1.5rem', backgroundColor: '#FA6767', maxHeight: '40px' }}></span>
              </div>
            </div>
          </div>


          <div className='col-12  d-flex justify-content-end mb-2'>
            {/* <h5 className='text-secondary' style={{margin:'0px', lineHeight:'23px'}}>Biểu đồ thống kê tổng số tiền quyên góp theo tháng</h5> */}
            <div className="form-group">
              <Select defaultValue={yearvalue} onChange={setYearvalue} className={clsx(Style.Inputfocus)} placeholder='danh mục' options={years} />
            </div>
          </div>
          <div className='col-12 mb-3'>
            <div className=" bg-white">
              <div className="d-none d-md-block row p-3 ">
                <div className="col-md-12 chart-report ">
                  <canvas id="myChart"></canvas>
                </div>
              </div>
            </div>

          </div>
          <div className='col-6 mt-5 '>

            <h5 className='text-secondary mb-2'>Người dùng tạo dự án nhiều nhất</h5>
            <div className='bg-white my-3 px-2 py-3'>
              <table className="table ">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Họ tên</th>
                    <th className="text-center" scope="col">Số dự án đã tạo</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    arrayUsers.ratingProjects.map(function (item, index, arr) {
                      return (
                        <tr key={index} style={{ lineHeight: '2rem' }}>

                          <th scope="row">{index + 1}</th>




                          <td className={clsx(Style.lh,)} >{item.fullName}</td>
                          <td className={clsx(Style.lh, 'text-center')} >{item.sumProjectCreated}</td>

                        </tr>

                      )
                    })
                  }


                </tbody>
              </table>
              {/* <div>
                        <button onClick={() => setPageindex(pageindex != 0 ? pageindex - 1 : pageindex)} className={clsx(Style.prevBtn, ' px-2')}>
                            <span className="mdi mdi-chevron-double-left"></span>
                        </button>
                        <span className="px-3 text-secondary">{pageindex}</span>
                        <button onClick={() => setPageindex(pageindex + 1)} className={clsx(Style.nextBtn, ' px-2')}>
                            <span className="mdi mdi-chevron-double-right"></span>
                        </button>
                    </div> */}
            </div>

          </div>

          <div className='col-6 mt-5 '>

            <h5 className='text-secondary mb-2'>Người dùng quyên góp nhiều nhất</h5>
            <div className='bg-white my-3 px-2 py-3'>
              <table className="table ">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Họ tên</th>
                    <th className="text-center" scope="col">Tổng số tiền quyên góp</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    arrayUsers.ratingDonated.map(function (item, index, arr) {
                      return (
                        <tr key={index} style={{ lineHeight: '2rem' }}>

                          <th scope="row">{index + 1}</th>




                          <td className={clsx(Style.lh,)} >{item.fullName}</td>
                          <td className={clsx(Style.lh, 'text-center')} >{item.sumAmountDonated} <span style={{ color: 'var(--nav-color)' }}>TRX</span></td>

                        </tr>

                      )
                    })
                  }


                </tbody>
              </table>
              {/* <div>
                      <button onClick={() => setPageindex(pageindex != 0 ? pageindex - 1 : pageindex)} className={clsx(Style.prevBtn, ' px-2')}>
                          <span className="mdi mdi-chevron-double-left"></span>
                      </button>
                      <span className="px-3 text-secondary">{pageindex}</span>
                      <button onClick={() => setPageindex(pageindex + 1)} className={clsx(Style.nextBtn, ' px-2')}>
                          <span className="mdi mdi-chevron-double-right"></span>
                      </button>
                  </div> */}
            </div>

          </div>
        </div>



      </div>

    </>
  )


}
export default AdminDashboard