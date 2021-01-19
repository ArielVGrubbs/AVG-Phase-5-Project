class LikesController < ApplicationController
    def index
        likes = Like.all
        render json: likes, except: [:created_at, :updated_at], include: [:user, :post]
    end

    def show
        like = Like.find_by(id: params[:id])
        if like
            render json: like.slice(:id, :post, :user)
        else
            render json: { message: 'Item not found' }
        end
    end

    def create
        like = Like.new(like_params)
        like.save
        # user = User.all.find(like_params[:user_id])
        # byebug
        render json: like
    end

    # def update
    #     like = Like.find(params[:id])
    #     like.update_attributes(like_params)
    #     render json: like
    # end

    def destroy
        Like.destroy(params[:id])
    end

    private

    def like_params
        params.require(:like).permit(:post_id, :user_id)
    end
end
