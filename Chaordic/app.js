var ss      = require('simplestorm'),
    Spout   = require('./controller/spout'),
    Reader  = require('./controller/reader'),
    Reduce  = require('./controller/reduce'),
    Map     = require('./controller/map'),
    Sort    = require('./controller/sort');

var spout  = new Spout(),
    reader = new Reader(),
    reduce = new Reduce(),
    map    = new Map(),
    sort   = new Sort();

var builder = ss.createTopologyBuilder();

function Timer(){
    this.start = Date.now();
    this.process = function(data, context) {
        console.log('finished: ' + ((Date.now() - this.start)/1000).toFixed(1));
    }
}

var timer = new Timer();

builder.setSpout("spout", spout);
builder.setBolt("reader", reader).shuffleGrouping("spout");
builder.setBolt("reduce", reduce).shuffleGrouping("reader");
builder.setBolt("map", map).shuffleGrouping("reduce");
builder.setBolt("sort", sort).shuffleGrouping("map");
builder.setBolt("timer", timer).shuffleGrouping("sort");;

var topology = builder.createTopology();
topology.start();