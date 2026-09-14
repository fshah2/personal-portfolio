---
title: 'Bilt Rewards Calculator'
description: 'A mobile-first calculator for estimating Bilt Points and Bilt Cash across the Blue, Obsidian, and Palladium cards.'
longDescription: 'A single-page web app that models Bilt Card 2.0 rewards rules (housing payments, category multipliers, annual caps, and Bilt Cash) so you can estimate points and cash value across all three card tiers and compare them side by side.'
coverImage: 'cover.jpg'
year: '2026'
categories: ['Web App', 'Frontend']
techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vitest']
liveUrl: 'https://www.calculatebiltrewards.online/'
githubUrl: 'https://github.com/fshah2/bilt-rewards-calculator'
featured: true
order: 2
keyTakeaways:
  - 'Encoding real-world reward rules into a small, pure rules engine keeps the math testable and the UI dumb.'
  - 'A frontend-only tool with no backend, auth, or scraping is fast to build, cheap to host, and trivial to reason about.'
  - 'Sharable state encoded in the URL turns a calculator into something people actually pass around.'
  - 'Conservative, per-category integer flooring makes the estimates defensible instead of optimistic.'
---

Bilt overhauled its rewards program with three new cards (Blue, Obsidian, and Palladium), each with different multipliers, annual fees, category caps, and a separate "Bilt Cash" currency. Figuring out which card actually pays off for your spending is genuinely hard to do in your head.

So I built [a calculator](https://www.calculatebiltrewards.online/) that encodes the rules and does the math for you. It's a mobile-first single-page app that estimates Bilt Points and Bilt Cash across all three tiers, models the awkward housing-payment options, and lets you compare cards side by side.

## The problem

Bilt's value depends on a stack of interacting rules: base multipliers per spend category, a 3X category you pick on Obsidian, a $25,000/year grocery cap, a 4% Bilt Cash rebate on card spend, and two very different ways to pay rent or a mortgage: one that charges a 3% transaction fee for 1 point per dollar, and one with no fee where you *unlock* points by redeeming Bilt Cash.

Nobody reasons about that correctly on the spot. The calculator's job is to make the trade-offs visible.

## How it works

You enter monthly or yearly spend across Dining, Grocery, Travel, and Other, plus your rent or mortgage. The app then:

- Applies the right multiplier per card and category
- Models both housing-payment strategies (max points vs. no transaction fee)
- Tracks the Obsidian grocery 3X cap across the year
- Computes Bilt Cash earned at 4% on eligible card spend
- Shows points and estimated cash value, with an option to compare all three cards at once

## Modeling the rewards rules

The core of the project is a small rules engine of pure functions: no framework, no state, just inputs to outputs. Each card is a set of rules; each category runs through the same pipeline. That separation meant the UI never has to know *why* a number came out the way it did.

I deliberately kept the estimates conservative: points are floored per category with `Math.floor()` and then summed, so fractional dollars never inflate the result. It's better for a calculator like this to slightly under-promise than to hand someone an optimistic number they can't reproduce on their statement.

## The tech stack

- **Next.js 14** (App Router) and **React 18** with **TypeScript**
- **Tailwind CSS** for a responsive, mobile-first layout
- **Vitest** for unit tests on the calculation engine
- Fully client-side: no backend, no authentication, no data scraping

That last point matters. Because every calculation runs in the browser, the whole thing deploys as a static site, costs almost nothing to host, and has no user data to protect.

## Sharable estimates

The calculator encodes its full input state as base64 JSON in a `state` query parameter. Open a shared link and it restores every input automatically. That small feature is what turns a personal tool into something you can actually send to a friend deciding between cards.

## What I'd add next

The current version models the core earning rules. The obvious next steps are partner boosts (Lyft, the dining network, portal multipliers) and a clearer "which card wins for *your* spend" recommendation on top of the raw comparison, moving from a calculator toward a decision tool.
