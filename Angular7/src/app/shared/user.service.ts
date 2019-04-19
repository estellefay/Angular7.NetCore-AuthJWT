import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Dans le constructeur on passer le form buileder pour pouvoir créer un formulaire avec fb
  //
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  //Lien de notre url de base 
  readonly BaseURI = 'http://localhost:53464/api';


  // Variable qui contiens le formualire 
  // this => objet enb cours
  // fb => module FormbuILER
  // Group => on cre un group qui contien plusierus valeurs
  formModel = this.fb.group({
    // la valeur est requise
    UserName: ['', Validators.required],
    // Vérifie que c'st un email
    Email: ['', Validators.email],
    FullName: [''],
    // Passwords est un groupe qui runie les deux mots des passe 
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
      // On valide uniquement si la methode "comparePasswords" est valide
    }, { validator: this.comparePasswords })

  });

  // Comparer les password
  comparePasswords(fb: FormGroup) {

    // récuperer la valeur de ConfirmPassword dans le formulaire
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    
    // Si erreu est null est si ???
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      // Si la valeur de passqword est différente de la valeur de Confirm password
      if (fb.get('Password').value != confirmPswrdCtrl.value)
      // On envoie une erreur
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
      // On renvoie null en erreurs
        confirmPswrdCtrl.setErrors(null);
    }
  }



  // S'enregistrer, requête en post 
  register() {
    //Element à envoyer
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    // Valeur à envoyer pour le post
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }
}
