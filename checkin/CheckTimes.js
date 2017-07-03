/* 
 * Module Check Time
 * Khởi tạo Object CheckTime
 * Có các thuộc tính là cTime, useId
 * Có phương thức khởi tạo mặc định:
 * * Khởi tạo thuộc tính time có giá trị mặc định là false
 * * Khởi tạo thuộc tính useId có giá trị mặc định là NULL
 * Có các phương thức là resetTime, setUseId, getCTime, getUseId
 * *restTime() reset thuộc tính cTime về giá trị mặc định sau 24 giờ người dùng checkin
 * *setUseId đặt giá trị cho thuộc tính useId
 * *getCtime lấy giá trị thuộc tính cTime
 * *getUseId lấy giá trị thuộc tính useId
 * *** Module sẽ export đối tượng CheckTime
 */

//class CheckTime
function CheckTimes(userId){// class
    //Các thuộc tính
    this.cTimes = false;
    this.useId = userId;
    //Các phương thức
    this.setUseId = function(userId){
        this.userId = userId;
    };
    this.getUseId = function(){
        return this.userId;
    };
    this.getCTimes = function(){
        return this.cTimes;
    };
    this.resetCTimes = function(x){
        setTimeout(function(){return this.cTimes = false;},86400-x);
    };
    return this;
}
// Export
module.exports = CheckTimes;