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
## Environment variables
| Key | Example | Description |
| --- | --- | --- |
| CLUSTER | false | Start backend with or without cluster |
| NODE_ENV | development | Run in "development" mode or in "production" mode |
| PORT | 8000 | Port used by ExpressJS |
| FRONTEND_URL | http://localhost:3000 | Url frontend associated with it |
| ACCESS_TOKEN_SECRET | example | just a simple string to generate a token |
| REFRESH_TOKEN_SECRET | example2 | just a simple string to generate a token |
| ACCESS_TOKEN_LIFE | 86400000 | Duration time of the token expressed in milliseconds |
| REFRESH_TOKEN_LIFE | 25920000 | Duration time of the refresh token expressed in milliseconds |
| ADMIN_PASSWORD | gino | Password that accesses the services, bypassing the controls |
| MAILER_HOST | smtp.ethereal.email | Email host |
| MAILER_PORT | 432 | Email port |
| MAILER_USER | pestrinmarco@gmail.com | Email address |
| MAILER_PASSWORD | myPassword123 | Email password |
| HOST_APPLICATION | localhost | Host backend application |

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
## Changelog by month
| Month | Description |
| --- | --- |
| March 2021 | <ul> <li>Authentication system </li><li> CRUD API on User Mode </li><li> First Deploy on Heroku </li><li> Creating frontend (login/signup/logout) </ul>|
| April 2021 | <ul> <li>Handle function http request</li><li>Frontend alias import</li><li>Split controller-services backend</li><li>Created custom token collection in DB</li><li>Added Joi Validator for endpoint input</li>|
| May 2021 | <ul><li>Added interceptors to manage token renewal</li><li>Frontend: Ability to change the information of your user and other users if you are admin</li><li>Created public kanban board for frontend and backend</li></ul>|
| June 2021 | <ul><li>Added Joi validator each frontend form</li><li>Created notifications reducer (Frontend) for popupNotify component</li><li>When update a password of a user, you must add the password of current logged user</li><li>When edit or add a new user, check if email and username are available to avoid duplicate</li></ul>|
| July 2021 | <ul><li>Auto-remove token expired</li><li>When I remove a user, I also remove all tokens associated with it</li><li>Frontend: Reset password page </li><li>Added Title component and MenuAuth component</li></ul> |

## Others
This project are made in my free time. Currently under construction by myself.
If you have any suggestions to improve the project or noticed errors please make a pull-request or send me an email to: pestrinmarco@gmail.com