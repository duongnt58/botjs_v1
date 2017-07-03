// Hàm chức năng
// ==========> Hàm kiểm tra sinh nhật
var checkBirthday = function(userBirthday) {
		let dat = new Date();
		let d = dat.getDate();
		let birthday = userBirthday.slice(5);
		if (d < 10) { // Chuyển ngày sang kiểu string
			d = '0' + d.toString();
		} else {
			d = d.toString();
		}
		let m = dat.getMonth() + 1;
		if (m < 10) { // Chuyển tháng sang kiểu string
			m = '0' + m.toString();
		} else {
			m = m.toString();
		}
		let dateString = m + '-' + d;
		return birthday === dateString
	}
	//===========> Hàm kiểm tra ngày lễ phụ nữ
var checkWomenDay = function(sex) {
		if (sex === 'female') { // kiểm tra giới tính
			let date = new Date();
			let d = date.getDate();
			let m = date.getMonth() + 1;
			if ((d === 8) && (m === 3) || (d === 20) && (m === 10)) {
				return true;
			}
		} else {
			return false;
		}
	}
	//===========> Hàm kiểm tra ngày đàn ông
var checkMenDay = function(sex) {
		if (sex === 'male') { // kiểm tra giới tính
			let date = new Date();
			let d = date.getDate();
			let m = date.getMonth() + 1;
			if ((d === 29) && (m === 2)) {
				return true;
			}
		} else {
			return false;
		}
	}
	//Khởi tạo bot chat

var Botkit = require('botkit')
var models = require("./connectdb/models");
var env = require('dotenv').load();
var querydb = require('./connectdb/querydb');
var controller = Botkit.slackbot({
		debug: true,

	})
	// Khởi động RTM
controller.spawn({
		token: 'xoxb-154858334515-C7qH8QAYyXTPM9XUPZVC52wz', // =========> Nhập token botchat vào đây
	}).startRTM()
	// ==========>>   Các hàm truy vấn
controller.hears( // Hàm checkin ================>>>>>>>>>>>>>>>>>>>>
	['checkin'], ['direct_message', 'direct_mention', 'mention'],
	function(bot, message) {
		let slackid = message.user;
		let date = new Date();
		let tmph = date.getHours();
		let tmpm = date.getMinutes();
		let mess = '';
		let stt = 0;
		querydb.getUserByIdSlack(slackid).then(userr => {
			if (!userr) { // Kiểm tra thành viên trong csdl
				controller.storage.users.get(message.user, function() {
					bot.reply(message, "Không tìm thấy thành viên trong csdl")
				})
			} else {
				if (userr.last_checkin === date.getDate()) { // Kiểm tra checkin trong ngày
					controller.storage.users.get(message.user, function() {
						bot.reply(message, 'Chào ' + userr.lastName + ', hôm nay bạn đã checkin rồi vui lòng không checkin nữa.\nCảm ơn.')
					})
				} else {
					if (tmph < 8) {
						mess = 'Chào ' + userr.lastName + ', chúc bạn một ngày làm việc vui vẻ.\n:sun_with_face::sun_with_face::sun_with_face:';
						stt = 1;
					} else {
						if (tmph == 8 && tmpm <= 30) {
							mess = 'Chào ' + userr.lastName + ', chúc bạn một ngày làm việc tốt lành.\n:sunny::sunny::sunny:';
							stt = 1;
						} else {
							if (tmph == 8 && tmpm > 30) {
								mess = 'Chào ' + userr.lastName + ', hôm nay bạn đã đến muộn.';
								stt = 2;
							} else {
								mess = 'Chào ' + userr.lastName + ', hôm nay bạn đã đến muộn.';
								stt = 2;
							}
						}
					}

					if (stt === 1) {
						//cập nhập trường last_ checkin
						querydb.updateLastCheckin(models.user, userr.id);
						if (checkBirthday(userr.birthDay)) {
							mess = mess + '\nChúc mừng sinh nhật ' + userr.lastName + ':birthday::birthday::birthday:'
						} else {
							if (checkWomenDay(userr.sex)) { // Kiểm tra ngày phụ nữ
								mess = mess + '\nChúc bạn có một ngày ' + date.getDate() + ' - ' + (date.getMonth() + 1) + ' thật vui vẻ và hạnh phúc.\n:rose::rose::rose::rose::rose:';
							} else {
								if (checkMenDay(userr.sex)) { // Kiểm tra ngày đàn ông
									mess = mess + '\nChúc bạn có một ngày quốc tế Đàn Ông thật vui vẻ \n :beers::beers::beers::beers::beers:';
								}
							}
						}
						controller.storage.users.get(message.user, function() {
							bot.reply(message, mess)
						});
					}
					if (stt === 2) {
						//Cập nhập trường last_checkin và thêm dữ liệu vào database
						querydb.updateLastCheckin(models.user, userr.id); // cập nhật trường lastcheckin
						querydb.insertUserLate(models.date, userr.id, userr.firstName, userr.lastName);
						if (checkBirthday(userr.birthDay)) {
							mess = '';
							mess = 'Chúc mừng sinh nhật ' + userr.lastName + ' :birthday::birthday::birthday: \n Chúc bạn có một ngày làm việc tốt lành \n :rose::rose::rose::rose::rose:';
						} else {
							if (checkBirthday(userr.birthDay)) {
								mess = '\nChúc mừng sinh nhật ' + userr.lastName + ':birthday::birthday::birthday:'
							} else {
								if (checkWomenDay(userr.sex)) { // Kiểm tra ngày phụ nữ
									mess = 'Chúc bạn có một ngày ' + date.getDate() + ' - ' + (date.getMonth() + 1) + ' thật vui vẻ và hạnh phúc.\n:rose::rose::rose::rose::rose:';
								} else {
									if (checkMenDay(userr.sex)) { // Kiểm tra ngày đàn ông
										mess = 'Chúc bạn có một ngày quốc tế Đàn Ông thật vui vẻ \n :beers::beers::beers::beers::beers:';
									}
								}
							}
						}
						controller.storage.users.get(message.user, function() {
							bot.reply(message, mess)
						});

					}
				}
			}
		})

	})

controller.hears( // Hàm checkout =================>>>>>>>>>>
	['checkout'], ['direct_message', 'direct_mention', 'mention'],
	function(bot, message) {
		controller.storage.users.get(message.user, function(err, user) {
			let slackid = message.user;
			let date = new Date();
			let mess = '';
			querydb.getUserByIdSlack(slackid).then(userr => {
				if (userr.last_checkout === date.getDate()) { // ========> Kiểm tra checkout trong ngày
					controller.storage.users.get(message.user, function() {
						bot.reply(message, 'Chào ' + userr.lastName + ', hôm nay bạn đã checkout rồi vui lòng không tiếp tục checkout nữa.\nCảm ơn.')
					})
				} else {
					if (!userr) {
						controller.storage.users.get(message.user, function() {
							bot.reply(message, "Không tìm thấy thành viên trong csdl")
						})
					} else {
						if (date.getDay() == 5) {
							mess = 'Tạm biệt ' + userr.lastName + ', chúc bạn có một cuối tuần vui vẻ.:popcorn::popcorn::popcorn:\nHẹn gặp lại bạn vào tuần sau.';
							querydb.insertCheckout(models.timecheckout, userr.id, userr.firstName, userr.lastName);
							controller.storage.users.get(message.user, function() {
								bot.reply(message, mess)
							});

						} else {
							mess = 'Tạm biệt ' + userr.lastName + '.\nHẹn gặp lại vào ngày mai.:four_leaf_clover::four_leaf_clover::four_leaf_clover:';
							querydb.insertCheckout(models.timecheckout, userr.id, userr.firstName, userr.lastName);
							controller.storage.users.get(message.user, function() {
								bot.reply(message, mess)
							});
						}
					}
				}
			})
		})
	})

controller.hears(
		['my id'], ['direct_message', 'direct_mention', 'mention'],
		function(bot, message) {
			controller.storage.users.get(message.user, function() {
				bot.reply(message, message.user)
			})
		}
	)
	//====================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
controller.on('ambient', function(bot, message) {

	// do something...

	// then respond with a message object
	//
	bot.reply(message, {
		text: "A more complex response",
		username: "ReplyBot",
		icon_emoji: ":dash:",
	});

})

//Using attachments
controller.hears('another_keyword', 'direct_message,direct_mention', function(bot, message) {
	var reply_with_attachments = {
		'username': 'My bot',
		'text': 'This is a pre-text',
		'attachments': [{
			'fallback': 'To be useful, I need you to invite me in a channel.',
			'title': 'How can I help you?',
			'text': 'To be useful, I need you to invite me in a channel ',
			'color': '#7CD197'
		}],
		'icon_url': 'http://lorempixel.com/48/48'
	}

	bot.reply(message, reply_with_attachments);
});
controller.on('channel_joined', function(bot, message) {

	// message contains data sent by slack
	// in this case:
	// https://api.slack.com/events/channel_joined
	bot.reply(message, {
		text: "A more complex response",
		username: "ReplyBot",
		icon_emoji: ":dash:",
	});
});

controller.hears(
	['test'], ['direct_message', 'direct_mention', 'mention'],
	function(bot, message) {
		controller.storage.users.get(message.user, function() {
			bot.reply(message, "ok");
			var bott = controller.spawn({
				incoming_webhook: {
					url: "https://hooks.slack.com/services/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"
				}
			})

			bott.sendWebhook({
				text: 'This is an incoming webhook',
				channel: '#test',
			}, function(err, res) {
				if (err) {
					// ...
				}
			});
		})
	}
)

//==========================================

// receive an interactive message, and reply with a message that will replace the original
controller.on('interactive_message_callback', function(bot, message) {

    // check message.actions and message.callback_id to see what action to take...

    bot.replyInteractive(message, {
        text: '...',
        attachments: [
            {
                title: 'My buttons',
                callback_id: '123',
                attachment_type: 'default',
                actions: [
                    {
                        "name":"yes",
                        "text": "Yes!",
                        "value": "yes",
                        "type": "button",
                    },
                    {
                       "text": "No!",
                        "name": "no",
                        "value": "delete",
                        "style": "danger",
                        "type": "button",
                        "confirm": {
                          "title": "Are you sure?",
                          "text": "This will do something!",
                          "ok_text": "Yes",
                          "dismiss_text": "No"
                        }
                    }
                ]
            }
        ]
    });

});