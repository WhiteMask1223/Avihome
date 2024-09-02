//Objeto que maneja el sistema de filtros

const locationData = {
  item1: {data:'Urb. Rómulo Gallegos', value:true},
  item2: {data:'Barrio Texto que excede los limites', value:true},
  item3: {data:'Centro', value:true},
  item4: {data:'Las Palmas', value:true},
  item5: {data:'Terminal', value:true},
}

export const filterObjConstructor = {
    'Tipo': {
      'Anexo': true,
      casa: {data:'Casa', value:true},
      complejoResidencial: {data:'Complejo Residencial', value:true},
      departamento: {data:'Departamento', value:true},
      habitacion: {data:'Habitacion', value:true}
    },

    'Ubicación': locationData,

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