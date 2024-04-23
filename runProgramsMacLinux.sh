#!/bin/bash
gnome-terminal --working-directory=$HOME/Desktop/Money-Monster/money-monster/frontend -- npm install && npm start &
gnome-terminal --working-directory=$HOME/Desktop/Money-Monster/money-monster/backend -- npm install && npm start &
