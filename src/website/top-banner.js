const MESSAGE_BAR_STATE = {
  CLOSED: "CLOSED",
  OPEN: "OPEN",
};

const MESSAGE_BAR_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};

const messageBar = {
  status: MESSAGE_BAR_STATUS.ACTIVE,
  id: {
    key: "messageBar_id",
    value: "JWT_V2_FEEDBACK",
  },
  state: {
    key: "messageBar_state",
  },
};

const closeMessageBar = () => {
  const isMessageBarActive = messageBar.status === MESSAGE_BAR_STATUS.ACTIVE;

  if (!isMessageBarActive) {
    return;
  }

  window.localStorage.setItem(messageBar.state.key, MESSAGE_BAR_STATE.CLOSED);

  document.querySelector(".top-banner-bg").classList.add("closed");
  document.querySelector(".top-banner").classList.add("closed");
  document.querySelector(".content").classList.remove("top-banner-open");
  document.querySelector(".top-mobile").classList.remove("top-banner-open");
  document.querySelector(".navbar").classList.remove("top-banner-open");
};

const renderTopBanner = () => {
  document.querySelector(".top-banner-bg").classList.remove("closed");
  document.querySelector(".top-banner").classList.remove("closed");
  document.querySelector(".content").classList.add("top-banner-open");
  document.querySelector(".top-mobile").classList.add("top-banner-open");
  document.querySelector(".navbar").classList.add("top-banner-open");
};

const loadBannerStateFromLocalStorage = () => {
  let messageBarId = window.localStorage.getItem(messageBar.id.key);
  let messageBarState = window.localStorage.getItem(messageBar.state.key);

  if (!messageBarId) {
    window.localStorage.setItem(messageBar.id.key, messageBar.id.value);
    messageBarId = window.localStorage.getItem(messageBar.id.key);
  }

  if (!messageBarState) {
    window.localStorage.setItem(messageBar.state.key, MESSAGE_BAR_STATE.OPEN);
    messageBarState = window.localStorage.getItem(messageBar.state.key);
  }

  switch (messageBar.status) {
    case MESSAGE_BAR_STATUS.ACTIVE: {
      const isExistingCta = messageBarId === messageBar.id.value;

      if (!isExistingCta) {
        window.localStorage.setItem(messageBar.id.key, messageBar.id.value);
        window.localStorage.setItem(
          messageBar.state.key,
          MESSAGE_BAR_STATE.OPEN
        );

        renderTopBanner();

        return;
      }

      switch (messageBarState) {
        case MESSAGE_BAR_STATE.OPEN: {
          renderTopBanner();

          return;
        }
        default: {
          return;
        }
      }
    }
    default: {
      return;
    }
  }
};

export function TopBanner() {
  document.addEventListener("DOMContentLoaded", function () {
    loadBannerStateFromLocalStorage();

    document
      .querySelector(".close-top-banner")
      .addEventListener("click", () => {
        closeMessageBar();
      });
  });
}
