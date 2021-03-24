# Sprint 3 Planning Meeting

**Requirements**: Meeting and sprint goal is documented, all spikes clearly identified, team capacity recorded, participants are recorded, everyone has participated, decisions about user stories to be completed this sprint are clear, tasks breakdown is done.

**Date**: 02/27/21

**Participants**: Deval, Puneet, Raza, Georges, Matthieu, Emily, Nivy [full attendance]

## **Sprint Goal**

Complete Canvas UI/UX and functionality integration. Add more user features such as saving, loading, and sharing cards, a dashboard, a profile page, email communication, media uploads, and improving the user interface overall. Limit unregistered user card creation.  

## **Spikes (Difficult and hard-to-estimate user stories)**

-   Canvas Editor - merging the front-end of the canvas and the back-end of the canvas
    -   This is a spike because the Canvas UI/UX and the canvas functionality were made separately and were structured differently. We need to figure out how the functionality can be integrated into the front-end and eventually store those templates into our database.
    -   There are a lot of technical conflicts between the UI/UX and actual functionality. 
    -   There is still the issue with figuring out how to make drag and drop functionality mobile compatible.

## **Team capacity**

7 people 2 hours a day (assuming other coursework and lecture)_ 10 days (not counting weekends) = 140 hours.

## **User Stories To Be Completed**

-   **As anyone, I can use a pre-existing template to create a card**
    -   Points: 5
        
    -   Priority: MEDIUM
        
    -   Owners: Mathieu 
        
    -   Estimated time: 5h
        
    -   Subtasks: 
        
        -   Allow user to edit the template

-   **As a user I want to be able to place a component at position x,y and store it to make a unique template**
    -   Points: 8
        
    -   Priority: MEDIUM
        
    -   Owners: Puneet
        
    -   Estimated time: 8h
        
    -   Subtasks:
        
        -   Link frontend and backend to store and load templates

-   **Canvas Editor UI: As a user, I want to have a nice user interface and experience when using the canvas editor**

    -   Points: 5
    -   Priority: MEDIUM
    -   Owners: Emily
    -   Estimated time: 5h
    -   Subtasks:
        -   Finish the React component (front-end) for this story

-   **As a recipient of a card, I want to be able to click a shared link to view a card**
    -   Points: 5
    -   Priority: Medium
    -   Owners: Mathieu
    -   Estimated time: 5h
    -   Subtasks:
        -   Create the front end component for viewing a shared card
        -   Create any necessary backend functions that retrieve a card from the database after a user clicks on a shared link
        - 	Link the frontend to backend for showing the user a shared card after clicking the link
-   **As a User, I want to be able to see a dashboard**
-   Points: 8
    -   Priority: Medium
    -   Owners: Georges
    -   Estimated time: 8h
    -   Subtasks:
        -   Create endpoint to get user's cards and templates
        -   Allow users to favourite cards
        -   Create front-end of dashboard
        -   Add dark mode
-   **As an unregistered user, I want to be able to create a maximum of 2 cards per day to limit traffic**
    -   Points: 3
        -   Priority: Medium
        -   Owners: Mathieu
        -   Estimated time: 8h
        -   Subtasks:
            -   Create the front end component that tells the user that they can only create a maximum of 2 cards a day 
            -   Create necessary backend functions that record how many cards the unregistered user has made and preventing them from making more than 2 cards a day
            -   Link frontend to backend for limiting unregistered users to 2 cards a day
-   **As a registered user, I want my card to be hosted on the site for viewing purposes**
    -   Points: 13
        -   Priority: Medium
        -   Owners: Mathieu
        -   Estimated time: 13h
-   **As a registered user, I can receive emails from the service to recover my password**
    -   Points: 5
        -   Priority: Medium
        -   Owners: Mathieu
        -   Estimated time: 5h

-    **As a user, I want to be able to see premade components so I can use them to create a card**
    -   Points: 5
        -   Priority: Medium
        -   Owners: Niveditha
        -   Estimated time: 5h

-   **As a registered user, I want to be able to save and access my older cards for later use**
    -   Points: 5
        -   Priority: Medium
        -   Owners: Mathieu
        -   Estimated time: 5h

-   **As a user, I want to be able to upload/re-use images/audio/video files**
    -   Points: 13
        -   Priority: Medium
        -   Owners: Georges
        -   Estimated time: 13h

-   **As a user, I want to be able to explore other greeting cards.**
    -   Points: 8
        -   Priority: Medium
        -   Owners: Georges
        -   Estimated time: 8h

-   **As a user, I want to be able to edit my profile information and profile image.**
    -   Points: 5
        -   Priority: Medium
        -   Owners: Georges
        -   Estimated time: 5h

-   **Setup Redux**
    -   Points: 8
        -   Priority: Medium
        -   Owners: Georges
        -   Estimated time: 8h

-   **As a user, I want to have a consistent page size**
    -   Points: 3
        -   Priority: Medium
        -   Owners: Georges
        -   Estimated time: 1h

-   **As a user, I want to have a nice user interface across the whole website.**
    -   Points: 5
        -   Priority: Medium
        -   Owners: Georges
        -   Estimated time: 2h

-   **As a user, I want to have a nice user interface across the whole website.**
    -   Points: 5
        -   Priority: Medium
        -   Owners: Georges
        -   Estimated time: 2h

-   **Integrate template creating Canvas with the template creating UI.**
    -   Points: 8
        -   Priority: Medium
        -   Owners: Georges
        -   Estimated time: 10h