# Knollwood Design Company — Multi-page Pages CMS Edition

This version uses Jekyll, which is built into GitHub Pages, to generate real pages from content managed in Pages CMS.

## What changed

Pages CMS now includes a **Pages** collection. Each page has:
- Page Title
- Menu Label
- Page ID
- Parent Page
- Page URL
- Menu Order
- Show in Navigation
- Page Type
- Hero content
- Rich-text page content

Choose a Parent Page to make any page a subpage. The navigation automatically creates dropdowns.

## Starter navigation

- Shop
  - Bags & Totes
  - Mugs & Drinkware
  - Ornaments & Seasonal
  - Other Gifts
- About
- Events
- Custom Orders
- Contact

## Important migration note

Delete `.nojekyll` from the GitHub repository. The old single-page version needed it, but this multi-page version must allow GitHub Pages to run Jekyll.

See `QUICK_START.txt` for exact steps.
