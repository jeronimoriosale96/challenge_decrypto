import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule  } from '@angular/common/http'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CryptoCardComponent } from './crypto-card/crypto-card.component';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { WebsocketService } from './services/websocket.service';

@NgModule({
  declarations: [
    CryptoCardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    HomeRoutingModule
  ],
  providers: [
    WebsocketService
  ]
})
export class HomeModule { }
