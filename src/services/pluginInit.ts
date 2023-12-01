import Snackbar from "node-snackbar";
import { AddRolNotification } from "../components/Notification";
import Toastify from "toastify-js";

export const core = {
  showSnackbar(type: string, data = {}) {

    const notificationHtml = document
      .querySelectorAll("#notification-manager")[0]
      .cloneNode(true) as HTMLElement;
    notificationHtml.classList.remove("hidden");

    const iconDiv: any = notificationHtml.querySelector("#notification-manager-icon");
    const titleDiv: any = notificationHtml.querySelector("#notification-manager-title");
    const descriptionDiv: any = notificationHtml.querySelector("#notification-manager-description");

    switch (type) {
      case 'error':
        titleDiv.textContent = 'Opps! A ocurrido un error';
        iconDiv.classList.remove("text-success");
        iconDiv.classList.add("text-danger");
        break;
      case 'success':
        titleDiv.textContent = 'Exelente.!';
        break;
      case 'warning':
        titleDiv.textContent = 'Atencion';
        iconDiv.classList.remove("text-success");
        iconDiv.classList.add("text-warning");
        break;
    }

    descriptionDiv.textContent = data;

    Toastify({
      node: notificationHtml,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
    }).showToast();

  },

  Snackbar(data: any) {
    Snackbar.show(data);
  },
  //Covert any dataURL to file Object JS
  // dataURLtoFile(dataurl, filename) {
  //   let arr = dataurl.split(","),
  //     mime = arr[0].match(/:(.*?);/)[1],
  //     bstr = atob(arr[1]),
  //     n = bstr.length,
  //     u8arr = new Uint8Array(n);

  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new File([u8arr], filename, { type: mime });
  // },
};