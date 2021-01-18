class ChannelMembersController < ApplicationController
    def index
        channel_members = ChannelMember.all
        render json: channel_members, except: [:created_at, :updated_at], include: [:user, :channel]
    end

    def show
        channel_member = ChannelMember.find_by(id: params[:id])
        if channel_member
            render json: channel_member.slice(:id, :channel_id, :user_id)
        else
            render json: { message: 'Item not found' }
        end
    end

    def create
        channel_member = ChannelMember.new(channel_member_params)
        channel_member.save
        render json: channel_member
    end

    def update
        channel_member = ChannelMember.find(params[:id])
        channel_member.update_attributes(channel_member_params)
        channel_members.save
        render json: channel_member
    end

    def destroy
        ChannelMember.destroy(params[:id])
    end

    private

    def channel_member_params
        params.require(:channel_member).permit(:channel_id, :user_id)
    end
end
