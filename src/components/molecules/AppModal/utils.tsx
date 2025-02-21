export const getMaxZIndex = ({ min = 1000 }) => {
  const modals = document.querySelectorAll('.ant-modal-wrap')
  let maxZIndex = -1

  for (const modal of modals) {
    const zIndex = Number.parseInt(window.getComputedStyle(modal).zIndex, 10)
    if (zIndex > maxZIndex) {
      maxZIndex = zIndex
    }
  }

  if (maxZIndex < min) {
    maxZIndex = min
  }

  return maxZIndex
}
