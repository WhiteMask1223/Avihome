//Objeto que maneja el sistema de filtros

export const filterObjConstructor = {
    'Tipo': {
      anexo: {data:'Anexo', value:true},
      casa: {data:'Casa', value:true},
      complejoResidencial: {data:'Complejo Residencial', value:true},
      departamento: {data:'Departamento', value:true},
      habitacion: {data:'Habitacion', value:true}
    },

    'Ubicación': {
      item1: {data:'item1', value:true},
      item2: {data:'item2', value:true},
      item3: {data:'item3', value:true},
      item4: {data:'item4', value:true},
      item5: {data:'item5', value:true},
    },

    'Servicios': {
        agua: {data:'Agua', value:true},
        aireAcondicionado: {data:'Aire Acondicionado', value:true},
        electricidad: {data:'Electricidad', value:true},
        gas: {data:'Gas', value:true},
        internet: {data:'Internet', value:true}
    },

    'Número de Habitaciones': {
        Una: {data:'Una Habitación', value:true},
        DosACinco: {data:'Dos a Cinco Hablitaciones', value:true},
        CincoADiez: {data:'Cinco a Diez Habitaciones', value:true},
        MasDeDiez: {data:'Más de Diez Habitaciones', value:true}
    },

    'Admite': {
        hombres: {data:'Hombres', value:false},
        mujeres: {data:'Mujeres', value:false},
        cualquiera: {data:'Cualquiera', value:true}
    },
}