Photo Management in NodeJS
=====================
*NOTE: This script is still very much in beta. Use at your own risk. Any time you are scripting moving files around your file system, you run the risk of data loss. Back up your files first.*

Preliminary script for managing my photos using NodeJS. This script reads a source directory and moves photos and videos into directories by year/month. I built this for automatically moving files on my Synology from my automated Dropbox Camera Uploads folder into an organized file structure.

By default, files will live in `photos/yyyy/mm - Month/file.jpg` or for example, `photos/2014/01-January/2014-08-09 17.24.25-2.jpg` (or the videos directory).

## Getting Started
1. Make sure you have [NodeJS](http://nodejs.org/) installed on your intended machine.
2. Download `organize.js`
3. In the directory you plan to run `organize.js` run `npm install mv`

## Configuration
You'll need to set up several variables for this to run properly:

* `sourceDirectory` - this is the directory the script should analyze for photos and videos (requires a trailing /)
* `photosDestination` and `videosDestination` - base directory where photos and videos should live (requires a trailing /)

Optionally, you can configure `photosExtensions` and `videoExtensions` if you'd like to add other files types extensions.

## Running
Once everything is set up, running the script is simply a matter of running a `node organize.js` command.