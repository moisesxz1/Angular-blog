import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public identity: any;
  public token: string

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {

    this.page_title = 'Identificarse';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
  }

  ngOnInit() {
  }

  onSubmit(form) {

    this._userService.signup(this.user).subscribe(
      response => {

        if (response.user && response.user._id) {

          //Guardar usuario en una propiedad
          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

          //Conseguir token
          this._userService.signup(this.user, true).subscribe(
            response => {

              if (response.token) {

                this.token = response.token;
                localStorage.setItem('token', this.token);
                this.status = 'success';
                
                this._router.navigate(['/inicio']);
              }

              else this.status = 'error';
            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          )
        } else {

          this.status = 'error';
        }
        
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    )
  }
}
