class UsersController < ApplicationController
#   def create
#     @user = User.create(users_params)
#     payload = { user_id: @user.id }
#     token = JWT.encode(payload,ENV['SUPER_SECRET_KEY'],'HS256')
#     render :json => { :auth_key => token }, :status => :ok
#   end

    def index
        users = User.all
        render json: users, except: [:created_at, :updated_at]#, include: [:reviews, :orders]
    end

    def show
        user = User.find_by(id: params[:id])
        if user
            render json: user.slice(:id, :email, :username, :password)
        else
            render json: { message: 'Item not found' }
        end
    end

    def create
        @user = User.create(users_params)
        payload = { user_id: @user.id }
        token = JWT.encode(payload,'SUPER_SECRET_KEY','HS256')
        render :json => { :auth_key => token }, :status => :ok
    end

    def update
        user = User.find(params[:id])
        user.update_attributes(user_params)
        render json: user
    end

    def destroy
        # @user = User.find_by(id: params[:id])
        # @user.destroy
        User.destroy(params[:id])
    end

    private

    def users_params
        params.require(:user).permit(:email, :username, :password)
    end
end
