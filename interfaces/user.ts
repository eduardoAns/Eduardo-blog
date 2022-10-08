import { Blog, Coment } from "."

export interface User {
    id: number|null,
    nombre: string,
    apellidoPaterno: string,
    correo: string,
    password: string,
    estado: string,
    fechaCreacion: string,
    rol: string
    descripcion: string,
    posts: Blog[]
    coments: Coment[]
}

export interface UserPost {
    nombre: string,
    apellido: string,
    correo: string,
    password: string,
    estado: string,
    fechaCreacion: string,
    rol: string
}