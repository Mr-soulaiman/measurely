# Measurely Site Instructions & Rules

## Rule for Adding New Calculators / Tools
Whenever a new calculator/tool is added to Measurely, ALWAYS automatically update all of the following without waiting to be asked:

1. **Homepage (`src/pages/HomePage.tsx`)**:
   - Add the new calculator card to the available tools section with its icon, name, description, and link button.

2. **Tools Page (`src/pages/ToolsPage.tsx`)**:
   - Add the new calculator card to the available tools list with its icon, name, description, and link button.

3. **Routing & SEO Metadata (`src/App.tsx`)**:
   - Add the route to `ROUTE_METADATA` with title, description, and canonical URL (`https://measurely-tools.vercel.app/tools/...`).
   - Add route normalization if accessed via shorthand path.
   - Render the page component in `renderCurrentPage`.

4. **Sitemap (`public/sitemap.xml`)**:
   - Add the new tool's canonical absolute URL to the sitemap with priority 0.9 and weekly changefreq.

5. **Structured Data (`index.html`)**:
   - Add the WebApplication schema entry for the new tool.

6. **Preservation**:
   - Keep all existing calculators, logic, navigation, and styling unchanged.
