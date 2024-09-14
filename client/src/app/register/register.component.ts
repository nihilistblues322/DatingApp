import { Component, inject, input, OnInit, output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { TextInputComponent } from '../_forms/text-input/text-input.component';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, TextInputComponent],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
    private accountService = inject(AccountService);
    private toastr = inject(ToastrService);
    private fb = inject(FormBuilder);
    cancelRegister = output<boolean>();
    model: any = {};
    registerForm: FormGroup = new FormGroup({});

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm() {
        this.registerForm = this.fb.group({
            gender: ['male'],
            username: ['', [Validators.required]],
            knownAs: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(8),
                ],
            ],
            confirmPassword: [
                '',
                [Validators.required, this.matchValues('password')],
            ],
        });
        this.registerForm.controls['password'].valueChanges.subscribe({
            next: () => {
                this.registerForm.controls[
                    'confirmPassword'
                ].updateValueAndValidity();
            },
        });
    }

    matchValues(matchTo: string): ValidatorFn {
        return (control: AbstractControl) => {
            return control.value === control.parent?.get(matchTo)?.value
                ? null
                : { isMatching: true };
        };
    }

    register() {
        console.log(this.registerForm?.value);
        // this.accountService.register(this.model).subscribe({
        //     next: (res) => {
        //         console.log(res);
        //         this.cancel();
        //     },
        //     error: (err) => this.toastr.error(err.error),
        // });
    }

    cancel() {
        this.cancelRegister.emit(false);
    }
}
