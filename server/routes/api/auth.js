const Joi = require("joi");
//validation of the email and password fields
module.exports = user => {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(30)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(300)
      .required()
  };
  return Joi.validate(user, schema);
};
//validation of the team_name field
// module.exports = team => {
//   const schema = {
//     team_name: Joi.string()
//       .min(2)
//       .max(30)
//       .required()
//   };
//   return Joi.validate(team, schema);
// };
