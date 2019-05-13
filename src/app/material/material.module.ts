import { MatPaginatorImpl } from './mat-paginator';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE, MatProgressBarModule, MatAutocompleteModule, MatExpansionModule, MatListModule, MatNativeDateModule, MatDatepickerModule, MatSelectModule, MatSortModule, MatDialogModule, MatSnackBarModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatMenuModule, MatDividerModule, MatInputModule, MatTableModule, MatPaginatorModule, MatCardModule, MatPaginatorIntl, MatGridListModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatGridListModule
  ],
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatGridListModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorImpl },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]
})
export class MaterialModule { }