const fs = require('fs');

module.exports = (app) => {
    fs.readdirSync(__dirname)
        .filter(file => file !== 'index.js')
        .forEach(file => {
            let router = require(`./${file}`);
            app.use(router.routes())
               .use(router.allowedMethods())
        })

}