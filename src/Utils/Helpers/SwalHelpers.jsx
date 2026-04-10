import Swal from "sweetalert2";

export const confirmLogout = (onConfirm) => {
  Swal.fire({
    title: "Yakin ingin logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, logout!",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
      Swal.fire("Logout berhasil", "", "success");
    }
  });
};

export const confirmDelete = (onConfirm) => {
  Swal.fire({
    title: "Yakin ingin menghapus data ini?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, hapus!",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
      Swal.fire("Terhapus!", "Data mahasiswa telah dihapus.", "success");
    }
  });
};

export const confirmUpdate = (onConfirm) => {
  Swal.fire({
    title: "Simpan perubahan?",
    text: "Pastikan data sudah benar.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, simpan!",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
      Swal.fire("Tersimpan!", "Data berhasil disimpan.", "success");
    }
  });
};
