import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule, MAT_DATE_LOCALE, MAT_RIPPLE_GLOBAL_OPTIONS, MatOptionModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

const modules = [
  MatButtonModule,
  MatRippleModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  DragDropModule,
  MatToolbarModule,
  MatTableModule,
  MatIconModule,
  MatSliderModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  MatMenuModule,
  MatRadioModule,
  MatNativeDateModule,
  MatSortModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatOptionModule,
  MatListModule,
  MatTooltipModule,
];


@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
  providers: [
    // { provide: MAT_DIALOG_DATA, useValue: {} },
    // { provide: MAT_DATE_LOCALE, useValue: 'ru' },
    // { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } },
    { provide: MatDialogRef, useValue: {} },
  ]
})
export class MaterialModule { }
