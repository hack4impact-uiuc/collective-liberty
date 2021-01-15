<p align="center"><a align="center" href="https://collectiveliberty.org/">
<img align="center" width="300" height="135" src="https://collectiveliberty.org/wp-content/uploads/2020/04/cropped-CollectiveLiberty_FullLogo_01_hi.png"
style="margin-bottom:5px;"
/></a></p>
<h1 align="center">Collective Liberty</h1>
<p align="center">A <a href="https://uiuc.hack4impact.org/">Hack4Impact UIUC </a> project.</p>

<p align="center">
    <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square">
</p>

## About

Collective Liberty collects and analyzes data to assist with stopping human trafficking. Founded in 2018, this Texas and DC-based organization develops new tactics -- including new litigation approaches, innovative law and code enforcement tactics, and policy change -- that makes it difficult for traffickers to continue to operate. They work with law enforcement, public policy advocates, survivors, and social service organizations by providing them with data, intelligence, and best practices while leveraging technology and machine learning to do so.

One of the ways they hope to scale is expanding to the general public in an informative and engaging manner. Collective Liberty currently has no public-facing products that can educate everyday people on human trafficking and how to support efforts combatting them. Additionally, while Collective Liberty currently relies on funding and support from the Texas governor’s office, prize money, individual donors, and fundraisers, a public-facing app could garner additional interest in donations or advocacy

## Members

<table align="center">
  <tr>
    <td align="center">
      <a href=""><img
          src="https://uiuc.hack4impact.org/images/people/rebecca_xun.jpg"
          width="100px"
          alt="Rebecca Xun"
        /><br /><b>Rebecca Xun</b></a
      ><br /><sub>Product Manager</sub>
    </td>
    <td align="center">
      <a href=""><img
          src="https://uiuc.hack4impact.org/images/people/kendall_hester.jpg"
          width="100px"
          alt="Kendall Hester"
        /><br /><b>Kendall Hester</b></a
      ><br /><sub>Tech Lead</sub>
    </td>
    <td align="center">
      <a href=""><img
          src="https://uiuc.hack4impact.org/images/people/siraj_chokshi.jpg"
          width="100px"
          alt="Siraj Chokshi"
        /><br /><b>Siraj Chokshi</b></a
      ><br /><sub>Product Designer</sub>
    </td>
    <td align="center">
      <a href=""><img
          src="https://uiuc.hack4impact.org/images/people/anooj_lal.jpg"
          width="100px"
          alt="Anooj Lal"
        /><br /><b>Anooj Lal</b></a
      ><br /><sub>Software Developer</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href=""><img
          src="https://uiuc.hack4impact.org/images/people/albert_cao.jpg"
          width="100px"
          alt="Albert Cao"
        /><br /><b>Albert Cao</b></a
      ><br /><sub>Software Developer</sub>
    </td>
    <td align="center">
      <a href=""><img
          src="assets/kelly.jpg"
          width="100px"
          alt="Kelly Dunleavy"
        /><br /><b>Kelly Dunleavy</b></a
      ><br /><sub>Software Developer</sub>
    </td>
    <td align="center">
      <a href=""><img
          src="assets/luciana.jpg"
          width="100px"
          alt="Luciana Toledo-López"
        /><br /><b>Luciana Toledo-López</b></a
      ><br /><sub>Software Developer</sub>
    </td>
    <td align="center">
      <a href=""><img
          src="assets/ayan.jpg"
          width="100px"
          alt="Ayan Mallik"
        /><br /><b>Ayan Mallik</b></a
      ><br /><sub>Software Developer</sub>
    </td>
  </tr>
</table>

## Setup

### Prerequisites
* [git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/)
* [Docker Desktop](https://www.docker.com/products/docker-desktop)

This project uses [docker-compose](https://docs.docker.com/compose/install/) to run the backend and database locally and [concurrently](https://www.npmjs.com/package/concurrently) to run everything at once.

### Clone repository

To get a copy of the project, go into your terminal and run:
```bash
$ git clone https://github.com/hack4impact-uiuc/collective-liberty.git
```

### Creating `.env` files
We use external integrations with Google OAuth and [Mapbox](https://www.mapbox.com/), both of which require special keys to access their services.

These keys, along with other information, are stored in `.env` files. Both `/api` and `/client` contain their own `.env` file.

#### `/api/.env`
```
AUTH_CLIENT_ID=
AUTH_CLIENT_SECRET=
SESSION_SECRET=
API_PORT=5000
MONGO_URI=mongodb://db:27017
TEST_CLIENT_HOST=http://localhost:3000
AUTH_CALLBACK_URI=http://localhost:5000/api/login/callback
```

`AUTH_CLIENT_ID` and `AUTH_CLIENT_SECRET` can be retrieved from the [Google API Console](https://console.developers.google.com/). Check out [this tutorial](https://developers.google.com/identity/sign-in/web/sign-in#create_authorization_credentials) for more information.

`MONGO_URI` currently points to a local docker instance. To point to a cloud host, simply replace the connection string.

### `/client/.env`
```
REACT_APP_MAPBOX_API_KEY=
REACT_APP_TEST_API_HOSTNAME=http://localhost:5000
```

Create a [Mapbox](https://www.mapbox.com/) account to obtain an API key.

### Usage
First ever run @ `/`:
```bash
$ yarn && yarn start
```


Start up project @ `/`:
```bash
$ yarn start
```

To separately start up backend @ `/`:
```bash
$ docker-compose up
```

Stop backend @ `/`:
```bash
$ docker-compose down
```

Stop backend and remove volumes (old data) @ `/`:
```bash
$ docker-compose down -v
```

## Troubleshooting
Make sure that **Docker Desktop** is running in the background before running any commands.

## Technologies
### Frontend
* [React](https://reactjs.org/) for creating a single page application.
* [Mapbox](https://www.mapbox.com/) for the map view.
* [Deck.gl](https://deck.gl/) to display dynamic layers on top of original map.
* [Tailwind CSS](https://tailwindcss.com/) for convienient prototyping. 
* [react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2) for dynamic charts.

### Backend
* [Express.js](https://expressjs.com/) for creating a web server.
* [Mongoose](https://mongoosejs.com/) to connect to and manipulate MongoDB database.
* [Helmet.js](https://helmetjs.github.io/) to auto-add security headers.
* [fast-csv](https://c2fo.github.io/fast-csv/) to parse incoming CSV.
* [Passport.js](http://www.passportjs.org/) for authentication with Google.
* [express-session](https://www.npmjs.com/package/express-session) for handling user sessions.
* [multer](https://www.npmjs.com/package/multer) for handling uploads.

### Testing
* [Cypress](https://www.cypress.io/)

<hr/>

[MIT](./LICENSE) licensed · © 2020 [Hack4Impact UIUC](https://uiuc.hack4impact.org/)