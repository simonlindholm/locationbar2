var lb2_alternateStyles = {
  styles: ["domain-color","domain-strong","subdomain-inherit","pathFile-inherit","go-persist","segments-margin","breadcrumb-domain","breadcrumb-all"],
  styleSheets: {},
  prefs: Components.classes["@mozilla.org/preferences-service;1"]
                   .getService(Components.interfaces.nsIPrefService)
                   .getBranch("extensions.locationbar2.alternate.")
                   .QueryInterface(Components.interfaces.nsIPrefBranch2),
  init: function () {
    this.prefs.addObserver("", this, false);
    var ss = document.styleSheets;
    for (var i = ss.length - 1; i >= 0; i--) {
      if (!ss[i].href)
        continue;
      var style = ss[i].href.match(/^chrome:\/\/locationbar2\/skin\/alternate\/(.+)\.css$/);
      if (style) {
        this.styleSheets[style[1]] = ss[i];
        this.handlePref(style[1]);
      }
    }
  },
  observe: function (subject, topic, data) {
    this.handlePref(data);
  },
  handlePref: function (style) {
    if (style == "domain-color")
      this.styleSheets[style].cssRules[1].style.setProperty("color", this.prefs.getCharPref(style) || "inherit", "");
    else
      this.styleSheets[style].disabled = !this.prefs.getBoolPref(style);
  },
  uninit: function() {
    this.prefs.removeObserver("", this);
  }
};

window.addEventListener("load", function() {
  lb2_alternateStyles.init();
}, false);
window.addEventListener("unload", function() {
  lb2_alternateStyles.uninit();
}, false);
