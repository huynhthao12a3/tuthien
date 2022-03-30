

import Style from "./Project.module.scss"
import clsx from "clsx"
import { margin, style } from "@mui/system"
import React, { Component } from 'react'
import DateRangePicker from 'rsuite/DateRangePicker';
import { startOfDay, endOfDay, addDays, subDays } from 'date-fns';
import 'rsuite/dist/rsuite-rtl.min.css'
import Select from 'react-select'

function Project(){
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }, { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }, { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }, { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }, { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
      const {
        allowedMaxDays,
        allowedDays,
        allowedRange,
        beforeToday,
        afterToday,
        combine
    } = DateRangePicker;
    const Label = props => {
        return <label style={{ display: 'block', marginTop: 10 }} {...props} />;
    };


    const Ranges = [
        {
            label: 'Hôm nay',
            value: [startOfDay(new Date()), endOfDay(new Date())]
        },
        {
            label: 'Hôm qua',
            value: [startOfDay(addDays(new Date(), -1)), endOfDay(addDays(new Date(), -1))]
        },
        {
            label: '7 ngày trước',
            value: [startOfDay(subDays(new Date(), 6)), endOfDay(new Date())]
        },
        {
            label: '30 ngày trước',
            value: [startOfDay(subDays(new Date(), 29)), endOfDay(new Date())]
        },
        {
            label: '1 năm trước',
            value: [startOfDay(subDays(new Date(), 364)), endOfDay(new Date())]
        },
    ];

    return(
        <>
            <div className={clsx(Style.project,"main-manage container-fluid")}>
                <div className={clsx('row')}>
                    <div className={clsx(Style.titleBlock, 'main-top col-12 pt-4 pb-4')}>
                        <h3 className={clsx(Style.titleProject)}>Quản lý dự án</h3>
                    </div>
                </div>
                <div className={clsx('row')}>
                    <div className={clsx(Style.filterBlock, 'filter col-3')}>
                        <div className={Style.filterBlockSpan}>
                            <div className={''}>
                                <h5 className={clsx(Style.searchContent,'')}>Tìm kiếm</h5>
                                <div className="form-group">
                                    <input id="ipt-text-search" type="text" className={clsx(Style.searchInput, Style.Inputfocus, 'form-control')}  placeholder="Tìm theo tên dự án" autoComplete="off" />
                                </div>
                            </div>
                            <div className={'mt-4'}>
                                <h5 className={clsx(Style.searchContent,'')}>Danh mục</h5>
                                <div className="form-group">
                                    <Select className={clsx( Style.Inputfocus)} placeholder='danh mục' options={options} />
                                </div>
                            </div>
                            <div className={'mt-4'}>
                                <h5 className={clsx(Style.searchContent,'')}>Trạng thái</h5>
                                <div className="form-group">
                                    <Select className={clsx( Style.Inputfocus)} placeholder='danh mục' options={options} />
                                </div>
                            </div>
                            <div className={'mt-4'}>
                                <h5 className={clsx(Style.searchContent,'')}>Chủ thể</h5>
                                <div className="form-group">
                                    <Select className={clsx( Style.Inputfocus)} placeholder='danh mục' options={options} />
                                </div>
                            </div>
                             <div className="mt-4">
                                <h5 className={clsx(Style.searchContent,'')}>Ngày đăng</h5>
                                <div class="form-group" style={{ position: 'relative' }}>
                                <DateRangePicker className={clsx(Style.rangeDate,Style.Inputfocus)}
                                    disabledDate={afterToday()}
                                    // onChange={(value) => { setDateValue([value.select]) }}
                                    // onOk={value=>{setDateValue(value)}}
                                    ari
                                    format='dd/MM/yyyy'
                                    defaultValue={[new Date(), new Date()]}
                                    character=' - '
                                    ranges={Ranges}
                                    // ref={textRef}
                                >
                                </DateRangePicker>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={clsx('list col-9')}>

                    </div>
                </div>
            </div>
                              

                               


        </>
    )
}

export default Project