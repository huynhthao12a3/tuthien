import Style from './Dashboard.module.scss'
import React, { Component, useState } from 'react';
import * as $ from 'jquery'
import { Chart, registerables } from 'chart.js';
import {useEffect} from 'react'
import { DatePicker } from 'rsuite';
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

function AdminDashboard(){

  const avatarDefalt = "\\uploads\\Images\\Hide_User\\06052022_080221_anymous_icon.png"
  const arr=[{
    avatar:'\\uploads\\Images\\client\\07052022_023138_5.png',
    useName:'Trần Văn Thuận',
    email:'tranthuan@gmail.com',
    phoneNumber:"098765432",
    type:1,
    sumamount:'100000'

  },{
    avatar:'\\uploads\\Images\\client\\07052022_023138_5.png',
    useName:'Trần Văn Thuận',
    email:'tranthuan@gmail.com',
    phoneNumber:"098765432",
    type:1,
    sumamount:'100000'

  }
]

const type = [
  {  value: '0',label:'Tất cả'},
  { value: '1', label: 'Cá nhân' },
  { value: '2', label: 'Tổ chức' },
]
  const dataMonth=[100,200,300,40,50]
  
  const [pageindex, setPageindex] = useState(0)// trang 
  const [arrayUsers,setArrayUsers]= useState(arr)
  const labels=['1/2022','2/2022','3/2022','4/2022','5/2022','6/2022']
  const data = {
    labels:labels,
    datasets: [
        {
            label: 'Số tiền quyên góp',
            data: dataMonth,
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
                  text: `¤ Tổng số tiền quyên góp trong tháng ¤`,
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
  // Hủy Chart cũ và tạo Chart mới
    useEffect(()=>{
      $("canvas#myChart").remove();
      $("div.chart-report").append('<canvas id="myChart"></canvas>')
      let myChart = new Chart(document.getElementById('myChart'), config);
    },[])

    function HandleGetLable(filterlist, index) {
        return (
            filterlist.find(function (itemCategoty) {
                if (itemCategoty.value === (index + '')) {
                    return itemCategoty
                }
            })
        )
    }
    return(
      <>
      <div className='container'>
        <div className='row mt-5' >
            <div class="col-lg-3 ">
              <Link to='' className='card-cv shadow-sm p-3 mb-2 bg-body rounded bg-white p-4 d-flex justify-content-between text-decoration-none'>
                <div className={clsx('col-9')}>
                  <h5 className='text-secondary'>Dự án chưa duyệt</h5>
                  <span className=' text-secondary font-weight-bold'><b className='' style={{fontSize:'2.2rem'}}>5</b> dự án</span>
                </div>
                <div className={clsx('col-3 d-flex justify-content-end ')}>
                  <span class="mdi mdi-projector-screen px-2 mb-2 text-white rounded " 
                  style={{fontSize:'1.5rem',backgroundColor:'#FA6767', maxHeight:'40px'}}></span>
                </div>
              </Link>
            </div>
            <div class="col-lg-3 ">
              <Link to='' className='card-cv shadow-sm p-3 mb-3 bg-body rounded bg-white p-4 d-flex justify-content-between text-decoration-none'>
                <div className={clsx('col-9')}>
                  <h5 className='text-secondary'>Dự án đã duyệt</h5>
                  <span className=' text-secondary font-weight-bold'><b className='' style={{fontSize:'2.2rem'}}>5</b> dự án</span>
                </div>
                <div className={clsx('col-3 d-flex justify-content-end ')}>
                  <span class="mdi mdi-projector-screen px-2 mb-2 text-white rounded " 
                  style={{fontSize:'1.5rem',backgroundColor:'#fa6800', maxHeight:'40px'}}></span>
                </div>
              </Link>
            </div>
            <div class="col-lg-3 ">
              <Link to='' className='card-cv shadow-sm p-3 mb-3 bg-body rounded bg-white p-4 d-flex justify-content-between text-decoration-none'>
                <div className={clsx('col-9')}>
                  <h5 className='text-secondary'>Dự án hoàn thành</h5>
                  <span className=' text-secondary font-weight-bold'><b className='' style={{fontSize:'2.2rem'}}>5</b> dự án</span>
                </div>
                <div className={clsx('col-3 d-flex justify-content-end ')}>
                  <span class="mdi mdi-projector-screen px-2 mb-2 text-white rounded " 
                  style={{fontSize:'1.5rem',backgroundColor:'#2bb9c4', maxHeight:'40px'}}></span>
                </div>
              </Link>
            </div>
            <div class="col-lg-3 ">
              <Link to='' className='card-cv shadow-sm p-3 mb-3 bg-body rounded bg-white p-4 d-flex justify-content-between text-decoration-none'>
                <div className={clsx('col-9')}>
                  <h5 className='text-secondary'>Tài khoản chưa duyệt</h5>
                  <span className=' text-secondary font-weight-bold'><b className='' style={{fontSize:'2.2rem'}}>5</b> tài khoản</span>
                </div>
                <div className={clsx('col-3 d-flex justify-content-end ')}>
                  <span class="mdi mdi-account-box px-2 mb-2 text-white rounded " 
                  style={{fontSize:'1.5rem',backgroundColor:'#2bb9c4', maxHeight:'40px'}}></span>
                </div>
              </Link>
            </div>
            <div class="col-lg-3 ">
              <Link to='' className='card-cv shadow-sm p-3 mb-3 bg-body rounded bg-white p-4 d-flex justify-content-between text-decoration-none'>
                <div className={clsx('col-9')}>
                  <h5 className='text-secondary'>Tin tức chưa duyệt</h5>
                  <span className=' text-secondary font-weight-bold'><b className='' style={{fontSize:'2.2rem'}}>5</b> Tin tức</span>
                </div>
                <div className={clsx('col-3 d-flex justify-content-end ')}>
                  <span class="mdi mdi-newspaper px-2 mb-2 text-white rounded " 
                  style={{fontSize:'1.5rem',backgroundColor:'#2bb9c4', maxHeight:'40px'}}></span>
                </div>
              </Link>
            </div>
          
          <div className='col-12  d-flex justify-content-end'>
              {/* <h5 className='text-secondary' style={{margin:'0px', lineHeight:'23px'}}>Biểu đồ thống kê tổng số tiền quyên góp theo tháng</h5> */}
              <DatePicker className='tt-sum mb-1' oneTap format="MM-yyyy"  />
          </div>
          <div className='col-12 mb-3'>
              <div class=" bg-white">
                <div class="d-none d-md-block row p-3 ">
                    <div class="col-md-12 chart-report ">
                        <canvas id="myChart"></canvas>
                    </div>
                </div>
            </div>
        
          </div>
          <div className='col-12 mt-5 '>

              <h5 className='text-secondary mb-2'>Người dùng quyên góp nhiều nhất</h5>
              <div className='bg-white my-3 px-2 py-3'>
                <table className="table ">
                    <thead>
                        <tr>
                            <th className="text-center" scope="col">#</th>
                            <th className="text-center" scope="col">Hình ảnh</th>
                            <th  scope="col">Họ tên</th>
                            <th scope="col">Email</th>
                            <th  scope="col">Điện thoại</th>
                            <th className="text-center" scope="col">Loại</th>
                            <th className="text-center" scope="col">Số tiền đã quyên góp</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            arrayUsers.map(function (item, index, arr) {
                                return (
                                    <tr key={index} style={{ lineHeight: '2rem' }}>

                                        <th scope="row">{index+1}</th>
                                        <td>
                                            <div className={clsx(Style.imgAccount, " mx-auto")}>
                                                <img id="img-banner1" src={ (item.avatar) ? (process.env.REACT_APP_URL + item.avatar) : (process.env.REACT_APP_URL + avatarDefalt)} 
                                                 style={{width:'50px',height:'50px'}} className={clsx(Style.img_item, "mx-auto d-block rounded-circle border border-1 img-fluid img-auto-size ")} />
                                            </div>
                                        </td>

                                        

                                        <td  className={clsx(Style.lh, )} >{item.useName}</td>
                                        <td className={clsx(Style.lh, )} >{item.email}</td>

                                        <td  className={clsx(Style.lh, )} >{item.phoneNumber}</td>
                                        <td  className={clsx(Style.lh, "text-center")} >{HandleGetLable(type, item.type).label}</td>
                                        {/* <td  className={clsx(Style.lh, "text-center", item.isAdmin ? 'text-warning' : 'text-primary')} >{item.isAdmin ? 'Admin' : 'Client'}</td> */}
                                        <td  className={clsx(Style.lh, "text-center")} >
                                            {item.sumamount}

                                        </td>

                                        

                                    </tr>

                                )
                            })
                        }


                    </tbody>
                </table>
                <div>
                        <button onClick={() => setPageindex(pageindex != 0 ? pageindex - 1 : pageindex)} className={clsx(Style.prevBtn, ' px-2')}>
                            <span className="mdi mdi-chevron-double-left"></span>
                        </button>
                        <span className="px-3 text-secondary">{pageindex}</span>
                        <button onClick={() => setPageindex(pageindex + 1)} className={clsx(Style.nextBtn, ' px-2')}>
                            <span className="mdi mdi-chevron-double-right"></span>
                        </button>
                    </div>
              </div>
                                   
          </div>
      </div>

    

</div>

      </> 
    )
       
    
}
export default AdminDashboard