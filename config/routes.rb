Rails.application.routes.draw do
  # main
  root 'main#index'
  get '/i/posts', to: 'main#my_posts'

  devise_for :users

  # posts
  resources :posts
  get 'posts/user/:user_id', to: 'posts#posts_by_user'

  # reply
  resources :replies
end
