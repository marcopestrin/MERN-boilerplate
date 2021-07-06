# MERN Boilerplate

MERN Boilerplate is a project made with the follow technologies:
- Express JS
- React JS
- Redux
- MongoDB / Mongoose
- Typescript
- NodeJs
## Installation
set .env file in root with this template:
```bash
CLUSTER=
NODE_ENV=
PORT=
FRONTEND_URL=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
ACCESS_TOKEN_LIFE=
ADMIN_PASSWORD=
MAILER_HOST=
MAILER_PORT=
MAILER_USER=
MAILER_PASSWORD=
PUBLIC_URL=
```
set .env file in /client with this template:
```bash
REACT_APP_BASE_URL_SERVER=
```
run to CLI:
```bash
npm install
npm run dev / npm run start
```
## Demonstrations
- Authentication with JWT (Web JSON Token)
- API documentation with Swagger model
- Data typing with Typescript
- User registration flow with MVC pattern (Model-View-Controller)
- CORS management (Cross-Origin Resource Sharing)
- Project tree with code subdivision
- Detailed and generic management of HTTP call status codes
- Personal data managed through environment variables
- CRUD pattern on model (Create, Read, Update, Delete)
- Input validated by a generic validator

## Next Steps
- Improve log management system
- Export data in another format (might be CSV)
- Avoid crashing whenever there is an error

## Changelog by month
| Month | Description |
| --- | --- |
| March 2021 | <ul> <li>Authentication system </li><li> CRUD API on User Mode </li><li> First Deploy on Heroku </li><li> Creating frontend (login/signup/logout) </ul>|
| April 2021 | <ul> <li>Handle function http request</li><li>Frontend alias import</li><li>Split controller-services backend</li><li>Created custom token collection in DB</li><li>Added Joi Validator for endpoint input</li>|
| May 2021 | <ul><li>Added interceptors to manage token renewal</li><li>Frontend: Ability to change the information of your user and other users if you are admin</li><li>Created public kanban board for frontend and backend</li></ul>|
| June 2021 | <ul><li>Added Joi validator each frontend form</li><li>Created notifications reducer (Frontend) for popupNotify component</li><li>When update a password of a user, you must add the password of current logged user</li><li>When edit or add a new user, check if email and username are available to avoid duplicate</li><li>Auto-remove token expired</li><li>when I remove a user, I also remove all tokens associated with it</li></ul>|

## Others
This project are made in my free time. Currently under construction by myself.
If you have any suggestions to improve the project or noticed errors please make a pull-request or send me an email to: pestrinmarco@gmail.com

## Mood
Done is better than perfect