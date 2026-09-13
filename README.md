# Knollwood Design Company — Pages CMS Edition

This version is designed so you can edit the website without learning HTML.

## What you edit in Pages CMS

After Pages CMS is connected to this GitHub repository, you will see:

- **Site Content** — homepage wording, About section, custom orders, contact information, shop/social links
- **Products** — product name, category, description, price, photo, purchase/contact button, availability
- **Craft Fairs & Events** — event name, date/time, location, description, link
- **FAQs** — questions and answers

You should normally edit those screens in Pages CMS instead of editing `index.html`.

## Upload this version to GitHub

If you already uploaded the older Knollwood website, replace its files with the contents of this package.

The repository root should contain:

- `.pages.yml`
- `.nojekyll`
- `index.html`
- `styles.css`
- `script.js`
- `README.md`
- `data/`
- `media/`

Make sure `data` and `media` are uploaded as folders and `.pages.yml` is at the root.

## Turn on GitHub Pages

In your Knollwood repository:

1. Open **Settings**
2. Choose **Pages**
3. Under **Build and deployment**, select **Deploy from a branch**
4. Select **main**
5. Select **/(root)**
6. Save

## Connect Pages CMS

1. Go to `https://app.pagescms.org`
2. Choose **Sign in with GitHub**
3. Install/authorize the Pages CMS GitHub app
4. Give it access to your Knollwood repository
5. Open the Knollwood repository in Pages CMS

Pages CMS reads `.pages.yml` automatically. You should then see the friendly editing sections listed above.

## Adding a product

Open **Products** in Pages CMS and add another item. Fill in:

- Product Name
- Category
- Description
- Price
- Product Photo
- Button Text
- Button Link
- Available
- Show on Website

For Square, paste the Square product or checkout link into **Button Link**.

If you set **Price** to `0`, the price will not appear on the website.

If you turn **Show on Website** off, the product remains in your data but disappears from the public website.

## Product photos

Use the **Product Photo** field in Pages CMS. Uploaded photos are saved under `media/images/`.

## Updating the website

When you click Save in Pages CMS, it commits the change to GitHub. GitHub Pages then republishes the website automatically.

## Previewing on your computer

The main website loads its editable content from JSON files. GitHub Pages handles this normally.

If you double-click `index.html` locally, the browser may block reading those JSON files. The site includes built-in sample fallback content so it will still open, but Pages CMS edits are best viewed on your live GitHub Pages address.
