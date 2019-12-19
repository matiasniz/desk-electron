// (function() {
"use strict";
let express = require("express");
let robotjs = require("robotjs");

var listeners = [];

var SerialPort = require("serialport");
// callback approach
SerialPort.list()
  .then(ports => {
    console.log(ports);

    ports.map(p => {
      try {
        var newport = new SerialPort(p.path, {
          baudRate: 9600
        });
        newport.on("open", () => console.log("open " + p.path));
        newport.on("error", function(err) {
          console.log(err); // THIS SHOULD WORK!
        });
        newport.on("data", data => {
          var textChunk = data.toString("utf8");
          console.log(textChunk);
          if (textChunk.length === 1) {
            try {
              robotjs.keyTap(textChunk);
            } catch (err) {
              console.log(err);
            }
          }
        });

        listeners.push(newport);
      } catch (err) {
        console.log({ err });
      }
    });
  })
  .catch(err => {
    console.log(error);
  });

let app = express();

app.get("/:code", async (req, res) => {
  try {
    robotjs.keyTap(req.params.code);
  } catch (err) {
    console.log(err);
  }
  res.end("ok");
});

app.get("*", function(req, res) {
  res.send("Bienvenido al programa de marce desk");
});
let server = app.listen(8080, function() {
  console.log("listening on port " + server.address().port);
});
//   module.exports = app;
// })();
