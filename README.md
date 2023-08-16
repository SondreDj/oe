# Ø, a simple way to execute javascript on the serverside. 
## Installation
`npm install oe`
## Usage
### Here is a two example implementations using express.  
Using render to get file from ./pages automatically:
```js
const express = require('express');
const app = express();
const { renderer } = require('oe');
app.get('/', (req, res) => {
  res.send(renderer.render('index', {
      userAgent: req.headers['user-agent'],
      cookies: req.cookies,
      params: req.params,
      ip: req.ip
  }));
})
app.listen(3000);
```
Using renderRaw to render from a string
```js
const express = require('express');
const app = express();
const { renderer } = require('oe');
app.get('/', (req, res) => {
  res.send(renderer.renderRaw('ø<return args.ip>', {
      userAgent: req.headers['user-agent'],
      cookies: req.cookies,
      params: req.params,
      ip: req.ip
  }));
})
app.listen(3000);
```
