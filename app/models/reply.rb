class Reply < ApplicationRecord
  belongs_to :post
  belongs_to :user

  # searchkick settings
  searchkick callbacks: :async
  def search_data
    {
      body: body
    }
  end
end
