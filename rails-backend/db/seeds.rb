ariel = User.create(username:"ArielVG", password:"1234", email:"arielvictor1234@gmail.com")
tony = User.create(username:"AnthonyEGrubbs", password:"1234", email:"anthonyedwards1234@gmail.com")
saief = User.create(username:"SaiefSayed", password:"1234", email:"saiefsayed3241@gmail.com")
eric = User.create(username:"EricCSmith", password:"1234", email:"ericsmith@gmail.com")
justine = User.create(username:"JustineManaloto", password:"1234", email:"juschillin@gmail.com")
luis = User.create(username:"LuisPenaloza", password:"1234", email:"luisinmymind@gmail.com")


r_slash_memes = Channel.create(title:"dankMemes", description:'The penultimate location for all of your dank meme needs')
r_slash_skiing = Channel.create(title:"skiing", description:'The joy and beauty of skiing')
r_slash_coding = Channel.create(title:"coding", description:'The joy and beauty of coding')
r_slash_shower_thoughts = Channel.create(title:"ShowerThoughts", description:'The joy and beauty of showers and thoughts')
r_slash_wallstreet_bets = Channel.create(title:"wallstreetbets", description:'The joy and beauty of GameStop')
r_slash_ask_reddit = Channel.create(title:"askReddit", description:'The joy and beauty of questions')
r_slash_gaming = Channel.create(title:"gaming", description:'The joy and beauty of gaming')
r_slash_console_gaming = Channel.create(title:"consoleGaming", description:'The joy and beauty of specifically console gaming')

ariel_meme = ChannelOwner.create(user_id:ariel.id, channel_id:r_slash_memes.id)
ariel_meme = ChannelOwner.create(user_id:ariel.id, channel_id:r_slash_coding.id)
tony_meme = ChannelOwner.create(user_id:tony.id, channel_id:r_slash_skiing.id)
saief_meme = ChannelOwner.create(user_id:saief.id, channel_id:r_slash_shower_thoughts.id)
eric_meme = ChannelOwner.create(user_id:eric.id, channel_id:r_slash_wallstreet_bets.id)
justine_meme = ChannelOwner.create(user_id:justine.id, channel_id:r_slash_ask_reddit.id)
luis_meme = ChannelOwner.create(user_id:luis.id, channel_id:r_slash_gaming.id)
saief_meme = ChannelOwner.create(user_id:saief.id, channel_id:r_slash_console_gaming.id)

ariel_meme_memb = ChannelMember.create(user_id:ariel.id, channel_id:r_slash_memes.id)
tony_meme_memb = ChannelMember.create(user_id:tony.id, channel_id:r_slash_memes.id)
saief_meme_memb = ChannelMember.create(user_id:saief.id, channel_id:r_slash_memes.id)

ariel_code_memb = ChannelMember.create(user_id:ariel.id, channel_id:r_slash_coding.id)
tony_code_memb = ChannelMember.create(user_id:tony.id, channel_id:r_slash_coding.id)
saief_code_memb = ChannelMember.create(user_id:saief.id, channel_id:r_slash_coding.id)
eric_code_memb = ChannelMember.create(user_id:eric.id, channel_id:r_slash_coding.id)
justine_code_memb = ChannelMember.create(user_id:justine.id, channel_id:r_slash_coding.id)
luis_code_memb = ChannelMember.create(user_id:luis.id, channel_id:r_slash_coding.id)

justine_skiing_memb = ChannelMember.create(user_id:justine.id, channel_id:r_slash_skiing.id)
eric_skiing_memb = ChannelMember.create(user_id:eric.id, channel_id:r_slash_skiing.id)
tony_skiing_memb = ChannelMember.create(user_id:tony.id, channel_id:r_slash_skiing.id)

ariel_shower_memb = ChannelMember.create(user_id:ariel.id, channel_id:r_slash_shower_thoughts.id)
saief_shower_memb = ChannelMember.create(user_id:saief.id, channel_id:r_slash_shower_thoughts.id)

eric_street_memb = ChannelMember.create(user_id:eric.id, channel_id:r_slash_wallstreet_bets.id)

justine_ask_memb = ChannelMember.create(user_id:justine.id, channel_id:r_slash_ask_reddit.id)

luis_gaming_memb = ChannelMember.create(user_id:luis.id, channel_id:r_slash_gaming.id)
ariel_gaming_memb = ChannelMember.create(user_id:ariel.id, channel_id:r_slash_gaming.id)

saief_console_gaming_memb = ChannelMember.create(user_id:saief.id, channel_id:r_slash_console_gaming.id)


shit_post1 = Post.create(title:'New day on a new social media platform', content:"It's the beginning of time as far as memes are concerned", user_id:ariel.id, postable:r_slash_memes)
reply1 = Post.create(content:"Yeah, we're basically inventing memes right here and now!", user_id:tony.id, postable:shit_post1)
reply1231 = Post.create(content:"For sure, definitely!", user_id:saief.id, postable:reply1)
reply4231 = Post.create(content:"That's kinda a weird response ngl...", user_id:tony.id, postable:reply1231)
reply1232341 = Post.create(content:"Dude, don't go poking holes in it, this is seed data, it's supposed to be largely ignored.", user_id:saief.id, postable:reply4231)
reply23411 = Post.create(content:"Please refrain from breaking the fourth wall in my thread.", user_id:ariel.id, postable:reply1)
reply65671 = Post.create(content:"Good job man, this looks just like the real thing", user_id:saief.id, postable:shit_post1)
reply8081 = Post.create(content:"Thanks man, it means a lot!", user_id:ariel.id, postable:reply65671)

shit_post2 = Post.create(title:"Gotta love how easy Redux makes some things", content:"But you also have to acknowledge that it makes some things more difficult and complex then they need to be.", user_id:tony.id, postable:r_slash_coding)
reply2 = Post.create(content:"Yeah, like with state. Sometimes useState is an absolute *****. For apparently no reason.", user_id:ariel.id, postable:shit_post2)
lvl_two_reply1 = Post.create(content:"Whoo! all this pioneering is tiring, let's take an early weekend.", user_id:saief.id, postable:reply2)
lvl_two_reply2 = Post.create(content:"I love this new utopia that we've created!", user_id:eric.id, postable:reply2)
lvl_two_reply3 = Post.create(content:"Running out of effort right about now.", user_id:justine.id, postable:lvl_two_reply2)
lvl_two_reply4 = Post.create(content:"Seriously running on fumes.", user_id:luis.id, postable:lvl_two_reply1)
lvl_two_reply5 = Post.create(content:"Seeding data for a social media site is pretty boring.", user_id:tony.id, postable:lvl_two_reply3)
lvl_two_reply6 = Post.create(content:"I'm trying to show off just how complex this reply nesting can get.", user_id:ariel.id, postable:reply2)
lvl_two_reply7 = Post.create(content:"Good job man! Let me help you out.", user_id:saief.id, postable:lvl_two_reply6)

shit_post3 = Post.create(title:'Fun times skiing!!', content:"Apparently they exist.", user_id:justine.id, postable:r_slash_skiing)
lvl_two_reply6 = Post.create(content:"Long time no see!.", user_id:eric.id, postable:shit_post3)

shit_post4 = Post.create(title:'BROOOOOO!!!', content:"Fun times for all to be had when you're skiing! Fun for all ages.", user_id:tony.id, postable:r_slash_skiing)

shit_post5 = Post.create(title:'Unique thought provoking question', content:"Maybe there doesn't even need to be a body text.", user_id:ariel.id, postable:r_slash_shower_thoughts)

shit_post6 = Post.create(title:'Rimworld', content:"It's pretty cool.", user_id:ariel.id, postable:r_slash_gaming)

shit_post7 = Post.create(title:'Strange question that implies an even stranger situation', content:"One that almost stretches belief in it's truthfulness.", user_id:justine.id, postable:r_slash_ask_reddit)

shit_post8 = Post.create(title:'GameStop shenanigans', content:"I'm not sure if that's how you spell that", user_id:eric.id, postable:r_slash_wallstreet_bets)

like1 = Like.create(user_id:ariel.id, post_id:shit_post2.id)
like2 = Like.create(user_id:ariel.id, post_id:reply1.id)
like3 = Like.create(user_id:ariel.id, post_id:shit_post1.id)
like4 = Like.create(user_id:ariel.id, post_id:reply2.id)
like5 = Like.create(user_id:saief.id, post_id:1)
like6 = Like.create(user_id:saief.id, post_id:2)
like7 = Like.create(user_id:saief.id, post_id:12)
like8 = Like.create(user_id:saief.id, post_id:6)
like9 = Like.create(user_id:saief.id, post_id:9)
like0 = Like.create(user_id:tony.id, post_id:1)
like12 = Like.create(user_id:tony.id, post_id:11)
like23= Like.create(user_id:tony.id, post_id:15)
like34= Like.create(user_id:eric.id, post_id:20)
like45= Like.create(user_id:eric.id, post_id:2)
like56= Like.create(user_id:eric.id, post_id:1)
like78= Like.create(user_id:justine.id, post_id:1)
like67= Like.create(user_id:justine.id, post_id:15)
like89= Like.create(user_id:justine.id, post_id:12)
like90= Like.create(user_id:luis.id, post_id:1)
like14= Like.create(user_id:luis.id, post_id:2)
like563= Like.create(user_id:luis.id, post_id:3)
like63474= Like.create(user_id:luis.id, post_id:4)

like3246 = Like.create(user_id:1, post_id:11)
like1234235512324 = Like.create(user_id:21, post_id:11)
like2348645764 = Like.create(user_id:3, post_id:11)
like234684624 = Like.create(user_id:4, post_id:11)
like6595345774 = Like.create(user_id:5, post_id:21)
like2345742344 = Like.create(user_id:6, post_id:21)
like76832465568933454357674 = Like.create(user_id:7, post_id:21)
like213095347692837462360984 = Like.create(user_id:8, post_id:21)


