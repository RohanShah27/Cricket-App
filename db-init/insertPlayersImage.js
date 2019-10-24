const pgp = require("pg-promise")();
const postdb = pgp(
  "postgres://postgres:123456@localhost:5432/crickstrait_capstone"
);
var fs = require("fs");
var imageAsBase64 = fs.readFileSync(
  process.cwd() + "\\players\\aitken.jpg",
  "base64"
);

try {
  postdb.any(
    `update player set player_image='${imageAsBase64}' where player_id=924`
  );
  console.log("Inserted");
} catch (err) {
  console.log(err);
}
