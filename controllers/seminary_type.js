/*
 * Copyright 2017 Brigham Young University
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
'use strict';
const controllers = require('identity-code-api-controllers');
// ----- Exported Endpoint Handlers -----
exports.getSeminaryType = controllers.getResource;

exports.getSeminaryType.mock = function (req, res) {
  console.log("Invoked getSeminaryType.mock")
  res.send(req.swagger.root['x-mock_json'].seminary_types.values[0]);
};

exports.modifySeminaryType = controllers.modifyResource;

exports.modifySeminaryType.mock = function (req, res) {
  console.log("Invoked modifySeminaryType.mock")
  res.send(req.swagger.root['x-mock_json'].seminary_types.values[0]);
};

exports.removeSeminaryType = controllers.deleteResource;

exports.removeSeminaryType.mock = function (req, res) {
  console.log("Invoked removeSeminaryType.mock")
  res.status(204).send();
};
