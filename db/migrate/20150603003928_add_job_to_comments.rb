class AddJobToComments < ActiveRecord::Migration
  def change
    add_reference :comments, :job, index: true, foreign_key: true
  end
end
