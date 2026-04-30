CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT,
    year_published INTEGER
);

INSERT INTO books (id, title, author, year_published)
VALUES 
(1, 'Harry Potter og de vises stein', 'J.K. Rowling', 1997),
(2, 'Sult', 'Knut Hamsun', 1890),
(3, '1984', 'George Orwell', 1949);