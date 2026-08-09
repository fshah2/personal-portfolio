---
title: 'Texas Electricity ETL'
description: 'A Python pipeline that ingests Texas electricity-plan data, maps it to utility territories, and loads a normalized snapshot into PostgreSQL nightly.'
longDescription: 'A Python ETL backend that pulls current electricity-plan data from ComparePower, maps each plan to the right Texas TDSP (utility) territory using ZIP lookups, and loads a normalized snapshot into PostgreSQL. It runs on a nightly GitHub Actions schedule and is designed to be idempotent.'
coverImage: 'cover.svg'
year: '2026'
categories: ['Data', 'Backend']
techStack: ['Python', 'PostgreSQL', 'GitHub Actions']
githubUrl: 'https://github.com/fshah2/comparepower-etl'
featured: true
order: 4
keyTakeaways:
  - 'An idempotent pipeline is safe to run on a schedule: reruns converge to the same state instead of duplicating data.'
  - 'ZIP-to-territory mapping is the unglamorous core: plan data is meaningless until it is tied to the right utility.'
  - 'GitHub Actions is a perfectly good scheduler for a small ETL: cron, secrets, and manual triggers with no infrastructure to own.'
  - 'Normalizing into utilities, brands, pricing, and document tables keeps the snapshot queryable instead of a blob of JSON.'
---

Texas has a deregulated electricity market, which means the "best" plan depends heavily on which utility (TDSP) territory your address falls in. I built a Python ETL that captures that landscape on a schedule: it pulls current plan data, ties every plan to the correct territory, and lands a clean, queryable snapshot in PostgreSQL.

## What it does

The pipeline runs a four-step flow:

1. Load Texas metros and their ZIP codes
2. Call the **ComparePower** endpoints (one to resolve ZIP codes, one to retrieve plans)
3. Map each plan to its **TDSP territory** using a ZIP → TDSP lookup
4. Normalize everything and load it into PostgreSQL

The result is a snapshot of the market you can actually run SQL against, refreshed every night.

## The data model

Rather than dumping raw API responses, the loader normalizes into purpose-built tables: utilities, brands, pricing, and document links. That structure is what makes the data useful downstream: you can ask "which brands serve this territory" or "how did pricing move" without re-parsing JSON every time.

## Idempotency was the design goal

Because this runs unattended on a schedule, the most important property is that **running it twice can't corrupt the data**. The pipeline is idempotent: each run converges to the same normalized state instead of appending duplicates. That's what makes it safe to leave on a nightly cron and trust the output.

## Running it on GitHub Actions

The whole thing is scheduled with **GitHub Actions**: a nightly cron plus a manual trigger for on-demand runs. Configuration comes from environment variables like `DATABASE_URL`, with credentials kept in secrets. It needs Python 3.12+ and a PostgreSQL instance, and the schema initializes from checked-in SQL files.

Using Actions as the scheduler means there's no server, no cron box, and no separate deployment to babysit, the same pattern I keep reaching for on data projects where the workload is small but needs to be reliable.

## Where it fits

This ETL is the data-collection half of a bigger interest in the Texas energy market, the same domain as my [ERCOT grid dashboard](/projects/ercot-grid-status), approached from the pricing-and-plans side rather than the grid-telemetry side.
