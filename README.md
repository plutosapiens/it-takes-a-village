![it takes a village header](https://github.com/plutosapiens/it-takes-a-village/assets/96972840/7d303fcd-a43b-44ad-9f54-bb0e8854cfb3)


## Project Overview

**"It Takes a Village"** is a web application built with Angular 16 and Firebase that enables mothers to share childcare tips and support each other in their parenting journeys.
The app offers a user-friendly interface with public and private sections:

### Public Section (accessible to everyone without authentication):
- Homepage provides a welcoming introduction to the app.
  ![home-screenshot](https://github.com/plutosapiens/it-takes-a-village/assets/96972840/bcbdf19a-fb4d-450b-b2d6-780ed5c85a35)
- Login and Signup pages allow users to create accounts and access the private features.
  ![signup screenshot](https://github.com/plutosapiens/it-takes-a-village/assets/96972840/6b24ff15-bb49-44ae-9eb3-9c9f737a2290)
- Catalog page showcases a collection of user submitted articles.
  ![catalog-screenshot](https://github.com/plutosapiens/it-takes-a-village/assets/96972840/a6a07ce8-f98f-4eb7-9a21-0aa70b03472d)



### Private Section (accessible only to logged-in users):
- Article details pages display the full content of each childcare tip.
  ![liked-article-screenshot](https://github.com/plutosapiens/it-takes-a-village/assets/96972840/2d582d0e-5613-4c7d-849a-e6c9feb0d852)
- Users can add new articles.
  ![add-new-screenshot](https://github.com/plutosapiens/it-takes-a-village/assets/96972840/8be3a7dd-60e7-4e91-b240-f2f2a34158b6)
- Existing articles can be updated or deleted by their creators.
  ![own-article-screenshot](https://github.com/plutosapiens/it-takes-a-village/assets/96972840/2597936e-fe68-41c1-b930-b152d504e20b)
- Liked articles are automatically saved to a user's favorites list for easy reference.

## Technologies

### Frontend:

- Angular 16

### Backend (Firebase):

- Firebase Authentication (email and password)
- Firestore Database for storing artcle data
- Cloud Storage for hosting article images

## Project Scope

This project is primarily designed for educational purposes within the context of the Angular 2024 Course at SoftUni Academy. The focus is on frontend development using Angular, with Firebase providing a convenient backend solution.

## Routing

Angular's routing module navigates users between different sections of the application based on their authentication status. Users can access all public features without logging in, while private functionalities require authentication.
