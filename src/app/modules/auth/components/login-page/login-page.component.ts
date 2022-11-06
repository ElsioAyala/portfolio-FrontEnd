import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { ThemeService } from '@shared/services/theme.service';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup = new FormGroup({})
  isDark:boolean = (localStorage.getItem("active-dark")) === "true";
  isDark$!: Observable<boolean>
  
  constructor(
    private themeService: ThemeService, 
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService) { }

  ngOnInit(): void {
    this.isDark$ = this.themeService.getIsDark();
    this.isDark$.subscribe( res => this.isDark = res);

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngAfterViewInit(): void {
    if(this.isDark) {
      document.body.classList.add("active-dark")
    }
  }

  showError(message: string): void {
    this.toast.error({detail:"ERROR",summary: message, duration:5000});
  }
  
  showSuccess(message: string): void {
    this.toast.success({detail:"SUCCESS",summary: message, duration:5000});
  }


  sendCredentials(){
    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe( res => {
      if(res){
        this.router.navigate(['/'])
        this.showSuccess("Bienvenido: " + res.userName);
      }
    }, (err) => {
      this.showError(err.message);
    })
    
  }


}
