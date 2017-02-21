import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-contact',
  templateUrl: `public/views/pages/contact.html`,
})

export class ContactComponent implements OnInit {
  name = 'Angular';

  constructor() {}

  ngOnInit() {}
}
