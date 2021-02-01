This project was to practice user login, MongoDB, authentication, express, Handlebars and deployment on Heroku.

This is a basic express app, using MVC.

All the routes are set up in the appRoutes file (express router), using controllers from the userController file for each route. 

In the userController file, POST, GET and errors are handled. The user gets a token (stored in cookies) once they sign up or login. In the app.js file, the token is being verified as the user navigates the app, and gives access to the portal if there is a token stored (middleware functions).

The user's input from the signup page is being hashed before it is stored in the database(in the userSchema file). When the user logs in, the schema handles the comparison of the email, as well as the password with the hashed password in the database(using bcrypt). 

Handlebars was used for the template engine. A little more set up was required than with Ejs. Some set
up was needed in the app.js file for the layout, partials and (one) helper function to insert scripts.
It seemed like inserting scripts in a partial and having a script in the view was conflicting, 
therefore no script was used in partials, but a little bit repeating yourself happened from the header
functionality (partial) having to be inserted in each view rendered.


Deployement on Heroku:
After getting error codes and failed deployement, some of these items in the list below might have 
solved the issues encontered while trying to deploy this project:
- Update of npm packages
- PORT environment variable had to be removed from the .env file and kept only in app.js
- add all environment variables to Heroku (in the project) since the .env file is being ignored
by git
- allowing all IP addresses to connect on MongoDB
- in the Procfile, changed 'web: node app.js' to 'web: npm start', and added a start script in 
package.json "start": "node app.js".

