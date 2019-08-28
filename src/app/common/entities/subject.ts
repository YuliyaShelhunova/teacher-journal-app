export class Subject {
    private id: number;
    private name: string;
    private teacher: string;
    private cabinet: number;
    private description: string;

    constructor(subjectId: number, subjectName: string, subjectTeacher: string, cabinet: number, description: string) {
        this.id = subjectId;
        this.name = subjectName;
        this.teacher = subjectTeacher;
        this.cabinet = cabinet;
        this.description = description;
    }
}
