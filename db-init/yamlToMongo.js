var yaml = require("js-yaml");
var fs = require("fs");
const { execSync } = require("child_process");

const main = () => {
  let i = 1;
  try {
    fs.readdir("yaml-t20-all", (err, files) => {
      if (err) {
        return console.log("error" + err);
      }
      // iterate through all the files in the directory
      files.forEach(file => {
        var doc = yaml.load(fs.readFileSync("yaml-t20-all/" + file));

        //  writing json file to json folder
        const converted = fs.writeFileSync(
          "json/converted_file" + i + ".json",
          JSON.stringify(doc)
        );
        console.log("converted file ", i);
        i++;
      });

      console.log(
        "\x1b[32m\x1b[2m%s\x1b[0m",
        "converted all the files to json"
      );

      console.log(
        "\x1b[34m%s\x1b[0m",
        "\nEntering json data to mongo.\nThis might take time, depends on your device.\n"
      );

      // executing shell command to import json file in mongo from json folder
      execSync(
        // executes mongoimport for all the files in json folder
        "for %i in (json\\*) do (mongoimport --db crickstrait_dbs --collection matchinfo --file %i)",
        (err, stdout, stderr) => {
          if (err) {
            console.error(err);
          } else {
            // consoles the output of the command
            console.log(`stdout : ${stdout}`);

            // consoles the error of the command
            console.log(`stderr : ${stderr}`);
          }
        }
      );

      // executes shell command to create postgres data base from crickstrait_dbs.sql file
      execSync(
        "psql -U postgres -f crickstrait_dbs.sql",
        (err, stdout, stderr) => {
          if (err) {
            console.error("this", err);
          } else {
            console.log(`stdout : ${stdout}`);
            console.log(`stderr : ${stderr}`);
          }
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
};

main();
