export function CCPAModal() {
  document.addEventListener("DOMContentLoaded", function () {
    if(window.location.hash.includes('your-privacy-choices')) {
      document.querySelector("#ccpa-modal").style.display = "block";
    }
    document.querySelector("#open-ccpa").addEventListener("click", () => {
      document.querySelector("#ccpa-modal").style.display = "block";
    });

    document.querySelector("#close-ccpa").addEventListener("click", () => {
      document.querySelector("#ccpa-modal").style.display = "none";
    });
  });
}
