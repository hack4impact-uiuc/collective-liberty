const router = require('express').Router();
const User = require('../models/User');
const errorWrap = require('../middleware/errorWrap');

router.get(
  '/',
  errorWrap(async (req, res) => {
    const { role } = req.query;
    const query = {};

    if (role) {
      query.role = role;
    }

    const users = await User.find(query);
    res.send(users);
  })
);

router.get(
  '/:id',
  errorWrap(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
  })
);

router.post(
  '/delete',
  errorWrap(async (req, res) => {
    const { ids } = req.body;
    const resBody = { code: 200, failed: [] };

    ids.reduce(async (body, _id) => {
      await User.remove({ _id }, (err) => {
        body.code = 401;
        body.failed.push({ _id, err });
      });

      return body;
    }, resBody);

    res.status(resBody.code).send(resBody);
  })
);

router.post(
  '/updateRoles',
  errorWrap(async (req, res) => {
    const { id_to_roles } = req.body;

    Object.entries(id_to_roles).forEach(async ([_id, role]) => {
      await User.findOneAndUpdate({ _id }, { role });
    });

    res.status(200).json({ code: 200 });
  })
);

module.exports = router;
