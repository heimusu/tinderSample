/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var testImage = require('../api/testImage/testImage.model');
var likeImage = require('../api/likeImage/likeImage.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

testImage.find({}).remove(function(){
    testImage.create({
        id:1,
        name:'testImage1',
        url:'http://36.media.tumblr.com/cf1a856462967caf6f711de81c4390fa/tumblr_nnie25FH891uqjshqo1_500.jpg'
    }, {
        id:2,
        name:'testImage2',
        url:'http://40.media.tumblr.com/748105757c81983688a71d59e09fa85f/tumblr_nm9x93s3oA1tty5yto1_500.jpg'
    },
    {
        id:3,
        name:'testImage3',
        url:'http://40.media.tumblr.com/f802211038ab0b008dff2279ce76c697/tumblr_nnifwgqfVw1uqjshqo1_500.png'
    },
    {
        id:4,
        name:'testImage4',
        url:'http://40.media.tumblr.com/4552f9726ebeecdb717e875b090fa79c/tumblr_nnhsqiaXtx1qb821do1_500.jpg'
    },
    {
        id:5,
        name:"testImage5",
        url:"http://www.heimusu.com/tinderImage/mobile_21990462.jpeg"
    }
    );
});

likeImage.find({}).remove(function(){
    likeImage.create({
        id:'555682b5dc92ab0315720e0f',
        like:['1']
    },
    {
        id:'555682b5dc92ab0315720e10',
        like:['1','2']
    }
    );
});
