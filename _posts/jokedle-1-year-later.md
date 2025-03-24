---
title: "Jokedle: 1 Year Later"
excerpt: "After 1 year live with Jokedle, a wordle spinoff with a Wheel of Fortune flair, I have learned a ton of things about APIs, database self hosting, server monitoring, and much more! You can read about my journey of coming up with the idea to building it and then the lessons I learned over time based on the decisions I made."
coverImage: "/assets/blog/jokedle-1-year-later/JokedleCover.png"
postDate: "2025-03-23"
lastUpdated: "2025-03-23"
ogImage:
  url: "/assets/blog/jokedle-1-year-later/JokedleCover.png"
---

It has been well over a year since I first started building Jokedle
([Jokedle: Guess the Punchline](https://www.jokedle.com/)), a spinoff of
Wordle that also takes some inspiration from wheel of fortune. The
premise is you are given a setup to a joke and your goal is to guess the
punchline. You are first given 5 free letters to guess; from there you
must guess the letters or the entire punchline. This project was one of
my favorite things to build since being in college, so I am going to
share my motivation, look under the hood, discuss challenges faced, and
identify improvements. This taught me lots of lessons on APIs, MySQL
self hosting, server and database monitoring, and much more.

## How it Started

Back around December of 2023, I was hyper-fixated on Wordle and Wordle
clones. I was playing them myself and seeing many friends, family, and
streamers playing these games. At the time, I was looking for a side
project and was thinking of a simple site that would display a daily
joke based on pulling from Third-Party APIs as well as a database of
funny Jokes that I had gathered over time from coworkers who tell good
but corny dad jokes. I mention the APIs because at my day job, we were
starting discussions into API development and management of them with an
Integration Platform as a Service (IPAAS), so I wanted to get some
refreshers with using APIs. So, since I already had done some work
connecting to an API and had some jokes already stored in a database, I
realized that I could mix this idea and wordle together to create a fun
game that people of all ages can enjoy, if the jokes are family
friendly!

## How it is built

### Database and API

Starting from within or from the back end, I utilized a MySQL database
and a pre-existing API that I had previously used for my wedding website
I made for my Wife and I
([Wedding Site](https://wedding.cadegray.dev/)). The MySQL
database was on Planet Scale, however due to them dropping their free
tier, I made the decision to bring that into my Virtual Private Server
(VPS) since it works for the scale I am working with and there is no
additional charge to what I am already paying for it, for more
information on that read this blog post I made ([Migrating From a
Managed Database Solution to Self Hosting on a Virtual Private
Server](https://blog.cadegray.dev/posts/db-migration)). Moving to self
hosting my DB helped me learn plenty of lessons that I would not have
gained if I would have stayed on a managed service like PlanetScale.

The API I am utilizing was built using the NodeJS library, Express and
is deployed in a docker container on my VPS ([GitHub -
cade-gray/personal-api](https://github.com/cade-gray/personal-api)).
Thanks to this groundwork already being laid out, I just needed to
create the required tables in the database and the routes within the API
I had already built. With this, I had jokes stored in the database and
had built out an API or essentially an interface (hence the I in API) to
talk to the database. This has some benefits being an API as I can use
different tools/languages to talk to the database such as my UI or the
cron jobs I built to change the joke in order by number or randomly. I
was even able to use this API as an example to test with when
identifying different IPAAS solutions. When I opened joke submissions to
the public this also required me to ensure my API was secure enough to
be reached publicly, with that I read and implemented recommendations
from the ExpressJS team ([Security Best Practices for Express in
Production](https://expressjs.com/en/advanced/best-practice-security.html)).
These things added up into a lot of good learning experiences. Writing
this blog post has helped refresh my memory on these things and lets me
appreciate the work I have done thus far.

### Jokedle Web Interface

Moving to the Web User interface (UI), there is not too much to be said
on it and the game logic is quite trivial compared to other games
(Previously, I had made more complex games in college such as a Flappy
Bird clone). I decided to go the route of using React since I have the
most experience with it and know that it will easily scale up to
whatever complexity I need. For styling, I went for the tool that I have
been reaching for when working on most of my recent projects, Tailwind
CSS. The use of Tailwind has helped speed up my ability to build
consistent UIs without worrying about creating a design. This UI is
currently being hosted using Vercel due to it's simplicity with
deployments tied in with GitHub. I would like to move this into my VPS
since I already have a nginx web server hosting a handful of other
sites. Just a quick rundown of the components built in this UI from the
top level down.

Within App.tsx there are 4 buttons which let you control the appState
which is essentially what lets you switch screens while keeping the game
active in the background due to state being at the top level. Below are
the 4 containers and underneath them are components that exist within
them (if necessary):

- GameContainer: Where the game takes place. The default container
  when you go to jokedle due to default state being loading and then
  inGame once the joke loads from the API.
  ![Screen shot of Jokedle game container](/assets/blog/jokedle-1-year-later/JokedleGameContainer.png)
  GameContainer has the following containers within it which are the key
  components of the game:

  - InputContainer: Has the below input items, changes depending on
    gameState

    - FirstPickInput

    - GuessingLetterInput

    - GuessingPunchlineInput

  - JokeGrid: This is the grid that is seen on Jokedle. This is
    probably the most complex part of the UI. Looking back at this, the
    code I wrote is very unreadable which I think is just a React style
    decision of conditionals however it could be a skill issue on my end
    for not finding a more elaborate solution. The JokeGrid displays
    what letters have been guessed and has some regular expressions for
    keeping special characters in the grid. Depending on the game state,
    it will also have some different behaviors such as if it is
    completeWin or completeLoss will display the answer differently.

- HowToContainer: Just displays guidelines/rules on how to play
  Jokedle
  ![A screenshot of Jokedle's how to screen](/assets/blog/jokedle-1-year-later/JokedleHowTo.png)

- JokeListContainer -- Container that pulls list of all jokes from API.
  Gives user the option to pick a new joke to guess the punchline to.\
  ![A screenshot of the joke list on Jokedle](/assets/blog/jokedle-1-year-later/JokedleJokeList.png)

  - Has a function called changeJoke which is ran when a new joke is
    selected. This function updates state for the Joke, the letters, the
    gameState back to the firstPick, remove all selected letters, resets
    lives, resets the feedback message, and sets the appState to inGame
    which will swap the user back to the GameContainer to begin guessing
    the punchline to the joke they selected.

- JokeSubmissionContainer

  - This is so users can submit their own jokes to me. These are sent to
    my API and inserted into a table to be reviewed.
    ![Screenshot of Joke Submission on Jokedle](/assets/blog/jokedle-1-year-later/JokedleJokeSubmission.png)

From my Admin UI, I can view the jokes and add them to my joke list
which will then be able to be played on Jokedle.
![Screenshot of joke submissions on admin platform](/assets/blog/jokedle-1-year-later/JokedleAdminSubmissions.png)

### Admin Interface

The admin interface/platform ([Github - cade-gray/admin-site](https://github.com/cade-gray/admin-site)) was
previously built by me for my wife to manage RSVP submissions for our
wedding. This gave her the ability to export the list to a
spreadsheet/CSV which helped us a ton during the wedding planning
process. So I started out by building a page to view the list of jokes I
had in my database. I then added the ability to add new jokes. I
realized that it was hard to tell how the jokes would look on the
JokeGrid when live on jokedle, so to help this, I took the JokeGrid
component from Jokedle and utilized it in the admin platform codebase. I
am able to pull jokes from the third-party dad jokes API or I can take
some from JokeSubmissions list.
![JokeGrid on admin platform](/assets/blog/jokedle-1-year-later/JokedleAdminJokeGrid.png)

### How It All Ties Together
Below is a graphic showing the layout of Jokedle and the connecting systems:
![Jokedle Mockup of Infrastructure](/assets/blog/jokedle-1-year-later/JokedleMockupV3.png)

## Challenges Faced / Lessons Learned

I faced a handful of challenges over time while building this project,
below are a list of some of the things that I recall from working
through this:

- Having to move MySQL DB to VPS as mentioned previously.

- I ran into an issue where MySQL was crashing every couple of days.
  Started after moving MySQL to my VPS. Turns out it was due to a rookie
  mistake I had made where I was not closing DB connections on a route
  in my API which was causing them to build up in MySQL leading it to
  eventually crash or unable to serve any more requests due to max
  amount of open connections made. Correcting this in the API helped
  correct this issue.

- However, every couple of weeks the DB would still crash, I ended up
  looking into the MySQL docs and came across this ([MySQL :: MySQL 8.4
  Reference Manual :: B.3.3.3 What to Do If MySQL Keeps
  Crashing](https://dev.mysql.com/doc/refman/8.4/en/crashing.html)),
  which helped me learn and make some needed corrections to my MySQL
  settings.

- These issues led me to build a tool that would help monitor my VPS to
  help catch issues when they occur ([GitHub -
  cade-gray/vps-health-check](https://github.com/cade-gray/vps-health-check)) With this and
  the above MySQL documentation, I was able to improve the health of my
  database and (knock on wood) have not had anymore issues with the DB
  crashing for a long time.

## Hindsight and Potential Improvements

There are some things that as I was building and looking back now as I
was reviewing and writing this blog post, I see as potential
improvements to be made to Jokedle:

- I could take the current Personal API and split it up into separate
  APIs (one system level API for DB connections and multiple
  process/experience level APIs for Jokedle, Admin Site, Wedding Site,
  and my resume site). Also utilize a better language for performance to
  build these APIs like Golang. There are no noticeable issues currently
  with performance, but I want to grow my Go skills and it could be
  better for future cases.

- The code in JokeGrid should probably be refactored to be more
  readable, if possible.

- Moving Web UI into VPS as previously mentioned since Vercel is not
  giving enough benefits to keep it separate from my other web
  applications (excluding my Blog).

Bringing up these potential improvements is further inspiring me to get started on my next project.

## Next Steps

This project was a lot of fun and really helped me gain a lot of
knowledge with architecture, APIs, self hosting databases, and much
more. I have no plans to add any more features to Jokedle but I want to
improve the infrastructure that it is ran on in order to set me up in a
good place for future projects. I am planning to build out a new VPS and
with that build a much more streamlined deployment process, more
organized APIs and management of them, implement caching, better manage
automations (currently using crontab) and possibly replace MySQL with
PostgreSQL for more features and scalability. The one I currently have
is around 5 years old and has organically grown over time from many
lessons I have learned. I think since I have grown as a developer and
technology professional, it is time to reevaluate my infrastructure for
my projects and plan a much better setup for my future.
