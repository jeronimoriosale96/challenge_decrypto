import { Component, inject } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { BehaviorSubject, Observable, filter, map, of, tap } from 'rxjs';
import { ICrypto } from './interfaces/crypto';
import { LoaderService } from '../shared/services/loader.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private websocket = inject(WebsocketService)
  private loader = inject(LoaderService)

  cryptoInfo$: Observable<ICrypto[]>;
  cryptoData: ICrypto[] = [];
  selectedCrypto: string = 'all'
  private selectedCryptoSubject = new BehaviorSubject<ICrypto[]>([]);
  selectedCryptoSubject$ = this.selectedCryptoSubject.asObservable()
  ngOnInit(){
    this.loader.show()
    this.websocket.connect().pipe(
      filter((res) => Boolean(res)),
      map(res => JSON.parse(res)),
      tap((data) => {
        if(data?.table === 'trade'){
          const currentCrypto = data.data[0]
          const { symbol, timestamp, price } = currentCrypto
          const existingCryptoIndex = this.cryptoData.findIndex(item => item.symbol === symbol);
          if (existingCryptoIndex === -1) {
            this.cryptoData.push({ ...currentCrypto, priceVariation: 0 });
          } else {
            const currentData = this.cryptoData[existingCryptoIndex]
            if (this.getDifferenceInMinutes(currentData.timestamp, timestamp)) {
              const priceVariation = ((price - currentData.price) / currentData.price) * 100;
              this.cryptoData[existingCryptoIndex] = { ...currentData, priceVariation, timestamp };
            }
            currentData.price = currentCrypto.price;
          }
          this.cryptoInfo$ = of(this.cryptoData);
          this.updateCryptoInfo()
        }
        this.loader.hide()
      }),
    ).subscribe()

    this.websocket.isConnected$.subscribe(() => this.websocket.sendMessage(JSON.stringify(environment.cryptoCall)))
      
  }
  getDifferenceInMinutes(date1: string, date2: string): boolean {
    const MINUTE_IN_MS = 60000;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const differenceInMs = Math.abs(d1.getTime() - d2.getTime());
    return differenceInMs > MINUTE_IN_MS;
  }
  updateCryptoInfo() {
    const filteredCrypto = this.cryptoData.filter(item => item.symbol === this.selectedCrypto);
    if(filteredCrypto.length > 0) {
      this.selectedCryptoSubject.next(filteredCrypto);
    }
  }

  ngOnDestroy(): void {
    this.websocket.closeConnection();
  }

}
