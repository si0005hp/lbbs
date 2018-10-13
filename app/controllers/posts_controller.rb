class PostsController < ApplicationController
  protect_from_forgery except: [:create]

  def index
    @posts = Post.order('created_at DESC')
    render json: @posts
  end
end
