const bd = require('../bd');

class Logs {
    async addLog(userid, type, text) {
        try {
            await bd.query(
                'INSERT INTO logs (userId, type, date, text) ' +
                    'VALUES ($1, $2, $3, $4)',
                [userid, type, new Date(), text]
            );
        } catch (error) {
            console.log(`Произошла ошибка при логировании: ${error}`);
            console.log(`Произошли технические шоколадки`);
        }
    }
}

module.exports = new Logs();
