-- Creates the database qquiz_dev_db with specified paramenters
-- Create database
CREATE DATABASE IF NOT EXISTS qquiz_dev_db;
-- Creates user if doesn't exist
CREATE USER IF NOT EXISTS 'qquiz_dev'@'localhost' IDENTIFIED BY 'Testing254@!';
-- Grants privileges to user on database
GRANT ALL PRIVILEGES ON qquiz_dev_db.* TO 'qquiz_dev'@'localhost' WITH GRANT OPTION;
-- Grants select privileges to user on performance_schema database
GRANT SELECT ON performance_schema.* TO 'qquiz_dev'@'localhost' WITH GRANT OPTION;

-- Flush privileges
FLUSH PRIVILEGES;

ALTER USER 'qquiz_dev'@'localhost'
IDENTIFIED WITH mysql_native_password BY 'Joshuat25422?*)';