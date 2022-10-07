
export interface Coment {
    id: number|null,
    idPost?: number,
    idUser?: number,
    contenido: string,
    nombre: string
    fechaCreacion: string,
    estado: string
}
