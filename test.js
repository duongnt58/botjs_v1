// test incomming webhook
var Botkit = require('botkit');
var controller = Botkit.slackbot({})

var bot = controller.spawn({
  incoming_webhook: {
    url: "https://hooks.slack.com/services/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"
  }
})

bot.sendWebhook({
  text: 'This is an incoming webhook',
  channel: '#testcheckin',
},function(err,res) {
  if (err) {
    // ...
  }
});

