const { sequelize } = require("../../core/db");

const { Sequelize, Model } = require("sequelize");

// music sentence movie
const classicFields = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    fav_nums: Sequelize.INTERGER,
    title: Sequelize.STRING,
    type: Sequelize.TINYINT,
}


class Movie extends Model {

}

Movie.init(classicFields, {
    sequelize,
    tableName: 'movie'
})

class Sentence extends Model {

}

Sentence.init(classicFields, {
    sequelize,
    tableName: 'sentence'
})

class Music extends Model {

}

const MusicFields = Object.assign({url: Sequelize.STRING}, classicFields)

Music.init(MusicFields, {
    sequelize,
    tableName: 'music'
})

module.exports = {
    Movie,
    Sentence,
    Music
}