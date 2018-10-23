class RepliesController < ApplicationController
  protect_from_forgery except: [:create]

  def update
    @reply = Reply.find(params[:id])
    @reply.update_attributes(reply_params)
    render json: @reply
  end

  private

  def reply_params
    params.require(:reply).permit(:body)
  end
end
