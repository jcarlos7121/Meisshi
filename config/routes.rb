Rails.application.routes.draw do

  devise_for :users, controllers: { sessions: 'users' }
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  root 'application#index'

  resources :template_cards, only: [:index]
  resources :cards, only: [:new, :create]

end
