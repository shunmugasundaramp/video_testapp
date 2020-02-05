// File             : navigator.js
// Version       : 1.0.0
// Author(s)    : Shunmuga
// Date           : 27 Dec 2016
// Purpose(s)  : Navigator Method definitions 

var navigator = {};
var videobroadcast = null;

navigator.init = function() {
   var x = (window.screen.width - 150)/2;
   var y = ((window.screen.height - 150)/2)-100;
   try {
      var objectFactory = window.ampObjectFactory;
      videobroadcast = objectFactory.createVideoBroadcastObject();
   } catch(e) {
      console.log(e);
   }
};

navigator.bindToCurrentChannel = function() {
   if (!videobroadcast) {
      return;
   }
   try {
      videobroadcast.bindToCurrentChannel();
   } catch(e) {
      console.log(e);
   }
   return;
};

navigator.tune = function(startMHz, endMHz, raster, bw, clb) {
   if (!videobroadcast) {
      return;
   }
   try {
      var channelConfig = videobroadcast.getChannelConfig();
      if (clb) {
         channelConfig.onChannelScan = clb;
      }
      var channelScanOptions = channelConfig.createChannelScanOptionsObject();
      channelScanOptions.channelType = 128;
      channelScanOptions.replaceExisting = true;

      var channelDVBT2ScanParameterObject = channelConfig.createChannelScanParametersObject(16);
      channelDVBT2ScanParameterObject.bandwidth = "BAND_8MHz";

      videobroadcast.stop();
      videobroadcast.release();

      channelDVBT2ScanParameterObject.startFrequency = startMHz*1000;
      channelDVBT2ScanParameterObject.endFrequency = endMHz*1000;
      channelDVBT2ScanParameterObject.raster = raster*1000;
      if (bw == 7) {
         channelDVBT2ScanParameterObject.bandwidth = "BAND_7MHz";
      }
      channelConfig.startScan(channelScanOptions, channelDVBT2ScanParameterObject);
   } catch(e) {
      console.log(e);
   }
};

//var channels = [{name: 'ABC'}, {name: 'ABC'}, {name: 'ABC'}, {name: 'ABC'}, {name: 'ABC'}, {name: 'ABC'}, {name: 'ABC'}, {name: '9'}, {name: '8'}, {name: '7'}, {name: '6'}, {name: '5'}, {name: '4'}, {name: '3'}, {name: '2'}, {name: '1'}];
navigator.getChannelList = function() {
   //return channels;
   if (!videobroadcast) {
      return [];
   }
   try {
      var channelConfig = videobroadcast.getChannelConfig();
      return channelConfig.channelList;
   } catch(e) {
      console.log(e);
   }
   return [];
};

navigator.setVideoBroadcastPosition = function(left, top, width, height) {
   if (!videobroadcast) {
      return;
   }
   try {
      videobroadcast.setDimensions(left, top, width, height);
   } catch(e) {
      console.log(e);
   }
   return [];
};

navigator.setChannel = function(channel) {
   if (channel) {
      videobroadcast.setChannel(channel);
   }
};

