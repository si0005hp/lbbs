class RepliesController < ApplicationController
  protect_from_forgery except: [:create]

  def update
    @reply = Reply.find(params[:id])
    @reply.update_attributes(reply_params)
    render json: @reply
  end

  def destroy
    @reply = Reply.find(params[:id])
    if @reply.destroy
      head :no_content, status: :ok
    else
      render json: @reply.errors, status: :unprocessable_entity
    end
  end

  private

  def reply_params
    params.require(:reply).permit(:body)
  end
end
