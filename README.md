# SecurePinned

#### Problem Statement

Using the free slack subscription? You'd notice that:
- You lose your messages after a while even pinned messages. That's ok(you're using the free version).
- New members just joining your workspace are not able to view the pinned messages.

#### Solution

I'm building a bot that:
- Saves every pinned conversations in a channel
- Post a summary of the pinned messages;
    - to a special **#pinned_messages** channel
    - to channel members emails
- creates a PDF summary of every pinned conversations and makes this PDF
available when triggered by a slash command!
- Renders a html page with the pinned conversations

### Status: Work in progress

> Tech Stack: Node.js, @slack/web-api