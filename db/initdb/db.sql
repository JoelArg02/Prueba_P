SET
    TIMEZONE = 'America/Guayaquil';

CREATE TABLE pruebas (
    id_prueba SERIAL PRIMARY KEY,
    numero_preguntas INT NOT NULL,
    duracion INT NOT NULL,
    fecha_inicio TIMESTAMP NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE preguntas (
    id_pregunta SERIAL PRIMARY KEY,
    id_prueba INT REFERENCES pruebas(id_prueba),
    enunciado TEXT NOT NULL,
    opciones TEXT [] NOT NULL,
    -- Guarda las opciones en un array de texto
    respuesta_correcta INT NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);