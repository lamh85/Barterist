class JobsController < ApplicationController

  def index
    @jobs = Job.all
    @comment = Comment.new
    respond_to do |format|
      format.html
      # See http://localhost:3000/jobs.json
      format.json
    end
  end

  private

  def job_params
    params.require(:job).permit(:title, :body, :user_id)
  end
end