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
    - pitchfinder
    - sass
    - gsap (animation library)
    - react-scroll
    - fortawesome/react-fontawesome
    - fortawesome/free-brands-svg-icons
- Server libraries:
    - knex
    - express
    - cors
    - dotenv
    - mysql2

### APIs

- Audio Recognition API - Web Audio API
- Access Microphone - Media Devices API

### Sitemap

- Home page
- Game page

### Mockups

Game page
![](gamepage.png)

### Endpoints

**GET /cafes**

- Get exercises list

Parameters:
- none


Response:
```
[
    {
        "id": 1,
        "exercise_name": "Ascending Scale",
        "notes": "C D E F G A B C"
    },
    {
        "id": 2,
        "exercise_name": "Descending Scale",
        "notes": "C B A G F E D C"
    },
    ...
]
```

**GET /exercises/:id**

- Get exercise by id

Parameters:
- id: exercise id as number

Response:
```
{
    "id": 2,
    "exercise_name": "Descending Scale",
    "notes": "C B A G F E D C"
}
```

## Roadmap

- Create client
    - react project with routes and boilerplate pages

- Create server
    - express project with routing, with placeholder 200 responses

- Create migrations

- Gather 10 sample input strings of musical notes (e.g., ["C", "D", "E", "F", "G", "A", "B", "C#", "D#", "F#"])

- Create seeds with sample exercise data

- Deploy client and server projects so all commits will be reflected in production

- Feature: Home page
    - Implement list cafés page including location form
    - Store given location in sessionStorage
    - Create GET /cafes endpoint

- Feature: Game Page
    - Colored Tiles: The tiles on the wall are color-coded according to the string of musical notes for each exercise.

    - Side Panel with Musical Notes: There is a side panel displaying all 12 musical notes. Each note is represented by a visually distinct tile and a clear label indicating the note name (e.g., C, D, E, etc.). Clicking on a note plays the corresponding audio reference, aiding users in learning the correct pitches.

    - Singing Interaction: The monster jumps to the corresponding tile if the note is sung correctly. If a user sings an incorrect note, The corresponding tile will blink, indicating the mistake.

    - End of Exercise: Once all notes are sung correctly, two options are presented, "Return to the home page" and "Play the exercise again" ensuring a smooth transition back to the home page or a reset of the game state for replaying.

- Bug fixes

- DEMO DAY

## Nice-to-haves

- Ensure Responsive Design: Optimize the website for various screen sizes and devices.
- Utilize Session Storage: Implement session storage to save user progress and track completed exercises.
- Broaden Note Range: Expand the range of input musical notes beyond the current middle octave to encompass any octave.
- Enhance Animations: Introduce additional animations to make the game more engaging and interactive.
- Instructor Submission: Provide an option for music instructors to post their own exercises.
