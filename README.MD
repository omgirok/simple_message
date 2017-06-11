# PROJECT SETUP

1. clone repository to folder
2. install the following dependencies:
  - `npm install mysql`
  - `npm install express`
3. run sql dump file to generate databases and tables
4. write a `config.js` file with the following template to fill-in sql server credentials:

```
module.exports = {
  DATABASE_USER: 'USER',
  DATABASE_PASSWORD: 'PASSWORD',
  DATABASE_NAME: 'Sourcify',
  PORT: 3000,
};
```

5. `node server.js`
