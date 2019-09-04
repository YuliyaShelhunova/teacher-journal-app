import { Component, OnInit } from "@angular/core";
import { Subject } from "../../../common/entities/subject";
import { Store } from "@ngrx/store";
import * as SubjectAction from "../../../redux/actions/subject.actions";


@Component({
    selector: "app-subject-statistics-component",
    templateUrl: "./subject-statistics.component.html",
    styleUrls: ["./subject-statistics.component.less"]
})

export class SubjectStatisticsComponent implements OnInit {
    public subjects: Subject[] = [];

    constructor(private store: Store<any>) {}

    public ngOnInit(): void {
        this.store.dispatch(new SubjectAction.GetSubjects());
        this.store.select("subjects").subscribe
            (response => {
                this.subjects = response.subjects;
            });
    }
}
