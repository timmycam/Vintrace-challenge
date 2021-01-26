# Vintace API

A simple REST APIs that returns wind data that describes a breakdown of the TOTAL percentage of year, variety, region and year + variety information for a specific wine, ordered from highest percentage to lowest.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

The backend uses the supplied json files as the data store, and therefore no other connections are required for the server to run. These are in the data directory.

### Prerequisites

Runs on node.js v15

### Installing

To install dependencies

```
npm install
```

Running in dev mode use:

```
npm run dev
```

(Not required to run)To build:

```
npm start
```

By default the local server will run on port 3003, if any differences this will need to be updated in the frontend config.js.