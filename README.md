CREATE MODEL: `sequelize model:create --name User --attributes firstName:string,lastName:string,email:string,password:string,gender:string,avatar:string`

ISSUE MIGRATIONS TO DB: `sequelize db:migrate`

DROP TABLE / REVERT MIGRATION(S) `sequelize db:migrate:undo`

CREATE SEEDER: `sequelize seed:create --name users`
USE SEEDERS / POPULATE DB WITH DUMMY DATA: `sequelize db:seed:all`
TARGET SPECIFIC SEEDER FILE: `sequelize db:seed --seed 20220329142817-threads`
UNDO SEED OPERATIONS: `sequelize db:seed:undo`
