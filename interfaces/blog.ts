import { Coment } from "./coment";
import { Tag } from "./tag";

export interface Blog {
    id?: number,
    idUsuario: number,
    titulo: string,
    subtitulo:string,
    contenido: string,
    comentarios: Coment[],
    fechaCreacion: string,
    estado: string,
    tags:Tag[],
    categoria:categoria,
    images:Image[]
}

export interface BlogFormulario {
    idUsuario: number,
    titulo: string,
    subtitulo:string,
    contenido: string,
    fechaCreacion: string,
    estado: string,
    categoria:categoria,
    nombre:string
    fechaActualizacion:string
}

export interface categoria {
    id: number,
    nombre: string,
}

export interface Image {
    id: number,
    url: string,
}