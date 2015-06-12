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

  # Page 1 returns results 1 to 10
  # The index number would be 0 to 9

  # Page 2 returns results 11 to 20
  # The index number would be 10 to 19

  # Therefore, the formula is:
  # page_number * 10 - 1 = index_tail
  # index_head = index_tail - 9

  # Or we can let the user decide how many jobs to view at a time. Then the formulas will be:
  # page_number * jobs_per_page - 1 = index_tail
  # index_head = index_tail - jobs_per_page - 1

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