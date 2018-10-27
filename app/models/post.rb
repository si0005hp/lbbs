class Post < ApplicationRecord
  belongs_to :user
  has_many :replies, dependent: :destroy

  # searchkick settings
  searchkick callbacks: :async
  def search_data
    {
      title: title,
      body: body
    }
  end
end
