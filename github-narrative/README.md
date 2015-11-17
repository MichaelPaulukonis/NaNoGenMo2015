# Narrative from Github data

_A la_ Narrative Science _et alia_, could we generate a narrative of a users GitHub activity?

Once we have this data, we need to be able to sort it in different ways.

1. following a linear time-trail (first this, then that)
1. following a user
 1. marking a user as "interesting"
   1. number of comments
   1. number of issues
   1. number of badges
   1. early creation of issue/comment/badge/repo
1. following a conversation ("issue") thread

## api sample urls

 - https://api.github.com/users/michaelpaulukonis
 - https://api.github.com/users/MichaelPaulukonis/events
 - https://api.github.com/repos/dariusk/NaNoGenMo-2015/issues

# prior art

## "github resume" generation:

 - https://github.com/resume/resume.github.com
 - https://github.com/CodeFalling/GithubResume/
 - https://github.com/deanmalmgren/year-in-review


I thought I had used a different one in the past, that also told you what other Github users you were similar to, but cannot find it back...


## @HugoVK scrapes NaNoGenMo data for twitter bot
 - https://github.com/hugovk/nanogenmobot


# API notes
Looks like the API has a limitation on the last 300 events. Plus, auto-paginates to 30 events per page (cannot increase - MUST paginatedly capture).

Look into:

 - https://www.npmjs.com/package/github-scraper
 - https://www.githubarchive.org/

I ran into the api-rate limitation for anonymous (?) access while testing dev code.
I got a personal authentication token and added that to the queries.
It was quite easy, and I should write that up.
