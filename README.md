# Kamini API Documentation

Standalone documentation site for Kamini API v1.

## Local development
```bash
npm run dev
```
Open http://localhost:4173.

## Production build
```bash
npm run build
```
Static output is written to `dist/`.

## Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Base directory: repository root

## Configure the API host
Set `apiBaseUrl` in `assets/config.js` to the verified production API origin before publishing. Example responses are illustrative; validate response fields against the deployed service.
