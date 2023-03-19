'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
 async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Events', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'event_user_id_fk',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Videos', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'video_user_id_fk',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Expenses', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'expense_user_id_fk',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Expenses', {
      fields: ['eventId'],
      type: 'foreign key',
      name: 'expense_event_id_fk',
      references: {
        table: 'Events',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Videos', {
      fields: ['eventId'],
      type: 'foreign key',
      name: 'video_event_id_fk',
      references: {
        table: 'Events',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Events', 'event_user_id_fk');
    await queryInterface.removeConstraint('Videos', 'video_user_id_fk');
    await queryInterface.removeConstraint('Expenses', 'expense_user_id_fk');
    await queryInterface.removeConstraint('Expenses', 'expense_event_id_fk');
    await queryInterface.removeConstraint('Videos', 'video_event_id_fk');
  }
};
