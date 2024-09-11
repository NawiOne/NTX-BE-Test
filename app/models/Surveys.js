module.exports = (sequelize, Sequelize) => {
  const Surveys = sequelize.define(
    "surveys",
    // {
    //   field: {
    //     type: Sequelize.STRING(50),
    //   },
    // },
    // { timestamps: false }
  );
  return Surveys;
};
