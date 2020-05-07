CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255)
) CHARACTER SET utf8 COLLATE utf8_unicode_ci;
 
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255),
  `price` DECIMAL(10,2) DEFAULT 0,
  `category_id` INT REFERENCES categories (id)
) CHARACTER SET utf8 COLLATE utf8_unicode_ci;

INSERT INTO `categories` (`id`, `name`) VALUES 
  (1, 'Frutas'), 
  (2, 'Doces');

INSERT INTO  `products` ( `id`,  `name`,  `price`,  `category_id`) VALUES 
  (1, 'Banana', 5.0, 1), 
  (2, 'Maçã', 3.0, 1), 
  (3, 'Pêra', 6.0, 1),
  (4, 'Uva', 10.0, 1),
  (5, 'Goiaba', 7.0, 1),
  (6, 'Melancia', 15.0, 1),
  (7, 'Melão', 12.0, 1),
  (8, 'Abacate', 4.0, 1),
  (9, 'Abacaxi', 6.0, 1),
  (10, 'Ameixa', 8.0, 1),

  (11, 'Barra de chocolate', 10.0, 2),
  (12, 'Bombom', 2.0, 2),
  (13, 'Cupcakes', 12.0, 2),
  (14, 'Maria mole', 6.0, 2),
  (15, 'Algodão doce', 3.30, 2),
  (16, 'Chiclete', 0.50, 2),
  (17, 'Bolacha recheada', 3.0, 2),
  (18, 'Pipoca doce', 5.0, 2),
  (19, 'Paçoca', 8.0, 2),
  (20, 'Cocada', 10.0, 2);