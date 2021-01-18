class ChannelsController < ApplicationController
    def index
        channels = Channel.all
        render json: channels, except: [:created_at, :updated_at]#, include: [:reviews, :orders]
    end

    def show
        channel = Channel.find_by(id: params[:id])
        if channel
            render json: channel.slice(:id, :title)
        else
            render json: { message: 'Item not found' }
        end
    end

    def create
        channel = Channel.new(channel_params)
        channel.save
        render json: channel
    end

    def update
        channel = Channel.find(params[:id])
        channel.update_attributes(channel_params)
        channel.save
        render json: channel
    end

    def destroy
        Channel.destroy(params[:id])
    end

    private

    def channel_params
        params.require(:channel).permit(:title)
    end
end
