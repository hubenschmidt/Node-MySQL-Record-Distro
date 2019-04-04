DROP DATABASE IF EXISTS recordDistro_db;

CREATE DATABASE recordDistro_db;

USE recordDistro_db;

CREATE TABLE products (
    unique_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(256) NOT NULL,
    artist_name VARCHAR(256) NOT NULL,
    title VARCHAR(256) NOT NULL,
    department_name VARCHAR(64) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INTEGER NULL,
    product_sales INTEGER NULL,
    PRIMARY KEY (unique_id)
);

INSERT INTO products (product_name, artist_name, title, department_name, price, stock_quantity)

VALUES 
("Moodymann - Silentintroduction", "Moodymann", "Silentintroduction", "Electronic", 9.99, 1000),
("Roy Ayers - Everybody Loves the Sunshine", "Roy Ayers", "Everybody Loves the Sunshine", "Funk/Soul", 7.99, 3000),
("Shifted Phases - The Cosmic Memoirs Of The Late Great Rupert J. Rosinthrope", "Shifted Phases", "The Cosmic Memoirs Of The Late Great Rupert J. Rosinthorpe", "Electronic", 8.99, 500),
("Detroit Escalator Company - Soundtrack 313", "Detroit Escalator Company", "Soundtrack 313", "Electronic", 5.99, 800),
("Ahmad Jamal - At the Pershing", "Ahmad Jamal", "At the Pershing", "Jazz", 8.99, 1500),
("Funkadelic - Maggot Brain", "Funkadelic", "Maggot Brain", "Funk/Soul", 8.99, 10000),
("Kurt Rosenwinkel - Heartcore", "Kurt Rosenwinkel", "Heartcore", "Jazz", 9.99, 1200),
("Aphex Twin - Selected Ambient Works Volume II", "Aphex Twin", "Selected Ambient Works Volume II", "Electronic", 15.99, 16000),
("African Head Charge - Environmental Studies", "African Head Charge", "Environmental Studies", "Dub", 12.99, 800),
("Lee Perry - Arkology", "Lee Perry", "Arkology", "Dub", 13.99, 1000);

CREATE TABLE departments (
    department_id INTEGER NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(256) NULL,
    over_head_costs DECIMAL(10,2) NULL,
    PRIMARY KEY (department_id)
)

-- //EXECUTE THIS QUERY AFTER IMPORT
-- CREATE TABLE orders (
--     order_id INTEGER NOT NULL AUTO_INCREMENT,
--     product_name VARCHAR(256) NOT NULL,
--     artist_name VARCHAR(256) NOT NULL,
--     title VARCHAR(256) NOT NULL,
--     department_name VARCHAR(64) NULL,
--     quantity_purchased INTEGER NULL,
--     total DECIMAL(10,2) NULL,
--     unit_price DECIMAL(10,2) NULL,
--     PRIMARY KEY (order_id)
-- )