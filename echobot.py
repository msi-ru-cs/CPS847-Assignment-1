import slack

# Echobot - OAuth and Permissions
Bot_User_OAuth_Access_Token = 'xoxb-922258423332-922293102868-LrCDGJozUPM5GNPWyixUwmJA'
SLACK_API_TOKEN = Bot_User_OAuth_Access_Token

# Hardcoded SLACK_API_TOKEN
slack_token = SLACK_API_TOKEN
client = slack.WebClient(SLACK_API_TOKEN, timeout=30)

# Echobot - Actions
client.chat_postMessage(
    channel='#general',
    text='Hello World!')
