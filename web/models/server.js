module.exports = (sequelize,DataTypes) => {
  let server = sequelize.define('server', {
    ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    max_conns: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    max_fails: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    fail_timeout: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10
    },
    backup: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    down: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  server.associate = models => {
    models.server.belongsTo(models.domain);
  }
  return server;
}