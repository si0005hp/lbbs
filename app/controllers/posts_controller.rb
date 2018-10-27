class PostsController < ApplicationController
  protect_from_forgery except: [:create]

  PAGINATE_PER_PAGE = 4

  def index
    @posts = Post.order('created_at DESC')
                 .paginate(page: params[:page], per_page: PAGINATE_PER_PAGE)
  end

  def my_posts_index
    @posts = Post.where(user_id: current_user.id)
                 .order('created_at DESC')
                 .paginate(page: params[:page], per_page: PAGINATE_PER_PAGE)
    render 'index'
  end

  def search
    @posts = Post.where(id: collect_search_ids(keyword: params[:keyword]))
                 .order('created_at DESC')
                 .paginate(page: params[:page], per_page: PAGINATE_PER_PAGE)
    render 'index'
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

  def show
    @post = Post.find(params[:id])
    @replies = @post.replies.order('created_at')
    @user_id = current_user.id
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end

  def collect_search_ids(keyword:)
    # Search hit docs from ES
    @post_ids = Post.search(keyword, load: false).map(&:id)
    @reply_ids = Reply.search(keyword, load: false).map(&:id)
    # Fetch post ids based on hit replies
    @post_ids_by_replies = Reply.select('post_id').where(id: @reply_ids).map(&:post_id)
    # Return merged post ids
    @post_ids | @post_ids_by_replies
  end
end
