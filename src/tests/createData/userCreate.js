const User = require("../../models/User")

const userCreate = async () => {

  await User.create(
    {
      firstName: 'Cristiano',
      lastName: "sime",
      email: "simecristiano@gmail.com",
      password: 'cristiano1234',
      phone: '+51927059115'
    }
  )

}

module.exports = userCreate