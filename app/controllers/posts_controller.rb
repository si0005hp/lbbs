class PostsController < ApplicationController
  protect_from_forgery except: [:create]

  def index
    @posts = if params[:user_id]
               Post.where(user_id: params[:user_id]).order('created_at DESC')
             else
               Post.order('created_at DESC')
             end
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
