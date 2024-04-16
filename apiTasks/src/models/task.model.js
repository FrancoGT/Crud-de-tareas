const { DataTypes, Model } = require('sequelize');
const sequelize = require('../databases/mysql.db');

class Task extends Model 
{
    static init(sequelize) 
    {
        return super.init({
            task_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            task_description: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            completed: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        }, {
            sequelize,
            modelName: 'Task',
            tableName: 'tasks',
            timestamps: false,
        });
    }
}

Task.init(sequelize);

module.exports = Task;