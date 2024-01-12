const mysql = require("mysql");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyparser = require("body-parser");
const api = require("./modals/blog");
// const path = require("path");
const app = express();
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use("/public", express.static("public"));

//MySQL details
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mission500",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//Creating GET Router to fetch all the learner details from the MySQL Database
app.get("/users", (req, res) => {
  mysqlConnection.query("SELECT * FROM users", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});


//Router to INSERT/POST a learner's detail
app.post("/addusers", (req, res) => {
  // console.log(req.body);
  let user = req.body;
  var sql =
    "SET @userid = ?;SET @userName = ?;SET @userEmail = ?;SET @userPassword = ?;SET @userStatus = ?;CALL userAddOrEdit(@userid, @userName, @userEmail, @userPassword, @userStatus);";
  mysqlConnection.query(
    sql,
    [
      user.userid,
      user.userName,
      user.userEmail,
      user.userPassword,
      user.userStatus,
    ],
    (err, rows, fields) => {
      if (!err)
        rows.forEach((element) => {
          if (element.constructor == Array) res.send(200);
        });
      else console.log(err);
    }
  );
});

//Router to UPDATE a learner's detail
app.put("/editUser", (req, res) => {
  let user = req.body;
  var sql =
    "SET @userid = ?;SET @userName = ?;SET @userEmail = ?;SET @userStatus = ?;CALL userAddOrEdit(@userid, @userName, @userEmail, @userPassword, @userStatus);";
  mysqlConnection.query(
    sql,
    [user.userid, user.userName, user.userEmail, user.userStatus],
    (err, rows, fields) => {
      if (!err) res.send("User Details Updated Successfully");
      else console.log(err);
    }
  );
});

//Router to DELETE a learner's detail
app.delete("/deleteuser/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM users WHERE userid = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("User Record deleted successfully.");
      else console.log(err);
    }
  );
});

//Router to get individual user a learner's detail
app.get("/getSingleUser/:id", (req, res) => {
  mysqlConnection.query(
    "Select userid, userName, userEmail, userStatus FROM users WHERE userid = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

// ----------------------------Blog API Start Here--------------------------

//Creating GET Router to fetch all the blogs details from the MySQL Database
app.get("/blog", (req, res) => {
  mysqlConnection.query("SELECT * FROM blog", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

app.use("/api", api);
// var storage = multer.diskStorage({
//   destination: (req, file, callBack) => {
//     callBack(null, "./public/images/"); // './public/images/' directory name where save the file
//   },
//   filename: (req, file, callBack) => {
//     console.log(file);
//     callBack(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage: storage });
// // Set up a route to handle form submissions
// app.post("/addBlog", upload.single("image"), (req, res) => {
//   const { blog_id, blog_title, short_desc, long_desc, status } = req.body;
//   //   const blog_image = req.file.name;
//   var imgsrc = "http://localhost:8080/images/" + req.files;
//   console.log(req.body);
//   console.log(req.file);
//   console.log(imgsrc);

//   // Insert the data into the database
//   //   mysqlConnection.getConnection((err, connection) => {
//   //     if (err) {
//   //       console.error("Error connecting to database:", err);
//   //       res.status(500).json({ error: "Error connecting to database" });
//   //     } else {
//   //       const sql =
//   //         "INSERT INTO blogs (blog_id, blog_title, blog_image, short_desc, long_desc, status) VALUES (?, ?, ?, ?, ?, ?)";
//   //       const values = [
//   //         blog_id,
//   //         blog_title,
//   //         blog_image,
//   //         short_desc,
//   //         long_desc,
//   //         status,
//   //       ];

//   //       connection.query(sql, values, (err, result) => {
//   //         connection.release();

//   //         if (err) {
//   //           console.error("Error executing SQL query:", err);
//   //           res.status(500).json({ error: "Error executing SQL query" });
//   //         } else {
//   //           res.status(200).json({ message: "Image uploaded successfully" });
//   //         }
//   //       });
//   //     }
//   //   });
// });

//Router to DELETE a learner's detail
app.delete("/deleteblog/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM blog WHERE blog_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("User Record deleted successfully.");
      else console.log(err);
    }
  );
});

// --------------------------Activity API start here------------------------

app.get("/activities", (req, res) => {
  mysqlConnection.query("SELECT * FROM activities", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

app.get("/sections", (req, res) => {
  mysqlConnection.query("SELECT * FROM section ", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

app.post("/addSectionDetails", (req, res) => {
  //   console.log(req.body);
  let section = req.body;
  const sql =
    "INSERT into section (section_id, section_name, status) values (?, ?, ?);";
  mysqlConnection.query(
    sql,
    [section.section_id, section.section_name, section.status]
    // (err, rows, fields) => {
    //   if (!err)
    //     rows.forEach((element) => {
    //       if (element.constructor == Array) res.send(200);
    //     });
    //   else console.log(err);
    // }
  );
});

app.post("/addSectionFormDetails", (req, res) => {
  let form = req.body;
  for (var i in form) {
    values = form[i].values.join(",");
    // console.log(form[i]);
    const sql =
      "INSERT into sectionform (field_name, field_type, field_values, required, section_name) values ( ?, ?, ?, ?, ?);";
    mysqlConnection.query(sql, [
      // form[i].field_id,
      form[i].name,
      form[i].type,
      values,
      form[i].required,
      form[i].section_name,
    ]);
  }
});

app.get("/sectionformdetails/:section_name", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM sectionform where section_name = ? ",
    [req.params.section_name],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

app.post("createnewtable", (req, res) => {
  console.log("new table values", req.body);
  // mysqlConnection.query()
});
