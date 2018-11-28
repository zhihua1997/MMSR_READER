var SQLite = require("react-native-sqlite-storage");
SQLite.DEBUG(true);
SQLite.enablePromise(false);

const database_name = "reader.db";
let db;

export const opendb = () => {
  db = SQLite.openDatabase(
    {
      name: database_name,
      createFromLocation: 1
    },
    successcb(),
    errorcb()
  );

  return db;
};

export const closedb = () => {
  if (db) {
    console.log("Closing database ...");
    db.close(successcb(), errorcb());
  } else {
    console.log("database was not open");
  }
};

const successcb = () => {
  console.log("sqlite Connected");
};

const errorcb = err => {
  console.log("sqlite Error" + err);
};
