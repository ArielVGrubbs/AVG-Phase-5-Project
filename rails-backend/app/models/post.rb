class Post < ApplicationRecord
  belongs_to :user
  belongs_to :postable, :polymorphic => true
  has_many :posts, :as => :postable, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :dislikes, dependent: :destroy
end
