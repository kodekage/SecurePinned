#! /bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE USER secured_pinned;
  CREATE DATABASE secure_pinned ENCODING UTF8;
  GRANT ALL PRIVILEGES ON DATABASE secure_pinned TO secured_pinned;
  ALTER USER secured_pinned WITH PASSWORD 'getpinnedmessages';
  ALTER USER secured_pinned WITH SUPERUSER;
EOSQL
