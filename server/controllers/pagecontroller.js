const mysql = require("mysql");
const con = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

exports.view = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("select * from users", (err, rows) => {
      connection.release();
      if (!err) {
        res.render("home", { rows });
      } else {
        console.log("error in list", err);
      }
    });
  });
};

exports.adduser = (req, res) => {
  res.render("adduser");
};
exports.save = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;
    const { url, title, content } = req.body;

    connection.query(
      "insert into users(URL,TITLE,CONTENT) values(?,?,?)",
      [url, title, content],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("adduser", { msq: "content added successfully" });
        } else {
          console.log("error in list", err);
        }
      }
    );
  });
};

exports.edituser = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;
    let id = req.params.id;

    connection.query("select * from users where ID=?", [id], (err, rows) => {
      connection.release();
      if (!err) {
        res.render("edituser", { rows });
      } else {
        console.log("error in list", err);
      }
    });
  });
};

exports.edit = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;
    const { url, title, content } = req.body;
    let id = req.params.id;
    connection.query(
      "update users set URL=?,TITLE=?, CONTENT=? where ID=? ",
      [url, title, content, id],
      (err, rows) => {
        connection.release();
        if (!err) {
          con.getConnection((err, connection) => {
            if (err) throw err;
            let id = req.params.id;
            connection.query(
              "select * from users where id=?",
              [id],
              (err, rows) => {
                connection.release();
                if (!err) {
                  res.render("edituser", {
                    rows,
                    msg: "user details edited success",
                  });
                } else {
                  console.log("error in list", err);
                }
              }
            );
          });
        } else {
          console.log("error in list", err);
        }
      }
    );
  });
};

exports.delete = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;
    let id = req.params.id;
    connection.query("delete from users where ID=?", [id], (err, rows) => {
      connection.release();
      if (!err) {
        res.redirect("/");
      } else {
        console.log(err);
      }
    });
  });
};

exports.svtjson = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("select * from users ", (err, rows) => {
      connection.release();
      if (!err) {
        res.json(rows);
      } else {
        console.log("error in list", err);
      }
    });
  });
};
