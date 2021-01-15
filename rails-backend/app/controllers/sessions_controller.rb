class SessionsController < ApplicationController

    def create
        @user = User.find_by(username: params[:username])
        if @user && @user.authenticate(params[:password])
            payload = { user_id: @user.id }
            # JWT.encode takes three arguments, 1:the data you want to encode, 2: key you want to use, 3: algorithm you want to use
            # JWT.decode takes three arguments: 1:token, 2:key you used, 3:whether you want to validate the token (thrid is optional)
            token = JWT.encode(payload,ENV['SUPER_SECRET_KEY'],'HS256')
            render :json => { auth_key: token }
        else
            render :json => { :msg => "Login failed.. Try again" }
        end
    end
  
end