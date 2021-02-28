# Sprint 2 Planning Meeting

**Requirements**: Meeting and sprint goal is documented, all spikes clearly identified, team capacity recorded, participants are recorded, everyone has participated, decisions about user stories to be completed this sprint are clear, tasks breakdown is done.

**Date**: 02/27/21

**Participants**: Deval, Puneet, Raza, Georges, Matthieu, Emily, Nivy (full attendance)

## **Sprint Goal**

Deploy the site onto AWS with easy deployment afterwards, start working on the main feature of the app which involves the canvas editor. Have the ability to add components to the canvas and drag/drop them on the canvas.

## **Spikes (Difficult and hard-to-estimate user stories)**

-   Canvas editor
    -   This is a spike because the difficulty depends on whether we can find a React component that does most of the work for us. Also, we need to figure out how to convert the output of the canvas into a template component. Finally, we need to figure out how to store templates in our database.
    -   We also need to figure out how to drag the diffent components once we generate them. We have done some research at this point, but for most of the packages we have looked into, the documentation is complex and the code seems too complex for our needs.
    -   Another issue is making it mobile compatible. The HTML drag/drop support does not include touch support natively according to our research, so we will need to figure out a way around this if we want our application to be mobile-friendly when creating cards (not limiting to just viewing cards)

## **Team capacity**

7 people _2 hours a day (assuming other coursework and lecture)_ 10 days (not counting weekends) = 140 hours.

## **User Stories To Be Completed**

-   **Deploy: As a user, I should be able to view the website at xyz.com.**

    -   Points: 8

    -   Priority: HIGH

    -   Owners: Deval

    -   Estimated time: 5h

    -   Subtasks: Deploy the website to AWS servers.

        -   Host code on AWS S3 instance

        -   Host the app on AWS EC2 instance

        -   Setup Load Balancer

        -   Find a suitable domain name

        -   Setup CNAME for the domain and point it to the AWS target.

-   **Card Creation: As anyone, I can use a pre-existing template to create a card**

    -   Points: 5

    -   Priority: MEDIUM

    -   Owners: Raza

    -   Estimated time: 6h

    -   Subtasks:

        -   Allow user to edit the template

-   **Template Creation: As a registered user, I want to be able to interact with a canvas, to make a template**

    -   Points: 5

    -   Priority: MEDIUM

    -   Owners: Puneet

    -   Estimated time: 19h

    -   Subtasks:

        -   Find a npm library to create a react canvas component

        -   Add the react component to a page on the website

        -   Have the canvas respond to user dragging

-   **Storing Templates: As a user I want to be able to place a component at position x,y and store it to make template unique**

    -   Points: 8
    -   Priority: MEDIUM
    -   Owners: Mathieu
    -   Estimated time: 5h
    -   Subtasks:
        -   Link frontend and backend to store templates

-   **Canvas Editor UI: As a user, I want to have a nice user interface and experience when using the canvas editor**

    -   Points: 5
    -   Priority: MEDIUM
    -   Owners: Emily
    -   Estimated time: 26h
    -   Subtasks:
        -   Create the Figma Templates for this (based on ChakraUI)
        -   Create the React component (front-end) for this story

-   **About Page: As a user, I want to view an "about" page with information about the website**

    -   Points: 3
    -   Priority: LOW
    -   Owners: Nivy
    -   Estimated time: 11h
    -   Subtasks:
        -   Create a page and fill in the basic content
        -   Use Github API to access developer profiles

-   **Personalize Template: As a registered user, I want to be able to make my own templates to personalize my card (EPIC)**

    -   Points: **EPIC**
    -   Priority: LOW
    -   Owners: Puneet
    -   Estimated time: 5h
    -   Subtasks:
        -   As a user I want to be able to programmatically add components to the canvas to customize my card
