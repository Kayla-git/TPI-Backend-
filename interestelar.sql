CREATE TABLE `featuretypes` (
    `id` int NOT NULL AUTO_INCREMENT,
    `tipo` varchar(255) NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `featuretypes` (`tipo`, `createdAt`, `updatedAt`) 
VALUES 
('Ataque', NOW(), NOW()),
('Defensa', NOW(), NOW()),
('Velocidad', NOW(), NOW());


CREATE TABLE `feature_type` (
    `id` int NOT NULL AUTO_INCREMENT,
    `tipo_nombre` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `feature_type` (`tipo_nombre`) 
VALUES 
('Ataque'),
('Defensa'),
('Velocidad');


CREATE TABLE `personajes` (
    `id` int NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) NOT NULL,
    `universo` varchar(100) DEFAULT NULL,
    `nivel` int DEFAULT '1',
    `habilidades` text,
    `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `personajes` (`nombre`, `universo`, `nivel`, `habilidades`) 
VALUES 
('Goku', 'Dragon Ball', 5, 'Kamehameha, Vuelo'),
('Naruto', 'Naruto', 4, 'Rasengan, Chidori'),
('Luffy', 'One Piece', 4, 'Gomu Gomu no Mi');


CREATE TABLE `features` (
    `id` int NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) NOT NULL,
    `efecto_porcentaje` int DEFAULT NULL,
    `descripcion` text,
    `tipo` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `tipo` (`tipo`),
    CONSTRAINT `features_ibfk_1` FOREIGN KEY (`tipo`) REFERENCES `feature_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `features` (`nombre`, `efecto_porcentaje`, `descripcion`, `tipo`) 
VALUES 
('Super Ataque', 20, 'Aumenta el ataque en un 20%', 1),
('Defensa Alta', 15, 'Reduce el daño recibido en un 15%', 2);


CREATE TABLE `batallas` (
    `id` int NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) NOT NULL,
    `fecha_batalla` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `participante1` int NOT NULL,
    `participante2` int NOT NULL,
    `resultado` varchar(50) DEFAULT NULL,
    `ganador_id` int NOT NULL,
    `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `participante1` (`participante1`),
    KEY `participante2` (`participante2`),
    CONSTRAINT `batallas_ibfk_1` FOREIGN KEY (`participante1`) REFERENCES `personajes` (`id`),
    CONSTRAINT `batallas_ibfk_2` FOREIGN KEY (`participante2`) REFERENCES `personajes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `batallas` (`nombre`, `participante1`, `participante2`, `resultado`, `ganador_id`) 
VALUES 
('Batalla épica', 1, 2, 'Goku gana', 1),
('Luffy vs Naruto', 2, 3, 'Luffy gana', 3);


CREATE TABLE `usuarios` (
    `id` int NOT NULL AUTO_INCREMENT,
    `nombre_usuario` varchar(50) NOT NULL,
    `email` varchar(100) NOT NULL,
    `password` varchar(255) NOT NULL,
    `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
    UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `usuarios` (`nombre_usuario`, `email`, `password`) 
VALUES 
('usuario1', 'usuario1@dominio.com', 'contraseñaSegura'),
('usuario2', 'usuario2@dominio.com', 'contraseñaSegura');
