# Project Title
Melody Hopper

## Overview

Melody Hopper is an engaging and interactive game where players control a character that jumps through a vibrant world by identifying and singing musical notes. 
The objective is to jump the farthest and achieve the highest score by correctly matching the musical notes displayed on the screen.

### Problem

Melody Hopper aims to address the challenge of learning sight-reading in music by providing an engaging and interactive platform. Many aspiring musicians struggle with identifying and accurately singing musical notes, which can hinder their progress. By combining gameplay with music education, Melody Jump helps users develop their pitch recognition and sight-reading skills in a fun, motivating environment. Players will enhance their musical literacy while enjoying the excitement of a game, making learning more accessible and enjoyable.

### User Profile

- Musicians:
    - Music enthusiasts who enjoy singing and want to improve their pitch recognition skills 
       while having fun.
    - Music instructors who want to incorporate a fun, interactive tool into their lessons.

### Features

- As a user, I want to be able to sing or hum notes displayed on the screen to improve my pitch recognition skills.
- As a user, I want to be able to receive instant feedback on my accuracy when singing notes to track my progress.
- As a user, I want to be able to choose different difficulty levels to match my skill level and challenge myself.
- As a user, I want to be able to see my scores and achievements after each game session to monitor my improvement.


## Implementation

### Tech Stack

- React
- MySQL
- Express
- Client libraries: 
    - react
    - react-router
    - axios
- Server libraries:
    - knex
    - express

### APIs

- Audio Recognition API - Web Audio API
- Access Microphone - Media Devices API

### Sitemap

- Home page
- Game page
- Levels page
- Instructions page

### Mockups

#### Home Page
![](home.png)

#### Register Page
![](register.png)

#### Login Page
![](login.png)

#### Enter Location Page
![](enter-location.png)

#### View Cafés Page
![](view-cafes.png)

#### View Café Page
![](view-cafe.png)

#### View Café Page (Rated state)
![](view-cafe-rated.png)


### Data

![](sql-diagram.png)

### Endpoints

**GET /cafes**

- Get cafés, with an optional "visited" if the user is logged in or not

Parameters:
- longitude: User-provided location as a number
- latitude: User-provided location as a number
- token (optional): JWT used to add "visited" boolean


Response:
```
[
    {
        "id": 1,
        "name": "Quantum Coffee",
        "distance": 0.25,
        "averageRating": 4.5,
        "visited": true
    },
    ...
]
```

**GET /cafes/:id**

- Get café by id, with an optional "userRating" if the user is logged in or not

Parameters:
- id: Café id as number
- token (optional):  JWT used to add user rating

Response:
```
{
    "id": 1,
    "name": "Quantum Coffee",
    "distance": 0.25,
    "averageRating": 4.5,
    "userRating": 5
}
```

**POST /cafes/:id/rating**

- Logged in user can add their rating of a café

Parameters:
- id: Café id
- token: JWT of the logged in user
- rating: Number Rating out of 5 in 0.5 increments

Response:
```
{
    "id": 1,
    "name": "Quantum Coffee",
    "distance": 0.25,
    "averageRating": 4.5,
    "userRating": 5
}
```

**PUT /cafes/:id/rating**

- Logged in user can update their rating of a café

Parameters:
- id: Café id
- token: JWT of the logged in user
- rating: Number Rating out of 5 in 0.5 increments

Response:
```
{
    "id": 1,
    "name": "Quantum Coffee",
    "distance": 0.25,
    "averageRating": 4.5,
    "userRating": 5
}
```

**POST /users/register**

- Add a user account

Parameters:

- email: User's email
- password: User's provided password

Response:
```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

**POST /users/login**

- Login a user

Parameters:
- email: User's email
- password: User's provided password

Response:
```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

### Auth

- JWT auth
    - Before adding auth, all API requests will be using a fake user with id 1
    - Added after core features have first been implemented
    - Store JWT in localStorage, remove when a user logs out
    - Add states for logged in showing different UI in places listed in mockups

## Roadmap

- Create client
    - react project with routes and boilerplate pages

- Create server
    - express project with routing, with placeholder 200 responses

- Create migrations

- Gather 15 sample café geolocations in two different cities

- Create seeds with sample café data

- Deploy client and server projects so all commits will be reflected in production

- Feature: List cafés from a given location
    - Implement list cafés page including location form
    - Store given location in sessionStorage
    - Create GET /cafes endpoint

- Feature: View café
    - Implement view café page
    - Create GET /cafes/:id 

- Feature: Rate café
    - Add form input to view café page
    - Create POST /ratings
    - States for add & update ratings 

- Feature: Home page

- Feature: Create account
    - Implement register page + form
    - Create POST /users/register endpoint

- Feature: Login
    - Implement login page + form
    - Create POST /users/login endpoint

- Feature: Implement JWT tokens
    - Server: Update expected requests / responses on protected endpoints
    - Client: Store JWT in local storage, include JWT on axios calls

- Bug fixes

- DEMO DAY

## Nice-to-haves

- Integrate Google Places / Maps
    - View more details about a café
    - Visual radius functionality
- Forgot password functionality
- Ability to add a café 
- Elite status badging for users and cafés: Gamify user ratings
- Expand rating system
    - Coffee
    - Ambiance
    - Staff
- Expanded user information: full name, favorite café
- Unit and Integration Tests
