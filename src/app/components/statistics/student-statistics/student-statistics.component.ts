import { Component, OnInit, Input } from "@angular/core";
import { Student } from "../../../common/entities/student";
import { Store } from "@ngrx/store";
import * as StudentAction from "../../../redux/actions/students.actions";

@Component({
    selector: "app-student-statistics-component",
    templateUrl: "./student-statistics.component.html",
    styleUrls: ["./student-statistics.component.less"]
})
export class StudentStatisticsComponent implements OnInit {
    public students: Student[] = [];
    
    constructor(private store: Store<any>) { }

    public ngOnInit(): void {
        this.store.dispatch(new StudentAction.GetStudents());
        this.store.select("students", "students").subscribe
            (response => {
                this.students = response;
            });
    }
}
