# Sprint 4 Planning Meeting

**Requirements**: Meeting and sprint goal is documented, all spikes clearly identified, team capacity recorded, participants are recorded, everyone has participated, decisions about user stories to be completed this sprint are clear, tasks breakdown is done.

**Date**: 03/13/21

**Participants**: Deval, Puneet, Raza, Georges, Matthieu, Emily, Nivy [full attendance]

## **Sprint Goal**

Complete the functionality for the minimum viable product. Be able to display a complete and functional website for card-making.

## **Spikes (Difficult and hard-to-estimate user stories)**

-   Creating thumbnails for templates
    -   Difficult to estimate because we have no idea how we'll pull this off, and do it efficiently (because users will have to load numerous cards at once).
-   Completing the rest of the Canvas functionality
    -   A good portion of the Canvas functionality is not implemented yet, including different scenes, and a lot of the property editing for components.  These are could take a lot of time and we find it hard to estimate. 
-   Completing the backend
    -   Depends on completing things for the front-end (such as Canvas UI/UX).

## **Team capacity**

7 people 2 hours a day (assuming other coursework and lecture)_ 10 days (not counting weekends) = 140 hours.

## **User Stories To Be Completed**

-   **As anyone, I want to be able to sort templates to find the best templates**
    -   Points: 3
    -   Priority: Low
    -   Owners: Niveditha
        
    -   Estimated time: 10h
    -   Subtasks: 
        
        -   Create the front end sorting options component
        -   Create the API endpoints that each sort method will hit
        -   Create backend functions that retrieves and sorts results from DB
        -   Link API and backend
        -   Link frontend to API by showing sorted results after user hits a sort button
    

**As a registered user, I want to be able to star templates that I like to make better templates more popular**

-   Points: 3

-   Priority: MEDIUM

-   Owners: Deval

-   Estimated time: 3h

-   Subtasks: 

    -   Add star button to front-end component
    -   Create the API endpoint that starring a template will hit
    -   Link front-end to API

**As a user, I want to have templates that I can use in an editor to create e-cards**

-   Points: 3
-   Priority: High
-   Owners: Mathieu
-   Estimated time: 10h
-   Subtasks: 
    -   Create front-end for the card
    -   Link API and backend
    -   Link frontend to API by displaying info on card

**As a recipient of a card, I want to be able to click a shared link to view a card**

-   Points: 5

-   Priority: MEDIUM

-   Owners: Deval

-   Estimated time: 10h

-   Subtasks: 

    -   Create the front end component for viewing a shared card
    -   Create any necessary backend functions that retrieve a card from the database after a user clicks on a shared link
    -   Link the frontend to backend for showing the user a shared card after clicking the link

**As an unregistered user, I want to be able to create a maximum of 2 cards per day to limit traffic**

-   Points: 3

-   Priority: MEDIUM

-   Owners: Syed

-   Estimated time: 10h

-   Subtasks: 

    -   Create the front end component that tells the user that they can only create a maximum of 2 cards a day 
    -   Create necessary backend functions that record how many cards the unregistered user has made and preventing them from making more than 2 cards a day
    -   Link frontend to backend for limiting unregistered users to 2 cards a day

**As anyone, I want to be able to search for templates to create a card**

-   Points: 5

-   Priority: MEDIUM

-   Owners: Niveditha

-   Estimated time: 5h


**As a registered user, I want my card to be hosted on the site for viewing purposes**

-   Points: 13

-   Priority: MEDIUM

-   Owners: Deval

-   Estimated time: 10h


**As a registered user, I can receive emails from the service to recover my password**

-   Points: 5

-   Priority: LOW

-   Owners: Georges

-   Estimated time: 10h


**As a registered user, I want to be able to save and access my older cards for later use**

-   Points: 5

-   Priority: MEDIUM

-   Owners: Mathieu

-   Estimated time: 5h


**As a user, I want to be able to see thumbnail images for all of the templates**

-   Points: 13

-   Priority: MEDIUM

-   Owners: Emily

-   Estimated time: 10h


**As a user, I want to be able to resize the canvas to make the card viewable on mobile**

-   Points: 8

-   Priority: MEDIUM

-   Owners: Puneet

-   Estimated time: 3h


**Add extra features to canvas**

-   Points: 13

-   Priority: MEDIUM

-   Owners: Puneet

-   Estimated time: 20h

**As a user, I want to have a seamless navigation throughout the website with a navbar and header menu**

-   Points: 5

-   Priority: MEDIUM

-   Owners: Niveditha

-   Estimated time: 2h

**As a user, I want to view different pages (scenes) for the card**

-   Points: 8

-   Priority: MEDIUM

-   Owners: Mathieu

-   Estimated time: 5h

**As a user, I want to be able to upload/re-use images/audio/video files.**

-   Points: 13

-   Priority: MEDIUM

-   Owners: Georges

-   Estimated time: 10h

**As a user, I want to be able to explore other greeting cards.**

-   Points: 8

-   Priority: MEDIUM

-   Owners: Emily

-   Estimated time: 8h

**As a user, I want to be able to edit my profile information and profile image.**

-   Points: 5

-   Priority: MEDIUM

-   Owners: Syed

-   Estimated time: 5