# Guide: Professional Email (Zimbra)

This guide explains how to use your professional email account.

Your email address (example: name@yourdomain.com) is provided as part of your website setup.

---

## What this is

Your email runs on a professional email system called Zimbra.

It includes:

- Secure email hosting
- Webmail access
- IMAP support for apps (Outlook, Apple Mail, etc.)
- EU-based data hosting

Your mailbox is separate from your website CMS.

---

## Access & Responsibility

### What Eye On Idea does

- Creates your email account
- Provides your initial password
- Configures domain records (SPF, DKIM)
- Manages account creation, deletion, or upgrades

### What you are responsible for

- Changing your password after first login
- Keeping your password secure
- Managing mailbox content
- Backing up your emails (if needed)

Eye On Idea does not retain access to your mailbox after delivery.

---

## Step 1 — First Login (Important)

1. Open your browser
2. Go to:
   `https://zimbra1.mail.ovh.net/`
3. Log in with:
   - Your full email address
   - The password provided to you

**Screenshot:** `email-zimbra-01-webmail-login.png`

### Immediately change your password

After logging in:

1. Go to account settings
2. Change your password
3. Store it securely

This protects your mailbox.

**Screenshot:** `email-zimbra-02-change-password.png`

---

## Step 2 — Use Webmail (Optional)

Webmail allows you to:

- Send and receive emails
- Organize folders
- Use built-in calendar and contacts (if enabled)

You can use webmail only, or connect an email app.

---

## Step 3 — Set up email in an app (Recommended)

Most users prefer an email app.

### IMAP Settings

Incoming (IMAP)

- Server: imap.mail.ovh.net
- Port: 993
- Encryption: SSL/TLS

Outgoing (SMTP)

- Server: smtp.mail.ovh.net
- Port: 465
- Encryption: SSL/TLS

Username:

- Your full email address

Password:

- Your updated password

**Screenshot:** `email-zimbra-03-imap-settings.png`

Use these settings in:

- Outlook
- Apple Mail
- Thunderbird
- iPhone / Android mail app

---

## Step 4 — Test the setup

1. Send a test email to yourself
2. Confirm it appears in your inbox
3. Try sending from another device

If something fails:

- Double-check server names
- Confirm correct ports
- Ensure SSL is enabled

---

## Email Backups (Important)

Eye On Idea does not provide mailbox backups.

If backups are important for your business:

- Enable local mail storage in your email client
- Export mail periodically
- Use professional backup software if required

---

## Common Mistakes

### Not changing the initial password

Always change it immediately after first login.

### Using POP instead of IMAP

IMAP keeps devices synced.

### Sharing passwords by email

Never send passwords via unsecured channels.

---

## FAQ

### Where is my email stored?

Your mailbox data is stored in European data centres, helping you comply with GDPR.

### Can Eye On Idea read my emails?

No.
Eye On Idea does not have mailbox access after setup.

We only manage account structure (create/delete/upgrade accounts).

### Can I create additional email addresses?

Yes.
Contact Eye On Idea to create new accounts or aliases.

### Can I upgrade mailbox storage?

Yes.
Storage upgrades can be arranged if needed.

---

## Technical Information (Advanced)

### Infrastructure

- Email is hosted through OVHcloud’s European infrastructure.
- Zimbra provides the webmail and collaboration layer.
- Mail data is stored in EU data centres (France and Germany).

### Security

- SSL/TLS encryption is used for IMAP and SMTP.
- SPF and DKIM records are configured automatically at domain level.
- Password management is handled by the user after first login.

### Hosting Transparency

- Email hosting is separate from website hosting.
- Website hosting and email hosting may run on different EU systems.
