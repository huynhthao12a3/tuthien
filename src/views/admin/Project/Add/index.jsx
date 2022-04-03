import clsx from 'clsx'
import Style from './Add.module.scss'

function AddProject(){
    return(
        <>
            <div className='container w-100'>
                <div className='row'>
                    <div className='col-12'>
                        <h3>Tại dự án</h3>
                    </div>
                </div>
            </div>
            {/* chọn hình ảnh */}
            <div className='container w-100'>
                <div className='row'>
                    <div className="col-12">

                    </div>
                </div>
            </div>
            <div className='container w-100'>
                <div className='row'>
                    <h3>Thông tin</h3>
                    <div className='col-12'>
                        <label htmlFor="nameProject">Tên dự án</label>
                        <input className={clsx(Style.nameProject,'w-100 ps-2 pe-2')} id='nameProject' type="text" />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="urlProject">Tên dự án</label>
                        <input className={clsx(Style.urlProject,'w-100 ps-2 pe-2')} id='urlProject' type="text" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddProject