import Swal from 'sweetalert2/dist/sweetalert2.js'

export function confirmDelation() {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dd3',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(result.isConfirmed)
        // Swal.fire({
        //   title: 'Deleted!',
        //   text: 'Your file has been deleted.',
        //   icon: 'success'
        // })
      }
      reject()
    })
  })
}
