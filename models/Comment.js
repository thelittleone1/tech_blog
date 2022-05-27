const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_text: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                length:[1]
            }
        },
        post_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: "post",
                key: "id",
            }
        }
        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
      }
)

model.exports = Comment;