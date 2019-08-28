import { Component, OnInit } from "@angular/core";
import { Subject } from "../../../common/entities/subject";
import { Store } from "@ngrx/store";
import * as SubjectAction from "../../../redux/actions/subject.actions";
import { Router, Event, NavigationStart, NavigationEnd } from "@angular/router";

@Component({
    selector: "app-subject-statistics-component",
    templateUrl: "./subject-statistics.component.html",
    styleUrls: ["./subject-statistics.component.less"]
})

export class SubjectStatisticsComponent implements OnInit {
    public subjects: Subject[] = [];

    constructor(private store: Store<any>, private router: Router) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart || event instanceof NavigationEnd) {
                let id = event.url.split("/").slice(-1).pop();
                this.store.dispatch(new SubjectAction.GetStatisticsSubject(id));
            }
        });
    }

    public ngOnInit(): void {
        this.store.dispatch(new SubjectAction.GetSubjects());
        this.store.select("subjects").subscribe
            (response => {
                this.subjects = response.subjects;
            });
    }
}
