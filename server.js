/**
 *  @license
 *    Copyright 2016 Brigham Young University
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 **/
'use strict';
const path              = require('path');
const api               = require('node-byuapi-framework');
const express           = require('express');
const bodyParser        = require('body-parser');
// ----- Set up the Express server -----
const app = express();

app.get('/xhealth', (req, res) => {
  res.sendStatus(200);
});

app.use(bodyParser.json());
app.use(api.express({
  controllers: path.resolve(__dirname, './controllers'),
  swagger: path.resolve(__dirname, './swagger.json'),
  ignoreBasePath: false,
  validateExamples: true,
  development: true
}));
let port = process.env.PORT || 8081;
app.listen(port, function () {
  console.log("Beginning server");
  console.log("    [INFO] Server running on port: " + port);
  console.log("    [INFO] Controller path = " + path.resolve(__dirname, './controllers'));
  console.log("    [INFO] Swagger path = " + path.resolve(__dirname, './swagger.json'));
});
