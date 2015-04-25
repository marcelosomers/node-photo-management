/**
 * Synology/Node Photo Organization Script
 */


/**
 * Source Directory Configuration
 * This is the source directory where our photo and video files live
 * IMPORTANT: Make sure your path ends with a /
 */
var sourceDirectory = "./";



/**
 * Destination Directory Configuration
 * These are the destination directories where photos and videos should ultimately be stored
 * Note that within these directories will live year/month (e.g., 2014/10 - October) directories,
 * so this should be the master directories for photos and videos.
 * IMPORTANT: Make sure your path ends with a /
 */
var photosDestination = "./";
var videosDestination = "./";



/**
 * File Extension Configuration
 * photoExtensions and videoExtensions are file extensions that will land in
 * photosDestination and videosDestination as defined above
 */
var photoExtensions = [
    ".jpg",
    ".JPG",
    ".gif",
    ".GIF",
    ".png",
    ".PNG"
]

var videoExtensions = [
    ".mov",
    ".MOV",
    ".mp4",
    ".MP4",
    ".3gp"
]


/**
 * ------------ DON'T EDIT BELOW THIS UNLESS YOU KNOW WHAT YOU'RE DOING ------------
 */

var fs = require("fs")
    mv = require("mv");

// Define our months to generate folder names
var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

// Read the directory defined above and save list of files to an array, files
fs.readdir(sourceDirectory, function(err, files) {
    if (err) {
        throw err;
    }

    var fileType = null;

    // Filter for only our image files
    var images = [];
    var videos = [];

    // Loop over all files in sourceDirectory and determine if they are an image or video
    for (var i=0, len = files.length; i < len; i++) {
        var file = files[i];
        var fileExtension = file.substring(file.length - 4);

        // Add any image file with an extension in photoExtensions to our images object
        if (photoExtensions.indexOf(fileExtension) > -1) {
            images.push(file);
        }

        // Add any video file with an extension in videoExtensions to our videos object
        if (videoExtensions.indexOf(fileExtension) > -1) {
            videos.push(file);
        }
    }

    // Loop over each image file
    // Get date metadata from the file name
    // Move the file
    for (var i=0, len = images.length; i < len; i++) {
        var file = images[i];

        // Get the year and month from the file name
        var fileDate = getDateInfo(file);

        // Define paths
        var existingFilePath = sourceDirectory + "/" + file;
        var newFilePath = photosDestination + fileDate.year + "/" + fileDate.monthNumber + " - " + fileDate.monthName + "/" + file;

        // Move the file
        // mkdirp: Make the required directories if they don't exist
        // clobber: Don't overwrite any files
        mv(existingFilePath, newFilePath, {mkdirp: true, clobber: false}, function(err) {
            if(err) {
                throw err;
            } else {
                console.log("Moving " + file + " to " + newFilePath);   
            }
        });
    }

    // Loop over each video file
    // Get date metadata from the file name
    // Move the file
    for (var i=0, len = videos.length; i < len; i++) {
        var file = videos[i];

        // Get the year and month from the file name
        var fileDate = getDateInfo(file);

        // Define paths
        var existingFilePath = sourceDirectory + "/" + file;
        var newFilePath = videosDestination + fileDate.year + "/" + fileDate.monthNumber + " - " + fileDate.monthName + "/" + file;

        // Move the file
        // mkdirp: Make the required directories if they don't exist
        // clobber: Don't overwrite any files
        mv(existingFilePath, newFilePath, {mkdirp: true, clobber: false}, function(err) {
            if(err) {
                throw err;
            } else {
                console.log("Moving " + file + " to " + newFilePath);   
            }
        })
    }
})

// Function to get the date information
function getDateInfo(file) {
    var year = file.substring(0,4);
    var monthNumber = file.substring(5,7);
    var monthName = months[monthNumber - 1];

    // Add a leading 0 to single digit months
    if (monthNumber.length === 1) {
        monthNumber = "0" + month;
    }

    return {
        year: year,
        monthNumber: monthNumber,
        monthName: monthName
    };
}
