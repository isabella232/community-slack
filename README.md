# Slack Inviter

An Amazon Lambda Slack Team invitation service.

## Quick start

First, for and clone this repository!

Then:

1. Get an [Amazon Web Services account](http://console.aws.amazon.com/)
2. Get a Slack team account & [an authentication token](https://api.slack.com/docs/oauth-test-tokens)
3. run `npm install`
4. set `SLACK_TOKEN`, `SLACK_TEAM`, and (optionally) `ALLOW_ORIGIN` environment variables
5. run `npm run deploy` (use `--` to add any arguments)
   - e.g. for prod deployment in London region use `npm run deploy -- --region eu-west-2 --stage prod`

Once you have deployed the Lambda stack, you can deploy content of docs to Github pages (or elsewhere).
When you run `npm run deploy`, it should generate `docs/config.js` which contains configuration variables.
The generator script is `generate-page-config.sh`.

To test the function deployed in dev stage use `index.html#dev`, otherwise it defaults to one in prod stage.

You want to track `docs/config.js` along with any other changes in your fork, as it needs to be hosted along
with other HTML files in `docs` directory.
