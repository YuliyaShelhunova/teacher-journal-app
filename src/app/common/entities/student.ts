export class Student {
    public id: number;
    public firstName: string;
    public lastName: string;
    public address: string;
    private description: string;

    constructor(studentId: number, studentName: string, studentLastName: string, studentAddress: string, description: string) {
        this.id = studentId;
        this.firstName = studentName;
        this.lastName = studentLastName;
        this.address = studentAddress;
        this.description = description;
    }
}
