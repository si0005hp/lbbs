Rails.application.routes.draw do
  # users (devise)
  devise_for :users

  # posts
  resources :posts
  root 'posts#index'
  get '/i/posts', to: 'posts#my_posts_index'
  get '/search', to: 'posts#search'

  # reply
  resources :replies
end
