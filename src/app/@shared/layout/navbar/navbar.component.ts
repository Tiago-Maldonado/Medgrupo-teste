import { Component, OnInit } from '@angular/core';
import { MAIN_ROUTE } from 'src/app/@core/routes/main.routes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public avatar = '../../../../assets/img/avatar-perfil.png';
	public userName = 'Teste';

  public MAIN_ROUTE = MAIN_ROUTE;

  constructor() { }

  ngOnInit(): void {
  }

}
