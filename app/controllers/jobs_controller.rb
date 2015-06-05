class JobsController < ApplicationController

  def index
    @jobs = Job.last(10)
    @comment = Comment.new
    respond_to do |format|
      format.html
      format.json
    end
  end

  private

  def job_params
    params.require(:job).permit(:title, :body, :user_id)
  end
end