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

users.each do |u|
  u.posts.create!([
                    {
                      title: "This is the first sample of user #{u.id}",
                      body: "Hi, I'm user #{u.id}"
                    },
                    {
                      title: "This is the first sample of user #{u.id}",
                      body: "I'm from Japan."
                    }
                  ])
end
