class SessionsController < ApplicationController

  def new

  end

  def create
    user = User.find_by_email(params[:login][:email])

    if user && user.authenticate(params[:login][:password])
      session[:user_id] = user.id
      flash[:notice] = "You have successfully logged in!"
      redirect_to "/"
    else
      redirect_to "/login"
      flash[:alert] = "Your email and password do not match"
    end
  end

  def logout
    session[:user_id] = nil
    flash[:notice] = "You have successfully logged out!"
    redirect_to '/'
  end
end
