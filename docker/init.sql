SELECT 'CREATE DATABASE wonderwhy'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'wonderwhy')\gexec
SELECT 'CREATE DATABASE wonderwhytest'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'wonderwhytest')\gexec
