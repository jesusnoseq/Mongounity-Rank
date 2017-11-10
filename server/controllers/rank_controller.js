const TeamRank = require('../models/team_rank');

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
  const key = req.body.key;

  //validation
  if(!team || !score || !key){
    return res.status(422).send({error: 'You must provide team, score and key'})
  }


/*
bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
    // Store hash in your password DB.
});

bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    // res == true
});
*/


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
