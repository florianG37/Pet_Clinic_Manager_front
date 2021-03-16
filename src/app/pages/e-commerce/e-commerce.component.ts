import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../service/authentification.service';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent {
  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  invalidLogin = false

  constructor(private router: Router, private loginservice: AuthentificationService) {
  }

  onSubmit() {
    (this.loginservice.authenticate(this.profileForm.value.username, this.profileForm.value.password).subscribe(
      data => {
        this.invalidLogin = false
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(["pages/tables/smart-table"])
      },
      error => {
        this.invalidLogin = true

      }
    )
    );

  }
}
