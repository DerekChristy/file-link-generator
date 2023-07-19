import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {
  uploads = [];
  displayedColumns: string[] = ['name', 'link', 'createdAt'];
  dataSource = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.uploads().subscribe({ next: (uploads) => {
      this.dataSource = uploads
    }})
  }
}
