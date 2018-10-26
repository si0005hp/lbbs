def chance?(weight: 40)
  rand(100) < weight
end

def generate_body(line_cnt: 10, words_cnt: 20)
  (1..rand(1..line_cnt))
    .to_a
    .map do |i|
      if i == 1
        Faker::Lorem.sentence(rand(1..words_cnt))
      else
        chance? ? '' : Faker::Lorem.sentence(rand(0..words_cnt))
      end
    end
    .join("\n")
end

def generate_title(words_cnt: 14)
  Faker::Lorem.sentence(rand(1..words_cnt))
end

##########
# users
##########
users = User.create!(
  (1..4).to_a
       .map { |i| i == 1 ? 'foo' : Faker::Name.first_name }
       .map { |n| { name: n, email: "#{n}@mail.com", password: 'passwd' } }
)

##########
# posts
##########
6.times do
  users.each { |u| u.posts.create!(title: generate_title, body: generate_body) }
end

##########
# replies
##########
posts = Post.order('created_at DESC').take(5)
posts.each do |p|
  users.shuffle.each { |u| p.replies.create!(body: generate_body(line_cnt: 6), user_id: u.id) }
end
