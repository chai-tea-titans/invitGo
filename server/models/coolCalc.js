const { User, Event, Video, CoolScore } = require('../models');

const VIDEO_WEIGHT = 0.4;
const INVITE_WEIGHT = 0.35;
const EVENT_WEIGHT = 0.25;

async function calculateCoolnessScore(userId) {
  const eventCount = await Event.count({ where: { userId }});
  const videoCount = await Video.count({ where: { userId }});
  const inviteCount = await Event.sum('numConfirmed', { where: { userId }});

  const videoScore = videoCount * VIDEO_WEIGHT;
  const inviteScore = inviteCount * INVITE_WEIGHT;
  const eventScore = eventCount * EVENT_WEIGHT;
  const score = videoScore + inviteScore + eventScore;

  const [user, coolScore] = await Promise.all([
    User.findByPk(userId),
    CoolScore.findOne({ where: { userId }})
  ]);

  if (!coolScore) {
    await CoolScore.create({
      userId,
      eventScore: eventCount,
      videoScore: videoCount,
      inviteScore: inviteCount
    });
  } else {
    await coolScore.update({
      eventScore: eventCount,
      videoScore: videoCount,
      inviteScore: inviteCount
    });
  }

  return score;
}

module.exports = {calculateCoolnessScore};
