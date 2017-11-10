const TeamRank = require('./controllers/rank_controller');


module.exports = function (app) {
  app.get('/', function (req, res){
    res.send({message: 'Rank API'});
  });
  app.get('/rank/team', TeamRank.getTeamRank);
  app.post('/rank/team', TeamRank.postTeamRank);
}
