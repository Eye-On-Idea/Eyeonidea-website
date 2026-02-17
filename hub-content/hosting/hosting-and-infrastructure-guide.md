# Guide: Hosting & Infrastructure

This guide explains how your website is hosted and maintained.

It covers:

- Where your website runs
- How updates are deployed
- What is monitored
- What support includes
- What is not included

---

## What this is

Your website is hosted on European infrastructure.

It is built as a performance-focused static website.
This means:

- Fast loading
- High security
- Low maintenance risk
- No public server login required

Hosting is managed by Eye On Idea.

---

## What Eye On Idea does

- Deploys and maintains the production website
- Monitors uptime and functionality
- Manages SSL certificates
- Maintains DNS configuration
- Ensures website rebuild after content updates
- Handles infrastructure configuration

---

## What you should know

- Hosting follows the uptime level stated by the hosting provider.
- Eye On Idea monitors that the site is live and functional.
- Hosting access (FTP / control panel) is not provided by default.
- External access may affect security and uptime.

If you require special access, this must be agreed in writing.

---

## Production vs Development

### Production (Live Website)

Your live website:

- Is hosted in Europe
- Uses secure SSL
- Is optimized for performance
- Is monitored for availability

You do not need to access this environment.

---

### Development / Staging

During development:

- A temporary development environment is created
- You may receive access to preview progress
- This environment is removed after launch

This environment is not public infrastructure.

---

## How content updates work

When you publish content in your CMS:

1. The CMS sends a trigger
2. The website rebuilds automatically
3. The updated version replaces the previous one

You do not need to manually upload files.

---

## Analytics & Reporting

Your website can include analytics tracking.

Currently, reporting may include:

- Scheduled email reports
- Manual report exports
- Dashboard sharing (when enabled)

Reporting structure may evolve as Eye On Idea improves its analytics system.

If you require structured reporting or KPI tracking,
this can be added as a service.

---

## Maintenance & Support

Basic maintenance includes:

- Ensuring the website remains live
- Security updates where required
- Infrastructure monitoring

Extended maintenance is available through support packages.

Support tiers may include:

- Content updates handled for you
- Technical adjustments
- Priority response times
- Ongoing optimization

---

## Access Policy

By default:

- No FTP access is provided
- No hosting control panel access is provided

This ensures:

- Stability
- Security
- Clear responsibility

DNS record lists can be provided upon request.

---

## Common Questions

### Can I access the server?

Not by default.
External access can affect stability and security.

### What happens if the website goes down?

Eye On Idea monitors uptime.
If an issue is detected, it is investigated and resolved.

### Is the hosting in the EU?

Yes.
Hosting infrastructure is based in Europe.

### Can I move hosting elsewhere?

Yes.
Hosting can be transferred upon written request.
The process will be coordinated to avoid downtime.

---

## Technical Information (Advanced)

### Infrastructure Model

- Production sites are hosted on European web hosting infrastructure.
- SSL certificates are automatically issued and renewed.
- Static site architecture reduces server-side attack surface.
- CMS-triggered rebuilds deploy updated content.

### Uptime

Hosting uptime follows the guarantees provided by the hosting provider.
Eye On Idea monitors service availability but does not provide a separate SLA unless included in a support package.

### Security

- No public server access is exposed.
- FTP access is restricted to protect uptime and integrity.
- DNS records are managed centrally.
- SSL encryption is enforced.

### Development Hosting

- Temporary development environments are hosted separately.
- These are removed upon project completion.
- They are not part of long-term infrastructure.
