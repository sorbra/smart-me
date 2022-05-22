'use strict';

const { Driver } = require('homey');
const axios = require('axios');
const SMARTME_DEVICES_URL = "https://smart-me.com/api/Devices";
const TIMEOUT_SECONDS = 10;

class SmartMeDriver extends Driver {
  async onInit() {
  }


  async getSmartMeDevices(username, password, populateDevices) {
    return axios.get(
      SMARTME_DEVICES_URL, {
      auth: {
        username: username,
        password: password
      },
      timeout: TIMEOUT_SECONDS * 1000
    }).then(function (response) {
      populateDevices(response.data, username, password)
    });
  }

  async onPair(session) {
    let username = "";
    let password = "";

    session.setHandler("login", async (data) => {
      username = data.username;
      password = data.password;
      return true;
    });

    session.setHandler("list_devices", async () => {
      let ndevices = [];
      const populateDevices = (data, username, password) => {
        ndevices = data.map(element => {
          return {
            name: element.Name,
            data: {
              id: element.Id
            },
            settings: {
              username: username,
              password: password
            },
            capabilities: ["meter_power","measure_power"]
          }
        });
      }

      await this.getSmartMeDevices(username, password, populateDevices);

      return ndevices;
    });
  }
}

module.exports = SmartMeDriver;
