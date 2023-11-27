import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UbicationsService {

    constructor(private http: HttpClient) { }

    getProvincias() {
        return this.http.get('https://apis.datos.gob.ar/georef/api/provincias');
    }

    getMunicipios(provincia: string) {
        return this.http.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}&max=400`);
    }

    getLocalidades(municipio: string) {
        return this.http.get(`https://apis.datos.gob.ar/georef/api/localidades?municipio=${municipio}&max=5`);
    }

}













