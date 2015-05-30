class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

  def authorize
    redirect_to '/login' unless current_user
  end

  def name_display
    if current_user
      current_user.first_name.strip.squeeze(" ") if current_user.first_name || current_user.email if current_user.email
    end
  end
  helper_method :name_display

end
