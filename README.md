<div align="center">
<h1>best-config</h1>
Each app can has different server configurations, the goal of this module is manage them
<br/><br/>
<a href="https://travis-ci.org/fabioricali/best-config" target="_blank"><img src="https://travis-ci.org/fabioricali/best-config.svg?branch=master" title="Build Status"/></a>
<a href="https://coveralls.io/github/fabioricali/best-config?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/fabioricali/best-config/badge.svg?branch=master" title="Coverage Status"/></a>
<a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" title="License: MIT"/></a>
<img src="https://img.shields.io/badge/team-terrons-orange.svg" title="Team Terrons"/>
</div>

## Installation

```
npm install best-config --save
```

# Example

#### Basic usage

```javascript
const config = require('best-config')({
  file: 'config1'
});

console.log(config.foo); //=> bar

//Custom path "config" folder
const config = require('best-config')({
  file: 'config1',
  path: './custom/your-folder'
});

//Add configuration to global
/** @namespace _MY_CONFIG_ */
require('best-config')({
  file: 'config1',
  addToGlobalWithName: '_MY_CONFIG_'
});

console.log(_MY_CONFIG_.foo); //=> bar

//Append another config file
const config = require('best-config')({
  file: 'config1.json',
  append: {
      key: 'other',
      file: 'commons.json'
  }
});

console.log(config.other.foo); //=> bar
```

### API
- fromEnv
- fromHostname

**Please see <a href="https://github.com/fabioricali/best-config/blob/master/api.md">full documentation</a>**

## Changelog
You can view the changelog <a target="_blank" href="https://github.com/fabioricali/best-config/blob/master/CHANGELOG.md">here</a>

## License
best-config is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Authors
<a target="_blank" href="http://rica.li">Fabio Ricali</a>
