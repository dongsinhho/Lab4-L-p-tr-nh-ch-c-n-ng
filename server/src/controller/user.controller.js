const users = require('../model/user.model');
const bcrypt = require('bcrypt');

const userController = {
    getRegister: (req,res) => {
        res.render('signup');
    },
    postRegister: async (req, res) => {
        try {
            var {user, name, mail, pass, pass2, phone} = req.body;
            var hashPass = await bcrypt.hash(pass, 10);
            const newUser = new users({
                username: user,
                name,
                email: mail,
                password: hashPass,
                phone:phone
            });
            await newUser.save();
            console.log('save success');
        }
        catch {
            return res.render('error');
        }
    },
    getLogin: (req, res) => {
        res.render('signin');
    },
    postLogin: async (req, res) => {
        try {
            var { username, password } = req.body;
            const user = await users.findOne({username});
            if (!user) 
                return res.render('login', {fail: 'Tài khoản không tồn tại'});
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.render('login', {fail: 'Mật khẩu sai'});
            res.render('home', {user: user});
        }
        catch {
            return res.render('error');
        }
    },
    getHome: (req, res) => {
        res.render('home');
    }
}

module.exports = userController;