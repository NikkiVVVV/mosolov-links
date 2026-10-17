# links.mosolov.dev

Separate GitHub Pages publication for the bookmarks product. The source remains
NikkiVVVV/mosolov-work, site/links. The workflow fetches that public source and
builds it at the root of links.mosolov.dev. No backend credentials are published.

After changing the source, run `gh workflow run publish.yml --repo NikkiVVVV/mosolov-links`.
The old portfolio publication remains independent. Home links return to mosolov.work.
DNS: links CNAME NikkiVVVV.github.io. Railway ALLOWED_ORIGINS must include
https://links.mosolov.dev in addition to the existing origins.
