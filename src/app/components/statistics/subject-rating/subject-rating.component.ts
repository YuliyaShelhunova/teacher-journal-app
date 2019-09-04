import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Router, Event, NavigationStart, NavigationEnd } from "@angular/router";
import * as SubjectAction from "../../../redux/actions/subject.actions";

@Component({
    selector: "app-subject-rating-component",
    templateUrl: "./subject-rating.component.html",
    styleUrls: ["./subject-rating.component.less"]
})
export class SubjectRatingComponent {
    public statistics: number[] = [];
    public nameSubject: string;
    public id: number;

    constructor(private store: Store<any>, private activateRoute: ActivatedRoute, private router: Router) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                let id = Number(event.url.split("/").slice(-1).pop());
                this.id = Number(activateRoute.snapshot.params.id);
                if (this.id && id == this.id) this.store.dispatch(new SubjectAction.GetStatisticsSubject(id));
            }
        });
    }

    public ngOnInit(): void {
        this.store.select("subjects").subscribe
            (data => {
                if (data.info && (data.info.id == this.id)) {
                    this.statistics = this.calculateRating(data.statistics);
                    this.nameSubject = data.info.name;
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
