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
    comentarios: Coment[],
    avatar:AvatarI[],
    socialMedias:SocialMedia[]
}
export interface userCreateForm {
    nombre: string,
    apellidoPaterno: string,
    email: string,
    password: string,

}
export interface UserForm extends userCreateForm  {
    id?: number
    sexo: string,
    estado: string,
    fechaCreacion: string,
    idRol: number
    descripcion: string
    avatar?:AvatarI[],
    socialMedias?:SocialMedia[]
}

export interface AvatarI {
    id: string,
    url:string,
    idUsuario?:number,
}

export interface SocialMedia {
    id?:number,
    url:string,
    nombre:string,
    idUsuario?:number,
}