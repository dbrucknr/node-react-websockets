const { validationResult } = require("express-validator");

exports.validate = (req, res, next) => {
  console.log('validate', req.body)
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
