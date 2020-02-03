import os
import slack

# Slack API
SLACK_API_TOKEN = os.environ.get('SLACK_API_TOKEN')

# Slackbot actions
EXAMPLE_COMMAND = "do"  # sample command
MENTION_REGEX = "^<@([WU].+)>(.*)"  # RegEx for parsing command

@slack.RTMClient.run_on(event='message')
def say_hello(**payload):
    data = payload['data']
    if 'Hello' in data['text']:
        channel_id = data['channel']
        thread_ts = data['ts']
        user = data['user']

        webclient = payload['web_client']
        webclient.chat_postMessage(
            channel=channel_id,
            text="Hi <@{}>!".format(user),
            thread_ts=thread_ts
        )

# start the bot
rtmclient = slack.RTMClient(token=SLACK_API_TOKEN)
print(rtmclient)
#rtmclient.start()
