import { Component } from "@angular/core";
import { ExportService } from "./../../common/services/export/export.service";
import * as fileSaver from 'file-saver';

enum EExportTypes {
    pdfType = "pdf",
    excelType = "excel"
}

@Component({
    selector: "app-export-component",
    templateUrl: "./export.component.html",
    styleUrls: ["./export.component.less"],
    providers: [ExportService]
})

export class ExportComponent {

    constructor(private exportService: ExportService) { }

    public exportFile(typeFile: string): void {
        var fileName = "";
        switch (typeFile) {
            case EExportTypes.excelType: {
               fileName = "teacher_journal.xlsx";
               break;
            }
            case EExportTypes.pdfType: {
                fileName = "teacher_journal.pdf";
                break;
            }
            default: {
                break;
            }
        }
        this.exportService.getFile(typeFile, fileName).subscribe((response) => {
            fileSaver.saveAs(response, fileName);
        })
    }
}
