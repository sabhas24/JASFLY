import sequelize from './src/db/connect.js';
import { Piloto, Helicoptero, Vuelo } from './src/models/index.js';

async function runSeed() {
  let retries = 5;
  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log('🔗 Conexión a la BD OK');
      break;
    } catch (err) {
      console.log(`⏳ Esperando a la BD... (${retries} intentos restantes)`);
      retries--;
      await new Promise(res => setTimeout(res, 3000));
    }
  }

  if (retries === 0) {
    console.error('❌ No se pudo conectar a la BD después de varios intentos');
    process.exit(1);
  }

  try {

    // Sincronizar modelos (crea las tablas si no existen)
    // Usamos force: false para no borrar tablas existentes, o true para limpiar todo
    await sequelize.sync({ force: false });

    // Limpiar datos previos en orden inverso a las asociaciones
    await Vuelo.destroy({ where: {}, truncate: { cascade: true } });
    await Helicoptero.destroy({ where: {}, truncate: { cascade: true } });
    await Piloto.destroy({ where: {}, truncate: { cascade: true } });

    console.log('🧹 Tablas limpiadas');

    // 1. Crear Pilotos
    const pilotos = await Piloto.bulkCreate([
      { Nombre: 'Juan', apellido: 'Pérez', tipo_licencia: 'PPL', numero_licencia: 123456 },
      { Nombre: 'María', apellido: 'García', tipo_licencia: 'CPL', numero_licencia: 789012 },
      { Nombre: 'Carlos', apellido: 'Sánchez', tipo_licencia: 'ATPL', numero_licencia: 345678 }
    ], { returning: true });

    // 2. Crear Helicópteros
    const helis = await Helicoptero.bulkCreate([
      { modelo: 'Bell 407', odometro: 1200, activo: true },
      { modelo: 'Eurocopter AS350', odometro: 850, activo: true },
      { modelo: 'Robinson R44', odometro: 450, activo: false }
    ], { returning: true });

    console.log(`Piloto 1 ID: ${pilotos[0].id}, Heli 1 ID: ${helis[0].id}`);

    // 3. Crear Vuelos asociados
    await Vuelo.bulkCreate([
      {
        fecha: new Date(),
        origen: 'Base JASFLY',
        destino: 'Zona Incendio A',
        horaInicio: '08:00:00',
        horaFin: '10:30:00',
        odometroInicio: 1200,
        odometroFin: 1215,
        puestaEnMarcha: 1,
        tirosDeAgua: 5,
        pilotoId: pilotos[0].id,
        helicopteroId: helis[0].id
      },
      {
        fecha: new Date(),
        origen: 'Zona Incendio A',
        destino: 'Base JASFLY',
        horaInicio: '11:00:00',
        horaFin: '12:30:00',
        odometroInicio: 1215,
        odometroFin: 1230,
        puestaEnMarcha: 1,
        tirosDeAgua: 0,
        pilotoId: pilotos[0].id,
        helicopteroId: helis[0].id
      },
      {
        fecha: new Date(),
        origen: 'Aeropuerto Central',
        destino: 'Base Norte',
        horaInicio: '09:00:00',
        horaFin: '10:00:00',
        odometroInicio: 850,
        odometroFin: 865,
        puestaEnMarcha: 1,
        tirosDeAgua: 0,
        pilotoId: pilotos[1].id,
        helicopteroId: helis[1].id
      }
    ]);

    console.log('✅ Datos de prueba (Pilotos, Helicópteros y Vuelos) insertados correctamente');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al seedear:', err);
    process.exit(1);
  }
}

runSeed();
