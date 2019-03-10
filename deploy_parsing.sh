export NODE_ENV=production && \
export POSTGRES_URL=postgres://root:JUIHKJAHSD87676@hackqc2019.ceixem2ut2a6.us-east-2.rds.amazonaws.com/postgres?sslrootcert=/server/config/rds-combined-ca-bundle.cer && \
export POSTGRES_DB=postgres && \
babel-node server/parsing/parser.js