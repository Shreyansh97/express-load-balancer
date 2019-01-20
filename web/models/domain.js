module.exports = (sequelize,DataTypes) => {
  let domain =  sequelize.define('domain', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: { //1.round-robin 2.least-connected 3.ip-hash
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    protocol: { //http, https
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'http'
    }
  });
  domain.associate = models => {
    models.domain.hasMany(models.server);
  }
  return domain;
}