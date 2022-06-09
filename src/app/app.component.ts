import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { RestApiService } from './shared/rest-api.service';
import { GamaData } from './shared/gama-data';
//import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GamaFormApp';
  apiURL = 'http://localhost:3000';
  angForm: any;
  startDate: string;

  constructor(public restApi: RestApiService, private fb: FormBuilder) {
    this.startDate = '2022-01-01';  
    this.createForm();
 }
  createForm() {
   this.angForm = this.fb.group({
      id: ['', Validators.required ],
      text1: new FormControl('', Validators.maxLength(255)),
      text2: new FormControl('', Validators.maxLength(255)),
      date: new FormControl(this.startDate, Validators.required)       
   });
  }

   onSubmit(): void {

    let gamadata : any = { id: '', text1: '', text2: '', date:'' };

    if(this.angForm != null)
    {
      gamadata.id = (this.angForm.value['id'] != null && this.angForm.value['id'] != undefined) ?this.angForm.value['id']:'';
      gamadata.text1 = (this.angForm.value['text1'] != null && this.angForm.value['text1'] != undefined) ?this.angForm.value['text1']:'';
      gamadata.text2 = (this.angForm.value['text2'] != null && this.angForm.value['text2'] != undefined) ?this.angForm.value['text2']:'';
      gamadata.date = (this.angForm.value['date'] != null && this.angForm.value['date'] != undefined) ?this.angForm.value['date']:'';
      
    }

  console.log(gamadata);

  if(gamadata != null && this.restApi != null)
    this.restApi.postData(gamadata);
 }

}


