class StudentRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        address TEXT,
        description TEXT
        )`
    return this.dao.run(sql)
  }
  create(firstName, lastName, address, description) {
    return this.dao.run(
      `INSERT INTO students (firstName, lastName, address, description)
        VALUES (?, ?, ?, ?)`,
      [firstName, lastName, address, description])
  }

  update(student) {
    const { firstName, lastName, address, description } = student
    console.log(student)
    return this.dao.run(
      `UPDATE students SET firstName = ?,
      lastName = ?,
      address = ?,
      description = ?
      WHERE id = ?`,
      [firstName, lastName, address, description, id]
    )
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM students WHERE id = ?`,
      [id])
  }
  getAll() {
    return this.dao.all(`SELECT * FROM students`)
  }

  getAllId() {
    return this.dao.all(`SELECT id FROM students`)
  }

  getStatisticsById(id) {
    console.log("ID: " + id);
    return this.dao.all(
      `SELECT averageMark FROM journalRecords WHERE studentId = ?`,
      [id])
  }

}

module.exports = StudentRepository;