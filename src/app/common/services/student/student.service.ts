import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Student } from "../../entities/student";
import { map } from "rxjs/operators";
import { API_URL } from "../../constants/urls";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  public getAllStudents(): Observable<Student[]> {
    return this.http.get(API_URL + "/students")
      .pipe(
        map((students: Student[]) => {
          return students;
        }));
  }

  public addStudent(data: any): Observable<Student> {
    console.log("student service -> addStudent");
    return this.http.post<Student>(API_URL + "/students", data);
  }

  public getStatisticsStudent(typeId: number): Observable<any> {
    return this.http.get(API_URL + "/students/" + typeId + "/statistics").pipe(
      map((data: any) => {
        return data;
      }));
  }
}
