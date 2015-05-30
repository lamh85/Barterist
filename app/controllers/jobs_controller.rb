class JobsController < ApplicationController

  def index
    @jobs = Job.all
    respond_to do |format|
      format.html
      # See http://localhost:3000/jobs.json
      format.json
    end
  end
end