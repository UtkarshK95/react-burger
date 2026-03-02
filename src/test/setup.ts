import "@testing-library/jest-dom";

// jsdom does not implement HTMLDialogElement.showModal() / close().
// Polyfill them so tests that render <dialog> with showModal() work correctly.
HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute("open", "");
};
HTMLDialogElement.prototype.close = function () {
  this.removeAttribute("open");
  this.dispatchEvent(new Event("close"));
};
