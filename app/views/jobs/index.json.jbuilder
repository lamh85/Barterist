json.array! @jobs do |job|

  json.(job, :id, :title, :body, :created_at)

  json.user do
    json.id job.user.id
    json.first_name job.user.first_name
    json.last_name job.user.last_name
  end

  json.comments job.comments do |comment|
    json.(comment, :title, :body)

    json.user do
      json.id comment.user.id
      json.first_name comment.user.first_name
      json.last_name comment.user.last_name
    end
  end
end