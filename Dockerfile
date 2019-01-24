FROM ruby:2.5
RUN apt-get update -qq && apt-get install -y postgresql-client

##### Install node.js ##################################################
RUN apt-get update && apt-get install -y curl apt-transport-https wget && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install -y yarn
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
  apt-get install nodejs
########################################################################

ENV RAILS_ROOT /myapp
RUN mkdir -p $RAILS_ROOT 
WORKDIR $RAILS_ROOT
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN bundle install
COPY . .

# Setting env production
ENV RAILS_ENV='production'
ENV RACK_ENV='production'

##### Procedure for production #########################################
# precompile assets
RUN rails assets:precompile
# set RAILS_SERVE_STATIC_FILES
ENV RAILS_SERVE_STATIC_FILES='true'
# set ELASTICSEARCH_URL
ENV ELASTICSEARCH_URL='es'
########################################################################

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]