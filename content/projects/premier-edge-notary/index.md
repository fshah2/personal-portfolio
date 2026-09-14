---
title: 'Premier Edge Notary Solutions'
description: 'A marketing and booking site for my mobile notary business, serving the Katy, TX area with same-day and after-hours signings.'
longDescription: 'The website for Premier Edge Notary Solutions LLC, my side business offering mobile notary and signing services across the Katy area. It presents the services, service areas, and reviews, and lets clients request an appointment or reach out directly, with form submissions delivered by email.'
coverImage: 'cover.png'
year: '2026'
categories: ['Web App', 'Frontend']
techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Resend', 'Vercel']
liveUrl: 'https://premieredgenotary.vercel.app'
githubUrl: 'https://github.com/fshah2/premier-edge-notary-solutions-llc-website'
featured: true
order: 3
keyTakeaways:
  - 'A local service business lives or dies on trust, so the site leads with clarity: what I do, where I go, and how to book.'
  - 'A contact-to-email flow via Resend keeps the whole thing serverless and free to run, with no database to secure.'
  - 'Owning the full stack of a side business means being the engineer, the marketer, and the notary all at once.'
---

Premier Edge Notary Solutions LLC is my side business: a mobile notary service covering Katy, TX and the surrounding communities. This is the website I built for it, the front door clients use to understand what I offer and to book a signing.

The [site is live](https://premieredgenotary.vercel.app) and is where every appointment request starts.

## What it does

The site is built around the questions a client actually has before they book:

- **Services**: the notarizations and signing services I handle
- **Service areas**: where I travel, centered on Katy and nearby communities
- **Reviews and FAQ**: social proof and answers to the common questions
- **Booking and contact**: a clear path to request an appointment or call/text directly

The hero sets the promise up front, "Notarized wherever you are", because the whole pitch of a mobile notary is that I come to your home, office, hospital, or care facility, including evenings and weekends.

## Building it

The site is a **Next.js** app written in **TypeScript**, styled with **Tailwind CSS**, and deployed on **Vercel**. It's intentionally lean: fast to load, mobile-first (most people find a notary from their phone), and easy for me to update as the business changes.

## The contact flow

Appointment and contact requests submit through a form that emails me the details via **Resend**. That keeps the architecture completely serverless, there's no database to run or secure, and no client data sitting anywhere it doesn't need to. In local development, submissions log to the server console when no Resend key is configured, so I can test the flow without sending real mail.

## Owning the whole business

The interesting part of this project isn't the code, it's that the code is only one hat. Running Premier Edge means being the notary, the person who answers the phone, the marketer writing the copy, and the engineer keeping the site up. Building the site myself means I can turn a positioning change or a new service into a shipped update the same day, without waiting on anyone.
