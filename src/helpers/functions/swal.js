import Swal from "sweetalert2";

export const toast = (position, title, icon = "info", timer = 4000) => {
  Swal.fire({
    position,
    icon,
    title,
    showConfirmButton: false,
    timer,
  });
};
