import { Injectable } from '@angular/core';

import * as L from "leaflet";
import { HttpClient } from "@angular/common/http";
import { Layer } from '../model/layer';
import { GEOSERVER } from '../shared/constantes';
import '../shared/kgiswms.js';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  public map: L.Map;
  public mapasBase: any;
  public overlayers:any={};
  public controlLayer: L.Control.Layers;

  constructor(private http: HttpClient) {

    const osmAttr =
          "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>, " +
          "Tiles courtesy of <a href='http://hot.openstreetmap.org/' target='_blank'>Humanitarian OpenStreetMap Team</a>";

        const esriAttr =
          "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, " +
          "iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, " +
          "Esri China (Hong Kong), and the GIS User Community";

        const cartoAttr =
          "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> " +
          "&copy; <a href='http://cartodb.com/attributions'>CartoDB</a>";

        const geodirAttr ="<a href='http://www.geodir.co/'><b>Geodir</b></a> &copy; Map";

        const satelitalAttr = "Kenyojoel903@gmail.com";

        this.mapasBase = {
          OpenStreetMap: L.tileLayer(
            "http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
            {
              attribution: osmAttr
            }
          ),
          Esri: L.tileLayer(
            "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
            {
              attribution: esriAttr
            }
          ),
          CartoDB: L.tileLayer(
            "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
            {
              attribution: cartoAttr
            }
          ),
          GeoDir: L.tileLayer(
            "http://geocoder.geodir.co/geocoder.api/tile/v1/{z}/{x}/{y}",
            {
              attribution: geodirAttr
            }
          ),
          Satelital: L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            {
              attribution: satelitalAttr
            }
          )
        };
   }

   obtenerCapas(){
     let capas:Array<Layer>=[];
     capas.push(new Layer(Math.random(), 'departamento', 'Capa de departamentos', GEOSERVER.WORKSPACE));
     capas.push(new Layer(Math.random(), 'provincia', 'Capa de provincias', GEOSERVER.WORKSPACE));
     capas.push(new Layer(Math.random(), 'distrito', 'Capa de distritos', GEOSERVER.WORKSPACE));
     capas.push(new Layer(Math.random(), 'lote_nse', 'Capa de nivel socieconómico', GEOSERVER.WORKSPACE));
     capas.push(new Layer(Math.random(), 'lote_demo', 'Capa de lotes', GEOSERVER.WORKSPACE));
     capas.push(new Layer(Math.random(), 'valvula', 'Capa de válvulas', GEOSERVER.WORKSPACE));
     return capas;
   }

   agregregarCapa(layer:Layer){
    const _layer = L.tileLayer.wms(`${GEOSERVER.URL}/ows?`,{
      layers: `${GEOSERVER.WORKSPACE}:${layer.nombre}`,
      format: 'image/png',
      transparent: true
    }).addTo(this.map);

    layer._layer = _layer;
    this.controlLayer.addOverlay(_layer, layer.nombre);
    return layer;
   }


   removerCapa(layer:Layer){
     try {
   this.map.removeLayer(layer._layer);
      this.controlLayer.removeLayer(layer._layer);
      return true; 
     } catch (error) {
       console.log(error);
       return false;
     }
   }
}
