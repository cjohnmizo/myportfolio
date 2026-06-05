# Email Forwarding and Gmail Send-As Setup

Current DNS status for `cjohnmizo.in`:

- Nameservers: Vercel DNS (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`)
- MX records: configured for ImprovMX (`mx1.improvmx.com`, `mx2.improvmx.com`)
- SPF TXT: configured for ImprovMX (`v=spf1 include:spf.improvmx.com ~all`)
- Existing TXT: Google Search Console verification

Namecheap is the domain registrar, but the live DNS zone is currently managed by Vercel because the domain uses Vercel nameservers. Add mail records where the active nameservers are managed.

The current setup keeps Vercel nameservers, so the mail records were added in Vercel. If you change the nameservers back to Namecheap BasicDNS later, recreate the records in Namecheap Advanced DNS.

## Recommended Setup

Use ImprovMX for email forwarding and SMTP sending through Gmail.

This gives:

- Incoming mail: `contact@cjohnmizo.in` forwards to your Gmail inbox.
- Outgoing mail: Gmail can send as `contact@cjohnmizo.in` through ImprovMX SMTP.

ImprovMX forwarding is available on all plans. ImprovMX SMTP sending requires a paid plan.

## 1. Create The Forwarding Alias

In ImprovMX:

1. Add domain: `cjohnmizo.in`
2. Add alias:
   - Alias: `contact`
   - Forward to: your Gmail address

## 2. Add DNS Records

### Option A: Keep Current Vercel Nameservers

1. Go to the project or team that owns `cjohnmizo.in`.
2. Open Domains.
3. Select `cjohnmizo.in`.
4. Add these DNS records.

| Type | Name | Value | Priority |
| --- | --- | --- | --- |
| MX | `@` | `mx1.improvmx.com` | `10` |
| MX | `@` | `mx2.improvmx.com` | `20` |
| TXT | `@` | `v=spf1 include:spf.improvmx.com ~all` | |

Do not remove the existing Google Search Console TXT record.

These Vercel DNS records were added on June 6, 2026.

### Option B: Use Namecheap DNS Instead

Only use this if you change the domain nameservers from Vercel to Namecheap BasicDNS.

In Namecheap:

1. Open Domain List.
2. Click Manage next to `cjohnmizo.in`.
3. Set Nameservers to Namecheap BasicDNS.
4. Open Advanced DNS.
5. Add the same MX and TXT records above.
6. Recreate any needed website records after the nameserver switch.

Namecheap notes:

- Namecheap host records are managed in Advanced DNS only when the domain is using Namecheap BasicDNS, FreeDNS, or PremiumDNS.
- If the domain points to third-party nameservers, add records at that third-party DNS provider instead.
- Switching nameservers does not copy existing records automatically.

After saving, wait for DNS propagation and click the verification/check button in ImprovMX.

## 3. Create SMTP Credentials

In ImprovMX:

1. Open SMTP settings.
2. Create credentials for `contact@cjohnmizo.in`.
3. Add any DKIM and DMARC records ImprovMX gives you to Vercel DNS.

The generated DKIM values are unique, so copy them from the ImprovMX dashboard.

## 4. Add Send-As In Gmail

In Gmail:

1. Open Settings.
2. Open See all settings.
3. Open Accounts and Import.
4. Under Send mail as, choose Add another email address.
5. Use:
   - Name: `C. John Remthang`
   - Email address: `contact@cjohnmizo.in`
   - Treat as an alias: unchecked
6. SMTP settings:
   - SMTP server: `smtp.improvmx.com`
   - Port: `587`
   - Username: `contact@cjohnmizo.in`
   - Password: the ImprovMX SMTP credential password
   - Security: TLS
7. Gmail sends a confirmation email to `contact@cjohnmizo.in`.
8. Open the forwarded Gmail inbox and confirm the code/link.

## 5. Portfolio Contact Form

The portfolio contact form is already wired to `/api/contact`.

If using the current Resend-based route, set these Vercel environment variables:

```env
RESEND_API_KEY=
CONTACT_PUBLIC_EMAIL=contact@cjohnmizo.in
CONTACT_FROM_EMAIL="C. John Remthang <contact@cjohnmizo.in>"
CONTACT_TO_EMAIL=your-gmail-address@gmail.com
```

If `contact@cjohnmizo.in` is not verified in Resend yet, keep `CONTACT_TO_EMAIL` pointed to the Gmail inbox so project briefs still arrive.

## 6. Verify

After DNS propagation:

```powershell
Resolve-DnsName -Name cjohnmizo.in -Type MX
Resolve-DnsName -Name cjohnmizo.in -Type TXT
```

Expected MX records:

- `mx1.improvmx.com`
- `mx2.improvmx.com`

Then test:

1. Send an email to `contact@cjohnmizo.in`.
2. Confirm it arrives in Gmail.
3. In Gmail, compose a new email and choose `contact@cjohnmizo.in` in the From field.
4. Send to another inbox and confirm the message arrives as `contact@cjohnmizo.in`.
