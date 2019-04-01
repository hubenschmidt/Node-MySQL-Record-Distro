DROP DATABASE IF EXISTS recordDistro_db;

CREATE DATABASE recordDistro_db;

USE recordDistro_db;

CREATE TABLE products (
    id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(256) NOT NULL,
    artist_name VARCHAR(256) NOT NULL,
    title VARCHAR(256) NOT NULL,
    department_name VARCHAR(64) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INTEGER NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, artist_name, title, department_name, price, stock_quantity)

VALUES 
("Moodymann - Silentintroduction", "Moodymann", "Silentintroduction", "Electronic", 19.00, 1000),
("Roy Ayers - Everybody Loves the Sunshine", "Roy Ayers", "Everybody Loves the Sunshine", "Funk/Soul", 17.00, 3000),
("Shifted Phases - The Cosmic Memoirs Of The Late Great Rupert J. Rosinthrope", "Shifted Phases", "The Cosmic Memoirs Of The Late Great Rupert J. Rosinthorpe", "Electronic", 18.00, 500),
("Detroit Escalator Company - Soundtrack 313", "Detroit Escalator Company", "Soundtrack 313", "Electronic", 15.00, 800),
("Ahmad Jamal - At the Pershing", "Ahmad Jamal", "At the Pershing", "Jazz", 18.00, 1500),
("Funkadelic - Maggot Brain", "Funkadelic", "Maggot Brain", "Funk/Soul", 8.00, 10000),
("Kurt Rosenwinkel - Heartcore", "Kurt Rosenwinkel", "Heartcore", "Jazz", 9.00, 1200),
("Aphex Twin - Selected Ambient Works Volume II", "Aphex Twin", "Selected Ambient Works Volume II", "Electronic", 15.00, 16000),
("African Head Charge - Environmental Studies", "African Head Charge", "Environmental Studies", "Dub", 12.00, 800),
("Lee Perry - Arkology", "Lee Perry", "Arkology", "Dub", 13.00, 1000);