const User = require("../model/User");

exports.register = async (req, res, next) => {
    const { username, password } = req.body;
    if (password.length < 8) {
      return res.status(400).json({ message: "Password less than 8 characters" });
    }
    try {
        await User.create({
            username,
            password,
        }).then(user =>
            res.status(200).json({
                message: 'User successfully created',
                user,
            })
        )
    } catch (err) {
        res.status(401).json({
            message: 'User creation not successful',
            error: error.message
        })
    }
}

exports.login = async (req, res, next) => {
    const {username, password} = req.body
    if (!username || !password) {
        return res.status(400).json({
            message: 'Username or password is empty',
        })
    }
    try {
        const user = await User.findOne({username, password})
        if (!user) {
        res.status(401).json({
            message: 'Login unsuccessful',
            error: 'User not found',
        })
        } else {
            res.status(200).json({
                message: 'Login sucessful',
                user,
            })
        }
    } catch {
        res.status(400).json({
            message: 'An error has occurred',
            error: error.message,
        })
    }
}

exports.update = async (req, res, next) => {
    const {role, id} = req.body
    // verifies if role and id are present
    if (role && id) {
        // verifies if role is admin
        if (role === 'admin') {
            // finds the user with id
            await User.findById(id)
                .then((user) => {
                    // verifies the user is not an admin
                    if (user.role !== 'admin') {
                        user.role = role
                        user.save((err) => {
                            // MongoDB error checker
                            if (err) {
                                return res
                                    .status('400')
                                    .json({
                                            message: 'An error occurred',
                                            error: err.message})
                                process.exit(1)
                            }
                            res.status('201').json({message: 'Update sucessful', user})
                        })
                    } else {
                        res.status('400').json({message: 'User is already an Admin'})
                    }
                })
                .catch((error) => {
                    res
                        .status('400')
                        .json({message: 'An error occurred', error: error.message})
                    })
        } else {
            res.status('400').json({message: 'Role is not admin'})
        }
    } else {
        res.status('400').json({message: 'Role or ID is missing'})
    }
}