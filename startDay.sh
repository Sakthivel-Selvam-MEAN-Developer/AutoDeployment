#!/bin/bash
yarn
yarn db
yarn b pris
yarn key
yarn keySetup
yarn keyUser
yarn nginx

tmux kill-session -t wonder || true

# Create a new tmux session in detached mode
tmux new-session -d -s wonder

# Split the window into 3 vertical panes
tmux split-window -h
tmux split-window -v

# Select the first pane
tmux select-pane -t 0

# Split the first pane into 3 horizontal panes
tmux split-window -v


tmux send-keys -t 0 "yarn b dev" C-m
tmux send-keys -t 1 "yarn u dev" C-m
tmux send-keys -t 2 "docker-compose exec local-nginx sh" C-m

# Attach to the tmux session
tmux attach-session -t wonder