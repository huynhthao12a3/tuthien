import alertify from "alertifyjs";
import * as $ from "jquery"
import * as bootstrap from "bootstrap";
import {get } from "jquery";
import { getDate } from "rsuite/esm/utils/dateUtils";
import moment from 'moment';
/** Alert toast config */
const ROOT_URL = '/'
export const alert = {
    info: function(text) { $.toast({ text: text, position: 'bottom-right', icon: 'info', loader: false }) },
    warning: function(text) { $.toast({ text: text, position: 'bottom-right', icon: 'warning', loader: false }) },
    error: function(text) { $.toast({ text: text, position: 'bottom-right', icon: 'error', loader: false }) },
    success: function(text) { $.toast({ text: text, position: 'bottom-right', icon: 'success', loader: false }) }
}

try {
    /** Alertify set delay */
    alertify.set('notifier', 'delay', 3.5);

    /** Alertify config confirm */
    alertify.confirm().setting({
        'title': 'Thông báo',
        'labels': { ok: '<i class="mdi mdi-check mr-1"></i>Đồng ý', cancel: '<i class="mdi mdi-block-helper mr-1"></i>Bỏ qua' }
    });

    /** Alertify alert confirm */
    alertify.alert().setting({
        'title': 'Thông báo',
        'label': '<i class="mdi mdi-check mr-1"></i>Xác nhận'
    });
} catch (e) {

}

/** Fix size dropdown in table */
$('.table-responsive').on('show.bs.dropdown', function() {
    $('.table-responsive').css("overflow", "inherit");
});

/** Fix size dropdown in table */
$('.table-responsive').on('hide.bs.dropdown', function() {
    $('.table-responsive').css("overflow", "auto");
})

/** Delay */
var delay = (function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

/** Auto render empty template */
export function htmlEmptyTable(col = 10, title = 'Không tìm thấy dữ liệu') {
    if (title == '') { title = 'Không tìm thấy dữ liệu'; }
    return `<tr class="text-muted"><td colspan="${col}" class="text-center"><div class="text-center text-muted pt-4 pb-4"><p class="mb-0"><i class="mdi mdi-48px mdi-folder-open-outline"></i></p><p>${title}</p></div></td></tr>`
}

/** Auto render empty template */
export function htmlEmptyTableAuto(element, title = '') {
    let col = $(element).find('th').length;
    if (title == '') { title = 'Không tìm thấy dữ liệu'; }
    return `<tr class="text-muted"><td colspan="${col}" class="text-center"><div class="text-center text-muted pt-4 pb-4"><p class="mb-0"><i class="mdi mdi-48px mdi-folder-open-outline"></i></p><p>Không tìm thấy dữ liệu</p></div></td></tr>`
}

/** Auto render empty template for div */
export function getEmptyTemplateForDiv(title = '') {
    if (title == '') { title = 'Không tìm thấy dữ liệu'; }
    return `<div class="text-center m-auto text-muted pt-2 pb-2" id="empty-div"><p class="mb-0"><i class="mdi mdi-48px mdi-folder-open-outline"></i></p><p>${title}</p></div>`;
}

/** Init NProgress */
// window.addEventListener('DOMContentLoaded', () => {
//     try {
//         if (NProgress != undefined)
//             NProgress.configure({ showSpinner: true });
//         var oldXHR = window.XMLHttpRequest;
//         function newXHR() {
//             var realXHR = new oldXHR();
//             realXHR.addEventListener("readystatechange", function () {
//                 if (realXHR.readyState == 1) {
//                     NProgress.start();
//                 }
//                 if (realXHR.readyState == 4) {
//                     NProgress.done();
//                     try {
//                         let res = JSON.parse(realXHR.response);
//                         if (!res.IsSuccess) {
//                             msg.error(res.Message);
//                         }
//                     } catch { }
//                 }
//             }, false);
//             return realXHR;
//         }
//         window.XMLHttpRequest = newXHR;
//     } catch (e) {

//     }
// });

/** Get parameter from url */
export function getUrlParam(param) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === param) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

/** Short file name */
export function shortFileName(name, length) {
    if (name.length > length) {
        name = name.substring(0, length) + '...' + name.substring(name.length - 4, name.length);
    }
    return name;
}

/** Param default */
const DEFAULT_AVATAR = '/images/default/default-avatar.jpg';
const DEFAULT_IMAGE = '/images/default/default-image.png';

/** Param config for date, time picker */
const OPTION_DATE_PICKER = { autoclose: true, format: 'dd/mm/yyyy', language: 'vn' };
const OPTION_TIME_PICKER = { showSeconds: 0, icons: { up: "mdi mdi-chevron-up", down: "mdi mdi-chevron-down" } };

/** Param config for plupload */
const IMAGE_UPLOAD_EXTENSION = 'jpg,png,jpeg';
const EXCEL_UPLOAD_EXTENSION = 'xls,xlsx';
const WORD_UPLOAD_EXTENSION = 'pdf,doc,docx';
const FILE_UPLOAD_MAX_SIZE = '3mb';

/** Param config for QrCode */
const QRCODE_TYPE = 'image';
const QRCODE_EXPORT_SIZE = 500;

/** Param default render template photosipe */
let DEFAULT_HTML_TEMPLATE_PHOTO_SWIPE = `
    <div id="div-gallery">
        <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="pswp__bg"></div>
            <div class="pswp__scroll-wrap">
                <div class="pswp__container">
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                </div>
                <div class="pswp__ui pswp__ui--hidden">
                    <div class="pswp__top-bar">
                        <div class="pswp__counter"></div>
                        <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                        <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                        <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                        <div class="pswp__preloader">
                            <div class="pswp__preloader__icn">
                                <div class="pswp__preloader__cut">
                                    <div class="pswp__preloader__donut"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                        <div class="pswp__share-tooltip"></div>
                    </div>
                    <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
                    <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
                    <div class="pswp__caption">
                        <div class="pswp__caption__center"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

/** Check valid lat-lng */
// function isLatLng(lat, lng) {
//     if ((lat != '' && lng != '')) {
//         lat = parseInt(lat), lng = parseInt(lng);
//         if (lat < -90 || lat > 90) {
//             return false;
//         } else if (lng < -180 || lng > 180) {
//             return false;
//         } else {
//             return true;
//         }
//     } else {
//         return false;
//     }
// }

var _RIGHT = '';
/** Check system right */
export function isAuthorized(right_id) {
    if (_RIGHT == '') {
        let str_right = document.getElementById('sys-right').getAttribute('data-right');
        _RIGHT = str_right.split(' ');
    }
    let right_id_arr = right_id.split(' ');
    return _RIGHT.some(function(_r) {
        return right_id_arr.some(function(r) {
            return r === _r;
        });
    });
}

/** Check valid email */
export function isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/** Check valid username */
export function isUsername(username) {
    var nameRegex = /^[a-zA-Z0-9]+$/;
    return nameRegex.test(username);
}
/** Check valid url */
export function isValidFriendlyUrl(str) {
    return !/[@~`!#$%\^&*+=\\[\]\\';,/{}|\\":<>\?]/g.test(str);
}
/** Check phone number */
export function isPhoneNumber(phone) {
    if (IsNullOrEmpty(phone)) return false;
    phone = phone.replace('(+84)', '0');
    phone = phone.replace('+84', '0');
    phone = phone.replace(/ /g, '');
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    return vnf_regex.test(phone);

}

/** Disable double click action not include with:
 * [data-toggle="dropdown"]: Button dropdown
 * [data-dismiss="modal"]: Button close modal
 * type="submit": Button submit
 * .right-bar-toggle: Button open rightbar
 * .undisable-click: Has class undisable-click
 * .ajs-button: Button for alertify
 * .applyBtn, .cancelBtn: Button for datepicker
 * .navbar-toggler: Button dropdown menu mobile
 */
$('button').not('[data-toggle="dropdown"], [data-toggle="tooltip"], [data-dismiss="modal"], [type="submit"], .right-bar-toggle, .undisable-click, .ajs-button, .applyBtn, .cancelBtn, .navbar-toggler').on('click', function() {
    let $this = $(this);
    $this.find('.mdi').addClass('d-none');
    $this.prepend('<i class="mdi mdi-spin mdi-loading mr-1"></i>');
    $this.attr('disabled', true);
    delay(function() {
        $this.find('.mdi-spin').remove();
        $this.find('.mdi').removeClass('d-none');
        $this.removeAttr('disabled');
    }, 500);
})

/** Function convert time to time ago */
export function parseTimeAgo(dateString) {
    let date = moment(dateString, 'DD/MM/YYYY HH:mm').toDate();
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " năm trước";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " tháng trước";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " ngày trước";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " giờ trước";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " phút trước";
    }
    return Math.floor(seconds) + " giây trước";
}

/** Init event open table export 
 * selector: element table
 * type: type export (csv, txt, json, xml, sql, xlsx, doc, png, pdf)
 */
export function openTableExport(selector, type, fileName) {
    var options = { outputImages: true };
    $.extend(true, options, { type: type, fileName: fileName });
    $(selector).tableExport(options);
}

/** Init carousel 
 *  items: Item show,
 *  autoPlay: Second auto play,
 */
export function initCarousel(element, item, autoPlay) {
    var $element = $(element);
    if ($element.length > 0) {
        $element.owlCarousel({
            items: item,
            lazyLoad: true,
            pagination: false,
            autoPlay: autoPlay,
            navigation: true,
            navigationText: ['<i class="arrow-me left"></i>', '<i class="arrow-me right"></i>'],
            stopOnHover: true
        });
    }
}

/**
 * Init carousel Product
 * items: Item show,
 * autoPlay: Second auto play,
 */
export function initCarouselProduct(element, item, autoPlay) {
    var $element = $(element);
    if ($element.length > 0) {
        $element.owlCarousel({
            autoWidth: true,
            itemsDesktop: [1000, 5], // 2 items between 1000px and 901px
            itemsDesktopSmall: [900, 4], // betweem 900px and 601px
            itemsTablet: [700, 3], // 2 items between 600 and 480
            itemsMobile: [479, 2], // 1 item between 479 and 0
            navigation: true,
            lazyLoad: true,
            items: 5,
            pagination: false,
            autoPlay: autoPlay,
            navigationText: ["<i class='arrow-me left'></i>", '<i class="arrow-me right"></i>'],
            stopOnHover: true,
            responsive: true,
        });
    }
}

/** Print this */
export function printThis(element, callback = null) {
    $(element).printThis({
        afterPrint: function(e) { callback(e); }
    });
}

export function getEmptyOrDefault(text) {
    if (!!text)
        return text;
    else return "";
}

/*show modal
 * Element: btn thực hiện action
 action : sự kiện khi bấm btn đồng ý trong modal
 */
export function showModal(modal, element = null, action = null) {
    window.$(modal).modal('show');
    if (action != null && action != undefined) {

        $(element).unbind().on('click', action);
    }
}

/*hide modal*/
export function hideModal(modal) {
    $(modal).modal('hide');
}

/*Show đk hình cần root url, sau khi release thì ko cẩn ROOT_URL*/
export function getImagePath(path) {
    return ROOT_URL + path;
}

/*check string is null or empty*/
export function IsNullOrEmpty(text) {
    if (text == undefined || text == null || text == '' || text == NaN) return true;
    if ($(text) == '') return true;
    return false;
}

/*file to object*/ // lấy name và value của input
export function formToObject(nameForm) {
    let obj = {};
    let a = $(nameForm).serializeArray();
    $.each(a, function(index, item) {
        obj[item.name] = item.value;
    });
    return obj;
}

/*Format money*/
export function formatMoney(money) {
    if (money == undefined) return 0;
    return money.toLocaleString('en-AU').replace(/,/g, ',') + 'đ';
}

/*array string to array int ; vì select 2 mutible return array string but sever get list<int>*/
export function stringToInt(ar) {
    let arrInt = [];
    for (var i = 0; i < ar.length; i++) {
        arrInt.push(parseInt(ar[i]));
    }
    return arrInt;
}

/** Ajax post function */
export function ajaxPost(url, data, successCallback, errorCallback = undefined) {

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'POST',
        url: url,
        data: JSON.stringify(data),
        dataType: 'json',
        success: successCallback,
        error: errorCallback
    });
}

/** Ajax get function */
export async function ajaxGet(url, data, successCallback, errorCallback, isAsync = true) {
    try {
        await $.ajax({
            type: "GET",
            url: url,
            data: data,
            dataType: "json",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: successCallback,
            error: errorCallback,
            async: isAsync
        });
    } catch (e) {}
}

/** Ajax post function */
export async function ajaxPut(url, data, successCallback, errorCallback) {
    await $.ajax({
        type: "PUT",
        url: url,
        data: JSON.stringify(data),
        dataType: "json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: successCallback,
        error: function(e) {
            alertify.error(e);
            errorCallback();

        }
    });
}

/** Ajax get function */
export async function ajaxDelete(url, successCallback, errorCallback, isAsync = false) {
    await $.ajax({
        type: "DELETE",
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: successCallback,
        error: errorCallback,
        async: isAsync
    });
}
/*Make url friendly*/
export function MakeUrl(str) {
    var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ", "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ"
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
        if (AccentsMap[i] == ' ' && AccentsMap[i + 1] == ' ') {
            AccentsMap[i + 1] = '';
            i = i - 1;
        }
    }
    str = str.replace(/ +(?= )/g, '');
    str = str.replace(/[.,;:'"!@#$%^&*()+_=?|\/`~<>]/g, '');
    str = str.replace(/ /g, '-');
    str = str.replace(/--/g, '-');
    return str.toLowerCase();
}
export function changeday(str) {
    str = str.replace(/-/g, '/');
    return str
}
let sumItemdate = ''
let date = ''
export function SumDate(date) {
    sumItemdate = date.slice(0, date.indexOf('/'))
    sumItemdate = Number(sumItemdate) + Number(date.slice(date.indexOf('/') + 1, date.lastIndexOf('/'))) * 30
    sumItemdate = Number(sumItemdate) + Number(date.slice(date.lastIndexOf('/') + 1, )) * 365
    return sumItemdate
}
export function changerangedate(str) {
    let myStr = str
    str = str.slice(str.indexOf('/') + 1, str.indexOf('/') + 3)
    str = (str / 2) ? str.slice(0, 1) : ('0' + str.slice(0, 1))
    myStr = myStr.slice(0, myStr.indexOf('/') + 1) + str + myStr.slice(myStr.lastIndexOf('/'))
    return myStr
}
export function getTowDayAgo(str) {
    str = str.slice(0, str.indexOf('/')) - 2 + str.slice(str.indexOf('/'))
    return str
}
export function getDay(str) {
    str = str.slice(0, str.indexOf('/'))
    return str
}
export function getMonth(str) {
    str = str.slice(str.indexOf('/') + 1)
    str = str.slice(0, str.indexOf('/'))
    return str
}
// ẩn hiện element
export function showLoading() {
    $('#preloader').fadeIn(300);
}
export function hideLoading() {
    $('#preloader').fadeOut(500);
}
export function toggleLoading() {
    $('#preloader').fadeToggle(300);
}
/** Get start-date and end-date in daterangepicker */
export function getDateRangeValue(element) {
    let string = $(element).val();
    let arr = string.split(' - ');
    return {
        startDate: arr[0],
        endDate: arr[1]
    }
}
$('#ipt-date-search').val("")



export function removeUnicode(str) {
    var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ",
        "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ"
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g'); // []
        var char = AccentsMap[i][0]; // a
        str = str.replace(re, char);
        if (AccentsMap[i] == ' ' && AccentsMap[i + 1] == ' ') {
            AccentsMap[i + 1] = '';
            i = i - 1;
        }
    }
    return str.toLowerCase();
}