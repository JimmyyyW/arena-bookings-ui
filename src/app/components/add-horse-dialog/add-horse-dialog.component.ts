import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Horse } from 'src/model/booking-model';
import { HorseService as HorseService } from 'src/service/horse-service.service';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';

@Component({
  selector: 'app-add-horse-dialog',
  templateUrl: './add-horse-dialog.component.html',
  styleUrls: ['./add-horse-dialog.component.scss']
})
export class AddHorseDialogComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<CustomerDetailsComponent>,
    private horseService: HorseService,
    @Inject(MAT_DIALOG_DATA) public customerId: any
    ) {
      
   }

  createHorse(name: string) {
    this.horseService.addHorse(name, this.customerId.customerId).subscribe(data => {
      if (data.horseId != null) {
        this.dialogRef.close();
      } else alert('Failed to create horse!');
    });
  }

  ngOnInit(): void {
  }

}
