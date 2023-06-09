import { Component,OnInit } from '@angular/core';
import{FormBuilder,FormGroup} from '@angular/forms'
import { UserModel } from '../user_modal';
import { UserdetailsService } from '../userdetails.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formvalue !:FormGroup;
  UserModelObj:UserModel= new UserModel;
  userdata !:any;
  Showadd !:boolean;
  ShowUpdate !:boolean;
  constructor(private formBuilder: FormBuilder,
    private User:UserdetailsService) { 

  } 
  ngOnInit(): void {
    this.formvalue=this.formBuilder.group({
      Userid:[''],
      Firstname:[''],
      Lastname:[''],
      Email:[''],
      Dob:['']

    })
    this.getallUser()
  }
  clickaddUser(){
    this.formvalue.reset();
    this.ShowUpdate= false;
    this.Showadd=true;
  }
  PostUserDetails(){
    this.UserModelObj.Userid=this.formvalue.value.userid;
    this.UserModelObj.FirstName=this.formvalue.value.FirstName;
    this.UserModelObj.Lastname=this.formvalue.value.Lastname;
    this.UserModelObj.Email=this.formvalue.value.Email;
    this.UserModelObj.Dob=this.formvalue.value.Dob;



    this.User.postUser(this.PostUserDetails)
      .subscribe(res=>{
        console.log(res);
        alert("User added Successfully");
        let ref=document.getElementById("close");
        ref?.click();
        this.formvalue.reset();
        this.getallUser()
      },
      )
    
    

  }
  getallUser(){
    this.User.getUser()
    .subscribe(res=>{
      this.userdata=res;
    })
  }
  deleteUser(row:any){
    this.User.deleteUser(row.id)
    .subscribe(res=>{
      alert("User Removed Successfully!");
      this.getallUser();
    })
  }
  onEdit(row:any){
    this.ShowUpdate= true;
    this.Showadd=false;
    this.UserModelObj.Userid=row.userid
    this.formvalue.controls['Userid'].setValue(row.FirstName);
    this.formvalue.controls['Firstname'].setValue(row.FirstName);
    this.formvalue.controls['Lastname'].setValue(row.Lastname);
    this.formvalue.controls['Email'].setValue(row.Email);
    this.formvalue.controls['Dob'].setValue(row.Dob)
  }
  updateUserDetails(){
    this.UserModelObj.Userid=this.formvalue.value.userid;
    this.UserModelObj.FirstName=this.formvalue.value.FirstName;
    this.UserModelObj.Lastname=this.formvalue.value.Lastname;
    this.UserModelObj.Email=this.formvalue.value.Email;
    this.UserModelObj.Dob=this.formvalue.value.Dob;
    this.User.UpdateUser(this.UserModelObj,this.UserModelObj.Userid)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref=document.getElementById("close");
      ref?.click();
      this.formvalue.reset();
      this.getallUser()
    })

  }


}
