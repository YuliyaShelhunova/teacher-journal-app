import { Component, OnInit, Input } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Student } from "../../../common/entities/student";
import { StudentFormComponent } from "../student-form/student-form.component";
import { Store } from "@ngrx/store";
import * as StudentAction from "../../../redux/actions/students.actions";

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.less']
})
export class StudentTableComponent implements OnInit {
    public students: Student[] = [];

    constructor(private store: Store<any>, private modalService: NgbModal) { }

    public ngOnInit(): void {
        this.store.dispatch(new StudentAction.GetStudents());
        this.store.select("students").subscribe
            (response => {
                this.students = response.students;
            });
    }
    public openModal(): void {
        const modalRef = this.modalService.open(StudentFormComponent);
    }
}

