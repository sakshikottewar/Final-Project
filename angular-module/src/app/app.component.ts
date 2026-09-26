import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Facility, FacilityService } from './facility.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="page">
      <header>
        <p>ANGULAR API MODULE</p>
        <h1>Facility List</h1>
        <span>Connected to the Node.js REST API</span>
      </header>

      <div *ngIf="error" class="error">{{ error }}</div>

      <section class="grid">
        <article class="facility" *ngFor="let facility of facilities">
          <h2>{{ facility.name }}</h2>
          <p>{{ facility.location }} · {{ facility.facility_type }}</p>
          <strong>{{ facility.status }}</strong>
        </article>
      </section>
    </main>
  `
})
export class AppComponent implements OnInit {
  private facilityService = inject(FacilityService);
  facilities: Facility[] = [];
  error = '';

  ngOnInit(): void {
    this.facilityService.getFacilities().subscribe({
      next: data => this.facilities = data,
      error: () => this.error = 'Could not load facilities. Start the Node.js backend first.'
    });
  }
}
