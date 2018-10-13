users = User.create!([
                       {
                         email: 'foo@mail.com',
                         password: 'foobar'
                       }
                     ])

users.each do |u|
  u.posts.create!([
                    {
                      title: 'This is the first sample',
                      body: 'Hi, my name is foo.'
                    },
                    {
                      title: 'This is the second sample',
                      body: 'I\'m from Japan.'
                    }
                  ])
end
