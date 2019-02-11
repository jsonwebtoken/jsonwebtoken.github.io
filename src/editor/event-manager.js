function disableAll(events) {
  events.forEach(event => {
    event.target[event.disable](event.event, event.handler);
  });
}

function enableAll(events) {
  events.forEach(event => {
    event.target[event.enable](event.event, event.handler);
  });
}

function tryAsResult(func) {
  const result = {};

  try {
    result.result = func();
  } catch (e) {
    result.exception = e;
  }

  return result;
}

export default class EventManager {
  constructor() {
    this.events = [];
    this.callDepth = 0;
  }

  addEvent(target, enable, disable, event, handler) {
    this.events.push({
      target: target,
      enable: enable,
      disable: disable,
      event: event,
      handler: handler
    });

    target[enable](event, handler);
  }

  addDomEvent(target, event, handler) {
    this.addEvent(
      target,
      "addEventListener",
      "removeEventListener",
      event,
      handler
    );
  }

  addCodeMirrorEvent(target, event, handler) {
    this.addEvent(target, "on", "off", event, handler);
  }

  withDisabledEvents(func) {
    // Nested calls are supported
    if (this.callDepth === 0) {
      disableAll(this.events);
    }

    ++this.callDepth;
    const result = tryAsResult(func);
    --this.callDepth;

    if (this.callDepth === 0) {
      enableAll(this.events);
    }

    if (result.exception) {
      throw result.exception;
    }

    return result.result;
  }
}
