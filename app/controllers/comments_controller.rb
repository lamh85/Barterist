class CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    @comment.job_id = params[:comment][:job_id]
    byebug
    if @comment.save
      render text: "success!"
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:title, :body, :user_id, :job_id)
  end
end
