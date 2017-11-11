const SHA256 = require("crypto-js/sha256");
const TeamRank = require('../models/team_rank');
const conf = require('../conf.js');

exports.getTeamRank = function (req, res, next) {
  TeamRank.find({}, { '_id': 0, '__v':0}, function(err, teams){
        if(err){ return next(err); }
        res.send(teams);
  });
}

//crypto.createHash('sha1').update(current_date + random).digest('hex');
exports.postTeamRank = function (req, res, next){
  const team = req.body.team;
  const score = req.body.score;
  const sign = req.body.sign;


  //validation
  if(!team || !score || !sign){
    return res.status(422).send({error: 'You must provide team, score and key'})
  }

  // Client verification
  const hash = SHA256((conf.salt+team+score)).toString();

  if(hash !== sign){
    return res.status(404).send({error: 'Invalid sign'})
  }

  //see if user already exists
  TeamRank.findOneAndUpdate({team: team},{$inc: {score: score}}, function (err, existingTeam) {
    if(err){ return next(err); }

    //if the team not exists them it is created
    if(!existingTeam){
      console.log("Creating a new team");
      const teamRank = new TeamRank({
        team: team,
        score: score
      });

      teamRank.save(function(err){
        if(err){ return next(err); }
        return res.json({success: true});
      });
    }else{
      console.log("updating team");
      return res.json({success: true});
    }

  });

}
