import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent {

  profile: celebrity[] = [
    {
      img: 'https://pbs.twimg.com/media/FG1J7FtUUAMS5My?format=jpg&name=medium',
      name: 'Hrithik Roshan',
      Quote: 'True power and true happiness are when you use your success to make others around you feel even more significant',
      designation:'HRX Brand Ambassador and Actor'
    },
    {
      img: 'https://pbs.twimg.com/media/FNY9rNJVkAIu3VG?format=jpg&name=900x900',
      name: 'Virat Kohli',
      Quote: "I don't need to compromise on my principles, because they don't have the slightest bearing on what happens to me anyway.",
      designation:'Puma Brand Ambassador and Cricketer  '
    },
    {
      img: 'https://pbs.twimg.com/media/EtTXpFcXIAkWZBB?format=jpg&name=small',
      name: 'Sonu Sood',
      Quote: 'Sometimes I think the surest sign that intelligent life exists elsewhere in the universe is that none of it has tried to contact us.',
      designation:'Redmi Brand Ambassador and Actor '
    }
  ]
}
interface celebrity{
  img:string,
  name:string,
  Quote:string,
  designation:string
}
