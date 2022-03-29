const models = require("../models");
const { Op } = require("sequelize");
const { sequelize } = require("../models");

const User = models.User;
const Thread = models.Thread;
const Participant = models.Participant;
const Message = models.Message;

exports.index = async (req, res) => {
  // return all Threads sent to the user who calls this endpoint:
  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
    include: [
      {
        model: Thread,
        include: [
          {
            model: User,
            where: {
              [Op.not]: {
                id: req.user.id,
              },
            },
          },
          {
            model: Message,
            limit: 20,
            order: [["id", "DESC"]],
          },
        ],
      },
    ],
  });

  return res.send(user.Threads);
};

exports.create = async (req, res) => {
  const { receiverId } = req.body;
  const transaction = await sequelize.transaction(); // transactions allow db to revert changes made in this call if anything fails.

  try {
    // Check if sender / receiver already have a thread together ('dual')
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      include: [
        {
          model: Thread,
          where: {
            type: "dual",
          },
          include: [
            {
              model: Participant,
              where: {
                userId: receiverId,
              },
            },
          ],
        },
      ],
    });

    if (user && user.Threads.length > 0) {
      return res.status(403).json({
        status: "Error",
        message: "Thread with this user already exists ",
      });
    }

    const thread = await Thread.create(
      { type: "dual" },
      { transaction: transaction }
    );

    await Participant.bulkCreate(
      [
        {
          threadId: thread.id,
          userId: req.user.id,
        },
        {
          threadId: thread.id,
          userId: receiverId,
        },
      ],
      { transaction: transaction }
    );

    await transaction.commit();

    const newThread = await Thread.findOne({
      where: {
        id: thread.id,
      },
      include: [
        {
          model: User,
          where: {
            [Op.not]: {
              id: req.user.id,
            },
          },
        },
        {
          model: Message,
        },
      ],
    });

    return res.send(newThread);
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ status: "Error", message: error.message });
  }
};
