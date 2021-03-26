import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../service/authentification.service';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss']
})
export class ECommerceComponent implements OnInit {
  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  invalidLogin = false

  constructor(private router: Router, private loginservice: AuthentificationService) {
  }

  ngOnInit() {
    if (sessionStorage.getItem("accessToken"))
      history.back()
  }

  onSubmit() {
    (this.loginservice.authenticate(this.profileForm.value.username, this.profileForm.value.password).subscribe(
      data => {
        this.invalidLogin = false
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(["pages/charts/d3"])
      },
      error => {
        this.invalidLogin = true
        alert("Échec de l'authentification")
      }
    )
    );

  }
}
