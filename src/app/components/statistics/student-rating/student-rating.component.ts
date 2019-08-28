import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import * as StudentAction from "../../../redux/actions/students.actions";
import { Router, Event, NavigationStart, NavigationEnd } from "@angular/router";

@Component({
    selector: "app-student-rating-component",
    templateUrl: "./student-rating.component.html",
    styleUrls: ["./student-rating.component.less"]
})
export class StudentRatingComponent {
    public statistics: any = [];
    public nameStudent: string;
    public id: number;
    // tslint:disable-next-line:no-parameter-properties
    constructor(private store: Store<any>, private activateRoute: ActivatedRoute, private router: Router) {
        //this.id = Number(activateRoute.snapshot.params.id);
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart || event instanceof NavigationEnd) {
                let id = event.url.split("/").slice(-1).pop();
                this.id = Number(activateRoute.snapshot.params.id);
                if(this.id) this.store.dispatch(new StudentAction.GetStatisticsStudent(id));
            }
        });
    }

    public ngOnInit(): void {
        this.store.select("students").subscribe
            (data => {
                if (data.statistics) {
                    this.statistics = [];
                    for (let i = 1; i < (data.statistics / 2); i++) {
                        this.statistics.push(i);
                    }
                    this.nameStudent = data.info.firstName + " " + data.info.lastName;
                }
            });
    }
}
