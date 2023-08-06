const User = require('../Model/user');
const Deposit = require('../Model/depositSchema');
const Widthdraw = require('../Model/widthdrawSchema');
const jwt = require('jsonwebtoken');





// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }

  const maxAge = 3 * 24 * 60 * 60;
  const createToken = (id) => {
    return jwt.sign({ id }, 'piuscandothis', {
      expiresIn: maxAge
    });
  };



module.exports.homePage = (req, res) =>{
    res.render('index')
}

module.exports.aboutPage = (req, res) =>{
    res.render('about')
}


module.exports.contactPage = (req, res) =>{
    res.render('contact')
}

module.exports.faqPage = (req, res) =>{
    res.render('faq')
}

module.exports.privacyPage = (req, res) =>{
    res.render('privacy')
}

module.exports.loginAdmin = (req, res) =>{
    res.render('loginAdmin');
}

module.exports.accountType = (req, res) =>{
    res.render('accountType')
}

module.exports.registerPage = (req, res) =>{
    res.render('register')
}

module.exports.buyCrypto = (req, res) =>{
  res.render('buyCrypto')
}

module.exports.register_post = async (req, res) =>{
    const {fullname, tel,  email, password, } = req.body;
    try {
        const user = await User.create({fullname, tel, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
      }
        catch(err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
          }
      
}
module.exports.loginPage = (req, res) =>{
    res.render('login')
}

module.exports.login_post = async(req, res) =>{
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
    } 
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}

module.exports.dashboardPage = (req, res) =>{
  res.render('dashboard');
}


module.exports.accountPage = async(req, res) =>{
  const id = req.params.id
  const user = await User.findById(id);
  res.render('account', {user})
}

module.exports.depositPage = async(req, res) =>{
    res.render('fundAccount')
}

module.exports.depositPage_post = async(req, res) =>{
    try {
      const deposit = new Deposit({
        wallet: req.body.wallet,
        amount: req.body.amount,
        status: req.body.status,
        image: req.file.image,
      });
      deposit.save()
      const id = req.params.id;
      const user = await User.findById( id);
      user.deposits.push(deposit);
      await user.save();
      
      res.render('allDeposit', { user})
      // res.send('works good')
    } catch (error) {
      console.log(error)
    }
  
}

module.exports.depositHistory = async(req, res) =>{
    try {
    const id = req.params.id;
    const user = await User.findById(id).populate("deposits")
    res.render('allDeposit', { user});
    // res.json(user)
    } catch (error) {
      console.log(error)
    }
}


module.exports.widthdrawPage = (req, res) =>{
    res.render('widthdrawFunds')
}

module.exports.widthdrawPage_post = async(req, res) =>{
  try {
    const widthdraw = new Widthdraw({
      wallet: req.body.wallet,
      amount: req.body.amount,
      status: req.body.status,
    });
    widthdraw.save()
    const id = req.params.id;
    const user = await User.findById(id)
    user.widthdraws.push(widthdraw);
    await user.save();
    
    res.render('allWidthdraws', { user});
  } catch (error) {
    console.log(error)
  }

}

module.exports.widthdrawHistory = async(req, res) =>{
  const id = req.params.id;
  const user =  await User.findById(id).populate("widthdraws");
     res.render('allWidthdraws', { user})
}


module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}



