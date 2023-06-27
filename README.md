# Qquiz

Qquiz is a quiz making and sharing web application that allows users to create custom quizzes on any topic, invite friends to take them, and see who reigns as the trivia champion.

![Qquiz logo](https://imgur.com/a5uotMs.png)

## Table of Contents

- [Team Members](#team-members)
- [Learning Objectives](#learning-objectives)
- [Technologies Used](#technologies-used)
- [Third Party Services Used](#third-party-services-used)
- [API Endpoints](#api-endpoints)
- [Mockups](#mockups)
- [Work Schedule](#work-schedule)
- [Full Report](#full-report)
- [GitHub Repository](#github-repository)
- [Branches](#branches)
- [Proper Commit Type Prefixes](#proper-commit-type-prefixes)
- [Example of a Proper Commit Message](#example-of-a-proper-commit-message)
- [QQUIZ Environment Variables](#qquiz-environment-variables)

## Team Members

- Fredrick Onyango: [click to owner](https://github.com/aTfure)
- Fullstack Software Engineer from Kenya, with a keen eye on powerful APIs
- Oscar Tiego: [click to owner](https://github.com/Tom-254)
- Fullstack Software Engineer from Kenya, with a keen eye on beautiful designs

## Learning Objectives

- Learning how to accurately define and plan the scope of a project to ensure that it meets the MVP needs and expectations.
- Learning how to design and implement a RESTful API that allows for easy and efficient communication between different parts of a system or between different systems.
- Learning how to use the React JavaScript library to build user interfaces and manage the state of an application.
- Learning how to deploy a website to a server and make it accessible to users on the internet.

## Technologies Used

- React: JavaScript library for building interfaces.
- Redux Toolkit: JavaScript library for managing application state.
- Flask: Python micro web framework.
- MongoDB: Cross-platform document-oriented database program.
- SQLAlchemy: Python SQL toolkit and object-relational mapper.

## Third Party Services Used

- Imgur Image API: Provides a rich set of APIs that allows developers to programmatically interact with the platform's features, including image uploading, album creation, and user authentication. This would be used for image storage in the application.
- Mailtrap API: Email API/SMTP that does the job reaching recipients’ inboxes just in time. It ensures high deliverability by default. This would be used to send emails in the application.

## API Endpoints

The Qquiz API provides the following endpoints:

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | /users | Create a new user account |
| POST | /users/login | Authenticate a user and log them in |
| GET | /quizzes | Retrieve a list of all quizzes |
| POST | /quizzes | Create a new quiz |
| GET | /quizzes/{quizId} | Retrieve a specific quiz by its ID |
| PUT | /quizzes/{quizId} | Update a specific quiz by its ID |
| DELETE | /quizzes/{quizId} | Delete a specific quiz by its ID |
| GET | /quizzes/{quizId}/questions | Retrieve a list of all questions for a specific quiz |
| POST | /quizzes/{quizId}/questions | Add a new question to a specific quiz |
| GET | /quizzes/{quizId}/questions/{questionId} | Retrieve a specific question by its ID |
| PUT | /quizzes/{quizId}/questions/{questionId} | Update a specific question by its ID |
| DELETE | /quizzes/{quizId}/questions/{questionId} | Delete a specific question by its ID |

## Mockups

The mockups for the Qquiz web application are available [here](https://www.figma.com/proto/rrWVmmjfFGtvrqeDmnqMWB/Qquiz?page-id=147%3A1364&type=design&node-id=147-1365&viewport=417%2C147%2C0.02&scaling=scale-down-width).

## Work Schedule

The work schedule for the Qquiz project is available [here](https://trello.com/b/2ItYkHru/webstack-portfolio-project-alx).

## Full Report

The full report of the Qquiz project is available [here](https://docs.google.com/presentation/d/1v_EXXeENf_F3YDmbsBOdijNA5gDmViT3C-c9hNrdYZI/edit?usp=sharing). It contains the details of the developments, highlighting successes, challenges, areas for improvement, lessons learned, and future steps for the project.

## GitHub Repository

The GitHub repository for the Qquiz project is available [here](https://github.com/Tom-254/qquiz/).

## Branches

The Qquiz project uses the following branches:

- development: The branch where new features and functionalities are developed and tested before being merged to the production branch.
- production: The branch where the stable and ready-to-deploy version of the project is maintained. It reflects the current state of the website on the server.
- qapi: The branch where the Qquiz API is developed and tested. It contains the Flask application and the SQLAlchemy models for the database.
- docs: The branch where the documentation and readme files for the project are created and updated. It contains the information about the project, its objectives, technologies, endpoints, mockups, report, and repository.
