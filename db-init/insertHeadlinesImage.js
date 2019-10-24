const pgp = require("pg-promise")();
const postdb = pgp(
  "postgres://postgres:123456@localhost:5432/crickstrait_capstone"
);
var fs = require("fs");
var imageAsBase64 = fs.readFileSync(
  process.cwd() + "\\headlines\\t1.jpg",
  "base64"
);

try {
  postdb.any(
    `update team set team_background='${imageAsBase64}' where team_id=24`
  );
  console.log("Inserted");
} catch (err) {
  console.log(err);
}

