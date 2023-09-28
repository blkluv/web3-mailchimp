## Setup

Create a .config file similar to the config-sample.json file and substitute with your own DB credentials, API key(s) and RPC URL(s)

```
{
"database_connection": {
"host": "localhost",
"user": "wav_game",
"database": "wav_game",
"password": "YOUR_DB_PASSWORD"
},


}
```

Then go to the `create.sql`file and copy its content. Paste the content in your local mysql server, I am using mariadb.

## Start backend server with:

npm i && npm start

(Nodemon listening for changes)
