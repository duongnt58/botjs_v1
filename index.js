//Khởi tạo bot chat
/*var Botkit = require('botkit')

var controller = Botkit.slackbot({
debug: true
})

controller.spawn({
token: 'your api token',
}).startRTM()*/
var Botkit = require('botkit')
  //var Checkin = require('./checkin');
var models = require("./connectdb/models");
var env = require('dotenv').load();
var controller = Botkit.slackbot({
    debug: true,

  })
  // Khởi động RTM
controller.spawn({
    token: 'xoxb-154858334515-C7qH8QAYyXTPM9XUPZVC52wz',
  }).startRTM()
  //Các hàm truy vấn
controller.hears(
  ['xin chào', 'chào bạn', 'chào bot', 'chào Bot'], ['direct_message', 'direct_mention', 'mention'],
  function(bot, message) {
    controller.storage.users.get(message.user, function(err, user) {
      if (user && user.name) {
        bot.reply(message, 'chào ' + user.name + '!')
      } else {
        bot.reply(message, 'chào!')
      }
    })
  })

controller.hears(
  ['tên bạn là gì?', 'tên gì', 'tên gọi là gì'], ['direct_message', 'direct_mention', 'mention'],
  function(bot, message) {
    bot.reply(message, 'tôi là <@' + bot.identity.name + '>, còn bạn?')
  })

controller.hears(
  ['bạn có thể gọi tôi là (.*)', 'tôi là (.*)', 'tên tôi là (.*)'], ['direct_message', 'direct_mention', 'mention'],
  function(bot, message) {
    var name = message.match[1]
    controller.storage.users.get(message.user, function(err, user) {
      if (!user) {
        user = {
          id: message.user,
        }
      }
      user.name = name
      controller.storage.users.save(user, function(err, id) {
        bot.reply(message, 'ờ, từ giờ tôi sẽ gọi bạn là ' + user.name)
      })
    })
  })

controller.hears(
  ['bạn biết tên tôi chưa?'], ['direct_message', 'direct_mention', 'mention'],
  function(bot, message) {
    controller.storage.users.get(message.user, function(err, user) {
      if (user && user.name) {
        bot.reply(message, 'bạn là ' + user.name + ' chứ gì =))')
      } else {
        bot.reply(message, 'tôi không biết bạn')
      }
    })
  })
controller.hears(
    ['mấy giờ rồi'], ['direct_message', 'direct_mention', 'mention'],
    function(bot, message) {
      var h = new Date();
      controller.storage.users.get(message.user, function() {
        bot.reply(message, 'bây giờ là' + h.getHours() + 'giờ' + h.getMinutes() + 'phút')
      })
    }
  )
  // Demo checkin
controller.hears(
    ['checkin'], ['direct_message', 'direct_mention', 'mention'],
    function(bot, message) {
      var h = new Date();
      var tmph = h.getHours();
      var tmpm = h.getMinutes();
      var mess = '';
      if (tmph < 8) {
        mess = 'Chúc mừng bạn đã đến sớm';
      } else
      if (tmph == 8 && tmpm <= 30) {
        mess = 'Chúc mừng bạn đã đến đúng giờ';
      } else
      if (tmph == 8 && tmpm > 30) {
        mess = 'Bạn đã đến muộn';
      } else
        mess = 'Bạn đã đến muộn';

      controller.storage.users.get(message.user, function() {
        bot.reply(message, mess)
      })

    }
  )
  // module kết nối
controller.hears(
    ['check'], ['direct_message', 'direct_mention', 'mention'],
    function(bot, message) {
      let h = message.user;
      // console.log(h);
      controller.storage.users.get(message.user, function() {
        bot.reply(message, h)
      })
    }
  )
  // train module ket noi
controller.hears(
    ['connect'], ['direct_message', 'direct_mention', 'mention'],
    function(bot, message) {
      var User = require('./checkin/User');
      var CheckCondition = require('./checkin/CheckCodition');
      var CheckTimes = require('./checkin/CheckTimes');
      var timelate = require('./checkin/TimeLate');
      var timeLate = require('./checkin/TimeLate');

      let name = "Nguyễn Văn A";
      let id = "01";
      let slackId = message.user;
      let role = false;
      let groupId = "001";
      let str = "check in";
      let tlate;
      let member = new User(name, id, slackId, groupId, role);
      let cTimes = new CheckTimes(member.getUserId()); // Tạo đối tượng CheckTimes cho người dùng với biến id tương ứng
      member.setUserCTimes(cTimes.getCTimes()); // Đặt giá trị cho thuộc tính CTime trong đối tượng user
      var checkC = new CheckCondition(str, member, member.getUserCTimes()); // Tạo đối tượng checkC đối với id tương ứng
      console.log(checkC.runCheck());
      console.log(checkC.getStatus());
      tlate = member.getTimeLate();
      cTimes.resetCTimes(tlate);
      let mess = member.getSlackId(); // Biến trả về thông điêp
      let mess2 = checkC.getStatus();
      console.log('UserId: ' + slackId);
      console.log('Get Status: ' + checkC.getStatus());
      controller.storage.users.get(message.user, function() {
        bot.reply(message, mess2)
      })
    }
  )
  // train connect to mysql

controller.hears(
  ['mysql'], ['direct_message', 'direct_mention', 'mention'],
  function(bot, message) {
    let slackid = message.user;
    models.user.find({
      where: {
        id_slack: slackid
      }
    }).then(function(userr) {
      if (!userr) {
        controller.storage.users.get(message.user, function() {
          bot.reply(message, "Không tìm thấy trong csdl")
        })
      } else {
        controller.storage.users.get(message.user, function() {
          bot.reply(message, userr.dataValues.lastname);
        })
      }
    });
  }
)