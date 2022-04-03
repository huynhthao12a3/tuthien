import clsx from 'clsx'
import Style from './Add.module.scss'
import default_img from "../../../../assets/images/default_image.png"
import { CKEditor } from '@ckeditor/ckeditor5-react';

function AddProject(){
    return(
        <>
        <div className={clsx(Style.main)}>
            <div className={clsx(Style.titleWrap,'container')}>
                <div className='row'>
                    <div className='col-12'>
                        <h3 className={clsx(Style.title)}>Tạo dự án</h3>
                    </div>
                </div>
            </div>
            {/* chọn hình ảnh */}
            <div className={clsx(Style.imgavatar,'container w-100')}>
                <div className='row'>
                    <span className={clsx(Style.imgTaitle)}>chọn hình đại diện</span>
                    <div className="col-12">
                        {/* src={imgPost.review ? imgPost.review : default_img} */}
                        <img id="img-banner" src={default_img}  className={clsx(Style.imgavatar_item,"img-auto-size")}  onerror="this.src='/default_image.png'" />
                        <div className='w-100 d-flex justify-content-end'>
                            <button className={clsx(Style.btnMoreImg,'btn')}>Thêm ảnh</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx(Style.information,'container')}>
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
                    <div className='col-12'>
                        <label>Mô tả ngắn (description seo)</label>
                        <CKEditor
                            // editor={ ClassicEditor }
                            // data={editorValue}
                            // onReady={ editor => {
                            //     // You can store the "editor" and use when it is needed.
                            //     // console.log( 'Editor is ready to use!', editor );
                            // } }
                            // onChange={ ( event, editor ) => {
                            //     const data = editor.getData();
                            //     setEditorValue(data)
                                // console.log( { event, editor, data } );
                                // console.log('setEditorValue',editorValue)
                            // } }
                            // onBlur={ ( event, editor ) => {
                            //     console.log( 'Blur.', editor );
                            // } }
                            // onFocus={ ( event, editor ) => {
                            //     console.log( 'Focus.', editor );
                            // 
                        // } 
                        // }
                        />
                    </div>
                </div>
            </div>
        </div>
           
        </>
    )
}
export default AddProject