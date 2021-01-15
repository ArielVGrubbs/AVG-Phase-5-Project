class PostsController < ApplicationController
    def index
        posts = Post.all
        render json: posts, except: [:created_at, :updated_at], include: [:user, :postable, :likes, :posts]
    end

    def show
        post = Post.find_by(id: params[:id])
        if post
            render json: post.slice(:id, :content, :user_id, :postable)
        else
            render json: { message: 'Item not found' }
        end
    end

    def create
        post = Post.new(post_params)
        post.save
        render json: post
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
        params.require(:post).permit(:content, :user_id, :postable)
    end
end
