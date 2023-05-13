// import { UserModel } from '../models/userModel';
// import passport from 'passport';
// import LocalStrategy from 'passport-local';
// const JWTstrategy = require('passport-jwt').Strategy;
// const ExtractJWT = require('passport-jwt').ExtractJwt;
// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
//
// passport.use(
//   'signup',
//   new LocalStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password',
//     },
//     async (email, password, done) => {
//       try {
//         const user = await UserModel.create({ email, password });
//
//         return done(null, user);
//       } catch (error) {
//         done(error);
//       }
//     },
//   ),
// );
//
// // ...
// passport.use(
//   'login',
//   new LocalStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password',
//     },
//     async (email, password, done) => {
//       try {
//         const user = await UserModel.findOne({ email });
//         if (!user) {
//           return done(null, false, { message: 'User not found' });
//         }
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         const validate = await user.isValidPassword(password);
//         if (!validate) {
//           return done(null, false, { message: 'Wrong Password' });
//         }
//
//         return done(null, user, { message: 'Logged in Successfully' });
//       } catch (error) {
//         return done(error);
//       }
//     },
//   ),
// );
//
// // ...
// // ...
//
// // ...
// router.post(
//   '/login',
//   async (req, res, next) => {
//     passport.authenticate(
//       'login',
//       async (err, user, info) => {
//         try {
//           if (err || !user) {
//             const error = new Error('An error occurred.');
//             return next(error);
//           }
//           req.login(
//             user,
//             { session: false },
//             async (error) => {
//               if (error) return next(error);
//               const body = { _id: user._id, email: user.email };
//               const token = jwt.sign({ user: body }, 'TOP_SECRET');
//               return res.json({ token });
//             }
//           );
//         } catch (error) {
//           return next(error);
//         }
//       }
//     // (req, res, next);
//   // }
// );
//
//
// // ...
// // const JWTstrategy = require('passport-jwt').Strategy;
// // const ExtractJWT = require('passport-jwt').ExtractJwt;
// passport.use(
//   new JWTstrategy(
//     {
//       secretOrKey: 'TOP_SECRET',
//       jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
//     },
//     async (token, done) => {
//       try {
//         return done(null, token.user);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );
//
// // const express = require('express');
// // const router = express.Router();
// // router.get(
// //   '/profile',
// //   (req, res, next) => {
// //     res.json({
// //       message: 'You made it to the secure route',
// //       user: req.user,
// //       token: req.query.secret_token
// //     })
// //   }
// // )
