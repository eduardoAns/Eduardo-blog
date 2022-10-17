import { Blog } from "../interfaces";



export const initialPosts: Blog[] = [
    {
        id: 1,
        idUsuario: 1,
        titulo: 'Titulo 1',
        subtitulo: 'Subtitulo 1',
        contenido: 'Lorem ipsum dolor sit amet consectetur adipiscing elit lobortis curabitur eu, proin sodales vitae hendrerit netus egestas montes parturient donec, cum ac ad ante maecenas quam sagittis dapibus massa. Quam nullam dictum habitant interdum eu auctor metus lacus magnis aliquam aptent, nibh ad diam id vel congue felis augue massa. Nibh fringilla pulvinar penatibus tortor et iaculis, libero praesent ac torquent sem class, senectus sodales magna proin hendrerit. Tortor blandit risus suspendisse nulla praesent quam maecenas quisque ultrices lectus eget magna, lacus porta tincidunt habitasse neque dis dictumst egestas nisl cubilia.----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- Accumsan gravida mattis ut mi feugiat varius parturient, orci tincidunt congue metus viverra mollis auctor, habitasse hac pretium dictum sollicitudin sodales. A auctor primis inceptos dapibus suscipit quis feugiat tortor porttitor, imperdiet lacus diam laoreet id quam magnis nullam posuere, venenatis in class luctus tempor tincidunt per at. Sociis vehicula aenean iaculis felis torquent mus congue curabitur at viverra morbi purus tempus molestie, primis sociosqu dapibus odio velit maecenas erat est faucibus etiam imperdiet nec ac. Quam egestas habitant viverra blandit dapibus aliquam aenean imperdiet vivamus magna, dictumst leo lobortis a enim phasellus tempor curabitur turpis, tristique orci consequat taciti inceptos et etiam odio eget.',
        comentarios: [
            {
                id: 1,
                idPost: 1,
                idUser: 1,
                contenido: 'Comentario 1',
                nombre: 'Nombre 1',
                fechaCreacion: '2021-01-01',
                estado: 'activo'
            },
            {
                id: 2,
                idPost: 1,
                idUser: 1,
                contenido: 'Comentario 2',
                nombre: 'Nombre 2',
                fechaCreacion: '2021-01-01',
                estado: 'activo'
            },
            {
                id: 3,
                idPost: 1,
                idUser: 1,
                contenido: 'Comentario 3',
                nombre: 'Nombre 3',
                fechaCreacion: '2021-01-01',
                estado: 'activo'
            },
        ],
        fechaCreacion: '2021-01-01',
        estado: 'publicado',
        tags: [
            {
                id: 1,
                nombre: 'Tag 1'
            },
            {
                id: 2,
                nombre: 'Tag 2'
            },
            {
                id: 3,
                nombre: 'Tag 3'
            },
            {
                id: 4,
                nombre: 'Tag 4'
            },
            {
                id: 5,
                nombre: 'Tag 5'
            }
        ],
        categoria: {
            id: 1,
            nombre: 'Categoria 1'
        },
        images: [
            {
                id: "1",
                url: 'https://picsum.photos/200/400'
            },
            {
                id: "2",
                url: 'https://picsum.photos/200/300'
            }
        ]
    },
    {
        id: 2,
        idUsuario: 1,
        titulo: 'Titulo 2',
        subtitulo: 'Subtitulo 2',
        contenido: 'Lorem ipsum dolor sit amet consectetur adipiscing elit lobortis curabitur eu, proin sodales vitae hendrerit netus egestas montes parturient donec, cum ac ad ante maecenas quam sagittis dapibus massa. Quam nullam dictum habitant interdum eu auctor metus lacus magnis aliquam aptent, nibh ad diam id vel congue felis augue massa. Nibh fringilla pulvinar penatibus tortor et iaculis, libero praesent ac torquent sem class, senectus sodales magna proin hendrerit. Tortor blandit risus suspendisse nulla praesent quam maecenas quisque ultrices lectus eget magna, lacus porta tincidunt habitasse neque dis dictumst egestas nisl cubilia.<br/> Accumsan gravida mattis ut mi feugiat varius parturient, orci tincidunt congue metus viverra mollis auctor, habitasse hac pretium dictum sollicitudin sodales. A auctor primis inceptos dapibus suscipit quis feugiat tortor porttitor, imperdiet lacus diam laoreet id quam magnis nullam posuere, venenatis in class luctus tempor tincidunt per at. Sociis vehicula aenean iaculis felis torquent mus congue curabitur at viverra morbi purus tempus molestie, primis sociosqu dapibus odio velit maecenas erat est faucibus etiam imperdiet nec ac. Quam egestas habitant viverra blandit dapibus aliquam aenean imperdiet vivamus magna, dictumst leo lobortis a enim phasellus tempor curabitur turpis, tristique orci consequat taciti inceptos et etiam odio eget.',
        comentarios: [
            {
                id: 1,
                idPost: 1,
                idUser: 1,
                contenido: 'Comentario 1',
                nombre: 'Nombre 1',
                fechaCreacion: '2021-01-01',
                estado: 'activo'
            },
            {
                id: 2,
                idPost: 1,
                idUser: 1,
                contenido: 'Comentario 2',
                nombre: 'Nombre 2',
                fechaCreacion: '2021-01-01',
                estado: 'activo'
            },
            {
                id: 3,
                idPost: 1,
                idUser: 1,
                contenido: 'Comentario 3',
                nombre: 'Nombre 3',
                fechaCreacion: '2021-01-01',
                estado: 'activo'
            },

        ],
        fechaCreacion: '2021-01-01',
        estado: 'publicado',
        tags: [
            {
                id: 1,
                nombre: 'Tag 1'
            },
            {
                id: 2,
                nombre: 'Tag 2'
            },
            {
                id: 3,
                nombre: 'Tag 3'
            },
            {
                id: 4,
                nombre: 'Tag 4'
            },
            {
                id: 5,
                nombre: 'Tag 5'
            }

        ],
        categoria: {
            id: 1,
            nombre: 'Categoria 1'
        },
        images: [
            {
                id: "1",
                url: 'https://picsum.photos/200/400'
            },
            {
                id: "2",
                url: 'https://picsum.photos/200/300'
            }
        ]
    },
    {
        id: 3,
        idUsuario: 1,
        titulo: 'Titulo 3',
        subtitulo: 'Subtitulo 3',
        contenido: 'Lorem ipsum dolor sit amet consectetur adipiscing elit lobortis curabitur eu, proin sodales vitae hendrerit netus egestas montes parturient donec, cum ac ad ante maecenas quam sagittis dapibus massa. Quam nullam dictum habitant interdum eu auctor metus lacus magnis aliquam aptent, nibh ad diam id vel congue felis augue massa. Nibh fringilla pulvinar penatibus tortor et iaculis, libero praesent ac torquent sem class, senectus sodales magna proin hendrerit. Tortor blandit risus suspendisse nulla praesent quam maecenas quisque ultrices lectus eget magna, lacus porta tincidunt habitasse neque dis dictumst egestas nisl cubilia.<br/> Accumsan gravida mattis ut mi feugiat varius parturient, orci tincidunt congue metus viverra mollis auctor, habitasse hac pretium dictum sollicitudin sodales. A auctor primis inceptos dapibus suscipit quis feugiat tortor porttitor, imperdiet lacus diam laoreet id quam magnis nullam posuere, venenatis in class luctus tempor tincidunt per at. Sociis vehicula aenean iaculis felis torquent mus congue curabitur at viverra morbi purus tempus molestie, primis sociosqu dapibus odio velit maecenas erat est faucibus etiam imperdiet nec ac. Quam egestas habitant viverra blandit dapibus aliquam aenean imperdiet vivamus magna, dictumst leo lobortis a enim phasellus tempor curabitur turpis, tristique orci consequat taciti inceptos et etiam odio eget.',
        comentarios: [
            {
                id: 1,
                idPost: 1,
                idUser: 1,
                contenido: 'Comentario 1',
                nombre: 'Nombre 1',
                fechaCreacion: '2021-01-01',
                estado: 'activo'
            },
            {
                id: 2,
                idPost: 1,
                idUser: 1,
                contenido: 'Comentario 2',
                nombre: 'Nombre 2',
                fechaCreacion: '2021-01-01',
                estado: 'activo'
            },
            {
                id: 3,
                idPost: 1,
                idUser: 1,
                contenido: 'Comentario 3',
                nombre: 'Nombre 3',
                fechaCreacion: '2021-01-01',
                estado: 'activo'
            },

        ],
        fechaCreacion: '2021-01-01',
        estado: 'publicado',
        tags: [
            {
                id: 1,
                nombre: 'Tag 1'
            },
            {
                id: 2,
                nombre: 'Tag 2'
            },
            {
                id: 3,
                nombre: 'Tag 3'
            },
            {
                id: 4,
                nombre: 'Tag 4'
            },
            {
                id: 5,
                nombre: 'Tag 5'
            }

        ],
        categoria: {
            id: 2,
            nombre: 'Categoria 2'
        },
        images: [
            {
                id: "1",
                url: 'https://picsum.photos/200/400'
            },
            {
                id: "2",
                url: 'https://picsum.photos/200/300'
            }
        ]
    },
    {
        id: 4,
        idUsuario: 1,
        titulo: 'Titulo 4',
        subtitulo: 'Subtitulo 4',
        contenido: 'Lorem ipsum dolor sit amet consectetur adipiscing elit lobortis curabitur eu, proin sodales vitae hendrerit netus egestas montes parturient donec, cum ac ad ante maecenas quam sagittis dapibus massa. Quam nullam dictum habitant interdum eu auctor metus lacus magnis aliquam aptent, nibh ad diam id vel congue felis augue massa. Nibh fringilla pulvinar penatibus tortor et iaculis, libero praesent ac torquent sem class, senectus sodales magna proin hendrerit. Tortor blandit risus suspendisse nulla praesent quam maecenas quisque ultrices lectus eget magna, lacus porta tincidunt habitasse neque dis dictumst egestas nisl cubilia.<br/> Accumsan gravida mattis ut mi feugiat varius parturient, orci tincidunt congue metus viverra mollis auctor, habitasse hac pretium dictum sollicitudin sodales. A auctor primis inceptos dapibus suscipit quis feugiat tortor porttitor, imperdiet lacus diam laoreet id quam magnis nullam posuere, venenatis in class luctus tempor tincidunt per at. Sociis vehicula aenean iaculis felis torquent mus congue curabitur at viverra morbi purus tempus molestie, primis sociosqu dapibus odio velit maecenas erat est faucibus etiam imperdiet nec ac. Quam egestas habitant viverra blandit dapibus aliquam aenean imperdiet vivamus magna, dictumst leo lobortis a enim phasellus tempor curabitur turpis, tristique orci consequat taciti inceptos et etiam odio eget.',
        comentarios: [
            {
                id: 1,
                idPost: 1,
                idUser: 1,
                contenido: 'Comentario 1',
                nombre: 'Nombre 1',
                fechaCreacion: '2021-01-01',
                estado: 'activo'
            },
            {
                id: 2,
                idPost: 1,
                idUser: 1,
                contenido: 'Comentario 2',
                nombre: 'Nombre 2',
                fechaCreacion: '2021-01-01',
                estado: 'activo'
            },
            {
                id: 3,
                idPost: 1,
                idUser: 1,
                contenido: 'Comentario 3',
                nombre: 'Nombre 3',
                fechaCreacion: '2021-01-01',
                estado: 'activo'
            },

        ],
        fechaCreacion: '2021-01-01',
        estado: 'publicado',
        tags: [
            {
                id: 1,
                nombre: 'Tag 1'
            },
            {
                id: 2,
                nombre: 'Tag 2'
            },
            {
                id: 3,
                nombre: 'Tag 3'
            },
            {
                id: 4,
                nombre: 'Tag 4'
            },
            {
                id: 5,
                nombre: 'Tag 5'
            }

        ],
        categoria: {
            id: 2,
            nombre: 'Categoria 2'
        },
        images: [
            {
                id: "1",
                url: 'https://picsum.photos/200/100'
            },
            {
                id: "2",
                url: 'https://picsum.photos/200/300'
            }
        ]
    },
]
