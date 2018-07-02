const AWS = require("aws-sdk");
AWS.config.update({region: 'us-west-2'});
const SansServer = require('sans-server');
const SansServerSwagger = require('sans-server-swagger');
const wso2 = require('byu-wso2-request');
const byuJWT = require('byu-jwt');
const AuthenticationError = byuJWT.AuthenticationError;
const handelUtils = require('handel-utils');
const meta = require('meta-ngin');
const security = require('identity-codes-security');
const controllers = require('identity-code-api-controllers');
const WELLKNOWN_URL = 'https://api.byu.edu/.well-known/openid-configuration';
//const auth = require('./auth');

let clientKey;
let clientSecret;
let oauth_set = false;

controllers.init({
    bucketName: 'identity-seminary-types-dev-bucket-s3',
    storageFile: 'seminary-types.json',
    logFile: 'seminary-types-logs.json',
    resourceNameSingular: 'seminary_type',
    resourceNamePlural: 'seminary_types',
    raiseEvents: true
});


handelUtils.  fetchParameters(AWS, [`clientKey`, `clientSecret`])
    .then(params => {
        if (typeof params.clientKey !== 'string') throw new Error('Could not obtain clientKey from Parameter Store!');
        if (typeof params.clientSecret !== 'string') throw new Error('Could not obtain clientSecret from Parameter Store');
        clientKey = params.clientKey;
        clientSecret = params.clientSecret;
        console.log('Retrieved Parameter Store Variables');
        return wso2.setOauthSettings({clientKey: clientKey, clientSecret: clientSecret, wellKnownUrl: WELLKNOWN_URL});
    })
    .then(() => {
        oauth_set = true;
        console.log('Set WSO2 Oauth settings');
    })
    .catch(err => {
        setup_error = err.message;
        console.error('    [ERROR] Failed to retrieved Parameter Store variables:', err.message);
    });


const api = SansServer();
module.exports = api;

api.use((req, res, next) => {
    /*if (!oauth_set) res.status(503).send(meta(503));
    else next();*/
    next();
});

api.use((req, res, next) => {
    byuJWT.authenticate(req.headers, WELLKNOWN_URL)
        .then(verifiedJWTs => {
            req.verifiedJWTs = verifiedJWTs;
            next();
        })
        .catch(err => {
            if (err instanceof AuthenticationError) {
                return res.status(401).send(meta(401, err.message));
            }
            console.error(new Date().toISOString(), 'Unexpected error when determining authentication:\n', err);
            return res.status(500).send(meta(500, 'Error determining authentication'));
        });
});

security({
    server: api,
    wso2_request_instance: wso2,
    code_api_name: 'domain-identity-seminary_types',
});

api.use(SansServerSwagger({
    controllers: './controllers',
    development: true,
    swagger: './swagger.json',
    ignoreBasePath: false,
    exception: function (res, state) {
        res.body(meta(state.statusCode, state.body));
    }
}));