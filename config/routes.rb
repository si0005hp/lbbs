Rails.application.routes.draw do
  root 'main#index'
  devise_for :users

  # posts
  resources :posts
  get 'posts/user/:user_id', to: 'posts#posts_by_user'
end
