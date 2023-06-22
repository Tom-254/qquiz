# QQuiz - Quiz Creating & Sharing Application

## Branches
- development
- production
- hotfix

## Proper commit type prefixes
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

## Example of a Proper commit message"
- "feat: Add user authentication; improved security for email and password logins; branch: feature/user-auth"
- "git commit -m "feat: Add Necessary Fonts; added appropriate fonts; branch: origin/dev""

# QQUIZ Environment Variables
#### export QQUIZ_MYSQL_USER=qquiz_dev export QQUIZ_MYSQL_PWD="Joshuat25422?*)" export QQUIZ_MYSQL_HOST=localhost SESSION_NAME="_my_session_id" export QQUIZ_MYSQL_DB=qquiz_dev_db export QQUIZ_API_HOST=0.0.0.0 export QQUIZ_API_PORT=5000 SESSION_DURATION=60 python3 -m api.v1.app

### N/B Run this to ensure mysqlclient installs in Ubuntu22.04
# sudo apt-get install build-essential libapache2-mod-wsgi-py3 libmysqlclient-dev