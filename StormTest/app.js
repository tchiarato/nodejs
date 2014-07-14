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

builder.setSpout("files", files );
builder.setBolt("reader", reader).shuffleGrouping("files");
builder.setBolt("reduce", reduce).shuffleGrouping("reader");
builder.setBolt("map"   , map   ).shuffleGrouping("reduce");

var topology = builder.createTopology();
topology.start();

console.log("running ...");