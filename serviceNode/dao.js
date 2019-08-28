const sqlite3 = require('sqlite3'),
    TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;
const Promise = require('bluebird')


class AppDAO {
    constructor(dbFilePath) {
        this.db = new sqlite3.Database(dbFilePath, (err) => {
            if (err) {
                console.log('Could not connect to database', err)
            } else {
                console.log('Connected to database')

            }
        })
        this.db.run
    }

    // runWithTransaction(sql, params = []) {
    //     return new Promise((resolve, reject) => {
    //         db.beginTransaction(function (err, transaction) {
    //             console.log(params);
    //             params.forEach(element => {
    //                 const { id, averageMark, markOnDate, studentId, subjectId } = element;
    //                 transaction.run(sql,[id, averageMark, markOnDate, studentId, subjectId]);
    //                 database.run(sql,[id, averageMark, markOnDate, studentId, subjectId]);
    //             });
    //             someAsync(function () {
    //                 transaction.commit(function (err) {
    //                     if (err) return reject(err);
    //                     resolve("Save")
    //                 });
    
    //             });
    //         });
    //     });
    // }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.log('Error running sql ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    console.log(this)
                    resolve({ id: this.lastID })
                }
            })
        })
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    console.log("RESULT GET: " + JSON.stringify(result))
                    resolve(result)
                }
            })
        })
    }

    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

module.exports = AppDAO