class JobsController < ApplicationController

  def index
    # The JS code will default the page number to 1
    @jobs = Job.first(10)
    @comment = Comment.new
    @jobs_length = Job.count
    respond_to do |format|
      format.json
      format.html
    end
  end

  # The JS code needs to append the parameters to the link path like this:
  # http://localhost:3000/jobs?my_var=my_value
  # Resulting params: {"my_var"=>"my_value", "controller"=>"jobs", "action"=>"index"}
  def change_page
    @jobs = Job.all[params[:index_head]..params[:index_tail]]
    respond_to do |format|
      format.json {render "jobs"}
    end
  end

  def show

  end

  private

  def job_params
    params.require(:job).permit(:title, :body, :user_id)
  end
end