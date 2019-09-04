import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { JournalRecord, Record } from "../../common/entities/journal-record";
import { Store } from "@ngrx/store";
import * as RecordAction from "../../redux/actions/record.actions";
import * as SubjectAction from "../../redux/actions/subject.actions";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: "app-journal-records-component",
    templateUrl: "journal-records.component.html",
    styleUrls: ["./journal-records.component.less"]
})

export class JournalRecordsComponent implements OnInit {
    private records: JournalRecord[] = [];
    private nameSubject: string;
    private teacher: any = { name: "", isChanged: false };
    private id: number;
    private dates: object[] = [];
    private loading: boolean;

    constructor(private store: Store<any>, private activateRoute: ActivatedRoute,
        private modalService: NgbModal) {
        this.id = activateRoute.snapshot.params.id;
    }

    public ngOnInit() {
        if (this.id) {
            this.store.dispatch(new RecordAction.GetRecords(this.id));
            this.store.dispatch(new SubjectAction.GetSubject(this.id));
            this.store.select("subjects").subscribe(data => {
                //this.id == data.info.id
                if (data && data.subject) {
                    //let subject = data.subjects.find(x => x.id == this.id);
                    this.teacher = { name: data.subject.teacher, isChanged: false };
                    this.nameSubject = data.subject.name;
                }
                this.loading = false;
            })
            this.store.select("records").subscribe(data => {
                if (data.records) {
                    this.dates = []; //init
                    this.records = this.mapData(data.records, this);
                }
                this.loading = false;
                if(data["message"]) alert("Records were saved successfully");
            });
        }
    }

    public mapData(data: JournalRecord[], that: any): JournalRecord[] {
        for (let i = 0; i < data.length; i++) {
            let marks = [];
            if (data[i].markOnDate) {
                data[i].markOnDate.map((record: Record) => {
                    if (record.mark == null || this.isMarkValid(record.mark)) {
                        record.isMarkValid = true;
                    }
                    if (this.isMarkValid(record.mark)) {
                        record = new Record(record.date, record.mark, record.isMarkValid);
                        marks.push(record.mark);
                    }
                    if (this.dates.findIndex(elem => elem["date"] === record.date) == -1) {
                        that.dates.push({ date: record.date, isValid: true });
                    }
                });
                data[i].averageMark = marks.length ? that.calculateAverage(marks) : 0;
            }
        }
        return data;
    }

    public addColumn(): void {
        let date = new Date();
        let parseDate = date.getMonth() + "/" + date.getDate();
        this.dates.push({ date: parseDate, isValid: true });
        this.records.forEach(function (element: JournalRecord): void {
            element.markOnDate.push(new Record(parseDate, null, true));
        });
    }

    checkDatesAreValid() {
        return (this.dates.findIndex(elem => elem["isValid"] === false) !== -1) ? false : true;
    }

    checkMarksAreValid(element: JournalRecord) {
        return (element.markOnDate.findIndex(record => record.isMarkValid === false) !== -1) ? false : true;
    }

    public saveTable(content: any): void {
        this.loading = true;
        let isValid = true;
        let records: JournalRecord[] = [];
        if (this.checkDatesAreValid()) {
            this.records.some((element: JournalRecord) => {
                if (element.isChanged) {
                    if (this.checkMarksAreValid(element)) {
                        records.push(element);
                        element.isChanged = false;
                    }
                    else {
                        this.loading = false;
                        isValid = false;
                        return true;
                    }
                }
            });
            if (records.length > 0) {
                this.store.dispatch(new RecordAction.SaveRecords(this.id, records));
            }
            if (this.teacher.isChanged) {
                this.store.dispatch(new SubjectAction.UpdateSubject(this.id, this.teacher.name));
            }
            if(records.length == 0 && this.teacher.isChanged){
                this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
            }
        } else {
            isValid = false;
            this.loading = false;
            this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
        }
    }

    public updateTeacher() {
        this.teacher.isChanged = true;
    }

    public isMarkValid(value: number): boolean {
        return (value > 0 && value <= 10) ? true : false;
    }

    public calculateAverage(marks: number[]): number {
        return Number(((marks.reduce((average, mark) => average + mark, 0)) / marks.length).toFixed(2));
    }

    public updateAverage(element: JournalRecord, newValue: Record, index: number): void {
        if (this.isMarkValid(newValue.mark)) {
            var marks = [];
            element.markOnDate.forEach(elem => {
                marks.push(elem.mark);
            })
            element.markOnDate[index].mark = newValue.mark;
            element.markOnDate[index].isMarkValid = true;
            element.isChanged = true;
            element.averageMark = marks.length ? this.calculateAverage(marks) : 0;
        }
        else {
            element.isChanged = true;
            element.markOnDate[index].isMarkValid = false;
        }
    }

    public isDateValid(date: string) {
        var parts = date.split("/");
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        if (month == 0 || month > 12) return false;
        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return day > 0 && day <= monthLength[month - 1];
    }

    public updateDate(newObj: string, index: number) {
        let isValid = this.isDateValid(newObj);
        this.records.forEach((element: JournalRecord) => {
            if (element.markOnDate[index]) {
                element.markOnDate[index].date = newObj;
            }
            else {
                element.markOnDate[index] = new Record(newObj, null, true);
                element.markOnDate[index].isMarkValid = true;
            }
            element.isChanged = true;
        });
        this.dates[index] = { date: newObj, isValid: isValid };

    }
}
