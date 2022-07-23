import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewExperienceService {
  private URL = environment.api; //URL de la API que viene del archivo environment
  public ID:any = null; //ID de cada Modulo (Experiencia, Educacion, etc)

  constructor(private httpClient: HttpClient) { }

  public saveExperience(body:any):Observable<any>{
    return this.httpClient.post(`${this.URL}/experience/${this.ID}`,body)
  }
}
