const assert = require('assert');
const mongoose = require('mongoose');

const Game = require('../../server/models/game');
const Profile = require('../../server/models/profile');

describe('Creating records', () => {

  it('saves a game', done => {
    let form = {
      twitchId: '12531256'
    };

    const game = new Game(form);
    game.save()
      .then(() => {
        assert(!game.isNew);
        done();
      });
  });

  it('requires a twitchId', done => {
    let form = {
      player: {}
    };

    const game = new Game(form);
    game.save()
      .then(() => {
        assert(false);
        done();
      })
      .catch( (err) => {
        assert(err.errors.twitchId.message.indexOf('is required') >= 0);
        done();
      });
  });

  it('accepts a player\'s profile', done => {
    let form = {
      twitchId: '12531256'
    };

    let profile = {
      username: 'testslayer'
    };

    const game = new Game(form);
    const eric = new Profile(profile);
    eric.save()
      .then(() => game.save() )
      .then(() => Game.findOne({ twitchId: form.twitchId }) )
      .then((game) => {
        game.players.push(eric);
        return game.save();
       })
      .then(() => {
        Game.findOne({ twitchId: form.twitchId })
          .populate('players')
          .then( (foundGame) => {
            assert( foundGame.players[0].username === profile.username );
            done();
          });
      });
  });

  it('accepts multiple player\'s profiles', done => {
    let form = {
      twitchId: '12531256'
    };

    let profile = {
      username: 'testslayer'
    };

    let profile2 = {
      username: 'mochaslayer'
    };

    const game = new Game(form);
    const eric = new Profile(profile);
    const franco = new Profile(profile2);
    eric.save()
      .then(() => franco.save() )
      .then(() => game.save() )
      .then(() => Game.findOne({ twitchId: form.twitchId }) )
      .then((game) => {
        game.players.push(eric);
        game.players.push(franco);
        return game.save();
       })
      .then(() => {
        Game.findOne({ twitchId: form.twitchId })
          .populate('players')
          .then( (foundGame) => {
            assert( foundGame.players[0].username === profile.username );
            done();
          });
      });
  });
});
