class PostsController < ApplicationController
    # before_action :find_book, only: [:destroy]
    # before_action :authenticate!, only: [:index,:destroy]

    def index
        posts = Post.all
        render json: posts, except: [:created_at, :updated_at], include: [:user, :postable, :likes, :posts]
    end

    def show
        post = Post.find_by(id: params[:id])
        if post
            render json: post.slice(:id, :content, :user_id, :postable, :title)
        else
            render json: { message: 'Item not found' }
        end
    end

    def create
        authenticate!
        post = Post.new(post_params)
        post.user_id = current_user[:id]
        byebug
        if post.save
            render json: post#, :status => :ok
        else
            render:json => { :msg => "Post creation failed.." }, :status => :bad_request
        end
    end

    def update
        post = Post.find(params[:id])
        post.update_attributes(post_params)
        render json: post
    end

    def destroy
        Post.destroy(params[:id])
    end

    private

    def post_params
        params.require(:post).permit(:content, :user_id, :postable_type, :postable_id, :title)
    end
end
