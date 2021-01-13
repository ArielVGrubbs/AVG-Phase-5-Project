# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
ariel = User.create(username:"ArielVGrubbs", password_digest:"1234", email:"arielvictor1234@gmail.com")
tony = User.create(username:"AnthonyEGrubbs", password_digest:"1234", email:"anthonyedwards1234@gmail.com")

r_slash_memes = Channel.create(title:"r/memes")

ariel_meme = ChannelOwner.create(user_id:ariel.id, channel_id:r_slash_memes.id)
tony_meme = ChannelOwner.create(user_id:tony.id, channel_id:r_slash_memes.id)

ariel_meme_memb = ChannelMember.create(user_id:ariel.id, channel_id:r_slash_memes.id)
tony_meme_memb = ChannelMember.create(user_id:tony.id, channel_id:r_slash_memes.id)

shit_post1 = Post.create(content:"It's the beginning of time as far as memes are concerned", user_id:ariel.id, postable:r_slash_memes)
reply1 = Post.create(content:"Yeah, we're basically inventing memes right here and now!", user_id:tony.id, postable:shit_post1)

shit_post2 = Post.create(content:"Let there be PEPE!!!", user_id:tony.id, postable:r_slash_memes)
reply2 = Post.create(content:"And lo, we saw that it was good", user_id:ariel.id, postable:shit_post2)
lvl_two_reply1 = Post.create(content:"Whoo, all this pioneering is tiring, let's take an early weekend.", user_id:tony.id, postable:reply2)

like1 = Like.create(user_id:ariel.id, post_id:shit_post2.id)
like2 = Like.create(user_id:ariel.id, post_id:reply1.id)
like3 = Like.create(user_id:ariel.id, post_id:shit_post1.id)
like4 = Like.create(user_id:ariel.id, post_id:reply2.id)
