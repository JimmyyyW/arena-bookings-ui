import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { CustomerUser } from 'src/model/customer-model';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnInit {

  form: FormGroup;
  users: CustomerUser[];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<CustomerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: DeleteUserDialogData
  ) { 
    this.form = this.fb.group({
      userId: ['', Validators.required]
    });
    this.users = dialogData.users;
  }

  ngOnInit(): void {
  }

  submitDeleteUserForm() {      
    this.userService.deleteUser(this.form.get('userId')?.value)
      .subscribe(result => {
        this.dialogRef.close();
      });
  }
}

export interface DeleteUserDialogData {
  users: CustomerUser[]
}
