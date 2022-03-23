import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-celebrity',
  templateUrl: './celebrity.component.html',
  styleUrls: ['./celebrity.component.scss']
})
export class CelebrityComponent implements OnInit {

  @Input() profile:celebrity;

  constructor() { }

  ngOnInit(): void {
  }
}

interface celebrity{
  img:string,
  name:string,
  Quote:string,
  designation:string
}