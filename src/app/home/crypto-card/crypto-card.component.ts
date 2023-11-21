import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-crypto-card',
  templateUrl: './crypto-card.component.html',
  styleUrls: ['./crypto-card.component.scss']
})
export class CryptoCardComponent {
  @Input() symbol;
  @Input() price;
  @Input() priceVariation;

}
