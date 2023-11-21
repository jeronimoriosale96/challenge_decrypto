import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private loader = inject(LoaderService)
  isLoading$: Observable<Boolean>

  ngOnInit(){
    this.isLoading$ = this.loader.isLoading$
  }
}
