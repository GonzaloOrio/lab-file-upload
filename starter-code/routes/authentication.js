/*jshint esversion:6*/
const express = require('express');
const passport = require('passport');
const multer = require('multer');
const router = express.Router();
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

const upload = multer({
  dest: './public/uploads/'
});

router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('authentication/login', {
    message: req.flash('error')
  });
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('authentication/signup', {
    message: req.flash('error')
  });
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
}));



router.post('/upload', upload.single('file'), function(req, res) {
  const pic = new Picture({
    namePicture: req.body.namePicture,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname,
  });

  pic.save((err) => {
    res.redirect('/');
  });
});

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
  res.render('authentication/profile', {
    user: req.user
  });
});

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
