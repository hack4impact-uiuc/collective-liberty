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
* [Docker Desktop](https://www.docker.com/products/docker-desktop)

This project uses [docker-compose](https://docs.docker.com/compose/install/) to run local development environment.

### Usage

Start up project:
```bash
$ docker-compose up
```

Stop project:
```bash
$ docker-compose down
```

Stop project and remove volumes (old data):
```bash
$ docker-compose down -v
```

## Technologies
### Frontend
* [React](https://reactjs.org/)
* [Mapbox](https://www.mapbox.com/)
* [deck.gl](https://deck.gl/)

### Backend
* [express.js](https://expressjs.com/)
* [mongoose](https://mongoosejs.com/)

### Testing
* [Cypress](https://www.cypress.io/)

<hr/>

[MIT](./LICENSE) licensed · © 2020 [Hack4Impact UIUC](https://uiuc.hack4impact.org/)