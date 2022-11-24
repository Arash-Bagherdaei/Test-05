const Sequelize = require("sequelize");

var sequelize = new Sequelize(
  "pfpzdkbe",
  "pfpzdkbe",
  "v460Vbm5_f3fpviEcvbbXvl0oud20gOL",
  {
    host: "heffalump.db.elephantsql.com",
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
      ssl: true,
    },
    query: { raw: true }, // update here, you. Need this
  }
);

// var sequelize = new Sequelize("web322", "postgres", "12wq", {
//   host: "localhost",
//   dialect: "postgres",
//   port: 5432,
//   query: { raw: true }, // update here, you. Need this
// });

sequelize
  .authenticate()
  .then(() => console.log("Connection success."))
  .catch((err) => console.log("Unable to connect to DB.", err));

const Student = sequelize.define("Student", {
  studId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  program: Sequelize.STRING,
  gpa: Sequelize.FLOAT,
});

// var fs = require("fs");
// var students = [];

exports.prep = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .sync()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject("unable to sync the datebase", err);
      });
  });
};

exports.bsd = () => {
  return new Promise((resolve, reject) => {
    let results = students.filter((student) => student.program == "BSD");
    results.length == 0 ? reject("No BSD students.") : resolve(results);
  });
};

exports.cpa = () => {
  return new Promise((resolve, reject) => {
    Student.findAll({ where: { program: "CPA" } })
      .then((data) => {
        data.length == 0 ? reject("No CPA students.") : resolve(data);
      })
      .catch(() => {
        reject("no results returned");
      });
  });
};
exports.highGPA = () => {
  return new Promise((resolve, reject) => {
    let high = 0;
    let highStudent;

    Student.findAll()
      .then((students) => {
        for (let i = 0; i < students.length; i++) {
          if (students[i].gpa > high) {
            high = students[i].gpa;
            highStudent = students[i];
          }
        }
        highStudent
          ? resolve(highStudent)
          : reject("Failed finding student with highest GPA");
      })
      .catch(() => reject("Failed finding student with highest GPA"));
  });
};

exports.lowGPA = () => {
  return new Promise((resolve, reject) => {
    let low = 4.0;
    let lowStudent;
    for (let i = 0; i < students.length; i++) {
      if (students[i].gpa < low) {
        low = students[i].gpa;
        lowStudent = students[i];
      }
    }
    resolve(lowStudent);
  });
};

exports.allStudents = () => {
  return new Promise((resolve, reject) => {
    Student.findAll()
      .then((students) => {
        if (students.length > 0) {
          resolve(students);
        } else reject("No students.");
      })
      .catch(() => reject("No students."));
  });
};

exports.addStudent = (student) => {
  return new Promise((resolve, reject) => {
    for (const property in student) {
      value = student[property];
      student[property] = value === "" ? null : value;
    }

    Student.create(student)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject("unable to add the student");
      });
  });
};

exports.getStudent = (studId) => {
  return new Promise((resolve, reject) => {
    students.forEach(function (student) {
      if (student.studId == studId) resolve(student);
    });
    reject("No result found!");
  });
};
