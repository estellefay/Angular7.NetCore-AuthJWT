import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  // On passse le UserService ans le constructeur pour pouvoir le réutiliser
  constructor(public service: UserService, private toastr: ToastrService) { }

  // Quand on initialise la page
  ngOnInit() {
    this.service.formModel.reset();
  }

  // Quand on valide le formualire
  onSubmit() {
    // On fait appel au services pour pouvoir envoyer les donner en post avec la methode register + subscribe
    this.service.register().subscribe(
      // Si sa passe
      (res: any) => {
        // Si sa passe
        if (res.succeeded) {
          // reset le formulaire
          this.service.formModel.reset();
          // Générer une pop up qui dit que c'est bon
          this.toastr.success('New user created!', 'Registration successful.');
          // Sinon
        } else {

          res.errors.forEach(element => {
            switch (element.code) {
              // Si l'erreur c'est le nom existe déjà, j'afficher
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken','Registration failed.');
                break;

                // Par default j'affiche
              default:
              this.toastr.error(element.description,'Registration failed.');
                break;
            }
          });
        }
      },
      // Si erreur
      err => {
        console.log(err);
      }
    );
  }

}
