class DislikesController < ApplicationController
    def index
        dislikes = Dislike.all
        render json: dislikes, except: [:created_at, :updated_at], include: [:user, :post]
    end

    def show
        dislike = Dislike.find_by(id: params[:id])
        if dislike
            render json: dislike, except: [:created_at, :updated_at], include: [:user, :post]
        else
            render json: { message: 'Item not found' }
        end
    end

    def create
        dislike = Dislike.new(dislike_params)
        dislike.save
        render json: dislike, except: [:created_at, :updated_at], include: [:user, :post]
    end

    # def update
    #     like = Like.find(params[:id])
    #     like.update_attributes(like_params)
    #     render json: like
    # end

    def destroy
        Dislike.destroy(params[:id])
    end

    private

    def dislike_params
        params.require(:dislike).permit(:post_id, :user_id)
    end
end
