const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        post_text: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                length:[1],
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                length:[1],
            }
        },
        user_id: {
            type: DataType.INTEGER,
            
        }
    }
)