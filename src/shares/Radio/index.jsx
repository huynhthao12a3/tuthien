
import React, { useRef, useEffect, memo } from "react";
import style from './Radio.scss'


function Radio(props) {

    const { array, start } = props
    const [retailPrice, setRetailPrice] = start
    return (
        <>
            {
                array.map((item) => {
                    return (
                        <div key={item.id} className='mt-2'>
                            <input type='radio' checked={retailPrice === item.id} onChange={() => setRetailPrice(item.id)} className='me-2' />
                            <label className='m-0' htmlFor={item.id} >{item.name}</label>
                        </div>
                    )
                })
            }
        </>
    )
}
export default memo(Radio)