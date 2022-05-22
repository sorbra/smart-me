'use strict';

const axios = require('axios');
const { Device } = require('homey');
const INTERVAL_SECONDS = 15;
const TIMEOUT_SECONDS = 10;
const SMARTME_DEVICES_URL = "https://smart-me.com/api/Devices";

class MyDevice extends Device {

  timeout = null;

  async getActivePower(username, password, interval_milliseconds) {
    return axios.get(
      SMARTME_DEVICES_URL, {
      auth: {
        username: username,
        password: password
      },
      timeout: TIMEOUT_SECONDS * 1000
    }).then(response => {
      this.setCapabilityValue("measure_power",response.data[0].ActivePower*1000);
      this.setCapabilityValue("meter_power",response.data[0].CounterReadingT1)
      this.log(response.data[0]);
    }).catch(error => this.log("ERROR: " + error.message))
      .finally(() => { this.timeout = setTimeout(this.getActivePower.bind(this), interval_milliseconds, username, password, interval_milliseconds) });
  }

  /**
   * onInit is called when the device is initialized.
   */
  async onInit() {
    const settings = this.getSettings();
    this.getActivePower(settings.username,settings.password,INTERVAL_SECONDS*1000);
  }

  /**
   * onAdded is called when the user adds the device, called just after pairing.
   */
  async onAdded() {
  }

  /**
   * onSettings is called when the user updates the device's settings.
   * @param {object} event the onSettings event data
   * @param {object} event.oldSettings The old settings object
   * @param {object} event.newSettings The new settings object
   * @param {string[]} event.changedKeys An array of keys changed since the previous version
   * @returns {Promise<string|void>} return a custom message that will be displayed
   */
  async onSettings({ oldSettings, newSettings, changedKeys }) {
    this.log('MyDevice settings where changed');
    this.log(oldSettings);
    this.log(newSettings);
    this.log(changedKeys);
  }

  /**
   * onRenamed is called when the user updates the device's name.
   * This method can be used this to synchronise the name to the device.
   * @param {string} name The new name
   */
  async onRenamed(name) {
  }

  /**
   * onDeleted is called when the user deleted the device.
   */
  async onDeleted() {
  }

}

module.exports = MyDevice;
