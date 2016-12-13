# Title

www.gowhere.com | Singapore Event Listing Website

# Link
Heroku link: (https://gowhere-wdi6.herokuapp.com/)

A MEAN Stack Web Application featuring events. Companies would create events for users to join.

Built while exploring Angular 2 and MEAN Stack.

## Example Pitch

Welcome to GoWhere. Having trouble deciding where to go? Can't make a decision? Not sure what exciting events are going on?
Let GoWhere help you to make that crucial decision.

We realise that most groups of friends/colleagues can't decide where to go or what to do. And there's always that guy who sits on the fence and just replies 'Anything'.

Now with GoWhere, people can view events happening in Singapore and join the event.

## Diagrams and Wireframes

Entity Relationship Diagram:

![ERD](https://github.com/alexwong23/gowhere/blob/master/public/img/erd.png)

User Story:

![User Story](https://github.com/alexwong23/gowhere/blob/master/public/img/userstory.png)

![MEAN Stack Flow](https://github.com/alexwong23/gowhere/blob/master/public/img/mean.jpeg)

## What's next?
1. Change join event button if user has already joined event
2. Include event capacity
3. Host view event participation

## What was used?

Frontend: Bootstrap, Angular 2

Backend: NodeJS, Express, MongoDB

Validation: Tokens, Local Storage

## Credits

Many thanks go to the wonderful instructors & coursemates from General Assembly Singapore for their help and support.

Shoutout to Maximilian Schwarzmüller for his great tutorial on MEAN in Udemy
* https://www.udemy.com/angular-2-and-nodejs-the-practical-guide/

## How to run/test app
1. git fork the repo into your own github
2. git clone it into your directory
3. npm install
4. npm run build & npm start (together)

## How to deploy to heroku
1. Follow the FOUR steps above
2. git checkout master
3. npm run build:prod
4. heroku create [insert name of yr heroku app]
5. git push heroku master

