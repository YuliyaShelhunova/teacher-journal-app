import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "../../constants/urls";

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  constructor(private http: HttpClient) { }

  public getFile(type: string, fileName: string): Observable<Blob> {
    var body = { filename: fileName };
    return this.http.post(API_URL + "/export/" + type, body, { responseType: "blob" });
  }
}
