const fs = require("fs")
fs.writeFileSync("./.env",`API=${process.env.API}\n`)

//process.env.API, se asigna en la parte de deploy en el servidor