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
        # dislike = Dislike.new(dislike_params)
        # dislike.save
        # render json: dislike, except: [:created_at, :updated_at], include: [:user, :post]
        authenticate!
        dislike = Dislike.new(dislike_params)
        dislike.user_id = current_user.id
        if dislike.save
            render json: dislike, include: [:user, :post]
        else
            render:json => { :msg => "Dislike creation failed.." }, :status => :bad_request
        end
    end

    def unlike_like
        byebug
        Like.destroy(params[:like_id])
        dislike = Dislike.new(dislike_params)
        byebug
        if dislike.save
            byebug
            render json: dislike, include: [:user, :post]
        else
            render:json => { :msg => "Dislike creation failed.." }, :status => :bad_request
        end
    end

    # def update
    #     like = Like.find(params[:id])
    #     like.update_attributes(like_params)
    #     render json: like
    # end

    def destroy
        authenticate!
        if Dislike.find(params[:id]).user_id == current_user.id
            Dislike.destroy(params[:id])
            render json: { message: 'Item deleted' }
        else
            render:json => { :msg => "Dislike deletion failed.." }, :status => :bad_request
        end
    end

    private

    def dislike_params
        params.require(:dislike).permit(:post_id, :user_id)
    end
end
