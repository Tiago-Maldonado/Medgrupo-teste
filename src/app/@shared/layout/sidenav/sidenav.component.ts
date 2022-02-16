import { Component, OnInit } from '@angular/core';
import { MAIN_ROUTE } from 'src/app/@core/routes/main.routes';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public MAIN_ROUTE = MAIN_ROUTE;
  
  constructor() { }

  ngOnInit(): void {
  }

}
