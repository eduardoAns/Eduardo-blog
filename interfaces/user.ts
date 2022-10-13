import { Blog, Coment } from "."

export interface User {
    id: number,
    nombre: string,
    apellidoPaterno: string,
    email: string,
    password: string,
    estado: string,
    fechaCreacion: string,
    idRol: number
    descripcion: string,
    posts: Blog[]
    comentarios: Coment[]
}

export interface UserPost {
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