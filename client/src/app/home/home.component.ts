import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RegisterComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    http = inject(HttpClient);
    registerMode = false;
    users: any;

    ngOnInit(): void {
        this.getUsers();
    }

    registerToggle() {
        this.registerMode = !this.registerMode;
    }
    getUsers() {
        this.http.get('http://localhost:5005/api/users').subscribe({
            next: (res) => (this.users = res),
            error: (err) => console.log(err),
            complete: () => console.log('complete'),
        });
    }
    cancelRegisterMode($event: boolean) {
        this.registerMode = $event;
    }
}
