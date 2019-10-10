//if problem exists this page will show up
module.exports = (err, req, res, next) => {
  console.log(err);
  res
    .status(err.statusCode ? err.statusCode : 500)
    .send(
      err.customMessage ? err.customMessage : " internal error,contact admin"
    );
};
