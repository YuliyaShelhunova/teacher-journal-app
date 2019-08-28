import { Student } from "./student";
import { Subject } from "./subject";

export class JournalRecord {
    public id: number;
    public student: Student;
    public subject: Subject;
    public averageMark: number;
    public markOnDate: Map<string, number>;
    public isChanged: boolean;
    public invalid: boolean;

    constructor(id: number, student: Student, subject: Subject, averageMark: number, markOnDate: Map<string, number>) {
        this.id = id;
        this.student = student;
        this.subject = subject;
        this.averageMark = averageMark;
        this.markOnDate = markOnDate;
    }
}
