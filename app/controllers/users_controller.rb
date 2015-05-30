class UsersController < ApplicationController

  # CREATE
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:notice] = "You have successfully registered!"
      redirect_to "/welcome/index"
    end
  end

  # READ

  # UPDATE

  # DESTROY

  # OTHER
  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end
end
