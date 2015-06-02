class User < ActiveRecord::Base
  has_many :jobs
  has_many :comments

  has_secure_password
  
end
