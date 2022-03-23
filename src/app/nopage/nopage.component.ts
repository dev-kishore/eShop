import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nopage',
  templateUrl: './nopage.component.html',
  styleUrls: ['./nopage.component.scss']
})
export class NopageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  gotoLogin(){
    this.router.navigateByUrl('/login')
  }
}
