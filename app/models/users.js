const {DataTypes, Model} = require('sequelize')

module.exports = (sequelize) => {
    class User extends Model{
        static associate(models){
            User.hasMany(models.Payment, {
                foreignKey: 'userId',
                as: 'payments',
            })
        }
    }
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'first_name',
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'last_name',
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        underscored: true, // Use snake_case for column names
        timestamps: true, 
    });
    return User;
}
