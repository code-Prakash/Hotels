const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');

passport.use(new LocalStrategy(
  async(Username, password, done) => {
    //Authentication Logic
    try{
      //console.log("Received Credentials: ", Username, password);
      const user = await Person.findOne({username: Username});
      if(!user){
        console.log('User not found');
        return done(null, false, { message: 'Incorrect username.' });
      }
      const isPasswordMatch = await user.comparePassword(password);
      if(isPasswordMatch){
        return done(null, user);
      }else{
        console.log('Password mismatch');
        return done(null, false, { message: 'Incorrect password.' });
      }

    }catch(err){
      return done(err);
    }
  }
))

module.exports = passport;