import { Blog, Coment } from "."

export interface User {
    id: number,
    nombre: string,
    apellidoPaterno: string,
    email: string,
    password: string,
    estado: string,
    fechaCreacion: string,
    idRol: number,
    descripcion: string,
    posts: Blog[],
    comentarios: Coment[],
    avatar:AvatarI[],
    socialMedias:SocialMedia[]
}

export interface UserForm {
    id?: number
    nombre: string,
    apellidoPaterno: string,
    email: string,
    sexo: string,
    password: string,
    estado: string,
    fechaCreacion: string,
    idRol: number
    descripcion: string
}

export interface AvatarI {
    id: string,
    url:string,
    idUsuario:number,
}

export interface SocialMedia {
    id:number,
    url:string,
    nombre:string,
    idUsuario:number,
}