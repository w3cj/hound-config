# Hound Config generator

Creates a config for use with [Hound](https://github.com/etsy/hound), by finding all repos for a given organization.

### Setup

Copy the sample `.env` file and update with your values.

```sh
$ cp .env.sample .env
```

### Run

```
$ npm start
```

The script will find all repos and generate `config.json`

Copy this file to your hound directory.
