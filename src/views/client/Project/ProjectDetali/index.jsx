import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import clsx from "clsx";
import Style from "./ProjectDetail.module.scss"
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import trxCoin from "../../../../assets/images/trx-coin.svg"
// Dùng chung
import SetInnerHTML from "../../../../shares/setInnerHTML"
//  Google map 
import Iframe from 'react-iframe'

// Sanitize chỗi html từ ckEditor  
import DOMPurify from 'dompurify';
// Zoom hình ảnh 
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

// Thư viện xử lý ngày tháng 
import moment from 'moment'

// Slider trong React Slick
import Slider from "react-slick";
ProjectDetail.propTypes = {

};

function ProjectDetail(props) {

    // Data Project từ API 
    const fakeDataProject = {
        projectId: 91,
        projectName: 'Cứu trợ nạn đói khẩn cấp ở Châu Phi',
        image: 'https://i.ytimg.com/vi/tSWzwHea7x0/hqdefault.jpg',
        shortDescription: '<p>Đảm bảo các gia đình dễ bị tổn thương ở nông thôn Nam Phi giữ thức ăn trên bàn trong cuộc khủng hoảng COVID 19...</p>',
        summary: '<p>Cuộc khủng hoảng COVID19 đã ảnh hưởng sâu sắc đến miền nam châu Phi và đặc biệt là các cộng đồng nông thôn phụ thuộc vào du lịch động vật hoang dã để kiếm sống. Các cộng đồng vốn đã dễ bị tổn thương hiện đang rơi vào tình trạng đói và nghèo hơn. Bạn có thể giúp cung cấp các gói thực phẩm để đảm bảo rằng 100 gia đình trong cộng đồng bên cạnh khu bảo tồn động vật hoang dã của chúng tôi có thể ăn trong tháng 10 như một phần của Chiến dịch Cứu trợ Đói đang diễn ra của chúng tôi. Chỉ cần 35 đô la là đủ để mua một gói thực phẩm lớn cho một gia đình trong một tháng. Sự hỗ trợ của bạn cũng giữ cho động vật hoang dã được an toàn, bằng cách đảm bảo những người đói không phải dùng đến săn trộm thịt rừng để giữ cho gia đình của họ có thức ăn.</p>',
        problemToAddress: '<p>Cuộc khủng hoảng COVID19 đã tác động sâu sắc đến các cộng đồng dễ bị tổn thương mà chúng tôi làm việc cùng, những người sống cạnh hai khu bảo tồn động vật hoang dã của chúng tôi ở KwaZulu-Natal Nam Phi. Các tác động kinh tế của việc đóng cửa nghiêm ngặt của Nam Phi đang được cảm nhận rõ nét trong cộng đồng nông thôn của chúng tôi, gây ra mối đe dọa cho cả con người và việc bảo vệ động vật hoang dã. Nhiều người bị mất việc làm và thu nhập, khiến các gia đình vốn đã nghèo lại càng thêm đói và nghèo. Các thành viên cộng đồng đang làm việc xa nhà trong thành phố đã trở lại để đóng cửa, gây thêm áp lực cho các gia đình và nguồn lực của họ. Trẻ em nói riêng có nguy cơ phụ thuộc vào bữa ăn hàng ngày từ trường học, nơi đã đóng cửa.</p>',
        solution: `<p>Là một phần của chương trình Hỗ trợ cộng đồng của Quỹ Ngày mai hoang dã, chúng tôi nhanh chóng bắt tay vào hành động để tổ chức một chương trình cứu trợ nạn đói khẩn cấp. Chúng tôi đã gây quỹ đủ cho đợt giao hàng đầu tiên vào tháng 5 cho 63 gia đình có nhu cầu.

        Mục tiêu của chúng tôi là gây quỹ bổ sung để cung cấp cho ít nhất 100 gia đình những gói thực phẩm khẩn cấp mỗi tháng. Những bưu kiện này sẽ chứa các nhu yếu phẩm như gạo, rau, dầu, và cá hộp và sẽ giữ cho các gia đình được ăn trong một tháng. Chúng tôi đang làm việc trực tiếp với ban lãnh đạo truyền thống của cộng đồng (Nduna) để giúp xác định những gia đình cần nhất. Bất kỳ khoản tiền nào được huy động cao hơn mục tiêu của chúng tôi sẽ cho phép chúng tôi mở rộng phạm vi hoạt động của chương trình.
        
        Mỗi bưu kiện đều có ghi chú từ quỹ Ngày mai hoang dã với dòng chữ Zulu nói "Umuntu ngumuntu ngabuntu" có nghĩa là "Người là vì người", một thông điệp về tình đoàn kết và sự sẻ chia nhân văn của chúng ta trong thời điểm khó khăn này.</p>`,
        category: ['Lũ lụt', 'Thiên tai', 'Con người'],
        location: 'Phường Trảng Dài, Thành phố Biên Hòa, tỉnh Đồng Nai',
        impact: '500 người dân Châu Phi',
        dateStart: '02/01/2022',
        dateEnd: '10/11/2022',
        addressContract: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t", // địa chỉ smart contract
        amountNeed: '3005000000',
        status: 'Đang thực thi',
        userCreateId: '981',
        userCreateName: 'Huỳnh Thảo',
        userType: 'Cá nhân'
    }
    const amountNow = '2100000000' // từ smart contract

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
    // Amount
    const amountNowFormat = Number(amountNow)
    const amountNeedFormat = Number(fakeDataProject.amountNeed)
    const progress = Math.floor((amountNowFormat / amountNeedFormat) * 100)

    // URL map location
    const urlLocation = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDEhyx111_aA4TIk0BPHGyLTOZnIFChjGc&q=" + fakeDataProject.location.replaceAll(' ', '+');

    // Data tiến trình project từ API
    const fakeDataProcess = [
        {
            id: 184,
            projectId: 91,
            title: "Sự tin cậy cho các gia đình của MDUKU",
            status: "Đã hoàn thành",
            shortDescription: "<p>Mỗi gói thực phẩm có giá 35 đô la và chúng tôi sẽ phân phát một gói (cho một gia đình bốn người) cho 72 gia đình, những người được chính quyền bộ lạc và đội y tế cộng đồng xác định là cần nhất</p>",
            content: '<p>Nhờ chiến dịch quyên góp bằng bitcoin, chúng tôi đã có thể gửi những khoản tiền này trực tiếp đến Nam Phi, nơi chúng tôi đổi thành fiat Rand. Chúng tôi đã sử dụng R92,908 (US $ 6551) trong tổng số tiền quỹ để mua tổng cộng 120 gói thực phẩm, mỗi gói cho một gia đình bốn người ăn trong một tháng. Chúng tôi đã chuyển những bưu kiện thực phẩm này trong suốt tháng Giêng, tháng Hai, tháng Ba cho những gia đình mất an ninh lương thực nhất ở Mduku, Nam Phi.</p>',
            file: [
                {
                    id: 11,
                    fileName: "Name",
                    filePath: "https://baocantho.com.vn/image/fckeditor/upload/2018/20180616/images/khambenhmienphigiaixuan.jpg"

                },
                {
                    id: 12,
                    fileName: "Name",
                    filePath: "https://cdn.thoibaotaichinhvietnam.vn/stores/news_dataimages/thoibaotaichinhvietnamvn/122013/02/01/viettel-to-chuc-kham-benh-mien-phi-cho-600-ho-ngheo-o-dien-bien-04-.2251.jpg"

                },
                {
                    id: 13,
                    fileName: "Name",
                    filePath: "https://www.angelcharity.org/wp-content/uploads/hero-background.jpg"
                },
                {
                    id: 15,
                    fileName: "Name",
                    filePath: "https://www.victoriavn.com/images/HOATDONGXAHOI/43075330_540345303071029_8671747087559294976_n.jpg"
                },
                {
                    id: 16,
                    fileName: "Name",
                    filePath: "https://www.smsupermalls.com/data/uploads/2019/12/13.jpg"
                }

            ],
            expenses: [
                {
                    id: 92,
                    expenseDate: "2021-01-08T00:00:00.000Z",
                    createdDate: "2021-04-21T00:00:00.000Z",
                    type: "Thanh toán",
                    amount: "31700000",
                    description: "<p>Vào ngày 16 tháng 1 năm 2021, chúng tôi đã giao 60 gói thực phẩm (R $ 44.727,60)</p>",
                    fileName: "Bidvest Food Invoice-WILD TOMORROW FUND HAMPERS 14.1.2021.pdf",
                    filePath: "https://daotao.dntu.edu.vn/Resource/Upload/file/a/29-BM-PDT.pdf",
                },
                {
                    id: 93,
                    expenseDate: "2021-12-08T00:00:00.000Z",
                    createdDate: "2021-04-22T00:00:00.000Z",
                    type: "Thanh toán",
                    amount: "220100000",
                    description: "<p>Vào ngày 22 tháng 1 năm 2021, chúng tôi đã giao 1000 gói thực phẩm (R $ 111.727,60)</p>",
                    fileName: "Bidvest Food Invoice-WILD TOMORROW FUND HAMPERS 14.1.2021.pdf",
                    filePath: "https://daotao.dntu.edu.vn/Resource/Upload/file/a/29-BM-PDT.pdf",
                },
                {
                    id: 94,
                    expenseDate: "2021-02-11T00:00:00.000Z",
                    createdDate: "2021-04-21T00:00:00.000Z",
                    type: "Thanh toán",
                    amount: "31700000",
                    description: "<p>Thức ăn đóng hộp cho trẻ mồ côi và gia đình của họ: 60 lon Hành tây cà chua trộn 30 lon Đậu sốt cà chua 40 lon Rau trộn cà ri (Một nửa hóa đơn này dành cho Mốc 1)</p>",
                    fileName: "Bidvest Food Invoice-WILD TOMORROW FUND HAMPERS 14.1.2021.pdf",
                    filePath: "https://daotao.dntu.edu.vn/Resource/Upload/file/a/29-BM-PDT.pdf",
                },
                {
                    id: 95,
                    expenseDate: "2021-01-08T00:00:00.000Z",
                    createdDate: "2021-04-22T00:00:00.000Z",
                    type: "Thanh toán",
                    amount: "220100000",
                    description: "<p>Trả cho tổ chức từ thiện Hambanathi Community thêm một tháng thực phẩm cho tất cả 30 trẻ mồ côi (và các gia đình khác) trong một tháng nữa. Người quản lý cũng có toàn quyền sử dụng một số quỹ này cho các nhu cầu cấp thiết của trường học, bao gồm cả giày đi học cho trẻ em.",
                    fileName: "Bidvest Food Invoice-WILD TOMORROW FUND HAMPERS 14.1.2021.pdf",
                    filePath: "https://daotao.dntu.edu.vn/Resource/Upload/file/a/29-BM-PDT.pdf",
                },
            ],
        },
        {
            id: 185,
            projectId: 91,
            title: "Sự tin cậy cho các gia đình của GREEN MAMBAS",
            status: "Đã hoàn thành",
            shortDescription: "<p>Green Mambas là một nhóm gồm 14 phụ nữ, hầu hết là mẹ đơn thân, làm việc theo mùa cho Quỹ Ngày mai hoang dã, giúp đỡ khu bảo tồn của chúng tôi với các công việc xanh bao gồm loại bỏ thực vật ngoại lai. Chúng tôi muốn đảm bảo những người phụ nữ mạnh mẽ này và con cái của họ không bị đói mỗi tháng.</p> <p>Chúng tôi sẽ giao 14 gói thực phẩm có giá 35 đô la cho mỗi Green Mamba cho gia đình cô ấy.</p>",
            content: '<p>Nhờ nguồn tài trợ không hoàn lại, chúng tôi đã có thể tuyển dụng 14 phụ nữ Green Mambas trong 5 tháng làm việc tại Khu bảo tồn của chúng tôi ở Nam Phi (từ tháng 11 năm 2020 đến tháng 5 năm 2021). Như vậy, với nguồn thu nhập ổn định này, họ đã có thể mua thực phẩm cho gia đình và không còn là những người thiếu thốn nhất trong cộng đồng của chúng tôi.</p><br><p>Thay vào đó, chúng tôi sử dụng quỹ cho sự kiện quan trọng này để cung cấp bữa trưa ở trường hàng ngày cho hai nhà trẻ mà chúng tôi hỗ trợ.</p><br><p>Sự kiện quan trọng này đã tài trợ 3 tháng ăn trưa hàng ngày cho 70 trẻ em!</p>',
            file: [
                {
                    id: 20,
                    fileName: "Name",
                    filePath: "https://www.angelcharity.org/wp-content/uploads/hero-background.jpg"
                },
                {
                    id: 21,
                    fileName: "Name",
                    filePath: "https://www.victoriavn.com/images/HOATDONGXAHOI/43075330_540345303071029_8671747087559294976_n.jpg"
                },
                {
                    id: 22,
                    fileName: "Name",
                    filePath: "https://static.republika.co.id/uploads/images/inpicture_slide/suasana-market-day-charity-program-yang-digelar-oleh-_171101060617-578.jpg"

                },
                {
                    id: 23,
                    fileName: "Name",
                    filePath: "https://static.republika.co.id/uploads/images/inpicture_slide/suasana-market-day-charity-program-yang-digelar-oleh-_171101060617-578.jpg"

                },

                {
                    id: 30,
                    fileName: "Name",
                    filePath: "https://www.smsupermalls.com/data/uploads/2019/12/13.jpg"
                }
            ],
            expenses: [
                {
                    id: 101,
                    expenseDate: "2021-12-24T00:00:00.000Z",
                    createdDate: "2021-04-21T00:00:00.000Z",
                    type: "Thanh toán",
                    amount: "5700000",
                    description: "<p>Vào ngày 16 tháng 1 năm 2021, chúng tôi đã giao 60 gói thực phẩm (R $ 44.727,60)</p>",
                    fileName: "Bidvest Food Invoice-WILD TOMORROW FUND HAMPERS 14.1.2021.pdf",
                    filePath: "https://daotao.dntu.edu.vn/Resource/Upload/file/a/29-BM-PDT.pdf",
                },
                {
                    id: 103,
                    expenseDate: "2021-11-02T00:00:00.000Z",
                    createdDate: "2021-04-22T00:00:00.000Z",
                    type: "Thanh toán",
                    amount: "120100000",
                    description: "<p>Vào ngày 30 tháng 4 năm 2021, chúng tôi mua các gói thực phẩm Creche trong Slimbooks. Chúng tôi đã chi RAND $ 1,341,55.</p>",
                    fileName: "Bidvest Food Invoice-WILD TOMORROW FUND HAMPERS 14.1.2021.pdf",
                    filePath: "https://daotao.dntu.edu.vn/Resource/Upload/file/a/29-BM-PDT.pdf",
                },
                {
                    id: 104,
                    expenseDate: "2021-03-22T00:00:00.000Z",
                    createdDate: "2021-04-22T00:00:00.000Z",
                    type: "Thanh toán",
                    amount: "120100000",
                    description: "<p>Vào ngày 22/02/2021, chúng tôi mua các gói thực phẩm Creche tháng Hai. Đã chi RAND $ 3,621,2.</p>",
                    fileName: "Bidvest Food Invoice-WILD TOMORROW FUND HAMPERS 14.1.2021.pdf",
                    filePath: "https://daotao.dntu.edu.vn/Resource/Upload/file/a/29-BM-PDT.pdf",
                },
            ],
        },
        {
            id: 185,
            projectId: 91,
            title: "Sự tin cậy cho các gia đình của HABANATHI ORPHANS",
            status: "Đã hoàn thành",
            shortDescription: "<p>Đây là những trẻ em dễ bị tổn thương nhất trong cộng đồng lân cận khu bảo tồn động vật hoang dã của chúng tôi. Hầu hết sống với đại gia đình sau khi mồ côi, thường là do nhiễm HIV.</p><br><p>Chúng tôi sẽ làm việc cùng với Mục sư Bonga của Tổ chức từ thiện Habanathi EC (người hỗ trợ trẻ mồ côi và người chăm sóc chúng) để mua thực phẩm cho 15 gia đình. Mỗi gói thực phẩm có giá 35 đô la.</p>",
            content: '<p>Cảm ơn bạn đã hỗ trợ những thành viên dễ bị tổn thương nhất trong cộng đồng của chúng tôi ở Nam Phi, những đứa trẻ mồ côi. Hầu hết các em đều mồ côi vì HIV. Một số sống với các gia đình khác (ví dụ như Dì và Chú) trong khi những người khác sống một mình trong các hộ gia đình có trẻ em làm chủ hộ. Các khoản quyên góp bitcoin cho sự kiện quan trọng này đã tài trợ 2 tháng hỗ trợ thực phẩm cho 30 trẻ em được hỗ trợ bởi trung tâm cộng đồng Hambanathi dành cho trẻ mồ côi! Mục tiêu ban đầu là hỗ trợ lương thực trong 1 tháng, nhưng nhờ sự thành công của chiến dịch và sự tăng trưởng về giá trị của Bitcoin, chúng tôi đã có thể tăng gấp đôi số tiền ủng hộ của mình. Cảm ơn bạn đã cung cấp thực phẩm này cho cộng đồng tuyệt vời của chúng tôi.</p>',
            file: [
                {
                    id: 31,
                    fileName: "Name",
                    filePath: "https://www.angelcharity.org/wp-content/uploads/hero-background.jpg"
                },
                {
                    id: 33,
                    fileName: "Name",
                    filePath: "https://www.victoriavn.com/images/HOATDONGXAHOI/43075330_540345303071029_8671747087559294976_n.jpg"
                },
                {
                    id: 35,
                    fileName: "Name",
                    filePath: "https://www.victoriavn.com/images/HOATDONGXAHOI/42851986_540345116404381_7244991666593988608_n.jpg"
                },
                {
                    id: 39,
                    fileName: "Name",
                    filePath: "https://daklak24h.com.vn/images/news/2018/4/23/anh-nam(1).jpg"
                },

                {
                    id: 41,
                    fileName: "Name",
                    filePath: "https://static.republika.co.id/uploads/images/inpicture_slide/suasana-market-day-charity-program-yang-digelar-oleh-_171101060617-578.jpg"
                }

            ],
            expenses: [
                {
                    id: 105,
                    expenseDate: "2021-02-11T00:00:00.000Z",
                    createdDate: "2021-04-21T00:00:00.000Z",
                    type: "Thanh toán",
                    amount: "31700000",
                    description: "<p>Thức ăn đóng hộp cho trẻ mồ côi và gia đình của họ: 60 lon Hành tây cà chua trộn 30 lon Đậu sốt cà chua 40 lon Rau trộn cà ri (Một nửa hóa đơn này dành cho Mốc 1)</p>",
                    fileName: "Bidvest Food Invoice-WILD TOMORROW FUND HAMPERS 14.1.2021.pdf",
                    filePath: "https://daotao.dntu.edu.vn/Resource/Upload/file/a/29-BM-PDT.pdf",
                },
                {
                    id: 109,
                    expenseDate: "2021-01-08T00:00:00.000Z",
                    createdDate: "2021-04-22T00:00:00.000Z",
                    type: "Thanh toán",
                    amount: "220100000",
                    description: "<p>Trả cho tổ chức từ thiện Hambanathi Community thêm một tháng thực phẩm cho tất cả 30 trẻ mồ côi (và các gia đình khác) trong một tháng nữa. Người quản lý cũng có toàn quyền sử dụng một số quỹ này cho các nhu cầu cấp thiết của trường học, bao gồm cả giày đi học cho trẻ em.",
                    fileName: "Bidvest Food Invoice-WILD TOMORROW FUND HAMPERS 14.1.2021.pdf",
                    filePath: "https://daotao.dntu.edu.vn/Resource/Upload/file/a/29-BM-PDT.pdf",
                },
            ],
        },
        {
            id: 186,
            projectId: 91,
            title: "Sự tin cậy cho các gia đình của HABANATHI ORPHANS",
            status: "Đang thực hiện",
            shortDescription: "<p>Chúng tôi sẽ làm việc cùng với Mục sư Bonga của Tổ chức từ thiện Habanathi EC (người hỗ trợ trẻ mồ côi và người chăm sóc chúng) để mua thực phẩm cho 15 gia đình. Mỗi gói thực phẩm có giá 35 đô la.</p>",
            content: '<p>Cảm ơn bạn đã hỗ trợ những thành viên dễ bị tổn thương nhất trong cộng đồng của chúng tôi ở Nam Phi, những đứa trẻ mồ côi. Hầu hết các em đều mồ côi vì HIV. Một số sống với các gia đình khác (ví dụ như Dì và Chú) trong khi những người khác sống một mình trong các hộ gia đình có trẻ em làm chủ hộ. Các khoản quyên góp bitcoin cho sự kiện quan trọng này đã tài trợ 2 tháng hỗ trợ thực phẩm cho 30 trẻ em được hỗ trợ bởi trung tâm cộng đồng Hambanathi dành cho trẻ mồ côi! Mục tiêu ban đầu là hỗ trợ lương thực trong 1 tháng, nhưng nhờ sự thành công của chiến dịch và sự tăng trưởng về giá trị của Bitcoin, chúng tôi đã có thể tăng gấp đôi số tiền ủng hộ của mình. Cảm ơn bạn đã cung cấp thực phẩm này cho cộng đồng tuyệt vời của chúng tôi.</p>',
            file: [
                {
                    id: 41,
                    fileName: "Name",
                    filePath: "https://www.angelcharity.org/wp-content/uploads/hero-background.jpg"
                },
                {
                    id: 43,
                    fileName: "Name",
                    filePath: "https://www.victoriavn.com/images/HOATDONGXAHOI/43075330_540345303071029_8671747087559294976_n.jpg"
                },
                {
                    id: 45,
                    fileName: "Name",
                    filePath: "https://www.victoriavn.com/images/HOATDONGXAHOI/42851986_540345116404381_7244991666593988608_n.jpg"
                },
                {
                    id: 49,
                    fileName: "Name",
                    filePath: "https://daklak24h.com.vn/images/news/2018/4/23/anh-nam(1).jpg"
                },

                {
                    id: 51,
                    fileName: "Name",
                    filePath: "https://static.republika.co.id/uploads/images/inpicture_slide/suasana-market-day-charity-program-yang-digelar-oleh-_171101060617-578.jpg"
                }

            ],
            expenses: [
                {
                    id: 115,
                    expenseDate: "2021-02-11T00:00:00.000Z",
                    createdDate: "2021-04-21T00:00:00.000Z",
                    type: "Thanh toán",
                    amount: "31700000",
                    description: "<p>Thức ăn đóng hộp cho trẻ mồ côi và gia đình của họ: 60 lon Hành tây cà chua trộn 30 lon Đậu sốt cà chua 40 lon Rau trộn cà ri (Một nửa hóa đơn này dành cho Mốc 1)</p>",
                    fileName: "Bidvest Food Invoice-WILD TOMORROW FUND HAMPERS 14.1.2021.pdf",
                    filePath: "https://daotao.dntu.edu.vn/Resource/Upload/file/a/29-BM-PDT.pdf",
                },
                {
                    id: 119,
                    expenseDate: "2021-01-08T00:00:00.000Z",
                    createdDate: "2021-04-22T00:00:00.000Z",
                    type: "Thanh toán",
                    amount: "220100000",
                    description: "<p>Trả cho tổ chức từ thiện Hambanathi Community thêm một tháng thực phẩm cho tất cả 30 trẻ mồ côi (và các gia đình khác) trong một tháng nữa. Người quản lý cũng có toàn quyền sử dụng một số quỹ này cho các nhu cầu cấp thiết của trường học, bao gồm cả giày đi học cho trẻ em.",
                    fileName: "Bidvest Food Invoice-WILD TOMORROW FUND HAMPERS 14.1.2021.pdf",
                    filePath: "https://daotao.dntu.edu.vn/Resource/Upload/file/a/29-BM-PDT.pdf",
                },
                {
                    id: 221,
                    expenseDate: "2021-01-08T00:00:00.000Z",
                    createdDate: "2021-04-22T00:00:00.000Z",
                    type: "Thanh toán",
                    amount: "123400000",
                    description: "<p>Trả cho tổ chức từ thiện Hambanathi Community thêm một tháng thực phẩm cho tất cả 30 trẻ mồ côi (và các gia đình khác) trong một tháng nữa. Người quản lý cũng có toàn quyền sử dụng một số quỹ này cho các nhu cầu cấp thiết của trường học, bao gồm cả giày đi học cho trẻ em.",
                    fileName: "Bidvest Food Invoice-WILD TOMORROW FUND HAMPERS 14.1.2021.pdf",
                    filePath: "https://daotao.dntu.edu.vn/Resource/Upload/file/a/29-BM-PDT.pdf",
                },
                {
                    id: 222,
                    expenseDate: "2021-01-08T00:00:00.000Z",
                    createdDate: "2021-04-22T00:00:00.000Z",
                    type: "Thanh toán",
                    amount: "300500000",
                    description: "<p>Trả cho tổ chức từ thiện Hambanathi Community thêm một tháng thực phẩm cho tất cả 30 trẻ mồ côi (và các gia đình khác) trong một tháng nữa. Người quản lý cũng có toàn quyền sử dụng một số quỹ này cho các nhu cầu cấp thiết của trường học, bao gồm cả giày đi học cho trẻ em.",
                    fileName: "Bidvest Food Invoice-WILD TOMORROW FUND HAMPERS 14.1.2021.pdf",
                    filePath: "https://daotao.dntu.edu.vn/Resource/Upload/file/a/29-BM-PDT.pdf",
                },
            ],
        },

    ]

    // Data bài viết từ API 
    const fakeDateArtical = [
        {
            id: 114,
            proj_id: 91,
            title: "Xe cứu thương này trông nhỏ nhưng bên trong có rất nhiều!",
            content: "<p>Gửi các nhà tài trợ, cảm ơn bạn rất nhiều vì những món quà hào phóng của bạn đối với...</p><p>Số tiền huy động được thông qua chiến dịch GiveTrack này sẽ vẫn RẤT có giá trị đối với chi phí vận hành. Xe cấp cứu sẽ đến Mombasa, trên bờ biển Kenya, trong hai hoặc ba tuần tới, và sau đó chúng tôi sẽ sử dụng một số tiền từ chiến dịch này để chuyển xe từ Mombasa đến bệnh viện Whisper ở Jinja, Uganda.</p>",
            createTime: "2021-08-10T00:00:00.000Z",
            createUser: "Huỳnh Thảo",
            filePath: "https://hadoantv.com/wp-content/uploads/2021/06/download-POLICE-SIMULATOR-PATROL-OFFICERS-hadoan-tv.jpg"
        },
        {
            id: 115,
            proj_id: 91,
            title: "Vẫn bị kẹt trong cổng!",
            content: "<p>Các nhà tài trợ thân mến, chúng tôi hy vọng sẽ có thêm tin tức cho bạn vào lúc này, nhưng thật đáng tiếc là hiện tại xe cấp cứu vẫn đang mắc kẹt ở Mombasa, cảng nơi nó được dỡ hàng, cách bệnh viện 650 dặm. Đại lý nhập khẩu cho biết nó có vấn đề về máy móc, đây là một điều bất ngờ đối với chúng tôi. Chúng tôi có thể sẽ cần cử ai đó đến Mombasa để phân loại nó.</p><p>Số tiền huy động được thông qua chiến dịch GiveTrack này sẽ vẫn RẤT có giá trị đối với chi phí vận hành. Xe cấp cứu sẽ đến Mombasa, trên bờ biển Kenya, trong hai hoặc ba tuần tới, và sau đó chúng tôi sẽ sử dụng một số tiền từ chiến dịch này để chuyển xe từ Mombasa đến bệnh viện Whisper ở Jinja, Uganda.</p>",
            createTime: "2021-10-12T00:00:00.000Z",
            createUser: "Huỳnh Thảo",
            filePath: "https://wp-mktg.prod.getty1.net/istockcontentredesign/wp-content/uploads/sites/5/bfi_thumb/2021_Composite_2304x1274_hero.jpg-37i4184kuwatssx9bxo96d6at0qnxmhzifjt0wa2iz0qmzinw.jpeg"
        },
        {
            id: 117,
            proj_id: 91,
            title: "Những gì chúng tôi hiện đang làm, không có xe cứu thương!",
            content: "<p>Một lần nữa, xin cảm ơn các bạn đã đóng góp cho buổi quyên góp xe cứu thương! </p> <p>Số tiền huy động được thông qua chiến dịch GiveTrack này sẽ vẫn RẤT có giá trị đối với chi phí vận hành. Xe cấp cứu sẽ đến Mombasa, trên bờ biển Kenya, trong hai hoặc ba tuần tới, và sau đó chúng tôi sẽ sử dụng một số tiền từ chiến dịch này để chuyển xe từ Mombasa đến bệnh viện Whisper ở Jinja, Uganda.</p>",
            createTime: "2021-11-10T00:00:00.000Z",
            createUser: "Huỳnh Thảo",
            filePath: "https://helpx.adobe.com/content/dam/help/en/photoshop/how-to/compositing/jcr%3Acontent/main-pars/image/compositing_1408x792.jpg"
        },
        {
            id: 119,
            proj_id: 91,
            title: "Xe cứu thương!",
            content: "<p>Một lần nữa, xin cảm ơn các bạn đã đóng góp cho buổi quyên góp xe cứu thương!</p><p>Số tiền huy động được thông qua chiến dịch GiveTrack này sẽ vẫn RẤT có giá trị đối với chi phí vận hành. Xe cấp cứu sẽ đến Mombasa, trên bờ biển Kenya, trong hai hoặc ba tuần tới, và sau đó chúng tôi sẽ sử dụng một số tiền từ chiến dịch này để chuyển xe từ Mombasa đến bệnh viện Whisper ở Jinja, Uganda.</p>",
            createTime: "2021-10-20T00:00:00.000Z",
            createUser: "Huỳnh Thảo",
            filePath: "https://hadoantv.com/wp-content/uploads/2021/06/download-POLICE-SIMULATOR-PATROL-OFFICERS-hadoan-tv.jpg"
        },
        {
            id: 121,
            proj_id: 91,
            title: "Đọc bản cập nhật cuối cùng của chúng tôi!",
            content: "<p>Xe cứu thương hiện đã kết thúc hành trình đường biển từ Dubai đến Mombasa, cảng chính của Kenya. Chúng tôi đang sắp xếp để ai đó thu thập nó và mang nó đến bệnh viện ở Uganda, vì vậy chúng tôi sẽ có thêm...</p><p>Số tiền huy động được thông qua chiến dịch GiveTrack này sẽ vẫn RẤT có giá trị đối với chi phí vận hành. Xe cấp cứu sẽ đến Mombasa, trên bờ biển Kenya, trong hai hoặc ba tuần tới, và sau đó chúng tôi sẽ sử dụng một số tiền từ chiến dịch này để chuyển xe từ Mombasa đến bệnh viện Whisper ở Jinja, Uganda.</p><p>Số tiền huy động được thông qua chiến dịch GiveTrack này sẽ vẫn RẤT có giá trị đối với chi phí vận hành. Xe cấp cứu sẽ đến Mombasa, trên bờ biển Kenya, trong hai hoặc ba tuần tới, và sau đó chúng tôi sẽ sử dụng một số tiền từ chiến dịch này để chuyển xe từ Mombasa đến bệnh viện Whisper ở Jinja, Uganda.</p>",
            createTime: "2022-01-20T00:00:00.000Z",
            createUser: "Huỳnh Thảo",
            filePath: "https://www.eye-image.nl/assets/files/eye-image-homepage.1920x0x0x100.jpg"
        },
    ]

    // Setting slider artical 
    const settingSliderArtical = {
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        adaptiveHeight: true,

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    }
    return (
        <>
            {/* Header dự án  */}

            <div className={clsx(Style.headerProject, 'py-3 p-md-5 ')}>

                <div className="container d-flex justify-content-between">
                    <div className="row">

                        <div className="col-12 col-lg-4">
                            <div className="row text-center">

                                <div className="col-12">
                                    <img className="img-fluid" src="https://i.ytimg.com/vi/tSWzwHea7x0/hqdefault.jpg" alt="project img" />
                                </div>
                                <div className=" col-12">
                                    {
                                        fakeDataProject.category.map((item, index) =>
                                            <span key={"project" + index} className="d-inline-block me-1 me-md-4 "><i className={clsx(Style.baseColor, 'mdi mdi-label-outline pe-1 pe-md-2')}></i>{item}</span>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className=" col-12 col-lg-7 offset-lg-1">
                            <div className={clsx(Style.baseColor, 'd-flex align-items-center my-3 my-lg-0')}>
                                <i className="mdi mdi-account-multiple-outline fs-1 me-3 pe-2 border-end"></i>
                                <div className="">
                                    <p className="mb-0">{fakeDataProject.userType}</p>
                                    <Link to={`/profile/${fakeDataProject.userCreateId}`} className={clsx(Style.baseColor, 'text-decoration-none')}>{fakeDataProject.userCreateName}</Link>
                                </div>
                            </div>

                            <h1>{fakeDataProject.projectName}</h1>
                            <SetInnerHTML text={fakeDataProject.shortDescription} />

                            <div className="ProgressBarContent my-3 my-lg-0">
                                <p className={clsx(Style.baseColor, 'mb-1')}>Tiến trình</p>
                                <ProgressBar striped now={progress} label={`${progress} %`} />
                                <span>{formatNumber(amountNowFormat)} / {formatNumber(amountNeedFormat)} VNĐ</span>
                            </div>
                            <div className="my-4 d-flex justify-content-between">

                                <div className="border-start px-3 d-flex flex-column">
                                    <span ><i className="mdi mdi-history pe-2"></i>Trạng thái</span>
                                    <span className={clsx(Style.baseColor, 'text-uppercase')}>{fakeDataProject.status}</span>
                                </div>
                                <Button className={clsx(Style.backgroundForeignColor, 'px-5 text-light border-0')}><i className='mdi mdi-heart-outline me-1'></i>Theo dõi</Button>
                            </div>
                            <Button className={clsx(Style.backgroundForeignColor, 'px-5 text-light border-0 w-100 fw-bold')}><i className='mdi mdi-currency-btc me-1'></i>Quyên góp</Button>

                        </div>

                    </div>
                </div>
            </div >

            {/* Thanh menu chi tiết dự án  */}
            <div className={clsx(Style.projectDetailMenu)} >
                <div className="container">
                    <div className="d-flex justify-content-around">
                        <a className={clsx(Style.projectDetailItem, 'd-block py-3  px-3 text-muted text-decoration-none')} href="#overview">Giới thiệu</a>
                        <a className={clsx(Style.projectDetailItem, 'd-block py-3  px-3 text-muted text-decoration-none')} href="#process">Tiến trình dự án</a>
                        <a className={clsx(Style.projectDetailItem, 'd-block py-3  px-3 text-muted text-decoration-none')} href="#artical">Cập nhật mới nhất</a>
                        <a className={clsx(Style.projectDetailItem, 'd-block py-3  px-3 text-muted text-decoration-none')} href="#donation">Người quyên góp</a>
                    </div>
                </div>
            </div >

            {/* Tổng quan dự án  */}
            <div id="overview" className="py-5 " >
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <h2>Giới thiệu về dự án</h2>
                            <div className={clsx(Style.line)}><hr /></div>
                            <div className='my-5' >
                                <h3 className={clsx(Style.baseColor, 'mb-4')}><i className='mdi mdi-format-page-break me-3'></i>Tổng quan</h3>
                                <SetInnerHTML text={fakeDataProject.summary} />
                            </div>
                            <div className='my-5'>
                                <h3 className={clsx(Style.baseColor, 'mb-4')}><i className='mdi mdi-alert-outline me-3'></i>Vấn đề cần giải quyết</h3>
                                <SetInnerHTML text={fakeDataProject.problemToAddress} />
                            </div>
                            <div className='my-5'>
                                <h3 className={clsx(Style.baseColor, 'mb-4')}><i className='mdi mdi-lightbulb-on-outline me-3'></i>Giải pháp</h3>
                                <SetInnerHTML text={fakeDataProject.solution} />
                            </div>
                        </div>
                        <div className="col-12 col-lg-5 offset-lg-1 ">

                            {/* Google map  */}
                            <Iframe url={urlLocation}
                                width="100%"
                                height="300px"
                                display="initial"
                                position="relative"
                                allow="fullscreen" />
                            <div className=' border p-4 bg-light'>
                                <h4 className='fs-6 lh-base'><i className='mdi mdi-map-marker-outline me-2'></i>{fakeDataProject.location}</h4>
                                <div className="row">

                                    <div className='col-12 col-lg-6 '>
                                        <div className="p-2">
                                            <p className='m-0 mt-3 fs-5'>Quản lý dự án</p>
                                            <p className='m-0 fw-light '>{fakeDataProject.userCreateName}</p>
                                            <p className='m-0 mt-3 fs-5'>Loại dự án</p>
                                            <ul className='m-0 fw-light '>{fakeDataProject.category.map((item, index) => (
                                                <li key={"caterogy" + index}>{item}</li>
                                            ))}</ul>
                                            <p className='m-0 mt-3 fs-5'>Đối tượng cần hỗ trợ</p>
                                            <p className='m-0 fw-light '>{fakeDataProject.impact}</p>
                                        </div>
                                    </div>
                                    <div className='col-12 col-lg-6'>
                                        <div className="p-2">
                                            <p className='m-0 mt-3 fs-5'>Ngày bắt đầu</p>
                                            <p className='m-0 fw-light '>{fakeDataProject.dateStart}</p>
                                            <p className='m-0 mt-3 fs-5'>Ngày kết thúc</p>
                                            <p className='m-0 fw-light '>{fakeDataProject.dateEnd}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Donate  */}
                            <div className="border mt-5 bg-white">
                                <h4 className={clsx(Style.backgroundBaseColor, 'p-4 text-center text-white')}><i className='mdi mdi-coin me-2'></i>Đóng góp</h4>
                                <p className="text-center mt-4 mb-1">Chọn loại tiền điện tử</p>
                                <button className={clsx(Style.coinBtn, 'mx-auto px-4 py-1 d-flex justify-content-between bg-white')}>
                                    <img src={trxCoin} alt="tiền điện tử" width="24" height="24" className="me-2" />
                                    <span className="fw-bold">Tron</span>
                                    {/* https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=vnd */}
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Tiến trình dự án  */}
            <div id="process" className={clsx(Style.process, 'py-5')} >
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <h2>Tiến trình dự án</h2>
                            <div className={clsx(Style.line)}><hr /></div>
                        </div>
                        <div className="col-12 col-lg-6 text-end border-end">
                            <p className={clsx(Style.baseColor, 'm-0 fs-5')}>Mục tiêu của chúng tôi</p>
                            <p className={clsx(Style.foreignColor, 'm-0')}>{formatNumber(amountNeedFormat)} VNĐ</p>
                        </div>
                    </div>

                    {/* Tab content  */}
                    <div id={clsx(Style.tabContent)} className="row ">
                        <div className="col-12">
                            <ul className="nav nav-pills my-5" id="pills-tab" role="tablist">
                                {
                                    fakeDataProcess.map((item, index) => (
                                        <li key={"nav-item" + index} className={clsx(Style.navItem, "d-flex align-items-center")} role="presentation">
                                            <button className={clsx("bg-transparent px-3 text-white border border-1 rounded-pill ", index === 0 ? "active" : "")} id={"pills-" + index + '-tab'} data-bs-toggle="pill" data-bs-target={"#pills-" + index} type="button" role="tab" aria-controls={"pills-" + index} aria-selected={index == 0 ? "true" : "false"}>T {index + 1}</button>
                                            {index < fakeDataProcess.length - 1 ? <div className={clsx(Style.tabLine)}></div> : ""}
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                {
                                    fakeDataProcess.map((item, index) => (
                                        <div key={"tab-content" + index} className={clsx("tab-pane fade", index === 0 ? "show active" : "")} id={"pills-" + index} role="tabpanel" aria-labelledby={"pills-" + index + "-tab"}>

                                            <div className={clsx(Style.baseColor, 'd-flex align-items-center my-5')}>
                                                <i className="mdi mdi-chart-donut fs-1 me-3 pe-3 border-end"></i>
                                                <div className="">
                                                    <p className="mb-0  text-uppercase">Trạng thái</p>
                                                    <p className={clsx(Style.foreignColor, 'm-0 fs-5 text-uppercase')}>{item.status}</p>
                                                </div>
                                            </div>

                                            <div className='my-5'>
                                                <h2 className={clsx(Style.baseColor, Style.title, 'fs-4 text-uppercase')}>{item.title}</h2>
                                                <SetInnerHTML text={item.shortDescription} />
                                            </div>

                                            <div className="row mt-5">
                                                <div className="col-12 col-lg-6">
                                                    <div className="mb-5">
                                                        <h3 className="fs-5 mb-4 text-uppercase">Chúng tôi đã làm gì ?</h3>
                                                        <SetInnerHTML text={item.content} />
                                                    </div>
                                                    <div className="mb-5">
                                                        <h3 className="fs-5 mb-4 text-uppercase">Hình ảnh</h3>
                                                        {

                                                            item.file.map((itemImage) => (
                                                                <span key={"image" + itemImage.id} className="p-3">
                                                                    <Zoom>
                                                                        <img src={itemImage.filePath} width="100px" height="100px" alt="" />
                                                                    </Zoom>
                                                                </span>
                                                            ))
                                                        }
                                                    </div>

                                                </div>
                                                <div className="col-12 col-lg-6">
                                                    <div className="">
                                                        <h3 className="fs-5 mb-4 text-uppercase">Chi phí</h3>
                                                        {/* Danh sách chi phí  */}
                                                        {
                                                            item.expenses.map((itemExpense) => (
                                                                <div key={"expense" + itemExpense.id} className={clsx(Style.expenseCard, 'p-2')}>
                                                                    <div className={clsx(Style.expenseHeader, Style.foreignColor, 'd-flex justify-content-between fs-5')}>
                                                                        <span className='text-uppercase m-0'>Tổng chi</span>
                                                                        <span className='text-uppercase m-0'>{formatNumber(Number(itemExpense.amount))} VNĐ</span>
                                                                    </div>
                                                                    <div className={clsx(Style.expenseBody, 'p-4 bg-white text-dark')}>
                                                                        <div className="expense-body-header d-flex justify-content-around flex-column flex-md-row">
                                                                            <span className="">
                                                                                <div className={clsx(Style.foreignColor, 'mb-2')}><i className="mdi mdi-calendar-check me-1"></i>Ngày</div>
                                                                                <div>{moment(itemExpense.expenseDate).format("DD/MM/YYYY")}</div>
                                                                            </span>
                                                                            <span className="">
                                                                                <div className={clsx(Style.foreignColor, 'mb-2')}><i className="mdi mdi-magnify me-1"></i>Loại</div>
                                                                                <div>{itemExpense.type}</div>
                                                                            </span>
                                                                            <span className="">
                                                                                <div className={clsx(Style.foreignColor, 'mb-2')}><i className="mdi mdi-coin me-1"></i>Số tiền</div>
                                                                                <div>{itemExpense.amount} vnd</div>
                                                                            </span>
                                                                            <span className="">
                                                                                <div className={clsx(Style.foreignColor)}><i className="mdi mdi-file-check me-1"></i>Hóa đơn</div>
                                                                                <div className="text-md-center">
                                                                                    <a href={itemExpense.filePath} download className={clsx(Style.foreignColor)}><i className="mdi mdi-briefcase-download fs-4"></i></a>
                                                                                </div>
                                                                            </span>
                                                                        </div>

                                                                        <div className="expense-body-desc my-5">
                                                                            <p className={clsx(Style.foreignColor, 'm-0 mb-2')}><i className="mdi mdi-eye-outline me-1"></i>Mô tả</p>
                                                                            <SetInnerHTML text={itemExpense.description} />
                                                                        </div>
                                                                        <div className="expense-body-transaction">
                                                                            <p className={clsx(Style.foreignColor, 'm-0')}><i className="mdi mdi-repeat me-1"></i>Lịch sử giao dịch</p>
                                                                            <a href={"https://tronscan.org/#/contract/" + fakeDataProject.addressContract} target="blank" className={clsx(Style.baseColor, 'text-decoration-none')}>Xem trên Blockchain</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Các bài viết của dự án  */}
            <div id="artical" className={clsx(Style.artical, 'py-5')}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Cập nhật mới nhất</h2>
                            <div className={clsx(Style.line)}><hr /></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 py-4">

                            <Slider {...settingSliderArtical}>
                                {
                                    fakeDateArtical.map((item, index) => (
                                        <div key={index} className={clsx(Style.articalDetail, " p-4 ")}>
                                            <div className={clsx(Style.articalDetailWrap, 'position-relative p-3 rounded-3 shadow')}>

                                                <div className={clsx(Style.header)}>
                                                    <img src={item.filePath} alt="hình ảnh bài viết" className="" />
                                                </div>

                                                <div className={clsx(Style.body, ' px-3 py-4')}>
                                                    <a href="./chi-tiet-bai-viet" className='text-decoration-none'>
                                                        <h4 className="fs-4 text-center text-uppercase">{item.title}</h4>
                                                    </a>
                                                    <div className="d-flex justify-content-between my-4">

                                                        <p className='m-0 fst-italic '><i className="mdi mdi-account-edit me-1"></i>{item.createUser}</p>
                                                        <p className='m-0 fst-italic'>{moment(item.createTime).format("DD/MM/YYYY")}<i className="mdi mdi-calendar-check ms-1"></i></p>
                                                    </div>
                                                    <div className={clsx(Style.bodyDesc)}>
                                                        <SetInnerHTML text={item.content} />
                                                    </div>
                                                </div>
                                                <div className={clsx(Style.footer)}>
                                                    <a href="./chi-tiet-bai-viet" className='text-decoration-none '>Xem chi tiết<i className="mdi mdi-arrow-right-bold-circle-outline ms-2"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectDetail;