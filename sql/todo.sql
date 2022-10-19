-- Exercise: Add created_at and updated_at
create table todos
(
    id      SERIAL      not null primary key,
    name    varchar(100) not null,
    is_done boolean      not null
);
