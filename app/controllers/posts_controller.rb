class PostsController < ApplicationController
  protect_from_forgery except: [:create]

  def index
    @posts = Post.order('created_at DESC')
    render json: @posts
  end

  def create
    @post = current_user.posts.create!(post_params)
    render json: @post
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
