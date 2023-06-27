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
- hotfix: The branch where urgent fixes or patches are applied to the production branch.

## Proper Commit Type Prefixes
- feat: A new feature or functionality has been added.
- fix: A bug or issue has been fixed.
- docs: Changes have been made to documentation or comments in the code.
- style: Changes to the code that do not affect its functionality, such as formatting or styling.
- refactor: Code has been refactored or restructured, without changing its functionality.
- perf: Changes made to improve the performance of the code.
- test: Changes made to testing or test files.
- chore: Changes made to build, tooling, or other non-code related tasks.
- build: Changes to build process, scripts or configuration files.
- ci: Changes to Continuous Integration configuration files or scripts.
- revert: Reverting a previous commit.
- merge: Merging branches or changes.
- release: A new release or version has been created.
- deps: Updates or changes to dependencies.

## Example of a Proper Commit Message
A proper commit message should follow this format:

`<type>: <subject>; <description>; branch: <branch name>`

where `<type>` is one of the prefixes listed above, `<subject>` is a concise summary of the changes made, `<description>` is an optional explanation of the changes in more detail, and `<branch name>` is the name of the branch where the commit was made.

For example:

- "feat: Add user authentication; improved security for email and password logins; branch: feature/user-auth"
- "git commit -m "feat: Add Necessary Fonts; added appropriate fonts; branch: origin/dev""

## QQUIZ Environment Variables
Environment variables are used to store sensitive or configurable information that should not be exposed in the code. They are usually set in a separate file or in the terminal before running the application. For QQUIZ, the following environment variables are required:

- QQUIZ_MYSQL_USER: The username for accessing the MySQL database
- QQUIZ_MYSQL_PWD: The password for accessing the MySQL database
- QQUIZ_MYSQL_HOST: The host name or IP address of the MySQL database server
- SESSION_NAME: The name of the session cookie for user authentication
- QQUIZ_MYSQL_DB: The name of the MySQL database for QQUIZ
- QQUIZ_API_HOST: The host name or IP address of the QQUIZ API server
- QQUIZ_API_PORT: The port number of the QQUIZ API server
- SESSION_DURATION: The duration of the session cookie in minutes

To set these environment variables in Ubuntu 22.04, you can use the `export` command in the terminal, followed by the variable name and value. For example:

`export QQUIZ_MYSQL_USER=qquiz_dev`

To run the QQUIZ API server, you need to use this command:

`python3 -m api.v1.app`

To ensure that mysqlclient installs in Ubuntu 22.04, you need to run this command:

`sudo apt-get install build-essential libapache2-mod-wsgi-py3 libmysqlclient-dev`
