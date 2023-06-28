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
| POST  | /auth_session/login | Validate the user's email and password, create a session for the authenticated user, and set a cookie with the session ID. Return a JSON representation of the user object or an error message. |
| POST | users | Create a new user account with some data and return a JSON representation of the user object or an error message. |
| POST | /category | Create a new category with a given name and return a JSON representation of the category object or an error message. |
| POST | /quiz_general_detail | Create a new quiz with a given title, category_id, description, user_id, and visibility and return a JSON representation of the quiz object or an error message. |
| GET | /public_quiz_groups | Return a paginated list of all public quizzes with their general details, questions, and choices as a JSON object or an error message. |
| PUT | /update_quiz_group/<general_detail_id> | Update a specific quiz group by its ID with some new data and return a JSON representation of the updated quiz group object or an error message. |
| DELETE | delete_quiz_group/<general_detail_id> | Delete a specific quiz group by its ID and return an empty JSON object or an error message. |
| POST | /quiz | Create a new quiz with some data and return a JSON representation of the quiz object or an error message. |
| GET | /quiz/<quiz_id> | Retrieve a specific quiz by its ID and return a JSON representation of the quiz object or an error message |
| PUT | /quiz_general_detail/<detail_id> | Update a specific quiz by its ID with some new data and return a JSON representation of the updated quiz object or an error message. |
| DELETE | /quiz_general_detail/<detail_id> | Delete a specific quiz by its ID and return an empty JSON object or an error message. |
| POST | /submit_answers | Submit the user's answers to a quiz and return a JSON representation of the score or an error message. |
| GET | /get_user_quiz_groups_results | Return a list of all quiz groups that the user has answered and their scores as a JSON object or an error message. |
| GET | /get_user_quiz_group_result/<general_detail_id> | Return the result of a specific quiz group that the user has answered and their score as a JSON object or an error message. |
| DELETE | /quiz/<quiz_id> | Delete a specific quiz by its ID and return an empty JSON object or an error message. |
| DELETE | /auth_session/logout | Destroy the session associated with the request and return an empty JSON object or an error message. |
| PUT | /users/<user_id> | Update a specific user by their ID with some new data and return a JSON representation of the updated user object or an error message. |
| GET | /status | Return the status of the API as a JSON object with the key "status" and the value "OK". This endpoint is important because it shows that your API is up and running and can respond to requests¹. |
| GET | /stats | Return the number of each objects in the database as a JSON object with the keys being the object names and the values being the counts. This endpoint is important because it shows how your API interacts with your database models and how you use the count method to get the statistics². |
| POST | /category | Create a new category with a given name and return a JSON representation of the category object or an error message. This endpoint is important because it shows how your application allows users to create categories for their quizzes. |
| POST | /quiz_general_detail | Create a new quiz with a given title, category_id, description, user_id, and visibility and return a JSON representation of the quiz object or an error message. This endpoint is important because it shows how your application allows users to create quizzes for their categories. |
| GET | /public_quiz_groups | Return a paginated list of all public quizzes with their general details, questions, and choices as a JSON object or an error message. This endpoint is important because it shows how your application allows users to browse and access public quizzes created by other users. |
| GET | /user_quiz_groups | Return a paginated list of all quiz groups created by the current user with their general details, questions, and choices as a JSON object or an error message. This endpoint is important because it shows how your application allows users to manage their own quiz groups. |

¹: [Blueprints and Views — Flask Documentation (1.1.x)](^1^)
²: [API — Flask Documentation (2.3.x)](^2^)

- (1) Blueprints and Views — Flask Documentation (1.1.x). https://flask.palletsprojects.com/en/1.1.x/tutorial/views/.

- (2) API — Flask Documentation (2.3.x). https://flask.palletsprojects.com/en/2.3.x/api/.

- (3) Use a Flask Blueprint to Architect Your Applications. https://realpython.com/flask-blueprint/. |

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

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST  | /auth_session/login | Validate the user's email and password, create a session for the authenticated user, and set a cookie with the session ID. Return a JSON representation of the user object or an error message. |
| POST | users | Create a new user account with some data and return a JSON representation of the user object or an error message. |
| POST | /category | Create a new category with a given name and return a JSON representation of the category object or an error message. |
| POST | /quiz_general_detail | Create a new quiz with a given title, category_id, description, user_id, and visibility and return a JSON representation of the quiz object or an error message. |
| GET | /public_quiz_groups | Return a paginated list of all public quizzes with their general details, questions, and choices as a JSON object or an error message. |
| PUT | /update_quiz_group/<general_detail_id> | Update a specific quiz group by its ID with some new data and return a JSON representation of the updated quiz group object or an error message. |
| DELETE | delete_quiz_group/<general_detail_id> | Delete a specific quiz group by its ID and return an empty JSON object or an error message. |
| POST | /quiz | Create a new quiz with some data and return a JSON representation of the quiz object or an error message. |
| Branch | Description |
| ------ | ----------- |

| development | The branch where new features and functionalities are developed and tested before being merged to the production branch. |
| production | The branch where the stable and ready-to-deploy version of the project is maintained. It reflects the current state of the website on the server. |
| qapi | The branch where the Qquiz API is developed and tested. It contains the Flask application and the SQLAlchemy models for the database. |
| docs | The branch where the documentation and readme files for the project are created and updated. It contains the information about the project, its objectives, technologies, endpoints, mockups, report, and repository. |
| hotfix | The branch where urgent fixes or patches are applied to the production branch. |

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
