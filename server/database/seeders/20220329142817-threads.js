"use strict";
const models = require("../../models");

const User = models.User;
const Thread = models.Thread;
const Participant = models.Participant;
const Message = models.Message;

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    try {
      const users = await User.findAll({ limit: 2 });
      const thread = await Thread.create();
      await Participant.bulkCreate([
        {
          threadId: thread.id,
          userId: users[0].id,
        },
        {
          threadId: thread.id,
          userId: users[1].id,
        },
      ]);

      await Message.bulkCreate([
        {
          message: "Hello friend",
          threadId: thread.id,
          fromUserId: users[0].id,
        },
        {
          message: "Hey there!",
          threadId: thread.id,
          fromUserId: users[1].id,
        },
        {
          message: "How are you doing?",
          threadId: thread.id,
          fromUserId: users[1].id,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
