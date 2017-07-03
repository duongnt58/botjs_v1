/* Mô tả
 * Module tính thời gian đi muộn tính bằng giây
 * Moddul này đã được chuyển vào phương thức getTimeLate() trong đối tượng user
 */

function timeLate(){
    var hl = require('./SetHoursLimited');
    var ml = require('./SetMinutesLimited');
    var tl; //Thời gian đến muộn
    var d = new Date();// Khởi tạo thời gian hiện tại
    var h = d.getHours();// Lấy giờ hiện tại
    var m = d.getMinutes();// Lấy phút hiện tại
    if (h > hl){
        tl = ( h - hl ) * 60 + m;
    }
    else{
        tl = m - ml;
    }
    return tl * 60;
}
module.export = timeLate();
console.log(timeLate());
