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

This version includes a browser shopping cart, localStorage persistence and a WhatsApp order-preparation workflow. **Do not deploy the commercial ordering version as GitHub Pages.** Use suitable commercial hosting such as Hostinger or another web host that is appropriate for the intended business use.

GitHub can remain the source-code repository. The WhatsApp workflow does not process payments and does not collect card numbers, CVV, M-Pesa PINs, bank passwords or account passwords.

The ordering flow prepares a URL-encoded WhatsApp message to **+254 762 380 946** and tells the customer that MRM must confirm availability, final pricing and purchasing arrangements. It does not claim that an order or payment is confirmed.
