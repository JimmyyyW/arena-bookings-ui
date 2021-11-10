import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {

  form: FormGroup;
  customerId: number;
  roles = ['Admin', 'User'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<CustomerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: UserDialogData    
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.email,
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
    ]],
      password: ['', Validators.required],
      enabled: [true, Validators.required],
      role: ['User', Validators.required]
    });
    this.customerId = dialogData.customerId;
   }

   submitUserForm() {
      const toBeEnabled = this.form.get('enabled')?.value == 'true';
      this.userService.createUser({
        username: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
        enabled: toBeEnabled,
        customerId: this.customerId,
        role: this.form.get('role')?.value
      }).subscribe(result => {
        this.dialogRef.close();
      });
      
   }

  ngOnInit(): void {
    this.form.controls.enabled.setValue('true');
  }

}

export interface UserDialogData {
  customerId: number
}
