---
title: 'ERCOT Grid Status Dashboard'
description: 'A free, plain-English dashboard that answers how stressed the Texas power grid is right now, in about 30 seconds.'
longDescription: 'A GitHub-hosted dashboard that turns the ERCOT public data feed into plain-English answers about the Texas power grid: how stressed it is, the renewable-versus-thermal mix, and whether prices are spiking. It updates automatically and runs at zero infrastructure cost.'
coverImage: 'cover.svg'
year: '2026'
categories: ['Data', 'Web App']
techStack: ['TypeScript', 'GitHub Actions', 'GitHub Pages', 'ERCOT API']
liveUrl: 'https://fshah2.github.io/ercot-grid-status/'
githubUrl: 'https://github.com/fshah2/ercot-grid-status'
featured: true
order: 7
keyTakeaways:
  - 'GitHub Actions plus GitHub Pages can run a real, self-updating data product with no servers and no hosting bill.'
  - 'Committing rolling JSON snapshots to the repo gives you free history and a fully transparent data trail.'
  - 'Translating raw grid telemetry into a conservative, clearly-explained status is a product decision, not just a data one.'
  - 'Keeping API credentials in GitHub Secrets means they never touch the browser on a fully static site.'
---

After living through Texas grid scares, I wanted a single page that answers the only questions most people actually have: is the grid under stress right now, where is the power coming from, and are prices spiking? Not a wall of engineering telemetry, just a plain-English read in about 30 seconds.

That's [ERCOT Grid Status](https://fshah2.github.io/ercot-grid-status/): a free dashboard for non-technical Texans, hosted entirely on GitHub.

## The idea

ERCOT publishes a lot of public data, but it's aimed at people who already understand the grid. The gap I wanted to close was translation: taking demand, fuel mix, pricing, and outage data and turning it into three status tiles anyone can read at a glance.

## What it shows

- **Status tiles**: grid stress (Normal / Watch / Stressed), renewable-energy percentage, and a price indicator
- **7-day charts**: demand trends, fuel-mix breakdown, real-time pricing, and outage patterns
- **A transparent stress classification** with the logic spelled out, so the "Stressed" label is never a black box

## The architecture

The interesting part is that there's no server anywhere. The whole thing runs on GitHub's free tier:

- A **GitHub Actions** job runs every 15 minutes, authenticates to the **ERCOT Public Data API**, and pulls the latest readings
- **TypeScript** normalizes the raw feed and computes the grid-stress classification
- The results are written as rolling **7-day JSON files committed back into the repo**, which gives me free history and a fully auditable data trail
- A static site on **GitHub Pages** reads those JSON files and renders the tiles and charts

## Why commit the data to git

Storing snapshots in version control instead of a database was a deliberate choice. It means the data has a transparent history anyone can inspect, there's nothing to provision or pay for, and the entire pipeline (fetch, transform, publish) is reproducible from the repo alone.

## Keeping it secure and free

The ERCOT credentials live in **GitHub Secrets** and are only ever used inside the Actions runner, so they never reach the browser. Because everything downstream is static JSON and a static page, the dashboard costs nothing to run and has no attack surface tied to user data.

## The design constraint

The hardest part wasn't the plumbing. It was deciding what "Stressed" means. I kept the classification conservative and clearly explained, because a grid-status tool is only useful if people trust the label. Getting that translation right is the actual product.
