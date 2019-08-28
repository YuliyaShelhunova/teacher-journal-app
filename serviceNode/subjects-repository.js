class SubjectsRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        teacher TEXT,
        cabinet INTEGER,
        description TEXT
        )`
    return this.dao.run(sql)
  }
  create(name, teacher, cabinet, description) {
    return this.dao.run(
      `INSERT INTO subjects (name, teacher, cabinet, description)
          VALUES (?, ?, ?, ?)`,
      [name, teacher, cabinet, description])
  }
  update(subject) {
    const { id, name, teacher, cabinet, description } = subject
    return this.dao.run(
      `UPDATE subjects SET name = ?,
      teacher = ?,
      cabinet = ?,
      description = ?
      WHERE id = ?`,
      [name, teacher, cabinet, description, id]
    )
  }

  getStatisticsById(id) {
    return this.dao.all(
      `SELECT averageMark FROM journalRecords WHERE subjectId = ?`,
      [id])
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM subjects WHERE id = ?`,
      [id])
  }
  getAll() {
    return this.dao.all(`SELECT * FROM subjects`)
  }

  getAllId() {
    return this.dao.all(`SELECT id FROM subjects`)
  }
}

module.exports = SubjectsRepository;