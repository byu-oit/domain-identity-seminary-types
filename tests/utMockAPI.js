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
const expect            = require('chai').expect;
const byuApi            = require('node-byuapi-framework');
const ut                = require('./testUtil.js');


// ----- University Applications API Unit Tests -----
describe('Mock API Unit Tests', function () {
  // ----- Set up the local test server -----
  let api;
  const config = {
    controllers: './controllers',
    swagger: './swagger.json',
    ignoreBasePath: true,
    development: true
  };
  before(() => {
    api = byuApi.server(config);
  });
  afterEach(() => console.log('\n'));


  // ----- API Root -----
  it("GET / 200", () => {
    return api.request({method: 'GET', path: '/', query: { mock: '' }})
      .then(res => { ut.testMockResponseSuccess(res, 200); });
  });
  it("POST /  201", () => {
    return api.request({
      method: 'POST', path: '/',
      query: { mock: '' },
      body: {
        "seminary_type": "EM",
        "description": "EM",
        "long_description": "EM",
        "active_status": "Y"
      }
    })
      .then(res => {
        expect(res.statusCode).to.equal(201);
      });
  });

  // ----- Singleton Key -----
  it("GET /{seminary_type} 200", () => {
    return api.request({method: 'GET', path: '/EM', query: { mock: '' }})
      .then(res => { ut.testMockResponseSuccess(res, 200); });
  });
  it("PUT /{seminary_type}  200", () => {
    return api.request({ method: 'PUT', path: '/EM', query: { mock: '' },
      body: {
        "seminary_type": "EM",
        "description": "EM",
        "long_description": "EM",
        "active_status": "Y"
      }})
      .then(res => { ut.testMockResponseSuccess(res, 200); });
  });
  it("DELETE /{seminary_type} 204", () => {
    return api.request({ method: 'DELETE', path: '/EM', query: { mock: '' } })
      .then(res => { ut.testMockResponseSuccess(res, 204); });
  });

  // ----- Country Code Logs -----
  it("GET /{seminary_type}/logs 200", () => {
    return api.request({ method: 'GET', path: '/EM/logs', query: { mock: '' } })
      .then(res => { ut.testMockResponseSuccess(res, 200); });
  });

  // ----- Missing Body -----
  it("POST / 400 Missing Body", () => {
    return api.request({
      method: 'POST', path: '/',
      query: { mock: '' }
    })
      .then(res => {
        ut.testMockResponseMissingRequiredBody(res);
      });
  });
  it("PUT /{seminary_type} 400 Missing Body", () => {
    return api.request({ method: 'PUT', path: '/EM', query: { mock: '' }})
      .then(res => { ut.testMockResponseMissingRequiredBody(res); });
  });

});
