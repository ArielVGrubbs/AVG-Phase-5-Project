class Channel < ApplicationRecord
    has_many :posts, :as => :postable
    has_many :channel_owners
    has_many :owners, :through => :channel_owners, :source => :user
    has_many :channel_members
    has_many :members, :through => :channel_owners, :source => :user
end
