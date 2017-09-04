const bestConfig = require('../');
const be = require('bejs');
const fs = require('fs');
const os = require('os');

describe('best-config', function () {
    it('load, should be return a json', function () {
        const config = bestConfig({
            path: './test/texture/config'
        });
        console.log(config);
        be.err.object(config);
    });
    it('load exactly files, should be return a json', function () {
        const config1 = bestConfig({
            file: 'server1',
            path: './test/texture/config'
        });
        const config2 = bestConfig({
            file: 'server2',
            path: './test/texture/config'
        });
        console.log(config1);
        console.log(config2);
        be.err.object(config1);
        be.err.object(config2);
        be.err.equal(config1.foo1, 'one1');
        be.err.equal(config2.foo2, 'one2');
    });
    it('wrong path, should be return error', function (done) {
        try {
            bestConfig({
                path: './test/texture/config23'
            });
        } catch (e) {
            console.log(e.message);
            be.err(done).equal('the config path not exists', e.message);
        }
    });
    it('wrong filename, should be return error', function (done) {
        try {
            bestConfig({
                file: 'serverA',
                path: './test/texture/config'
            });
        } catch (e) {
            console.log(e.message);
            be.err(done).equal('the config file at:./test/texture/config/serverA.json not exists', e.message);
        }
    });
    it('empty config folder, should be return error', function (done) {
        try {
            bestConfig({
                path: './test/texture/emptyFolder'
            });
        } catch (e) {
            console.log(e.message);
            be.err(done).equal('empty folder', e.message);
        }
    });
    it('global name not allowed, should be return error', function (done) {
        try {
            bestConfig({
                path: './test/texture/config',
                addToGlobalWithName: 'process'
            });
        } catch (e) {
            console.log(e.message);
            be.err(done).equal('you can not add to the global object with this name: process', e.message);
        }
    });
    it('undefined append key, should be return error', function (done) {
        try {
            bestConfig({
                path: './test/texture/config',
                append: {
                    key: undefined,
                    file: 'production'
                }
            });
        } catch (e) {
            console.log(e.message);
            be.err(done).equal('append key is required', e.message);
        }
    });
    it('append to exists key, should be return error', function (done) {
        try {
            bestConfig({
                file: 'server1',
                path: './test/texture/config',
                append: {
                    key: 'foo1',
                    file: 'production'
                }
            });
        } catch (e) {
            console.log(e.message);
            be.err(done).equal('a key with name foo1 already exists, please change the key name', e.message);
        }
    });
    it('append file not exists, should be return error', function (done) {
        try {
            bestConfig({
                file: 'server1',
                path: './test/texture/config',
                append: {
                    key: 'common2',
                    file: 'production2'
                }
            });
        } catch (e) {
            console.log(e.message);
            be.err(done).equal('the file at:./test/texture/config/production2.json not exists', e.message);
        }
    });
    it('append file, should be return object', function () {

        const config = bestConfig({
            file: 'server1',
            path: './test/texture/config',
            append: {
                key: 'common',
                file: 'production'
            }
        });

        console.log(config);
        be.err.not.undefined(config.common.foo);
        be.err.equal(config.common.foo, 'production');

    });
    it('invalid file, should be return error', function (done) {
        try {
            bestConfig({
                file: 'invalid',
                path: './test/texture/config'
            });
        } catch (e) {
            console.log(e.message);
            be.err(done).equal('invalid configuration file: ./test/texture/config/invalid.json', e.message);
        }
    });
    it('append invalid file, should be return error', function (done) {
        try {
            bestConfig({
                file: 'server1',
                path: './test/texture/config',
                append: {
                    file: 'invalid'
                }
            });
        } catch (e) {
            console.log(e.message);
            be.err(done).equal('invalid configuration file: ./test/texture/config/invalid.json', e.message);
        }
    });
});

describe('best-config, load from hostname', function () {

    before(function () {
        fs.writeFileSync('./test/texture/config/'+os.hostname()+'.json', '{"foo":"one"}');
    });

    it('load, should be return a json', function () {
        const config = bestConfig.fromHostname({
            path: './test/texture/config'
        });
        console.log(config);
        be.err.object(config);
        be.err.not.undefined(config.foo);
    });
});

describe('best-config, load from ENV', function () {

    before(function () {
        process.env.NODE_ENV = 'production'
    });

    it('load, should be return a json', function () {
        const config = bestConfig.fromEnv({
            path: './test/texture/config'
        });
        console.log(config);
        be.err.object(config);
        be.err.equal(config.foo, 'production');
    });
});