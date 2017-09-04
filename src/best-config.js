/**
 * @module best-config
 *
 * @param [opts] {Object} options
 * @param [opts.file] {string} JSON file configuration
 * @param [opts.path=config] {string} configurations folder, must be located in relative path
 * @param [opts.addToGlobalWithName] {string} key name with which referencing configuration in global object
 * @param [opts.append] {Object} options to appending another configuration file
 * @param [opts.append.key=common] {string} object key where to get the other configuration
 * @param [opts.append.file] {string} JSON file of other configuration
 *
 * @example <caption>Get basic configuration located in "config" folder</caption>
 * const config = require('best-config')({
 *      file: 'config1'
 * });
 *
 * console.log(config.foo); //=> bar
 *
 * @example <caption>Custom path "config" folder</caption>
 * const config = require('best-config')({
 *      file: 'config1',
 *      path: './custom/your-folder'
 * });
 *
 * @example <caption>Add configuration to global</caption>
 * require('best-config')({
 *      file: 'config1',
 *      addToGlobalWithName: '_MY_CONFIG_'
 * });
 *
 * console.log(_MY_CONFIG_.foo); //=> bar
 *
 * @example <caption>Append another config file</caption>
 * const config = require('best-config')({
 *      file: 'config1.json',
 *      append: {
 *          key: 'other',
 *          file: 'commons.json'
 *      }
 * });
 *
 * console.log(config.other.foo); //=> bar
 *
 */

const fs = require('fs');
const defaulty = require('defaulty');
const slash = require('super-trailing-slash');
const extname = require('default-extname')({defaultType: 'json'});
const os = require('os');

/**
 * Load configuration
 * @ignore
 * @param [opts] {Object} options
 * @param [opts.file] {string} JSON file configuration
 * @param [opts.path=config] {string} configurations folder, must be located in relative path
 * @param [opts.addToGlobalWithName] {string} key name with which referencing configuration in global object
 * @param [opts.append] {Object} options to appending another configuration file
 * @param [opts.append.key=common] {string} object key where to get the other configuration
 * @param [opts.append.file] {string} JSON file of other configuration
 * @returns {*}
 */
function loadConfig(opts = {}) {
    defaulty(opts, {
        file: null,
        path: 'config',
        addToGlobalWithName: null,
        append: {
            key: 'common',
            file: null
        }
    });

    // Add trailing slash
    opts.path = slash.add(opts.path);

    if (!fs.existsSync(opts.path)) {
        throw new Error('the config path not exists');
    }

    if (!opts.file) {
        let list = fs.readdirSync(opts.path);
        if (list.length) {
            opts.file = list[0];
        } else {
            throw new Error('empty folder');
        }
    }

    const configFilePath = opts.path + extname.resolveFilePath(opts.file);

    if (!fs.existsSync(configFilePath)) {
        throw new Error('the config file at:' + configFilePath + ' not exists');
    }

    // Get config from JSON file
    let config;
    try {
        config = JSON.parse(fs.readFileSync(configFilePath));
    } catch (e) {
        throw new Error('invalid configuration file: ' + configFilePath);
    }

    if (opts.append && opts.append.file) {
        if (!opts.append.key) {
            throw new Error('append key is required');
        }

        if (typeof config[opts.append.key] !== 'undefined') {
            throw new Error('a key with name ' + opts.append.key + ' already exists, please change the key name');
        }

        const appendFilePath = opts.path + extname.resolveFilePath(opts.append.file);

        if (!fs.existsSync(appendFilePath)) {
            throw new Error('the file at:' + appendFilePath + ' not exists');
        }

        try {
            config[opts.append.key] = JSON.parse(fs.readFileSync(appendFilePath));
        } catch (e) {
            throw new Error('invalid configuration file: ' + appendFilePath);
        }
    }

    // Add to the global
    if (typeof opts.addToGlobalWithName === 'string' && opts.addToGlobalWithName !== '') {
        /* istanbul ignore else  */
        if (typeof global[opts.addToGlobalWithName] !== 'undefined') {
            throw new Error('you can not add to the global object with this name: ' + opts.addToGlobalWithName);
        }

        global[opts.addToGlobalWithName] = config;
    }

    return config;
}

/**
 * Load configuration using environment variable to detect right file config
 * @param [opts] {Object} options
 * @param [opts.envVar=NODE_ENV] {string} environment variable
 * @param [opts.path=config] {string} configurations folder
 * @param [opts.addToGlobalWithName] {string} key name with which referencing configuration in global object
 * @param [opts.append] {Object} options to appending another configuration file
 * @param [opts.append.key=common] {string} object key where to get the other configuration
 * @param [opts.append.file] {string} JSON file of other configuration
 * @returns {*}
 * @example
 * const config = require('best-config').fromEnv();
 */
function fromEnv(opts = {}) {
    defaulty(opts, {
        envVar: 'NODE_ENV'
    });

    opts.file = process.env[opts.envVar];
    return loadConfig.call(this, opts);
}

/**
 * Load configuration using name of host to detect right file config
 * @param [opts] {Object} options
 * @param [opts.path=config] {string} configurations folder
 * @param [opts.addToGlobalWithName] {string} key name with which referencing configuration in global object
 * @param [opts.append] {Object} options to appending another configuration file
 * @param [opts.append.key=common] {string} object key where to get the other configuration
 * @param [opts.append.file] {string} JSON file of other configuration
 * @returns {*}
 * @example
 * const config = require('best-config').fromHostname();
 */
function fromHostname(opts = {}) {
    opts.file = os.hostname();
    return loadConfig.call(this, opts);
}

/* expose module */
module.exports = loadConfig;
module.exports.fromEnv = fromEnv;
module.exports.fromHostname = fromHostname;