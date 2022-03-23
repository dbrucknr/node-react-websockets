CREATE MODEL: `sequelize model:create --name User --attributes firstName:string,lastName:string,email:string,password:string,gender:string,avatar:string`

`sequelize db:migrate`

DROP TABLE / REVERT MIGRATION(S) `sequelize db:migrate:undo`

CREATE SEEDER: `sequelize seed:create --name users`
USE SEEDERS / POPULATE DB WITH DUMMY DATA: `sequelize db:seed:all`
UNDO SEED OPERATIONS: `sequelize db:seed:undo`
