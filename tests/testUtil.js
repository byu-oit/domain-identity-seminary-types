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
const expect            = require('chai').expect;
// ----- Test Helper Functions -----
function testResponseError(res, returnCode) {
  expect(res.statusCode).to.equal(returnCode);
  if (res.body) {
    let body = JSON.parse(res.body);
    expect(body.validation_response.code).to.equal(returnCode);
  }
}
exports.testResponseError = testResponseError;
function testMockResponseSuccess(res, returnCode) {
  expect(res.statusCode).to.equal(returnCode);
  if (res.body) {
    let body = JSON.parse(res.body);
    expect(body.metadata.validation_response.code).to.equal(returnCode);
  }
}
exports.testMockResponseSuccess = testMockResponseSuccess;
function testMockResponseBasicSuccess(res) {
  expect(res.statusCode).to.equal(200);
  if (res.body) {
    // Note: the metadata object is nested in the basic object
    let body = JSON.parse(res.body);
    expect(body.basic.metadata.validation_response.code).to.equal(200);
  }
}
exports.testMockResponseBasicSuccess = testMockResponseBasicSuccess;
function testMockResponseMissingRequiredBody(res) {
  expect(res.statusCode).to.equal(400);
  if (res.body) {
    expect(res.body).to.have.string('Missing required body');
  }
}
exports.testMockResponseMissingRequiredBody = testMockResponseMissingRequiredBody;
function testMockResponsePOSTSuccess(res) {
  expect(res.statusCode).to.equal(201);
  if (res.body) {
    let body = JSON.parse(res.body);
    expect(body.metadata.validation_response.code).to.equal(200);
  }
}
exports.testMockResponsePOSTSuccess = testMockResponsePOSTSuccess;
// ----- Test the helper functions -----
describe('Test Helper Functions Unit Tests', function () {
  // ----- testResponseError -----
  it('testResponseError should verify that the statusCode and the validation_response.code match the given returnCode', () => {
    testResponseError({ statusCode: 200, body: JSON.stringify({ validation_response: { code: 200 } }) }, 200);
  });
  // ----- testMockResponseSuccess -----
  it('testMockResponseSuccess should verify that the statusCode and the validation_response.code match the given returnCode', () => {
    testMockResponseSuccess({ statusCode: 200, body: JSON.stringify({ metadata: { validation_response: { code: 200 } } }) }, 200);
  });
  // ----- testMockResponseBasicSuccess -----
  it('testMockResponseBasicSuccess should verify that the statusCode and the validation_response.code match the given returnCode', () => {
    testMockResponseBasicSuccess({ statusCode: 200, body: JSON.stringify({ basic: { metadata: { validation_response: { code: 200 } } } }) }, 200);
  });
  // ----- testMockResponseMissingRequiredBody -----
  it('testMockResponseMissingRequiredBody should verify that the statusCode and the validation_response.code match the given returnCode', () => {
    testMockResponseMissingRequiredBody({ statusCode: 400, body: 'Missing required body' });
  });
  // ----- testMockResponsePOSTSuccess -----
  it('testMockResponsePOSTSuccess should verify that the statusCode and the validation_response.code match the POST success codes', () => {
    testMockResponsePOSTSuccess({ statusCode: 201, body: JSON.stringify({ metadata: { validation_response: { code: 200 } } }) });
  })
});
