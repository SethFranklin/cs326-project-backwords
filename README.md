
# Backwords

Backwords is a website where you can collaboratively write a story backwards with other people. You can write a page before any page you see on the site.

### How to run

To run backwords, you need a postgres database with a database url to connect to.

First, create a file called ".env" in the base directory, to put in an environment variable for your database url.

The ".env" file's contents should look something like this:

`DATABASE_URL=postgres://your-database-url-here`

Next, run this command to install the required libraries:

`npm install`

Finally, you can run the server with this command:

`npm start`
