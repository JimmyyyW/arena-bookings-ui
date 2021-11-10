import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerHorse } from 'src/model/customer-model';
import { HorseService } from 'src/service/horse-service.service';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';

@Component({
  selector: 'app-delete-horse-dialog',
  templateUrl: './delete-horse-dialog.component.html',
  styleUrls: ['./delete-horse-dialog.component.scss']
})
export class DeleteHorseDialogComponent implements OnInit {

  form: FormGroup;
  horses: CustomerHorse[];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CustomerDetailsComponent>,
    private horseService: HorseService,
    @Inject(MAT_DIALOG_DATA) public dialogData: CustomerHorses) {      
      this.horses = dialogData.horses;
      this.form = this.fb.group({
        horseName: ['', Validators.required]
      });      
      this.form.controls.horseName.setValue(this.horses[0].name);
  }

  submitDeleteHorseForm() {
    const horseId = this.form.get('horseName')?.value
    this.horseService.deleteHorse(horseId).subscribe(res => {
      if (res === null){
        this.dialogRef.close();
      }
      else alert('unable to delete horse, try again later');
    });
  }

  ngOnInit(): void {
  }

}

export interface CustomerHorses {
  horses: CustomerHorse[]
}
