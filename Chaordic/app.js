var ss      = require('simplestorm'),
    Files   = require('./spouts/files'),
    Reader  = require('./bolts/reader'),
    Reduce  = require('./bolts/reduce'),
    Map     = require('./bolts/map');

var files  = new Files(),
    reader = new Reader(),
    reduce = new Reduce(),
    map    = new Map();

var builder = ss.createTopologyBuilder();

function Timer(){
    this.start = Date.now();
    this.process = function(data, context) {
        console.log('bolt finished: ' + ((Date.now() - this.start)/1000).toFixed(1));
    }
}

var timer = new Timer();

builder.setSpout("files", files );
builder.setBolt("reader", reader).shuffleGrouping("files");
builder.setBolt("reduce", reduce).shuffleGrouping("reader");
builder.setBolt("map"   , map   ).shuffleGrouping("reduce");
builder.setBolt("timer" , timer ).shuffleGrouping("map");

var topology = builder.createTopology();
topology.start();