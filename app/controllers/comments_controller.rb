class CommentsController < ApplicationController

  # NOTE - Using jQuery AJAX to post new comments
  def create
    @comment = current_user.comments.new(comment_params)
    @comment.job_id = params[:comment][:job_id]
    respond_to do |format|
      if @comment.save
        format.html { render "jobs/index" ,notice: "Search complete" }
        format.js { render }
      end
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:title, :body, :user_id, :job_id)
  end
end
