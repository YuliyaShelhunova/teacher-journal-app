import { Student } from "./student";
import { Subject } from "./subject";

export class Record {
    public date: string;
    public mark: number;
    public isMarkValid: boolean;

    constructor(date: string, mark: number, isMarkValid: boolean) {
        this.date = date;
        this.mark = mark;
        this.isMarkValid = isMarkValid;
    }
}

export class JournalRecord {
    public id: number;
    public student: Student;
    public subject: Subject;
    public averageMark: number;
    public markOnDate: Array<Record>;
    public isChanged: boolean;
    public invalid: boolean;
    public marks: number[];

    constructor(id: number, student: Student, subject: Subject, averageMark: number, markOnDate: Array<Record>) {
        this.id = id;
        this.student = student;
        this.subject = subject;
        this.averageMark = averageMark;
        this.markOnDate = markOnDate;
    }
}
