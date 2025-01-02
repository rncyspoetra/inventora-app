import Swal from 'sweetalert2';

export const showSuccessAlert = (message) => {
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
        confirmButtonText: 'OK',
        timer: 2000
    });
};

export const showErrorAlert = (message) => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonText: 'OK',
        timer: 2000
    });
};

export const showWarningAlert = (action) => {
    Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Anda tidak akan bisa mengembalikannya!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal"
      }).then((result) => {
        if (result.isConfirmed) {
          action();
          Swal.fire({
            title: "Terhapus!",
            text: "Data telah dihapus.",
            icon: "success"
          });
        }
      });      
};

export default {
    showSuccessAlert,
    showErrorAlert,
    showWarningAlert
}