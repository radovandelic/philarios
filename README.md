PHILARIOS
==================================

This is the main api for acquiring wordlists, translations and user progress data for the philarios language learning application.

Getting Started
---------------

1. Install PostgreSQL

2. Clone the repository
```sh
git clone https://github.com/radovandelic/philarios.git
cd philarios 
```

3. Install dependencies
```sh
npm install
```
4. Set DBUSERNAME, DBPASSWORD and DBNAME environment variables to your SQL username, password and database name.

5. Populate SQL tables with word frequency lists.
```sh
# DBUSERNAME=<username> DBPASSWORD=<password> DBNAME=<db name> 
node resources/populateWordLists.js
```

6. Start development live-reload server
```sh
# DBUSERNAME=<username> DBPASSWORD=<password> DBNAME=<db name> 
npm run dev
```

7. Start production server:
```sh
# DBUSERNAME=<username> DBPASSWORD=<password> DBNAME=<db name> 
npm start
```

License
-------

MIT
