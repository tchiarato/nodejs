var ss      = require('simplestorm'),
    Spout   = require('./controller/spout'),
    Reader  = require('./controller/reader'),
    Reduce  = require('./controller/reduce'),
    Map     = require('./controller/map');

var spout  = new Spout(),
    reader = new Reader(),
    reduce = new Reduce(),
    map    = new Map();

var builder = ss.createTopologyBuilder();

var start = Date.now();
function Timer(){
    this.process = function(data, context) {
        console.log('finished: ' + ((Date.now() - start)/1000).toFixed(1));
    }
}

var timer = new Timer();

builder.setSpout("spout", spout);
builder.setBolt("reader", reader).shuffleGrouping("spout");
builder.setBolt("reduce", reduce).shuffleGrouping("reader");
builder.setBolt("map", map).shuffleGrouping("reduce");
builder.setBolt("timer", timer).shuffleGrouping("map");;

var topology = builder.createTopology();
topology.start();