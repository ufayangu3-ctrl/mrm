# MRM Kenya Static Roofing Catalogue

Responsive static HTML/CSS/JavaScript catalogue built from the supplied MRM brief.

## Files
- index.html — homepage, hero, product carousel, roof calculator, About, Where to Buy, Guides, FAQ and Contact.
- products.html — supplied product catalogue and prices.
- styles.css — responsive styling and accessibility states.
- script.js — mobile navigation, carousel and roof-planning calculator.
- robots.txt and sitemap.xml — crawler/SEO support.

## Run locally
Use any static server, for example:
```bash
python -m http.server 8000
```

## GitHub Pages
This project is static and requires no build system. Enable GitHub Pages for the repository's main branch.

## Important
The supplied brief does not establish authorization to represent Mabati Rolling Mills (MRM) as its official corporate website. A visible authorization notice is therefore included. Confirm brand/image usage rights and the final domain before public deployment.

Prices are supplied catalogue listings and may change. The site does not collect payment information, orders, passwords, banking credentials or unnecessary personal information.

The current canonical examples use https://mabatirollingmillskenya.co.ke/. If a different verified domain is used, update canonical URLs, Open Graph URLs, robots.txt and sitemap.xml consistently.

## Commercial hosting

The `commercial-hosting` branch contains the customer-facing catalogue build, including the browser cart and WhatsApp order-preparation workflow. This branch is intended for deployment on a hosting service that permits online-business websites.

**Do not publish this branch with GitHub Pages.** GitHub's current Pages terms state that Pages is not intended or allowed to be used as free web hosting for an online business or e-commerce site. GitHub may remain the source-code repository while the customer-facing site is deployed on suitable commercial hosting.

The ordering workflow does not process payments or collect card numbers, CVV, M-Pesa PINs, bank passwords or account passwords. It prepares a WhatsApp message for the supplied business contact and does not claim that an order or payment is confirmed.
