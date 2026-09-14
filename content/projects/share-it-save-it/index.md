---
title: 'Share It Save It'
description: 'A Swift-based iOS app for bookmarking links from any app, saved locally for fast, private organization.'
longDescription: 'Share It Save It is a native iOS app that lets you bookmark links from across other apps through the iOS share sheet, storing them locally for quick, private organization, with no account and no cloud dependency required.'
coverImage: 'cover.svg'
year: '2025'
categories: ['iOS']
techStack: ['Swift', 'iOS', 'Local Storage']
liveUrl: 'https://shareitsaveit.netlify.app/'
appStoreUrl: 'https://apps.apple.com/us/app/shareitsaveit/id6755452662'
githubUrl: 'https://github.com/fshah2/shareitsaveit-public-site'
featured: true
order: 5
keyTakeaways:
  - 'A Share Extension lets an app capture content from anywhere in iOS without the user leaving the app they are in.'
  - 'Local-first storage keeps a utility app fast and private, with nothing to sign into.'
  - 'Small, single-purpose apps are a great way to learn a platform end to end: from extension to storage to UI.'
---

I kept running into the same small annoyance: finding a link in one app, wanting to save it, and having no clean way to keep it organized. Share It Save It is my fix: a native iOS app that lets you bookmark links from across your other apps and keep them in one place.

## The idea

The whole app is built around one iOS primitive: the **share sheet**. Whenever you're in another app and hit share, Share It Save It can capture that link directly: no copy-pasting, no switching context to a separate bookmarking tool first.

## How it works

- Save links from any app through the iOS share sheet
- Store them **locally on the device** for fast access
- Organize your saved links for easy retrieval later

Because storage is local, the app stays quick and private: there's no account to create and nothing syncing to a server you don't control.

## Building it

The app is written in **Swift** for iOS. The interesting piece is the Share Extension: it's what lets the app receive content from anywhere in the system, which is a different mental model from a normal app that only handles its own screens. The rest is a focused local-storage layer and a simple UI for browsing what you've saved.

## Why build something this small

Share It Save It is intentionally tiny, and that's the point. A single-purpose app is one of the best ways to learn a platform properly: you touch the extension system, on-device storage, and the app lifecycle end to end without the scope ballooning. It scratched a real itch for me and became a clean sandbox for iOS fundamentals I've since reused in [Dueline](/projects/dueline).
