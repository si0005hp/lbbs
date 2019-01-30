Rails.application.routes.draw do
  # users (devise)
  devise_for :users

  # posts
  root 'posts#index'
  get '/i/posts', to: 'posts#my_posts_index'
  get '/posts/search', to: 'posts#search'
  get '/posts/batch', to: 'posts#batch'
  resources :posts

  # reply
  resources :replies
end
