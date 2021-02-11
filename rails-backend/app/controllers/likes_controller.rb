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
        authenticate!
        like = Like.new(like_params)
        like.user_id = current_user.id
        # byebug
        if like.save
            # byebug
            render json: like, include: [:user, :post]
        else
            render:json => { :msg => "Like creation failed.." }, :status => :bad_request
        end
    end

    def unlike_like
        
    end

    def undislike_like
    end

    # def update
    #     like = Like.find(params[:id])
    #     like.update_attributes(like_params)
    #     render json: like
    # end

    def destroy
        authenticate!
        if Like.find(params[:id]).user_id == current_user.id
            Like.destroy(params[:id])
            render json: { message: 'Item deleted' }
        else
            render:json => { :msg => "Like deletion failed.." }, :status => :bad_request
        end
    end

    private

    def like_params
        params.require(:like).permit(:post_id, :user_id)
    end
end
