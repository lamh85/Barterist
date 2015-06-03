class Job < ActiveRecord::Base
  belongs_to :user
  has_many :comments

  private

  def self.seed(number)

    number.times do |x|
      job = Job.new
      job.title = Faker::Company.catch_phrase 
      job.body = Faker::Lorem.paragraphs(4).join("\n\n")
      job.user = User.all.sample
      job.save
    end

  end
end

# j.each do |x| x.body = Faker::Lorem.paragraphs(4).join("\n\n"); x.save end