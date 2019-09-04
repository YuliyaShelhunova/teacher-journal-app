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
    public statistics: number[] = [];
    public nameStudent: string;
    public id: number;

    constructor(private store: Store<any>, private activateRoute: ActivatedRoute, private router: Router) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                let id = Number(event.url.split("/").slice(-1).pop());
                this.id = Number(activateRoute.snapshot.params.id);
                if (this.id && id == this.id) this.store.dispatch(new StudentAction.GetStatisticsStudent(id));
            }
        });
    }

    public ngOnInit(): void {
        this.store.select("students").subscribe
            (data => {
                if (data.info && (data.info.id = this.id)) {
                    this.statistics = this.calculateRating(data.statistics)
                    this.nameStudent = data.info.firstName + " " + data.info.lastName;
                }
            });
    }

    public calculateRating(statistics: number) {
        let rating = [];
        for (let i = 1; i < statistics / 2; i++) {
            rating.push(i);
        }
        return rating;
    }
}
