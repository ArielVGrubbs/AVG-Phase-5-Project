class User < ApplicationRecord
    has_secure_password
    
    has_many :likes
    has_many :posts
    has_many :channel_owners
    has_many :owned_channels, :through => :channel_owners, :source => :channel
    has_many :channel_members
    has_many :member_channels, :through => :channel_members, :source => :channel

    validates :username, uniqueness: { case_sensitive: false }
end
