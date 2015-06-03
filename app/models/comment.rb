class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :job

  def self.seed(number)
    number.times do |x|
      comment = Comment.new
      comment.title = Faker::Company.catch_phrase 
      comment.body = Faker::Lorem.paragraph(1)
      comment.user = User.all.sample
      comment.job = Job.all.sample
      comment.save
    end
  end

end