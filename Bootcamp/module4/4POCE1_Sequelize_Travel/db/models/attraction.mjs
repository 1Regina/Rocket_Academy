export default function initAttractionModel(sequelize, DataTypes) {
  return sequelize.define(
    'attraction',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      trip_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        // This links the trip_id column to the id column in the trips table
        references: {
          model: 'trips',
          key: 'id',
        },
      },
      category_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        // This links the trip_id column to the id column in the trips table
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      // The underscored option makes Sequelize reference snake_case names in the DB.
      underscored: true,
    },
  );
}
