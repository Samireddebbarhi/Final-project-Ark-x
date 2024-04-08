const Customer = require('../../Models/Customer')

exports.updateProfile = async (req, res) => {
    const { userId } = req.params.id
  
    try {
      const user = await Customer.findByIdAndUpdate(userId,  {
      username: req?.body.username,
      email : req?.body.email,
      password : req?.body.password,
    },
    {
        new: true,
    }).exec()
  
      if (!user) {
        res.status(401)
        res.json({success: false, message: `Cannot find an User with the userId: ${userId}`})
        res.end()
        return
      }
      res.json({success: true, user: user, message: `User with _id :${userId} have been updated.`})
      res.end()
      return
  
    } catch (e) {
      res.status(400)
      console.error(e);
      res.json({success: false, e})
      res.end()
    }
  }