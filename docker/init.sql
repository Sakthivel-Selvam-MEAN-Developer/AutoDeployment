SELECT 'CREATE DATABASE wondermove'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'wondermove')\gexec
SELECT 'CREATE DATABASE wondermovetest'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'wondermovetest')\gexec
SELECT 'CREATE DATABASE hrm'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'hrm')\gexec
SELECT 'CREATE DATABASE hrmtest'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'hrmtest')\gexec
