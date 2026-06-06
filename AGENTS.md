# AGENTS.md

Permanent instruction guide for Codex when working on this personal portfolio website.

## Project Identity

- This project is the personal developer portfolio of C. John Remthang / C. John Mizo.
- Main website: `cjohnmizo.in`.
- Project type: personal developer portfolio website.
- Present C. John Remthang as a developer and digital product creator.
- Highlight work across websites, Android apps, LMS platforms, Firebase apps, Laravel systems, dashboards, and UI/UX improvements.
- The portfolio should feel like a high-quality personal developer portfolio with digital studio polish, not a generic AI-generated template.

## Main Goal

- Keep the portfolio clean, premium, modern, responsive, fast, professional, and client-friendly.
- Every change should support a clear, polished, trustworthy portfolio experience.
- Prefer practical improvements that make the site easier to understand, easier to navigate, and more convincing for real clients.

## Design Rules

- Use a clean, modern, premium, and professional visual style.
- Use dark-first design if the existing project supports it.
- Avoid too many colors. Keep the palette controlled and consistent.
- Avoid messy spacing, inconsistent components, crowded layouts, and random decorative elements.
- Avoid a generic template appearance or anything that feels obviously AI-generated.
- Use strong typography, generous whitespace, consistent cards, smooth transitions, and polished details.
- Add subtle 3D, vector, glass, dashboard, or abstract visual style only where it improves the portfolio.
- Keep motion subtle and purposeful. Do not use heavy or distracting animations.
- Do not copy any existing website exactly.
- Preserve the existing logo, brand assets, and important visual identity unless the user explicitly asks to replace them.

## Content Rules

- Keep writing professional, simple, honest, and client-friendly.
- Avoid overhyped AI-style marketing text.
- Do not use lorem ipsum.
- Keep content clear enough for clients, schools, local businesses, founders, and teams to understand quickly.
- Highlight real projects, including:
  - Liankhawpui
  - TZ Coaching LMS
  - Gaby Farm
  - Smart Admin Dashboard
  - Personal Portfolio
- Use contact email: `contact@cjohnmizo.in`.
- Do not invent fake metrics, fake testimonials, fake clients, or unsupported claims.

## Technical Rules

- First inspect the existing project structure before editing.
- Check current files, components, data sources, routes, styling patterns, and available scripts before changing code.
- Do not rewrite the whole project unless it is clearly required.
- Make safe, focused, minimal changes that fit the current architecture.
- Preserve working features.
- Preserve existing logo files, profile photos, project images, and important assets.
- Use reusable components where it helps maintainability.
- Keep the project maintainable and easy to update.
- Avoid adding unnecessary dependencies.
- Prefer existing project conventions over new patterns.

## Responsiveness Rules

- Build mobile-first.
- The site must work well on mobile, tablet, and desktop.
- Check spacing, font sizes, buttons, cards, menus, images, and layout on small screens.
- Avoid horizontal overflow.
- Make sure text does not overlap, clip awkwardly, or become unreadable.
- Keep touch targets comfortable on mobile.

## Performance Rules

- Avoid unnecessary packages and heavy client-side code.
- Optimize images and assets.
- Avoid heavy animations, large layout shifts, and unnecessary visual effects.
- Use responsive image sizing when supported.
- Keep loading fast.
- Preserve static rendering where possible.

## SEO and Accessibility Rules

- Use semantic HTML.
- Add or preserve proper page titles and meta descriptions.
- Add or preserve Open Graph metadata if the framework supports it.
- Add useful alt text for meaningful images.
- Use readable contrast.
- Avoid broken links.
- Keep navigation clear and keyboard-accessible.
- Do not hide important content in inaccessible visual-only elements.

## Security Rules

- Never expose API keys, tokens, passwords, Firebase secrets, SMTP passwords, database credentials, or private environment values.
- Do not commit `.env` files or real credentials.
- Do not add unsafe scripts.
- Do not weaken existing security headers or validation without a clear reason.
- Keep server-only values server-only.

## Testing and Build Rules

- After changes, run the correct available checks for the current framework when relevant:
  - `npm run lint`
  - `npm run build`
  - `npm run test`
  - or the correct project-specific commands if these scripts are not available.
- For visual/frontend changes, verify the result in a browser when possible.
- Fix errors caused by the changes.
- If a check is not run, clearly explain why.

## Git Rules

- Check `git status` before editing.
- Commit after every meaningful successful change.
- Sync/push after every committed change.
- Use clear commit messages.
- Do not force push.
- Do not delete important files without explaining why.
- Do not revert user changes unless explicitly requested.
- Keep commits focused on the requested change.

## Final Response Rule

After every task, report:

- What was changed
- Files modified
- Commands run
- Build/lint/test result
- Any remaining issue
