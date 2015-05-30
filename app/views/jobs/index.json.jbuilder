json.array! @jobs do |job|

  json.(job, :id, :title, :body)

  json.user do
    json.id job.user.id
    json.first_name job.user.first_name
    json.last_name job.user.last_name
  end
end