import { Component, OnInit } from '@angular/core';
import {CabinetMedicalService} from "../cabinet-medical.service";

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css']
})
export class SecretaryComponent implements OnInit {

  constructor(private client : CabinetMedicalService) {
     this.client.getData('/data/cabinetInfirmier.xml');
  }

  ngOnInit() {
  }

}
