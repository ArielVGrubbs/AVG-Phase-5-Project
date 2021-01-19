class PostsController < ApplicationController
    # before_action :find_book, only: [:destroy]
    # before_action :authenticate!, only: [:index,:destroy]

    def index
        posts = Post.all
        render json: posts, include: [:user, :postable, :likes, :posts]
    end

    def show
        post = Post.find_by(id: params[:id])
        if post
            render json: post, include: [:user, :postable, :likes, :posts]
        else
            render json: { message: 'Item not found' }
        end
    end

    def create
        authenticate!
        post = Post.new(post_params)
        post.user_id = current_user.id
        # byebug
        if post.save
            render json: post, include: [:user, :postable, :likes, :posts]
        else
            render:json => { :msg => "Post creation failed.." }, :status => :bad_request
        end
    end

    def update
        authenticate!
        post = Post.find(params[:id])
        if post.user_id == current_user.id
            post.update_attributes(post_params)
            post.save
            render json: post, include: [:user, :postable, :likes, :posts]
        else
            render json: { message: 'The credentials you have presented are not authorized to edit this post, please be sure to be logged in appropriately.' }
        end
    end

    def destroy
        Post.destroy(params[:id])
    end

    private

    def post_params
        params.require(:post).permit(:content, :user_id, :postable_type, :postable_id, :title)
    end
end
