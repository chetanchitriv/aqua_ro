import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export class PasswordValidators{

    //Make sure old password is correct
    static cannotContainOldPassword(control: AbstractControl) : Promise<ValidationErrors> | null {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                if(control.value != "1234"){
                    resolve({cannotContainOldPassword: true});
                }else{
                    // resolve ;
                    alert('hghghgg');
                }
            });
        });
    }

    //Make sure passwords match
    static confirmNewPassword(control: AbstractControl): ValidationErrors | null{
        let newPass = control.get('newPassword');
        let confirmPass = control.get('confirmPassword');
        if(newPass === confirmPass){
            return null;
            //return { confirmNewPassword: true };
        }else{
            return { confirmNewPassword: true };
        }
    }
}