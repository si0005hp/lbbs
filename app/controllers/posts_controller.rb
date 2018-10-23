class PostsController < ApplicationController
  protect_from_forgery except: [:create]

  ########## backend API ##########
  def index
    render json: posts(nil)
  end

  def create
    @post = current_user.posts.create!(post_params)
    render json: @post
  end

  def update
    @post = Post.find(params[:id])
    @post.update_attributes(post_params)
    render json: @post
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.destroy
      head :no_content, status: :ok
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def posts_by_user
    @user_id = params[:user_id]
    raise 'user_id was not given' unless @user_id

    render json: posts(@user_id)
  end

  ########## frontend API ##########
  def show
    @post = Post.find(params[:id])
    @replies = @post.replies.order('created_at DESC')
    @user_id = current_user.id
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end

  def posts(user_id)
    if user_id
      Post.where(user_id: params[:user_id]).order('created_at DESC')
    else
      Post.order('created_at DESC')
    end
  end
end
