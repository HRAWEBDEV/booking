# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Next.js 16 (App Router) booking website for hotels ("Alin"), using React 19, TypeScript, Tailwind v4, and shadcn/ui (Radix primitives). Supports Persian (`fa`, RTL, Jalali calendar, default) and English (`en`, LTR, Gregorian) locales.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # start production server
npm run lint     # eslint (includes unused-imports check)
npm run lint -- --fix   # auto-fix unused imports
```

There is no test suite configured in this repo.

## Environment

Requires `.env.development` and/or `.env.production` (not committed, except a blank `.env`). Keys:

- `NEXT_PUBLIC_MODE` — `DEVELOPMENT` or `PRODUCTION` (see `utils/env.ts`)
- `NEXT_PUBLIC_CHANNELID`, `NEXT_PUBLIC_PROVIDERID`, `NEXT_PUBLIC_HOTELID`, `NEXT_PUBLIC_ARZID` — booking provider identifiers, can be empty
- `NEXT_PUBLIC_API_URI` — backend API base URL (CRS booking API)
- `NEXT_PUBLIC_X_AUTH` — API auth token

If `NEXT_PUBLIC_HOTELID` is set, the root path redirects straight to that hotel's `find-hotel` page (see `proxy.ts` and single-hotel deployments in `DEPLOY.md`).

## Architecture

### Routing structure (`app/[lang]/...`)

All routes are nested under the `[lang]` dynamic segment. Route groups split concerns:

- `(app)` — wraps everything; holds shared API types/utilities (`app/[lang]/(app)/utils/`: `defaultAxios.ts`, `apiBaseTypes.ts`, icon helpers).
- `(app)/(website)` — the public booking site: header/footer/mobile-nav, home page, hotel search (`hotel/find-hotel`), hotel detail (`hotel/find-hotel/[hotelID]`), the multi-step booking flow (`hotel/reserve`), and the post-booking `hotel/voucher` page.
- `(app)/(user-panel)` — separate layout for authenticated/user-panel routes.
- `[lang]/layout.tsx` — root HTML shell: loads local fonts (Persian `faSans`, English `enRoboto`, switched via `[dir]` CSS selector), wraps children in `ReactQueryProvider` then `BaseConfigProvider`, builds `generateMetadata` (OpenGraph/Twitter) from the `meta` dictionary.

`proxy.ts` (Next's middleware, matcher excludes `_next`) enforces a valid locale prefix on every path, redirecting to the cookie-stored or default (`fa`) locale, and applies the single-hotel redirect described above.

### Localization / dictionaries

`internalization/app/localization.ts` is the source of truth for locale metadata (`locales` map: direction, calendar, date-fns variant, active flag). `supportedDateFns` maps locale → `date-fns` or `date-fns-jalali`, used instead of importing either library directly so date logic stays locale-agnostic.

Translated strings live under `internalization/app/dictionaries/**`, organized by feature/route (e.g. `website/hotel/reserve`, `website/hotel/voucher`, `meta`, `share`). Each feature folder has `en.json`, `fa.json`, and a `'server-only'` `dictionary.ts` that lazily imports the right JSON by locale via a `get<Feature>Dictionary({ locale })` function — follow this pattern when adding a new translated section rather than inlining strings. Dictionaries are fetched in server components/layouts and passed down (often through a feature-specific context provider, e.g. `ShareDictionaryProvider`).

### Data fetching

- `app/[lang]/(app)/utils/defaultAxios.ts` exports a shared axios instance (`baseURL: NEXT_PUBLIC_API_URI`) used for client-side requests; `AxiosCredentialsInterceptor` (in `(website)/services/axios-credentials`) attaches provider credentials.
- Server components (e.g. `hotel/find-hotel/[hotelID]/page.tsx`) call the backend directly with `fetch`, using `next: { revalidate }` for ISR-style caching, and helpers like `getSetupProviderCredentials()` / `appendApiUri()` to build requests. API endpoint functions and shared response types (`HotelInfo`, `RoomInventory`, etc.) live in per-route `services/*ApiActions.ts` files.
- Shared response envelope types (`PagedData`, `Combo`, `ErrorInfo`, `Pagination`) are in `app/[lang]/(app)/utils/apiBaseTypes.ts`.
- `services/react-query/ReactQueryProvider.tsx` sets up TanStack Query for client-side data/mutations (used heavily in the multi-step reserve flow).

### Feature module layout

Non-trivial routes (e.g. `hotel/reserve`) follow a consistent internal structure: `components/` (UI, often split into sub-features like `payment/`, `reserve-info/`), `hooks/`, `services/` (route-local providers/contexts, e.g. `reserve-config`), `schemas/` (react-hook-form + resolver validation schemas), `utils/` (reducers, step definitions, formatting helpers). Follow this layout when extending a feature rather than dropping files at the route root.

### Global config & context

- `services/base-config/` provides app-wide context (`BaseConfigProvider`) exposing active locale, locale info, app version, and a `setLocale` function that rewrites the URL's locale segment and does a full navigation. It also wraps children in `next-themes`' `ThemeProvider` (light theme only currently).
- `utils/userLocaleManager.ts` / `utils/cookieManager.ts` handle reading/writing the user's locale cookie.
- `theme/appModes.ts` and `utils/envModes.ts` / `utils/env.ts` centralize environment-mode constants — use these instead of comparing `process.env.NEXT_PUBLIC_MODE` to string literals directly.

### UI components

shadcn/ui is configured via `components.json` (`new-york` style, `neutral` base color, Lucide icons, no Tailwind config file since Tailwind v4 uses CSS-based config in `app/globals.css`). Path aliases: `@/components`, `@/components/ui`, `@/lib`, `@/hooks`, `@/lib/utils`. Shared, non-route-specific components live in root `components/` (`ui/` for shadcn primitives, `icons/`, `image-lightbox/`); route-specific components stay colocated under their route's `components/` folder.

### Notable conventions

- `next.config.ts` enables `reactCompiler` and `typedRoutes` — route params/props use the generated `PageProps<'/route'>` / `LayoutProps<'/route'>` types rather than hand-written prop types.
- Prettier: single quotes, JSX single quotes, `tabWidth: 1` (tabs, not the usual 2/4-space convention) — respect the existing formatting rather than reformatting to a different width.
- ESLint enforces no unused imports/vars (`eslint-plugin-unused-imports`); vars/args prefixed with `_` are exempt.
- `console` calls are stripped in production builds (`compiler.removeConsole`).
