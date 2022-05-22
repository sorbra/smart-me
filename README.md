# TO DO 
- REPORT FROM THE RIGHT DEVICE DATA IF THERE IS MORE THAN ONE DEVICE
- Disable timer when a device is deleted
- Test adding/removing devices
- Test password update
- Test behaviour with wrong credentials
- Test longterm memory consumption
- See if we can loose some of the node modules fat

# Smart-Me

This Homey App integrates with the [Smart-Me Kamstrup Module](https://web.smart-me.com/project/kamstrup-modul/), and thus makes it possible to follow your net electricity consumption/production in real-time.

The app's goal is to be able to setup Homey Flows that help you consume electricity at times when you are a net producer of electricity, typically from your own solar panels.

# History
The development of this app has only just begun. It is not useful at this point in time.

# Developer Getting started
In case you want to contribute to this Homey App, this section contains a few basic hints to get started

## Pre-requisites
1. You own at least one  [Smart-Me Kamstrup Module](https://web.smart-me.com/project/kamstrup-modul/)
1. You own a Homey Pro (I don't know if this app applies to other Homey devices).
1. You have setup your development environment as described in [Homey Apps SDK Getting Started](https://apps.developer.homey.app/the-basics/getting-started).

## Getting started
1. Clone this repository
1. CD to the clone root directory
1. Run "npm install" to download all the node modules required
1. Run "homey app run" to run the app on your own homey

You're now ready to start improving this Homey App :).