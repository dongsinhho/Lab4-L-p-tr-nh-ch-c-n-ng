const users = require('../model/user.model');

const validate = {
    register: async (req, res, next) => {
        try {
            const userTest = await users.findOne({username: req.body.user});
            if (userTest) {
                return res.render('signup', {fail: 'Username đã tồn tại'});
            }
            req.checkBody("user", "Fullname is empty").notEmpty();
            req.checkBody("user", "Fullname Must Not Be Less Than 5").isLength({ min: 5 });
            req.checkBody("mail", "Email is Required").notEmpty();
            req.checkBody("mail", "Email is Invalid").isEmail();
            req.checkBody("pass", "Password is Required").notEmpty();
            req.checkBody("pass", "Password Must Not Be Less Than 5").isLength({ min: 5 });
            //req.check("pass", "Password Must Contain at least 1 Number").matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/, "i");
        
            var errors = req.validationErrors();
        
            if (errors) {
                var messages = [];
                errors.forEach((error) => {
                    messages.push(error.msg);
                });
                console.log(messages);
                return res.render('signup', {fail: "Thông tin nhập không đúng, vui lòng kiểm tra lại"});
            } else {
                return next();
            }
        }
        catch {
            return res.render('error');
        }
    },
    login: (req, res, next) => {
        try {
            req.checkBody("username", "Fullname is empty").notEmpty();
            req.checkBody("password", "Password is Required").notEmpty();
            var errors = req.validationErrors();
            if (errors) {
                var messages = [];
                errors.forEach((error) => {
                    messages.push(error.msg);
                });
                return res.render('signin', {fail: 'Không được bỏ trống'});
            } else {
                return next();
            }    
        }
        catch {
            return res.render('error');
        }
    }
}

module.exports = validate;