# TheOddOnes Search and AI Discovery Plan

## Goal

Increase the likelihood that TheOddOnes appears when people search for robotics, ROS 2, robot perception, drones, and related learning content using Google, Bing, ChatGPT, Perplexity, and other AI-powered search tools.

No website can force every AI model to display or recommend it. The practical objective is to make TheOddOnes easy to crawl, index, understand, trust, and cite.

## Current findings

The site already has a useful technical foundation:

- Page titles and descriptions
- Canonical URL support
- XML sitemap generation
- Crawlable `robots.txt`
- Organization, website, and article structured data
- Public blog pages

However, the following issues should be addressed first.

### 1. Canonical hostname mismatch

The live site redirects:

```text
https://theodd1s.com -> https://www.theodd1s.com
```

The application currently declares `https://theodd1s.com` as its canonical URL and uses it in `robots.txt`, the sitemap, metadata, and structured data.

Choose one hostname and use it everywhere. Since production currently redirects to `www`, the simplest choice is:

```text
https://www.theodd1s.com
```

Required changes:

- Change `siteConfig.url` to `https://www.theodd1s.com`.
- Change `siteConfig.domain` to `www.theodd1s.com`.
- Ensure canonical tags use the same hostname.
- Ensure every sitemap URL uses the same hostname.
- Ensure the `Host` and `Sitemap` entries in `robots.txt` use the same hostname.
- Use a permanent redirect (`308` or `301`) from the non-canonical hostname.
- Register a domain-level property in Google Search Console so both hostname variants are covered.

### 2. Not enough ROS 2 and perception content

The current sitemap contains the main static pages and only one blog post. There are no substantial, indexable ROS 2 or perception resources for a search engine or AI system to cite.

Metadata keywords alone cannot solve this. The website needs useful pages that directly answer real questions.

### 3. Brand ambiguity

`TheOddOnes` and `theodd1s.com` are easily confused with the established `TheOdd1sOut` brand.

Use a more descriptive identity consistently:

> TheOddOnes Robotics — Build-first ROS 2 and robotics learning

Use this wording, or a close consistent variant, in:

- Homepage title and H1
- Homepage introduction
- Organization structured data
- About and author pages
- GitHub organization and repositories
- YouTube descriptions
- Social media profiles
- External community profiles

Initially target searches such as `TheOddOnes Robotics`, `TheOddOnes ROS 2`, and `TheOddOnes robotics learning`, rather than relying on the ambiguous `theoddones` query.

## Phase 1: Technical indexing

### Google Search Console

- [ ] Create a domain property for `theodd1s.com`.
- [ ] Complete DNS verification.
- [ ] Submit `https://www.theodd1s.com/sitemap.xml`.
- [ ] Inspect the homepage with the URL Inspection tool.
- [ ] Request indexing for the homepage and major public pages.
- [ ] Check the Page Indexing report for crawl, duplicate, canonical, or `noindex` problems.
- [ ] Recheck the report after publishing new content.

Google documentation:

- [Getting started with Search Console](https://support.google.com/webmasters/answer/10267942?hl=en)
- [Ask Google to recrawl URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)

### Bing Webmaster Tools

- [ ] Add and verify the domain.
- [ ] Import the property from Google Search Console or verify it separately.
- [ ] Submit the sitemap.
- [ ] Inspect important URLs.
- [ ] Review crawl and indexing errors.
- [ ] Enable IndexNow for newly published, updated, or deleted public pages.

Bing documentation:

- [Bing Webmaster Tools checklist](https://www.bing.com/webmasters/help/getting-started-checklist-66a806de)
- [IndexNow and URL submission](https://www.bing.com/webmasters/help/URL-Submission-62f2860b)

### AI crawler access

The wildcard rule in the current `robots.txt` allows public crawlers. An explicit OpenAI rule can make the intention clearer:

```text
User-agent: OAI-SearchBot
Allow: /
```

Also verify that hosting, firewall, CDN, rate-limiting, or bot-protection rules do not return `403`, `429`, or a JavaScript challenge to legitimate crawlers.

`OAI-SearchBot` controls eligibility for OpenAI search discovery. `GPTBot` concerns potential model-training use and can be allowed or disallowed separately according to the site's preference.

OpenAI documentation:

- [Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)

## Phase 2: Content architecture

Create a crawlable topic structure instead of publishing unrelated posts.

```text
/learn/ros2
├── /blogs/ros2-beginner-roadmap
├── /blogs/ros2-workspaces-and-packages
├── /blogs/ros2-python-publisher-subscriber
├── /blogs/ros2-camera-cv-bridge
├── /blogs/ros2-point-cloud-pcl
└── /blogs/ros2-common-errors

/learn/robot-perception
├── /blogs/robot-perception-beginner-roadmap
├── /blogs/camera-calibration-for-ros2
├── /blogs/object-detection-pipeline-ros2
├── /blogs/lidar-point-cloud-processing
└── /blogs/ros2-sensor-fusion-introduction
```

Every article should link back to its learning hub, and related articles should link to one another using descriptive anchor text.

### Recommended first articles

1. ROS 2 Beginner Roadmap: What to Learn and in What Order
2. Create a ROS 2 Python Publisher and Subscriber
3. ROS 2 Workspaces, Packages, Nodes, Topics, and Services Explained
4. Build a Camera Pipeline with ROS 2 and `cv_bridge`
5. Robot Perception Roadmap for Beginners
6. Process Point Clouds with ROS 2 and PCL
7. Build an Object-Detection Pipeline in ROS 2
8. Common ROS 2 Installation and Workspace Errors
9. ROS 2 Navigation vs Perception: What Each System Does
10. A Complete Beginner Robotics Project Using ROS 2

Do not publish thin AI-generated summaries. Prefer fewer articles containing tested work, original explanations, and evidence of first-hand experience.

## Article quality checklist

Each technical article should include:

- [ ] One specific search question or problem
- [ ] A clear, descriptive title and H1
- [ ] A direct answer near the beginning
- [ ] A short table of contents for longer guides
- [ ] Logical H2 and H3 sections
- [ ] Tested commands and code
- [ ] The ROS distribution and operating-system version used
- [ ] A published date and a genuine last-updated date
- [ ] Original screenshots, diagrams, measurements, or project results
- [ ] Expected output and troubleshooting information
- [ ] Links to relevant official ROS documentation and source repositories
- [ ] Links to related TheOddOnes articles and learning paths
- [ ] A descriptive meta title and description
- [ ] Descriptive image alternative text
- [ ] A visible author name and useful author biography
- [ ] Article structured data
- [ ] A canonical URL
- [ ] Inclusion in the sitemap

## Structured data improvements

The existing `Article` structured data should also include:

- `datePublished`
- `dateModified`
- `author.url`
- A dedicated author profile using `ProfilePage` and `Person` markup
- A stable publisher `@id` that connects the article to the main organization
- `BreadcrumbList` where breadcrumbs are visible on the page

Structured data must describe content that is genuinely visible on the page. It helps systems understand a page but does not guarantee ranking or an AI citation.

Google documentation:

- [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)

## Author and trust signals

Create a public author page for Karthik that explains verifiable experience such as:

- Robotics and systems engineering work
- Aerial robotics experience
- ROS 2 experience
- Sensor integration
- Software architecture
- Vision or perception projects
- Links to relevant GitHub, LinkedIn, talks, videos, or project demonstrations

Articles should clearly distinguish between tested facts, personal recommendations, and opinions. Cite primary sources such as official ROS documentation, package repositories, standards, and research papers.

## Reputation and legitimate links

Search and AI systems need signals beyond the website itself.

- [ ] Publish useful open-source example projects on GitHub.
- [ ] Link each repository to its matching TheOddOnes guide.
- [ ] Link guides back to their source repositories.
- [ ] Add article links to relevant YouTube descriptions.
- [ ] Share genuinely useful resources in appropriate ROS and robotics communities.
- [ ] Collaborate with robotics clubs, educators, builders, and open-source maintainers.
- [ ] Seek references from relevant technical websites and newsletters.
- [ ] Avoid buying backlinks, automated directory submissions, and community spam.

External links are most valuable when people reference a resource because it is useful, original, and trustworthy.

## Metadata guidance

Do not rely on the current large global list of meta keywords. Google does not use the `keywords` meta tag for indexing or ranking.

Instead, every page should have:

- A unique title that describes the page
- A useful, page-specific description
- A single canonical URL
- Visible text that naturally covers the subject
- Clear headings
- Relevant internal links

Google documentation:

- [Supported and unsupported meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags)
- [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

## Measurement

Track progress using outcomes, not the number of keywords placed in metadata.

### Google Search Console

Monitor:

- Indexed page count
- Search impressions
- Queries that surface TheOddOnes
- Average position
- Click-through rate
- Pages receiving impressions
- Crawl and canonical errors

### Bing Webmaster Tools

Monitor:

- Indexed URLs
- Crawl errors
- Search queries
- Backlinks
- IndexNow submissions

### Analytics

Create a report for referrals containing:

```text
utm_source=chatgpt.com
```

Also monitor referrals from Bing, Perplexity, Google, GitHub, ROS communities, and other AI or search products.

## Suggested 90-day execution order

### Days 1–7

- [ ] Resolve the `www` versus non-`www` canonical mismatch.
- [ ] Change temporary hostname redirects to permanent redirects.
- [ ] Verify Google Search Console and Bing Webmaster Tools.
- [ ] Submit the corrected sitemap.
- [ ] Inspect and request indexing for existing public pages.
- [ ] Verify crawler access through hosting and firewall logs.

### Days 8–30

- [ ] Publish the ROS 2 learning hub.
- [ ] Publish the robot-perception learning hub.
- [ ] Publish the first four tested technical guides.
- [ ] Add complete author profiles.
- [ ] Add publication dates, modification dates, and improved article structured data.
- [ ] Connect articles with internal links.

### Days 31–60

- [ ] Publish four additional project-focused guides.
- [ ] Release matching GitHub repositories or examples.
- [ ] Add videos, screenshots, diagrams, or measured results.
- [ ] Begin relevant community distribution and collaborations.
- [ ] Update articles based on real reader questions.

### Days 61–90

- [ ] Review the queries appearing in Search Console and Bing.
- [ ] Improve pages that receive impressions but few clicks.
- [ ] Expand articles that rank for relevant questions but do not answer them completely.
- [ ] Fix indexing, canonical, structured-data, and crawl errors.
- [ ] Track ChatGPT and other AI referral traffic.
- [ ] Plan the next content cluster using actual query data.

## Definition of success

Early progress means:

- The canonical hostname is consistent.
- The sitemap is successfully processed.
- Important pages are indexed.
- Branded searches surface TheOddOnes Robotics.
- ROS 2 and perception pages begin receiving relevant impressions.
- Other technical sites and repositories reference the content.
- AI and search referrals start appearing in analytics.

The long-term objective is for TheOddOnes to become a source worth citing because it publishes clear, tested, original robotics material—not simply because it contains many robotics keywords.
