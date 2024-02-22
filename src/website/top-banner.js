export function TopBanner() {
  document.addEventListener("DOMContentLoaded", function () {
    document
      .querySelector(".close-top-banner")
      .addEventListener("click", () => {
        document.querySelector(".top-banner-bg").classList.add("closed");
        document.querySelector(".top-banner").classList.add("closed");
        document.querySelector(".top-banner-spacer").classList.add("hide");
        document.querySelector(".navbar").classList.remove("top-banner-open");
      });
  });
}
