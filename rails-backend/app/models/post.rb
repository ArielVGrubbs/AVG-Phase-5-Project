class Post < ApplicationRecord
  belongs_to :user
  belongs_to :postable, :polymorphic => true
  has_many :posts, :as => :postable
  has_many :likes
  has_many :dislikes
end
