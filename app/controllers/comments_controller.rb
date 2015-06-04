class CommentsController < ApplicationController

  def create
    @comment = current_user.comments.new(comment_params)
    @comment.job_id = params[:comment][:job_id]
    if @comment.save
      redirect_to jobs_path
      # session[:]
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:title, :body, :user_id, :job_id)
  end
end
