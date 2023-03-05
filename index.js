// Requiring module
const express = require('express')
const cors = require('cors')

// Creating express app
const app = express()

// enabling CORS for any unknow origin(https://xyz.example.com)
app.use(cors());

var yargs = require('yargs').options({
    'port' : {
        'default' : process.env.PORT || 8004,
        'description' : 'Port to listen on.'
    },
    'public' : {
        'type' : 'boolean',
        'description' : 'Run a public server that listens on all interfaces.',
    },
    'upstream-proxy' : {
        'description' : 'A standard proxy server that will be used to retrieve data.  Specify a URL including port, e.g. "http://proxy:8000".'
    },
    'bypass-upstream-proxy-hosts' : {
        'description' : 'A comma separated list of hosts that will bypass the specified upstream_proxy, e.g. "lanhost1,lanhost2"'
    },
    'help' : {
        'alias' : 'h',
        'type' : 'boolean',
        'description' : 'Show this help.'
    }
});
var argv = yargs.argv;


const uri = 'mongodb+srv://E2-Viewer:nxNperTmRpV6Zso3@ecosystem2-c0.vrdhima.mongodb.net/UAT-ECOSYSTEM2?retryWrites=true&w=majority'

var mime = express.static.mime;
    mime.define({
        'application/json': ['czml', 'json', 'geojson', 'topojson'],
        'model/vnd.gltf+json': ['gltf'],
        'model/vnd.gltf.binary': ['glb'],
        'application/octet-stream': ['b3dm', 'pnts', 'i3dm', 'cmpt'],
        'text/plain': ['glsl']
    });

    var server = app.listen(argv.port, argv.public ? undefined : 'localhost', function() {
        if (argv.public) {
            console.log('Cesium development server running publicly %s.  Connect to http://localhost:%d/', server.address(), argv.port);
        } else {
            console.log('Cesium development server running locally.  Connect to http://localhost:%d/', argv.port);
        }
    });
/*
app.listen(port, () => {
    console.log(`The application started
    successfully on port ${port}`);
});
*/


//run().catch(console.dir);

app.use(express.json());

// For serving static HTML files
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
res.set({
	"Allow-access-Allow-Origin": "*",
});
	
// res.send("Hello World");
return res.redirect("./public/index.html");
});

server.on('error', function (e) {
    if (e.code === 'EADDRINUSE') {
        console.log('Error: Port %d is already in use, select a different port.', argv.port);
        console.log('Example: node server.js --port %d', argv.port + 1);
    } else if (e.code === 'EACCES') {
        console.log('Error: This process does not have permission to listen on port %d.', argv.port);
        if (argv.port < 1024) {
            console.log('Try a port number higher than 1024.');
        }
    }
    console.log(e);
    process.exit(1);
});

server.on('close', function() {
    console.log('Cesium development server stopped.');
});

app.get('/siteVisit', async function (req, res) {
    console.log("Someone visited the site")
})

module.exports = {
};
