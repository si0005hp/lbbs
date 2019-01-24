#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /myapp/tmp/pids/server.pid

##### Procedure for production #########################################
# set SECRET_KEY_BASE
export SECRET_KEY_BASE=$(rails secret)
########################################################################

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"