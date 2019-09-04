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

    public sortData(sort) {
        const data = this.students.slice();
        if (!sort.active || sort.direction === '') {
          this.students = data;
          return;
        }
    
        this.students = data.sort((a, b) => {
          const isAsc = sort.direction === 'asc';
          switch (sort.active) {
            case 'id': return this.compare(a.id, b.id, isAsc);
            case 'firstName': return this.compare(a.firstName, b.firstName, isAsc);
            case 'lastName': return this.compare(a.lastName, b.lastName, isAsc);
            case 'address': return this.compare(a.address, b.address, isAsc);
            default: return 0;
          }
        });
    }
    
    public compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}

