# LeftLinks

## Overview

LeftLinks is a directory of the Left. 

People can navigate to members by

* using the search box, which matches against any word in the name or profile of the organization.
* clicking on category links on the homepage or tag links on profile cards to browse through all the organizations in that category.

People can click out to a member's
* Website
* Twitter/"X" Account

## Technical Notes

LeftLinks is a single page application built with vanilla javascript/html/css. 

The app data, stored in JSON format, is refreshed on a schedule from a postgres database hosted on Heroku.

Data/content is managed via a directus admin panel hosted locally.

