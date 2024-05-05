const Pool = require('pg').Pool
const pool =  new Pool({
    user: "localhost",
    password: "0",
    host: "localhost",
    port: 5432,
    database: "ShagrenShopDB"
})

module.exports = pool