# Slack Inviter

An Amazon Lambda Slack Team invitation service.

## Quick start

First, clone this repository!

Then:

1. Get an [Amazon Web Services account](http://console.aws.amazon.com/)
2. Get a Slack team account & [an authentication token](https://api.slack.com/docs/oauth-test-tokens)
3. run `npm install`
4. set `SLACK_TOKEN`, `SLACK_TEAM`, and (optionally) `ALLOW_ORIGIN` environment variables
5. run `npm run deploy -- --region eu-west-2`

