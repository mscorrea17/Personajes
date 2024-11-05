import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() redirectPath: string = ''; 

  @Output() onRedirect = new EventEmitter<void>();

  handleRedirect() {
    this.onRedirect.emit();
  }

}
