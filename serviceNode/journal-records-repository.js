class journalRecordsRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS journalRecords (
        averageMark INTEGER,
        markOnDate TEXT,
        studentId INTEGER,
        subjectId INTEGER,
        PRIMARY KEY (studentId, subjectId),
        CONSTRAINT journalRecords_fk_studentId FOREIGN KEY (studentId)
          REFERENCES students(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT journalRecords_fk_subjectId FOREIGN KEY (subjectId)
          REFERENCES subjects(id) ON UPDATE CASCADE ON DELETE CASCADE
        )`
    return this.dao.run(sql)
  }

  create(averageMark, markOnDate, studentId, subjectId) {
    console.log("TYPE!!!" + typeof (markOnDate));
    return this.dao.run(
      `INSERT INTO journalRecords (averageMark, markOnDate, studentId, subjectId)
            VALUES (?, ?, ?, ?)`,
      [averageMark, markOnDate, studentId, subjectId])
  }

  update(averageMark, markOnDate, studentId, subjectId, id) {
    console.log("TYPE!!!" + typeof (markOnDate) + markOnDate);
    return this.dao.run(
      `UPDATE journalRecords SET 
          averageMark = ?,
          markOnDate = ?
          WHERE studentId = ? AND subjectId = ?`, [averageMark, markOnDate, studentId, subjectId, id])
  }

  getRecordsById(subjectId) {
    return this.dao.all(`SELECT s.id, s.firstName, s.lastName, j.averageMark, 
    j.markOnDate, j.studentId, j.subjectId FROM students s LEFT OUTER JOIN
    journalRecords j ON j.studentId = s.id AND subjectId = ?`,
      [subjectId])
  }

  getAllRecords() {
    return this.dao.all(`SELECT   sub.name, s.firstName, s.lastName, j.averageMark, j.markOnDate FROM students s, subjects sub LEFT OUTER JOIN
    journalRecords j ON j.studentId = s.id AND j.subjectId = sub.id`)
  }
}

module.exports = journalRecordsRepository;