/* MÔ TẢ
 * Đây là class khởi tạo các thuộc tính, phương thức của lớp nhân viên, gồm có
 * Tên, id, id slack,id group,vai trò, trạng thái(times)
 * userName: tên thành viên
 * userId: id thành viên (get từ csdl)
 * slackId: id của thành viên trên slack
 * userTimes: tình trạng check in ngày hôm nay nếu đã check in rồi là true chưa là false
 * groupId: id của group
 * role: vai trò của thành viên trong group, là trưởng bộ phận hay nhân viên, nếu
 * là trưởng bộ phận thì giá trị là true, nếu là nhân viên giá trị sẽ là false
 * Các phương thức: setUserName, getUserName, setUserId, getUserId, setSlackId,
 * getSlackId, getUserTime, setGroupId, getGroupId, getRole, ....
 */

function User(name, userid, slackid, groupid, role){//class
    // Các thuộc tính
    this.userName = name;
    this.userId = userid;
    this.slackId = slackid;
    this.userCTimes = '';
    this.groupId =groupid;
    this.role = role;
    // Các phương thức
    this.setUserName = function(name){// Phương thức set name
        this.userName = name;
    };
    this.getUserName = function(){// Phương thức get name
        return this.userName;
    };
    this.setUserId = function(id){// Phương thức set id
        this.userId = id;
    };
    this.getUserId = function(){// Phương thức get Id
        return this.userId;
    };
    this.setSlackId = function(slackid){// Phương thức set slack id
        this.SlackId = slackId;
    };
    this.getSlackId = function(){// Phương thức get slack id
        return this.slackId;
    };
    this.getUserTimes = function(){// Phương thức get user times
        return this.userCTimes;
    };
    this.setRole = function(role){// Phương thức set role
        this.role = role;
    };
    this.getRole = function(){// Phương thức get role
        return this.role;
    };
    this.setUserCTimes = function(userTimes){ // Phương thức set userTimes
        this.userCTimes = userTimes;
    };
    this.getUserCTimes = function(){ // Phương thức get userTimes
        return this.userCTimes;
    };
    this.getTimeLate = function(){
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
    };
    return this;
}
// module export
module.exports = User;
