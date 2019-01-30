class PostBatchWorker
  include Sidekiq::Worker

  def perform(user_id)
    posts = Post.where(user_id: user_id).order('created_at ASC')
    puts "********** Enumerate posts of user:#{user_id} **********"
    posts.each { |p| puts p.title }
    puts "********************************************************"
  end
end
