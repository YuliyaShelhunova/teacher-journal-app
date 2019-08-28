import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { JournalRecord } from "../../common/entities/journal-record";
import { Store } from "@ngrx/store";
import * as RecordAction from "../../redux/actions/record.actions";
import { Subject } from "../../common/entities/subject";

@Component({
    selector: "app-journal-records-component",
    templateUrl: "journal-records.component.html",
    styleUrls: ["./journal-records.component.less"]
})

export class JournalRecordsComponent implements OnInit {
    private records: JournalRecord[] = [];
    private nameSubject: string;
    private teacher: string;
    private id: number;
    private dates: string[] = [];
    private isSaving: boolean;
    private loading: boolean;

    constructor(private store: Store<any>, private activateRoute: ActivatedRoute) {
        this.id = activateRoute.snapshot.params.id;
    }

    // tslint:disable-next-line:typedef
    public ngOnInit() {
        if (this.id) {
            this.store.dispatch(new RecordAction.GetRecords(this.id));
            this.store.select("records").subscribe(data => {
                console.log("Subject Table -> getRecordsById" + data);
                if (data.records && this.id == data.info.id) {
                    this.dates = [];
                    this.records = this.mappingData(data.records, this);
                    this.teacher = data.info.teacher;
                    this.nameSubject = data.info.name;
                } else {
                    console.log("ERROR IN GETTING RECORDS!!!! " + data);
                }
            });
        }
    }

    public mappingData(data: JournalRecord[], that: any): any[] {
        for (let i = 0; i < data.length; i++) {
            if (data[i].markOnDate) {
                const marks: number[] = [];
                data[i].markOnDate = new Map(data[i].markOnDate);
                data[i].markOnDate.forEach(function (value: any, key: any): void {
                    if (value) {
                        marks.push(value);
                    }
                    if (that.dates.indexOf(key) === -1) {
                        that.dates.push(key);
                    }
                });
                data[i].averageMark = that.calculateAverage(marks);
            }
        }
        data.map((element) => {
            this.dates.forEach((date) => {
                if (element.markOnDate && !element.markOnDate.has(date)) {
                    element.markOnDate.set(date, null);
                }
            });
        });
        return data;
    }

    public addColumn(): void {
        let date = new Date();
        let parseDate = date.getDate() + "/" + date.getMonth();
        this.dates.push(parseDate);
        this.records.forEach(function (element: JournalRecord): void {
            element.markOnDate.set(parseDate, null);
        });
    }
    public saveTable(teacherName: string): void {
        this.loading = true;
        let data: JournalRecord[] = []; // for sending
        this.records.forEach((element: JournalRecord) => {
            if (element.isChanged) {
                // that.validationRecords(element.markOnDate);
                data.push(element);
                element.isChanged = false;
            }
        });
        if (data) {
            this.store.dispatch(new RecordAction.SaveRecords(this.id, data));
            this.isSaving = false;
        }
        setTimeout(() => {
            this.loading = false;
        }, 1000);
    }

    public validationRecords(pair: any): boolean {
        // while for value
        if (pair && pair.value > 0 && pair.value <= 10) {
            return true;
        }
        // ToDo: validation for date
    }

    public calculateAverage(marks: number[]): number {
        return (marks.reduce((average, mark) => average + mark, 0)) / marks.length;
    }

    public updateAverage(record: JournalRecord, pair: any): void {
        const marks: number[] = [];
        if (this.validationRecords(pair)) {
            record.markOnDate.set(pair.key, pair.value);
            record.isChanged = true;
            record.markOnDate.forEach((value: any) => {
                if (value) { marks.push(value); }
            });
            record.averageMark = this.calculateAverage(marks);
            this.isSaving = true;
        } else {
            //this.records. = true;
        }
    }

    public isDateValid(date: string) {
        let dateParse = Date.parse(date);
        if (isNaN(dateParse) == false) {
            return true;
        }
        return false;
    }

    public updateDate(newObj: string, index: number) {
        let isValid = this.isDateValid(newObj);
        let oldDate = this.dates[index];
        this.isSaving = true;
        if (isValid) {
            this.records.forEach((record: JournalRecord) => {
                record.markOnDate.set(newObj, record.markOnDate.get(oldDate));
                record.markOnDate.delete(oldDate);
                record.isChanged = true;
            });
            this.dates[index] = newObj;
        }
    }
}
