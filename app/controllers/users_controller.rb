class UsersController < Devise::SessionsController

  def create
    @user = params[:user] ? User.new(params[:user]) : User.new_guest

    if @user.save
      current_user.move_to(@user) if current_user && current_user.guest?
      session[:user_id] = @user.id
      redirect_to new_card_path
    else
      redirect_to root_path
    end
  end

end
