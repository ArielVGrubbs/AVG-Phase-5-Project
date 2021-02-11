Rails.application.routes.draw do
  resources :dislikes
  resources :channel_members
  resources :channel_owners
  resources :channels
  resources :posts
  resources :likes
  resources :users
  post '/login', to: 'sessions#create'
  post '/unlike_like', to: 'likes#unlike_like'
  post '/undislike_like', to: 'likes#undislike_like'
  # get '/shoes_price_index', to: 'shoes#shoes_price_index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
