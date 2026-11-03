# Kamini API Documentation

Standalone developer documentation for the Kamini Go API v1.

**Production API:** https://kmini-g-lang.vercel.app  
**API source:** https://github.com/aniketnotcoder/Kamini-go-lang  
**OpenAPI contract:** [openapi/v1.yaml](openapi/v1.yaml)

## Local development

```bash
npm run dev
```

Open http://localhost:4173.

## Production build

```bash
npm run build
```

The generated static site is written to `dist/`.

## Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Base directory: repository root

The build copies the HTML, assets, and OpenAPI specification into `dist/`.

## Source of truth

The public v1 routes and schemas are documented from the Go API's typed models and OpenAPI 3.1 specification. Example values are illustrative; the live request console sends requests to the configured production API.
