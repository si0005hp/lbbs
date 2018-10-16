class MainController < ApplicationController
  def index
  end

  def my_posts
    @userId = current_user.id
    render 'index'
  end
end
