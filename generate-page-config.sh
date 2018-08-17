#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

echo 'var SLACK_CHANNEL_IDS = "";' > docs/config.js

echo "var SLACK_TEAM_URL = \"https://${SLACK_TEAM}.slack.com/\";" >> docs/config.js

dev_url=undefined
if [ -e .serverless/output-dev.json ] ; then
  dev_url="\"$(cat .serverless/output-dev.json | jq -r .ServiceEndpoint)/invite\""
fi

prod_url=undefined
if [ -e .serverless/output-prod.json ] ; then
  prod_url="\"$(cat .serverless/output-prod.json | jq -r .ServiceEndpoint)/invite\""
fi

echo "var AWS_LAMBDA_DEV_URL = ${dev_url};" >> docs/config.js
echo "var AWS_LAMBDA_PROD_URL = ${prod_url};" >> docs/config.js
