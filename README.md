# Nila Home Bakery

A one-page website for a fictional bakery in Thrissur. The cake images are labelled placeholders, and the WhatsApp number is for the assignment.

## Preview locally

Open `public/index.html` in a browser. The form prepares a message for the customer to send in WhatsApp. To test the site, use sample details and stop before sending a message.

## Edit and deploy

Edit the menu or opening hours in `public/index.html`. The order form reads cake prices from the menu, so each price only needs to be edited once.

Import the repository into Netlify from GitHub with `main` as the production branch. The `netlify.toml` file sets `public` as the publish directory. The site needs no build command. After the initial setup, commits to `main` trigger a new deploy.
