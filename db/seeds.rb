users = User.create!([
                       {
                         email: 'foo@mail.com',
                         password: 'foobar'
                       },
                       {
                         email: 'bar@mail.com',
                         password: 'foobar'
                       }
                     ])

long_body = <<EOF
This is a long body sample.
abcdef.

Foo bar bal, hoge fuga piyo.

This is not a something aaaaa.
Thank you.

This is the additional line 1.
This is the additional line 2.
This is the additional line 3.


Regards.
EOF

users.each do |u|
  u.posts.create!([
                    {
                      title: "This is the first sample of user #{u.id}",
                      body: "Hi, I'm user #{u.id}"
                    },
                    {
                      title: "This is the first sample of user #{u.id}",
                      body: long_body
                    }
                  ])
end

posts = Post.order('created_at DESC').take(2)
posts.each do |p|
  p.replies.create!(body: "This is the sample reply to post #{p.id}",
                    user_id: p.user_id)
end
