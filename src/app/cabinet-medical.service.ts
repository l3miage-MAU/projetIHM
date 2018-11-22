import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {InfirmierInterface} from "./dataInterfaces/infirmier";
import {Adresse} from "./dataInterfaces/adresse";


@Injectable({
  providedIn: 'root'
})
export class CabinetMedicalService {

  constructor(private _http: HttpClient) { }
  async getData(url: string): Promise<{ étage: any; numéro: any; rue: any }> {
    let node;
    try {
      const res: HttpResponse<string> = await this._http.get(url, {observe: 'response', responseType: 'text'}).toPromise();
      const parser = new DOMParser();
      const doc = parser.parseFromString(res.body, 'text/xml');
      console.log(doc);
      const LinfXML = Array.from(doc.querySelectorAll("infermiers infermier"));
      const infermiers:InfirmierInterface[] = this.LinfXML.map(infirmiersXML =>({patients:[],
        id: infirmiersXML.getAttribute("id"),
        nom:(infirmiersXML.querySelector("nom")).textContent,
        prenom:(infirmiersXML.querySelector("prénom")).textContent,
        photo:(infirmiersXML.querySelector("photo")).textContent,
        patients: [],
        adresse: this.getAdresse(infirmiersXML.querySelector("adresse"))
      }));
    } catch(err) {
      console.error('ERROR in getData', err);
    }

    private getAdresse(this.adXML: Element): Adresse{
      let n:Element;
      return {
        étage:(n = this.adXML.querySelector('étage'))?n.textContent:indefined,
        numéro:(n = adXML.querySelector('numéro')) ? indefined : n.textContent,
        rue:(n = adXML.querySelector('rue'))?n.textContent:indefined,
        ville:(n = adXML.querySelector('ville'))?n.textContent:indefined,
        codePostale : (n = adXML.querySelector('ville'))?+n.textContent:-1,
    }

    return null;
  }
}
