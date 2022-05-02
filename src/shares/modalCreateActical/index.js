import { Button, Modal, Form } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from "sweetalert2"
function creatActical(){
    return(
        <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title className="text-black-50">Tạo bảng tin</Modal.Title>
        </Modal.Header>
        <Modal.Body className="container-fluid ">
            <div className="row p-3">
                <div className={clsx(Style.imgAccountUpdate, "col-12 me-end")}>

                    <img className={clsx(Style.img_item1, "mx-auto d-block img-fluid")}
                        src={(createNews.banner.filePath)?process.env.REACT_APP_URL+createNews.banner.filePath:process.env.REACT_APP_URL+imgDefault} alt="" />
                     <div className="w-100 d-flex justify-content-end">
                        <button className={clsx(Style.btnMoreImg, 'btn')}>
                            <span style={{ cursor: "pointer", position: "absolute", textAlign: "center", fontSize: "1rem", lineHeight: "1.7rem", width: "100%", left: "0", right: "0" }}>Chọn hình đại điện</span>
                            <input type="file" onChange={handleChangAvatar} style={{ cursor: "pointer", opacity: "0", width: '100%', height: "100%", cursor: "pointer" }} />
                        </button>
                     </div>
                     
                </div>

                <Form className="col-12 py-2">
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Tên bài viết</Form.Label>
                        <Form.Control className="border border-secondary"
                            value={createNews.title}
                            onChange={(e) => { setCreateNews({ ...createNews, title: e.target.value }) }}
                            type="text"
                            placeholder="tiêu đề bải viết"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Đường dẫn</Form.Label>
                        <Form.Control className="border border-secondary"
                            value={createNews.friendlyUrl}
                            onChange={(e) => { setCreateNews({ ...createNews, friendlyUrl: e.target.value }) }}
                            type="text"
                            placeholder="đường dẫn"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group controlId="">
                        <Form.Label>mô tả ngắn</Form.Label>
                        <Form.Control className="border border-secondary"

                            value={createNews.shortDescription}
                            onChange={(e) => { setCreateNews({ ...createNews, shortDescription: e.target.value }) }}
                            type="text"
                            placeholder="mô tả ngắn"
                            autoFocus
                        />
                    </Form.Group>

                </Form>
                <Form className="d-flex justify-content-between col-12">
                    <Form.Group className="col-12 px-2 d-inline-block " controlId="">
                        <Form.Label>Nội dung</Form.Label>
                        <div className="add-project_editor removeImg">
                            <CKEditor
                                editor={ClassicEditor}
                                data={createNews.content}

                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setCreateNews({ ...createNews, content: data })
                                }}
                                config={{

                                    removePlugins: ['image', 'MediaEmbed', 'Table'],
                                }}

                            />
                        </div>
                    
                    </Form.Group>
                   

                </Form>

              
            </div>

        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-end">
           
            <div>
                <Button className="me-2" variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button className={clsx("",isCreate?'hide':'show')} variant="primary" onClick={() => { handleCreate() }}>
                    Tạo
                </Button>
                <Button className={clsx("",!isCreate?'hide':'show')} variant="primary" onClick={() => { handleCreate() }} >
                    Hoàn thành
                </Button>
            </div>

        </Modal.Footer>
    </Modal>
    )
}
export default creatActical