Rails.application.routes.draw do
  resources :channel_members
  resources :channel_owners
  resources :channels
  resources :posts
  resources :likes
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
