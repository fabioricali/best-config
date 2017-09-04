<a name="module_best-config"></a>

## best-config
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[opts]</td><td><code>Object</code></td><td></td><td><p>options</p>
</td>
    </tr><tr>
    <td>[opts.file]</td><td><code>string</code></td><td></td><td><p>JSON file configuration</p>
</td>
    </tr><tr>
    <td>[opts.path]</td><td><code>string</code></td><td><code>&quot;config&quot;</code></td><td><p>configurations folder, must be located in relative path</p>
</td>
    </tr><tr>
    <td>[opts.addToGlobalWithName]</td><td><code>string</code></td><td></td><td><p>key name with which referencing configuration in global object</p>
</td>
    </tr><tr>
    <td>[opts.append]</td><td><code>Object</code></td><td></td><td><p>options to appending another configuration file</p>
</td>
    </tr><tr>
    <td>[opts.append.key]</td><td><code>string</code></td><td><code>&quot;common&quot;</code></td><td><p>object key where to get the other configuration</p>
</td>
    </tr><tr>
    <td>[opts.append.file]</td><td><code>string</code></td><td></td><td><p>JSON file of other configuration</p>
</td>
    </tr>  </tbody>
</table>

**Example** *(Get basic configuration located in &quot;config&quot; folder)*  
```js
const config = require('best-config')({
     file: 'config1'
});

console.log(config.foo); //=> bar
```
**Example** *(Custom path &quot;config&quot; folder)*  
```js
const config = require('best-config')({
     file: 'config1',
     path: './custom/your-folder'
});
```
**Example** *(Add configuration to global)*  
```js
require('best-config')({
     file: 'config1',
     addToGlobalWithName: '_MY_CONFIG_'
});

console.log(_MY_CONFIG_.foo); //=> bar
```
**Example** *(Append another config file)*  
```js
const config = require('best-config')({
     file: 'config1.json',
     append: {
         key: 'other',
         file: 'commons.json'
     }
});

console.log(config.other.foo); //=> bar
```

* [best-config](#module_best-config)
    * [~fromEnv([opts])](#module_best-config..fromEnv) ⇒ <code>\*</code>
    * [~fromHostname([opts])](#module_best-config..fromHostname) ⇒ <code>\*</code>

<a name="module_best-config..fromEnv"></a>

### best-config~fromEnv([opts]) ⇒ <code>\*</code>
Load configuration using environment variable to detect right file config

**Kind**: inner method of [<code>best-config</code>](#module_best-config)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[opts]</td><td><code>Object</code></td><td></td><td><p>options</p>
</td>
    </tr><tr>
    <td>[opts.envVar]</td><td><code>string</code></td><td><code>&quot;NODE_ENV&quot;</code></td><td><p>environment variable</p>
</td>
    </tr><tr>
    <td>[opts.path]</td><td><code>string</code></td><td><code>&quot;config&quot;</code></td><td><p>configurations folder</p>
</td>
    </tr><tr>
    <td>[opts.addToGlobalWithName]</td><td><code>string</code></td><td></td><td><p>key name with which referencing configuration in global object</p>
</td>
    </tr><tr>
    <td>[opts.append]</td><td><code>Object</code></td><td></td><td><p>options to appending another configuration file</p>
</td>
    </tr><tr>
    <td>[opts.append.key]</td><td><code>string</code></td><td><code>&quot;common&quot;</code></td><td><p>object key where to get the other configuration</p>
</td>
    </tr><tr>
    <td>[opts.append.file]</td><td><code>string</code></td><td></td><td><p>JSON file of other configuration</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
const config = require('best-config').fromEnv();
```
<a name="module_best-config..fromHostname"></a>

### best-config~fromHostname([opts]) ⇒ <code>\*</code>
Load configuration using name of host to detect right file config

**Kind**: inner method of [<code>best-config</code>](#module_best-config)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[opts]</td><td><code>Object</code></td><td></td><td><p>options</p>
</td>
    </tr><tr>
    <td>[opts.path]</td><td><code>string</code></td><td><code>&quot;config&quot;</code></td><td><p>configurations folder</p>
</td>
    </tr><tr>
    <td>[opts.addToGlobalWithName]</td><td><code>string</code></td><td></td><td><p>key name with which referencing configuration in global object</p>
</td>
    </tr><tr>
    <td>[opts.append]</td><td><code>Object</code></td><td></td><td><p>options to appending another configuration file</p>
</td>
    </tr><tr>
    <td>[opts.append.key]</td><td><code>string</code></td><td><code>&quot;common&quot;</code></td><td><p>object key where to get the other configuration</p>
</td>
    </tr><tr>
    <td>[opts.append.file]</td><td><code>string</code></td><td></td><td><p>JSON file of other configuration</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
const config = require('best-config').fromHostname();
```
