#!/bin/bash

if [ $# -lt 1 ]
        then
                echo Please provide repository name
                exit 1
        else
                APP_DIR=$1

                echo ======================== Creating $APP_DIR ========================

                cp -r app/ "../$APP_DIR"
fi