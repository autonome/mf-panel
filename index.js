// require the SDK modules
const { Panel } = require("dev/panel");
const { Tool } = require("dev/toolbox");
const { Class } = require("sdk/core/heritage");
const self = require("sdk/self");

const { Cu } = require("chrome");
Cu.import("resource://gre/modules/Microformats.js");

const { viewFor } = require("sdk/view/core");
var tabs = require("sdk/tabs");
var tab_utils = require("sdk/tabs/utils");

// define a REPLPanel class
// that inherits from dev/panel
const REPLPanel = Class({
  extends: Panel,
  label: "Microformats",
  tooltip: "Inspect microformat data on the current page",
  icon: self.data.url("microformats-logo.png"),
  url: self.data.url("panel.html"),
  // when the panel is created,
  // take a reference to the debuggee
  setup: function(options) {
    this.debuggee = options.debuggee;
  },
  dispose: function() {
    this.debuggee = null;
  },
  // when the panel's script is ready,
  // send it a message containing
  // the debuggee
  onReady: function() {
    this.debuggee.start();
    this.postMessage("init", [this.debuggee]);
    
    var lowLevelTab = viewFor(tabs.activeTab);
    var browser = tab_utils.getBrowserForTab(lowLevelTab);
    //console.log(browser.contentDocument.body.innerHTML);
    /*
    console.log('MF:vcard', Microformats.count('vcard', browser.contentDocument));
    console.log('MF:adr', Microformats.count('adr', browser.contentDocument));
    console.log('MF:org', Microformats.count('org', browser.contentDocument));
    console.log('MF:geo', Microformats.count('geo', browser.contentDocument));
    console.log('MF:hCalendar', Microformats.count('hCalendar', browser.contentDocument));
    console.log('MF:hCard', Microformats.count('hCard', browser.contentDocument));
    */
    var counts = {
      vcard: Microformats.count('vcard', browser.contentDocument),
      adr: Microformats.count('adr', browser.contentDocument),
      org: Microformats.count('org', browser.contentDocument),
      geo: Microformats.count('geo', browser.contentDocument),
      hCalendar: Microformats.count('hCalendar', browser.contentDocument),
      hCard: Microformats.count('hCard', browser.contentDocument)
    }
    var msg = JSON.stringify({name:'counts', url: tabs.activeTab.url, data: counts});
    this.postMessage(msg, [this.debuggee]);
  }
});
exports.REPLPanel = REPLPanel;

// create a new tool,
// initialized with the
// REPLPanel's constructor
const replTool = new Tool({
  panels: { repl: REPLPanel }
});
