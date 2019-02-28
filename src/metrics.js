import log from "loglevel";

export function init() {
  // Create a queue, but don't obliterate an existing one!
  var analytics = (window.metrics = window.metrics || []);

  // If the real analytics.js is already on the page return.
  if (analytics.initialize) return;

  // If the snippet was invoked already show an error.
  if (analytics.invoked) {
    if (window.console && console.error) {
      console.error("Segment snippet included twice.");
    }
    return;
  }

  // Invoked flag, to make sure the snippet
  // is never invoked twice.
  analytics.invoked = true;

  // A list of the methods in Auth0-metrics to stub.
  analytics.methods = [
    "trackSubmit",
    "trackClick",
    "trackLink",
    "trackForm",
    "pageview",
    "identify",
    "reset",
    "group",
    "track",
    "ready",
    "alias",
    "debug",
    "page",
    "once",
    "off",
    "on"
  ];

  // Define a factory to create stubs. These are placeholders
  // for methods in Auth0-metrics so that you never have to wait
  // for it to load to actually record data. The `method` is
  // stored as the first argument, so we can replay the data.
  analytics.factory = function(method) {
    return function() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(method);
      analytics.push(args);
      return analytics;
    };
  };

  // For each of our methods, generate a queueing stub.
  for (var i = 0; i < analytics.methods.length; i++) {
    var key = analytics.methods[i];
    analytics[key] = analytics.factory(key);
  }

  // Define a method to load Auth0-metrics from our CDN,
  // and that will be sure to only ever load it once.
  analytics.load = function() {
    // Create an async script element based on your key.
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://cdn.auth0.com/website/js/1.6.0/auth0-metrics-min.js";

    script.onerror = function() {
      console.error("No metrics");
    };

    script.onload = function() {
      // Grab analytics and make it private
      window.metrics = new Auth0Metrics(
        "",
        "https://dwh-tracking.it.auth0.com/external-metrics",
        "jwt.io",
        {
          removeQueryParam: [
            {
              key: "token",
              value: "[a-z0-9._~-]+"
            },
            {
              key: "value",
              value: "[a-z0-9._~-]+"
            },
            {
              key: "id_token",
              value: "[a-z0-9._~-]+"
            },
            {
              key: "access_token",
              value: "[a-z0-9._~-]+"
            }
          ]
        }
      );
    };

    // Insert our script next to the first script element.
    var first = document.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(script, first);
  };

  // Add a version to keep track of what's in the wild.
  analytics.SNIPPET_VERSION = "4.1.0";

  // Load Auth0-metrics with your key, which will automatically
  // load the tools you've enabled for your account. Boosh!
  analytics.load();

  // Make the first page call to load the integrations. If
  // you'd like to manually name or tag the page, edit or
  // move this call however you'd like.
  analytics.page();
}

export function track(event, data) {
  if (window.metrics) {
    try {
      window.metrics.track(event, data);
    } catch (e) {
      log.error(`Metrics library error for event ${event}: ${e}`);
    }
  }
}
