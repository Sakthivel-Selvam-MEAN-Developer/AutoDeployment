SELECT 'CREATE DATABASE wondermove'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'wondermove')\gexec
SELECT 'CREATE DATABASE wondermovetest'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'wondermovetest')\gexec