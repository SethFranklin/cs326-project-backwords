# Team name: Backwords

# Application name: Backwords

# Team Overview

- Seth Franklin (https://github.com/SethFranklin)

# Application Idea

My application is called "Backwords", and is centered around the idea of writing a story or stories backwards collaboratively with other people. When the website starts, there is a single last page of the story that the server admin inserted in. Any person using the site can write a page that immediately precedes that page. Once there are multiple pages, users can choose any page to write a page before. This results in a story being written backwards with many branching paths as people make their own spins on it. Each page is stored as an entry in a database, and each entry will contain the following data:

- The page's unique id (pid)
- The body text of the page (body)
- A shortened preview of the page's body text (preview)
- The id of the next page after the current page (next_pid)
- A timestamp for when the page was created (timestamp)
- The number of pages that are immediately prior to the current page (num_prior)
- The number of pages until the end of the story (num_left)

