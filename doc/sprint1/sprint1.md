# Sprint 1 Planning Meeting
**Requirements**: Meeting and sprint goal is documented, all spikes clearly identified, team capacity recorded, participants are recorded, everyone has participated, decisions about user stories to be completed this sprint are clear, tasks breakdown is done.

**Date**: 01/30/21

**Participants**: Deval, Puneet, Raza, Georges, Matthieu, Emily, Nivy (full attendance)

## **Sprint Goal**

Complete initial front-end, back-end, and database work so we can start working on features in the next sprint.

## **Spikes (Difficult and hard-to-estimate user stories)**

* Storing cards in the database
  * This is a spike because there are multiple ways we could do this, and we need to do more research before making a decision. For example, we could create React components for the cards and then serialize and de-serialize them. Or, we could store the props of each subcomponent in the card, and then reconstruct the card when it’s time for the card to be viewed. 
* Canvas editor
  * This is a spike because the difficulty depends on whether we can find a React component that does most of the work for us. Also, we need to figure out how to convert the output of the canvas into a template component. Finally, we need to figure out how to store templates in our database. For example, they could be stored the same way as cards (e.g. serialized), or (more likely) templates might need a different schema indicating which of its elements are editable. 

## **Team capacity**

7 people * 2 hours a day (assuming other coursework and lecture) * 10 days (not counting weekends) = 140 hours. 

## **User Stories To Be Completed**

* **Landing page: As a user, I should be able to view a landing page with info about the website and a header with buttons to other pages.**

  * Points: 3

  * Priority: HIGH 

  * Owners: Nivy

  * Estimated time: 8h

  * Subtasks: Add ChakraUI to project

    * Define project theme

    * Create header component

    * Create hero section component

    * Create feature list component

    * Create footer component

      

* **Deploying: As a user, I should be able to view the website at xyz.com**

  * Points: 5

  * Priority: HIGH 

  * Owners: Deval

  * Estimated time: 4h

  * Subtasks:

    * Find a suitable domain

    * Hookup host server and domain name

      

* **Template designs: As a user, I want to have templates that I can use in an editor to create e-cards**

  * Points: 5

  * Priority: HIGH 

  * Owners: Emily

  * Estimated time: 10h

  * Subtasks: 

    * Design a template on Figma

    * Build front-end for the card

    * Create the API endpoint that accessing a template will hit

    * Link API and backend

    * Link frontend to API by displaying info on card

      

* **Sharing link: As a recipient of a card, I want to be able to click a shared link to view a card**

  * Points: 8
  * Priority: MEDIUM
  * Owners: Emily
  * Estimated time: 8h
  * Subtasks: 
    * Create the front end component for viewing a shared card
    * Create any necessary backend functions that retrieve a card from the database after a user clicks on a shared link
    * Link the frontend to backend for showing the user a shared card after clicking the link

* **Edit template: As anyone, I can use a pre-existing template to create a card**

  * Points: 8
  * Priority: MEDIUM 
  * Owners: Raza
  * Estimated time: 10h
  * Subtasks:
    * Create front-end screen for editing templates
    * Create backend functions to process editing templates

* **Template editor: As a registered user, I want to be able to interact with a canvas, to make a template**

  * Points: 13
  * Priority: LOW
  * Owners: Puneet
  * Estimated time: 20h (Spike)
  * Subtasks:
    * Find an npm library to create a React canvas component
    * Add the React component to a page on the website
    * Have the canvas respond to user dragging

* **Schema: Implement Database Schema for storing user data and other data**

  * Points: 5
  * Priority: HIGH 
  * Owners: Georges
  * Estimated time: 10h
  * Subtasks: 
    * Decide which classes from the CRC cards need to be stored in the database
    * Construct Mongo schemas in the server folder based on the classes needed

* **Unique links: As a user, I should have a unique string generated for each card to not overwrite other cards**

  * Points: 3
  * Priority: LOW
  * Owners: Matthieu
  * Estimated time: 1h
  * Subtasks:
    * Create function 

* **Signup: As an unregistered user I want to be able to create a new account**

  * Points: 5
  * Priority: HIGH 
  * Owners: Deval
  * Estimated time: 5h
  * Subtasks:
    * Link the front-end to the back-end
    * Link the back-end to the database using routes
    * Create the front-end

* **Login: As a registered user, I want to be able to login to my account**

  * Points: 5
  * Priority: HIGH 
  * Owners: Deval
  * Estimated time: 5h
  * Subtasks:
    * Link the front-end to the back-end
    * Link the back-end to the database using routes
    * Create the front-end

