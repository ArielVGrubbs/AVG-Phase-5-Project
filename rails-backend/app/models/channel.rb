class Channel < ApplicationRecord
    has_many :posts, :as => :postable
    has_many :channel_owners, dependent: :destroy
    has_many :owners, :through => :channel_owners, :source => :user
    has_many :channel_members, dependent: :destroy
    has_many :members, :through => :channel_owners, :source => :user

    validates :title, uniqueness: { case_sensitive: false }
end
