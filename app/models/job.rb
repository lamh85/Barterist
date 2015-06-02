class Job < ActiveRecord::Base
  belongs_to :user
  has_many :comments

  private

  def self.seed(number)

    number.times do |x|
      job = Job.new
      job.title = Faker::Company.catch_phrase 
      job.body = Faker::Lorem.paragraph(1)
      job.user = User.all.sample
      job.save
    end

  end
end