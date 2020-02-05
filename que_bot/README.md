# Firebase Echo Bot - CPS847 Software Tools for Startups

Reference for help: [FireShip.io Tutorial](https://fireship.io/lessons/how-to-build-a-slack-bot/)

Storing Keys:

```bash

$ firebase functions:config:set slack.token=YOUR-TOKEN
$ firebase functions:config:set slack.signing_secret=YOUR-TOKEN

```

File with Function code : ./functions/src/index.ts