const Promise = require('bluebird')
const AppDAO = require('./dao')
const fs = require("fs");
var bodyParser = require('body-parser');
const JournalRecordsRepository = require('./journal-records-repository')
const StudentsRepository = require('./students-repository')
const SubjectsRepository = require('./subjects-repository')
const async = require('async');
const dao = new AppDAO('./database.sqlite3')
const studentsRepo = new StudentsRepository(dao)
const subjectsRepo = new SubjectsRepository(dao)
const recordsRepo = new JournalRecordsRepository(dao)
var express = require('express');
var cors = require('cors');
var app = express();
var pdf = require('html-pdf');
var Excel = require('exceljs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = (new JSDOM(`...`)).window;
app.use(cors())
app.use(bodyParser.json());

//init();
function init() {
    studentsRepo.createTable()
        .then(() => {
            var data = fs.readFileSync('./../data/students.json')
            var students = JSON.parse(data)
            return Promise.all(students["students"].map((student) => {
                const { id, firstName, lastName, address, description } = student
                return studentsRepo.create(id, firstName, lastName, address, description)
            }))
        })
        .then(() => subjectsRepo.createTable())
        .then(() => {
            var data = fs.readFileSync('./../data/subjects.json')
            var subjects = JSON.parse(data)
            return Promise.all(subjects["subjects"].map((subject) => {
                const { id, name, teacher, cabinet, description } = subject
                return subjectsRepo.create(id, name, teacher, cabinet, description)
            }))
        })
        .then(() => recordsRepo.createTable())
        .then(() => {
            studentsRepo.getAllId().then((dataD) => {
                var studentsId = dataD;
                var records = subjectsRepo.getAllId().then((data) => {
                    var dataSend = [];
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < studentsId.length; j++) {
                            dataSend.push({ subjectId: data[i].id, studentId: studentsId[j].id, averageMark: 0, markOnDate: "" });
                        }
                    }
                    return dataSend;
                });
                return Promise.all(records.map((record) => {
                    const { averageMark, markOnDate, studentId, subjectId } = record
                    console.log(JSON.stringify(markOnDate))
                    return recordsRepo.create(averageMark, JSON.stringify(markOnDate), studentId, subjectId)
                }))
            })
        })
}


function initRecords() {
    var date = new Date();
    date = date.getMonth() + "/" + date.getDate();
    recordsRepo.createTable()
        .then(() => {
            studentsRepo.getAllId().then((dataD) => {
                var studentsId = dataD;
                subjectsRepo.getAllId().then((data) => {
                    var records = [];
                    var markOnDate = [{ date: date, mark: null }];
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < studentsId.length; j++) {
                            records.push({ subjectId: data[i].id, studentId: studentsId[j].id, averageMark: 0, markOnDate: JSON.stringify(markOnDate) });
                        }
                    }
                    return Promise.all(records.map((record) => {
                        const { averageMark, markOnDate, studentId, subjectId } = record
                        return recordsRepo.create(averageMark, markOnDate, studentId, subjectId)
                    }))
                });

            })
        })
}

//initRecords();
function createRecord(repository, id, isStudent) {
    var date = new Date();
    date = date.getMonth() + "/" + date.getDate();
    repository.getAllId().then((data) => {
        var dataSend = [];
        var markOnDate = [{ date: date, mark: null }];
        markOnDate = JSON.stringify(markOnDate);
        for (var i = 0; i < data.length; i++) {
            if (isStudent) dataSend.push({ subjectId: data[i].id, studentId: id, averageMark: 0, markOnDate: markOnDate });
            dataSend.push({ subjectId: id, studentId: data[i].id, averageMark: 0, markOnDate: markOnDate });
        }
        Promise.all(dataSend.map((record) => {
            const { averageMark, markOnDate, studentId, subjectId } = record
            return recordsRepo.create(averageMark, markOnDate, studentId, subjectId)
        }));
    });
}

function getStatistics(repository, id) {
    return new Promise((resolve, reject) => {
        async.parallel({
            statistics: function (callback) {
                repository.getStatisticsById(id).then((data) => {
                    console.log("DATA:" + JSON.stringify(data));
                    var count = 0, sum = 0, average = 0;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].averageMark !== 0) {
                            console.log("DATA: " + i + data[i].averageMark + "---" + typeof data[i].averageMark)
                            sum += (data[i].averageMark)
                            count++;
                        }
                    }
                    average = sum / count;
                    console.log("AVERAGE: " + average);
                    callback(null, average);
                })
            },
            info: function (callback) {
                repository.getById(id).then((data) => {
                    callback(null, data);
                });
            }
        }, function (err, results) {
            if (err) {
                reject(err)
            } else {
                console.log("RESULTS: " + results.statistics + " ---- " + results.info)
                resolve(results);
            }
        });
    });
}

//API
app.get('/api/students', function (req, res) {
    studentsRepo.getAll().then((students) => {
        res.send(students);
    })
        .catch((err) => {
            console.log('There was an error querying students', JSON.stringify(err))
            return res.send(err)
        });
});

app.post('/api/students', function (req, res) {
    console.log('Post')
    const { firstName, lastName, address, description } = req.body;
    studentsRepo.create(firstName, lastName, address, description).then((obj) => {
        createRecord(subjectsRepo, obj.id, true);
        studentsRepo.getById(obj.id).then((data) => {
            res.send(data);
        })
    })
});

app.get('/api/subjects', function (req, res) {
    subjectsRepo.getAll().then((subjects) => {
        res.send(subjects);
    }).catch((err) => {
        console.log('There was an error querying subjects', JSON.stringify(err))
        return res.send(err)
    });
});

app.post('/api/subjects', function (req, res) {
    console.log('Post')
    const { name, teacher, cabinet, description } = req.body;
    subjectsRepo.create(name, teacher, cabinet, description).then((obj) => {
        createRecord(studentsRepo, obj.id);
        subjectsRepo.getById(obj.id).then((data) => {
            res.send(data);
        })
    })
});

app.get('/api/subjects/:id/records', function (req, res) {
    async.parallel({
        records: function (callback) {
            recordsRepo.getRecordsById(req.params.id).then((data) => {
                data.map(element => {
                    element.markOnDate = JSON.parse(element.markOnDate)
                });
                callback(null, data);
            })
        },
        info: function (callback) {
            subjectsRepo.getById(req.params.id).then((data) => {
                callback(null, data);
            });
        }
    }, function (err, results) {
        console.log("RESULTS: " + results)
        res.send(results);
    }
    );
});

app.post('/api/subjects/:id/updateRecords', function (req, res) {
    console.log("UPDATE" + JSON.stringify(req.body));
    var records = req.body.records;
    var teacher = req.body.teacher;
    var subjectId = req.params.id;

    var promises = [];

    if (teacher) {
        promises.push(subjectsRepo.getById(subjectId).then((data) => {
            // console.log("TEACHER: " + data.teacher + "---" + teacher);
            data.teacher = teacher;
            return subjectsRepo.update(data).then((data) => {
                //console.log("Teacher: !!!" + JSON.data);
                return data;
            })
        }));
    }

    if (records) {
        records.map((record) => {
            const { averageMark, markOnDate, studentId, subjectId } = record
            //console.log("DATA" + averageMark + " " + JSON.stringify(markOnDate) + " " + studentId + " " + subjectId);
            promises.push(recordsRepo.update(averageMark, JSON.stringify(markOnDate), studentId, subjectId).then((data) => {
                console.log("DATA: !!!" + data);
                return data
            }).catch((err) => {
                console.log('Server was not sent data', err)
                return err
            }));
        })
    }

    Promise.all(promises).then((data) => {
        if (data) {
            console.log(data);
            res.send(data);
        }
    }).catch((err) => res.send(err));
});

app.get('/api/subjects/:id/statistics', function (req, res) {
    getStatistics(subjectsRepo, req.params.id).then(results => {
        console.log("STAT:" + results);
        res.send(results);
    })
})

app.get('/api/students/:id/statistics', function (req, res) {
    getStatistics(studentsRepo, req.params.id).then(results => {
        console.log("STAT:" + results);
        res.send(results);
    })
})

app.post('/api/export/:type', function (req, res) {
    var type = req.params.type;
    console.log("EXPORT");
    recordsRepo.getAllRecords().then((data) => {
        if (data) {
            if (type == "pdf") {
                var recordsTable = document.createElement("table");
                var thead = document.createElement("thead");
                var tbody = document.createElement("tbody");
                var headRow = document.createElement("tr");
                ["Subject", "First Name", "Last Name", "Average", "Marks"].forEach(function (el) {
                    var th = document.createElement("th");
                    th.appendChild(document.createTextNode(el));
                    headRow.appendChild(th);
                });
                thead.appendChild(headRow);
                recordsTable.appendChild(thead);
                data.forEach(function (el) {
                    var tr = document.createElement("tr");
                    for (var o in el) {
                        var td = document.createElement("td");
                        td.appendChild(document.createTextNode(el[o]))
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                });
                recordsTable.appendChild(tbody);
                var options = { format: 'A4', type: "pdf" };
                pdf.create(recordsTable.outerHTML, options).toStream(function (err, stream) {
                    if (err) return console.log(err);
                    stream.pipe(res);
                });
            }

            if (type == "excel") {
                var workbook = new Excel.Workbook();
                for (var i = 0; i < data.length; i++) {
                    if (!workbook.getWorksheet(data[i].name)) {
                        workbook.addWorksheet(data[i].name)
                    }
                    var worksheet = workbook.getWorksheet(data[i].name);
                    var row = [];
                    row[1] = data[i].firstName;
                    row[2] = data[i].lastName;
                    row[3] = data[i].averageMark;
                    row[4] = data[i].markOnDate;
                    worksheet.addRow(row);
                }
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    res.send(buffer);
                });
            }
        }
    });

})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
