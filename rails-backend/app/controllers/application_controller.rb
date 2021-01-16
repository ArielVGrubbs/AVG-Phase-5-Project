class ApplicationController < ActionController::API

    def current_user
        token = request.headers['Auth-Key']
        # byebug
        begin
            user_id = JWT.decode(token,'SUPER_SECRET_KEY')[0]["user_id"]
            @user = User.find_by(id: user_id)
        rescue
            nil
        end
    end
  
    def authenticate!
        unless current_user
            nil
        end
    end
  
end