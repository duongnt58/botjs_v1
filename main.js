controller.hears(
  ['xin chào', 'chào bạn', 'chào bot', 'chào Bot'],
  ['direct_message', 'direct_mention', 'mention'],
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
  ['tên bạn là gì?', 'tên gì', 'tên'],
  ['direct_message', 'direct_mention', 'mention'],
  function(bot, message) {
    bot.reply(message, 'tôi là <@' + bot.identity.name +'>, còn bạn?')
})

controller.hears(
  ['bạn có thể gọi tôi là (.*)', 'tôi là (.*)', 'tên tôi là (.*)'],
  ['direct_message', 'direct_mention', 'mention'],
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
  ['bạn biết tôi là ai rồi chứ?'],
  ['direct_message', 'direct_mention', 'mention'],
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
	['mấy giờ rồi'],
	['direct_message', 'direct_mention', 'mention'],
	function(bot, message) {
		var h = new Date();
		controller.storage.users.get(message.user,function(){
			bot.reply(message, 'bây giờ là' + h.getHours() + 'giờ' + h.getMinutes() + 'phút')
		})		
	}
	)
controller.hears(
	['checkin'],
	['direct_message', 'direct_mention', 'mention'],
	function(bot, message){
		var h = new Date();
		var tmph = h.getHours();
		var tmpm = h.getMinutes();
		var mess ='';
		if(tmph < 8){
			mess = 'Chúc mừng bạn đã đến sớm';
		}
		else
			if(tmph == 8 && tmpm <= 30){
				mess = 'Chúc mừng bạn đã đến đúng giờ';
			}
			else
				if(tmph == 8 && tmpm > 30){
					mess = 'Bạn đã đến muộn';
				}
				else
					mess = 'Bạn đã đến muộn';
		controller.storage.users.get(message.user,function(){
			bot.reply(message, mess)
		})

	}
	)