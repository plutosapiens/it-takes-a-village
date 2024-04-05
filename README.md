# It Takes a Village

## Project Overview

**"It Takes a Village"** is a web application built with Angular 16 and Firebase that enables mothers to share childcare tips and support each other in their parenting journeys.
The app offers a user-friendly interface with public and private sections:

### Public Section (accessible to everyone without authentication):
- Homepage provides a welcoming introduction to the app.
- Login and Signup pages allow users to create accounts and access the private features.
- Catalog page showcases a collection of user submitted articles.

### Private Section (accessible only to logged-in users):
- Article details pages display the full content of each childcare tip.
- Users can add new articles.
- Existing articles can be updated or deleted by their creators.
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
