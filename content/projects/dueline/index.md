---
title: 'Dueline: Bill & Balance Tracker'
description: 'A privacy-first native iOS app for tracking bills, income, and account balances, with no accounts, no ads, and no analytics.'
longDescription: 'Dueline is a native iOS app that centralizes bill tracking, income logging, and account balance management. It runs entirely on-device with optional private iCloud sync: no sign-up, no ads, and no analytics.'
coverImage: 'cover.png'
year: '2026'
categories: ['iOS']
techStack: ['Swift', 'SwiftUI', 'iCloud', 'Vercel']
liveUrl: 'https://dueline.vercel.app/'
appStoreUrl: 'https://apps.apple.com/us/app/dueline-bill-planner/id6790514982'
githubUrl: 'https://github.com/fshah2/dueline-public-website'
featured: true
order: 1
keyTakeaways:
  - 'Privacy can be a feature: no accounts and no analytics is a genuine differentiator in personal-finance apps.'
  - 'On-device storage with optional iCloud sync gives cross-device continuity without ever running a server.'
  - 'Shipping to the App Store means owning the whole surface: the app, the marketing site, and the privacy story.'
---

Most personal-finance apps want an account, your email, and a analytics SDK before they'll let you log a single bill. Dueline is my answer to that: a native iOS app that keeps everything on your device, syncs privately through your own iCloud, and asks for nothing in return.

Dueline is now [live on the App Store](https://apps.apple.com/us/app/dueline-bill-planner/id6790514982) (iOS 18+), alongside its [marketing site](https://dueline.vercel.app/).

## What it does

Dueline centralizes the three things people actually track month to month:

- **Bills** with customizable recurrence (weekly through yearly) and reminders up to five days before a due date
- **Income** logging so the month's picture is complete
- **Account balances** across multiple account types

On top of that it adds a calendar view of what's due when, and spending analytics broken down by category.

## The privacy model

This is the part I care most about. Dueline has **no sign-up, no ads, and no analytics**. All data lives on the device. If you want it on more than one device, it syncs through your private iCloud, which means continuity across your iPhone and iPad without me ever running a server or seeing a byte of your data.

That constraint shaped everything: there's no backend to build, no database to secure, and no privacy policy full of caveats, because there's simply nothing collected.

## Building it

The app is built with **Swift** and **SwiftUI**, using iCloud for optional cross-device sync. Recurrence, reminders, and the calendar view are the parts with the most edge cases: "every month on the 31st" and daylight-saving boundaries are the kind of details that quietly break a scheduler if you're not careful.

## Shipping the whole surface

An app isn't just the binary. Shipping Dueline meant also building the marketing site (deployed on **Vercel**), writing the privacy story clearly, and taking the App Store listing through review. Owning that full surface (product, site, and positioning) is a big part of what makes shipping a real app different from building a feature.

## What comes next

Now that Dueline is live on the App Store, the roadmap is about depth on the tracking side (richer analytics and smarter reminders) while holding the line on the privacy-first, no-account model that makes Dueline what it is.
