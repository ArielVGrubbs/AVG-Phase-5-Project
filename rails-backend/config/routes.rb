Rails.application.routes.draw do
  resources :dislikes
  resources :channel_members
  resources :channel_owners
  resources :channels
  resources :posts
  resources :likes
  resources :users
  post '/login', to: 'sessions#create'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
