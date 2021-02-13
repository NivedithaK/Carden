# Release Planning Meeting

**Date**: 01/27/21

**Participants**: Deval, Puneet, Raza, Georges, Matthieu, Emily, Nivy (full participation)

**Meeting overview:**[15 mins] Did a regular stand-up of what we worked on yesterday, today, tomorrow[30 mins] Reviewed backlog and discussed relative story importance[1 hour] Worked on adding tasks to JIRA board

## Project Goal

Create a website for allowing users to send interactive, electronic versions of cards, such as sending a happy birthday card, a choose-your-own-adventure card, a greeting card, or a postcard. 

## Major release goals, in decreasing order of importance and with completion dates determined by dependence

* All users should be able to fill in information on a card using an existing template, and receive a unique link allowing the card to be viewed by the receiver.

  * Corresponding user stories: WEEB-5, WEEB-15, WEEB-4, WEEB-23, WEEB-8
  * Complete by: February 26th (Sprint 2)

* Login/Registration for user accounts should be functional and secure. 

  * Corresponding user stories: WEEB-23, WEEB-11, WEEB-68, WEEB-10, WEEB-16
  * Complete by: February 12th (Sprint 1)

* The website should be deployed and connected to a custom domain.
  
  * Corresponding user stories: WEEB-19, 
  * Complete by: Feb 26th (Sprint 2)
  
* A drag-and-drop canvas editor for registered users to create card templates should be implemented.

  * Corresponding user stories: WEEB-17, WEEB-58, WEEB-31, WEEB-32, WEEB-33, WEEB-59, WEEB-60, WEEB-61
  * Complete by: March 26th (Sprint 4)

* The website should have a clean UI/UX, and be entirely responsive and mobile-friendly. It should include navigation to a landing page, dashboard page, explore page, profile page, template editor page, and template creation page.

  * Corresponding user stories: WEEB-55, 
  * Complete by: February 12th (Sprint 1)

* All users should be able to quickly search, sort, and browse through existing card templates. 

  * Corresponding user stories: WEEB-23, WEEB-1, WEEB-2, WEEB-14
  * Complete by: March 12th (Sprint 3)

* Administrators should be able to manage and moderate the site, such as removing inappropriate cards or creating new templates.

  * Corresponding user stories: WEEB-6, WEEB-7, WEEB-9, WEEB-18
  * Complete by: March 12th (Sprint 3)

* Users should be able to manage their own cards and favorited cards, such as storing them for later editing or sending at a later date.

  * Corresponding user stories: WEEB-13, WEEB-14
  * Complete by: March 26th (Sprint 4)

  

## Release plan and sprint goals
### Sprint 0 - Jan 29th

**Main theme**: Get organized.

  * Define project idea, scope, and personas.
  * Finish deciding the backlog.
  * Learn how to use the technologies we will need to build the website: MERN stack.
  * Create a mockup for the website on Figma.

### Sprint 1 - Feb 12th

**Main theme**: Complete initial front-end, back-end, and database work so we can start working on features in the next sprint.

  * Complete the front-end routing for the website, with placeholder text on pages that are yet to be implemented.
  * Fully design and complete the landing page.
  * Create the schemas for the project.
  * Implement secure user registration and login on the back-end and integrate with the front-end.
  * Complete initial endpoints for get/put requests.
  * Prepare at least 3 Figma card templates.

### Sprint 2 - Feb 26th

**Main theme:** Complete the most important features and deploy.

  * Convert all Figma card templates to React components and store them in the database.
  * Implement the edit-template feature.
  * Store images, videos, and audio files.
  * Generate unique links where users can view the finalized card and integrate with front-end routing.
  * Deploy the website and connect it to a custom domain. 
  * Be able to drag images and text onto the canvas editor.
  * Be able to convert the elements on the canvas editor to a template.
  * Design UI/UX on Figma for the canvas editor elements.

### Sprint 3 - Mar 12th

**Main theme:** Make the website more useable.

  * Add the administrator user view, with all the actions that an administrator can do.
  * Add searching, sorting, and starring features for templates.
  * Add dark mode.
  * Add scene transitions and animations to the template editor

### Sprint 4 - Mar 26th

**Main theme:** Finish the most complicated features.

  * Finish the drag-and-drop canvas editor.
  * Allow users to edit their published cards.
  * Clean up UI/UX.

### Completion date
  The release will be completed by April 9th, 2021.

