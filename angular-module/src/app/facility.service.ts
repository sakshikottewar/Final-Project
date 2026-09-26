import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Facility {
  id: number;
  name: string;
  location: string;
  facility_type: string;
  status: string;
  department_name?: string;
}

@Injectable({ providedIn: 'root' })
export class FacilityService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/facilities';

  getFacilities(): Observable<Facility[]> {
    return this.http.get<Facility[]>(this.apiUrl);
  }
}
