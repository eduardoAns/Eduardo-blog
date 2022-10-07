import { Blog, Coment } from "."

export interface User {
    id: number|null,
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    estado: string,
    fechaCreacion: string,
    rol: string
    posts: Blog[]
    coments: Coment[]
}