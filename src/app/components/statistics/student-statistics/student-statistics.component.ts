import { Component, OnInit, Input } from "@angular/core";
import { Student } from "../../../common/entities/student";
import { Store } from "@ngrx/store";
import * as StudentAction from "../../../redux/actions/students.actions";
import { Router, Event, NavigationStart, NavigationEnd } from "@angular/router";


@Component({
    selector: "app-student-statistics-component",
    templateUrl: "./student-statistics.component.html",
    styleUrls: ["./student-statistics.component.less"]
})
export class StudentStatisticsComponent implements OnInit {
    public students: Student[] = [];

    constructor(private store: Store<any>, private router: Router) {
        // this.router.events.subscribe((event: Event) => {
        //     if (event instanceof NavigationStart || event instanceof NavigationEnd) {
        //         let id = event.url.split("/").slice(-1).pop();
        //         this.store.dispatch(new StudentAction.GetStatisticsStudent(id));
        //     }
        // });
    }
    public ngOnInit(): void {
        this.store.dispatch(new StudentAction.GetStudents());
        this.store.select("students", "students").subscribe
            (response => {
                this.students = response;
            });
    }
}
