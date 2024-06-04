export function getSelectedImage(e: any, element: string) {
  const selectImage = e.target.files[0]

  const output = document.getElementById(element) as HTMLImageElement

  output.src = URL.createObjectURL(selectImage)
  output.onload = function () {
    URL.revokeObjectURL(output.src)
  }
  return selectImage
}
