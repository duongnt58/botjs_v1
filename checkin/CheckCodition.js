/* 
 * Đây là module kiểm tra các điều kiện của check in
 * Hàm CheckString() // Kiểm tra chuỗi nhập vào có đúng cú pháp không
 * Hàm CheckOneTimes()//Kiểm tra lần đầu check in trong ngày
 * Hàm CheckTimeNow()// Kiểm tra thời gian hiện tại so với thời gian quy định
 */
// Require hours limited và minutes limited
var hoursLimited = require('./SetHoursLimited');
var minutesLimited = require('./SetMinutesLimited');
var User = require('./User');
// Tạo 1 obj checkcondition

function CheckCondition(str, User, cTimes){//class
     //Các thuộc tính
     var hl = hoursLimited;
     var ml = minutesLimited;
     this.report = '';
     this.status = '';
     this.str = str;
     this.cTimes = cTimes;
     // Các phương thức
     this.checkString = function(){// Phương thức kiểm tra chuỗi nhập vào, đúng cú pháp thì trả về 1, sai trả về 0
            if(this.str === "check in")
                {
                    return 1;
                }
             else{
                 return 0;
             }
     };
     this.checkOneTimes = function(){// Phương thức kiểm tra giá trị time nhập vào nếu có giá trị false thì trả về 1 đúng trả về 0
         if(!this.cTimes){
             return 1;
         }
         else{
             return 0;
         }
     };
     this.checkTimeNow = function(){// Phương thức kiểm tra thời gian hiện tại so với thời gian quy định, nếu sớm hơn thì trả về 1 nếu muộn hơn thì trả về 0
         var today = new Date();
         var h = today.getHours();
         var m = today.getMinutes();
         var stt;
         if(h < hl){
             stt = 1;
         }
         else 
             if(h === hl){
               if(m <= ml){
                   stt = 1;
                }
               else{
                    stt = 0;
               }
             }
             else stt = 0;
          User.setUserCTimes(true);// Sau khi gọi phương thức checkTimeNow sẽ thay đổi giá trị thuộc tính userCTimes thành true
         return stt;
     };
     this.getStatus = function(){
         return this.status;
     };
     this.setStatus = function(stt){
         this.status = stt;
     };
     this.runCheck = function(){// Phương thức kiểm tra chính và đặt giá trị cho thuộc tính status cho đối tượng check condition
         if(!this.checkString()){
             this.status = "Bạn đã nhập sai cú pháp vui lòng nhập lại theo mẫu: check in";
         }
         else if(!this.checkOneTimes(this.cTimes)){
             this.status = "Bạn đã check in ngày hôm nay rồi vui lòng không check in tiếp";
         }
         else if(this.checkTimeNow()){
             this.status = "Bạn đã đến đúng giờ";
         }
         else{
             this.status = "Bạn đã đến muộn";
         }
         return this.status;
     };
    return this; 
};
// export
module.exports = CheckCondition;

