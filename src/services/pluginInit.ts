import Snackbar from "node-snackbar";

export const core = {
  showSnackbar(type:string, data = {}) {
    if (type !== null) {
      switch (type) {
        case "success":
          Snackbar.show({ text: data, backgroundColor: "#323232", showAction: true,  actionText: 'X', width: 'auto', pos: 'bottom-center' });
          break;
        case "error":
          Snackbar.show({
            text: data,
            backgroundColor: "#b21f2d",
            actionTextColor: "#ffffff",
            showAction: true,
            actionText: 'X',
            width: 'auto',
            pos: 'bottom-center'
            
          });
          break;
      }
    } else {
      Snackbar.show(data);
    }
  },
  Snackbar(data) {
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