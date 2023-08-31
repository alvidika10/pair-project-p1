'use strict';

const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    let data = JSON.parse(fs.readFileSync("./data/menus.json", "utf-8"))

    data = data.map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })

  // console.log(data)

    return queryInterface.bulkInsert("Menus", data)
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkInsert("Menus")
  }
};
