class User < ApplicationRecord
    has_secure_password
    
    has_many :likes, dependent: :destroy
    has_many :dislikes, dependent: :destroy
    has_many :posts, dependent: :destroy
    has_many :channel_owners, dependent: :destroy
    has_many :owned_channels, :through => :channel_owners, :source => :channel
    has_many :channel_members, dependent: :destroy
    has_many :member_channels, :through => :channel_members, :source => :channel

    validates :username, uniqueness: { case_sensitive: false }
end
