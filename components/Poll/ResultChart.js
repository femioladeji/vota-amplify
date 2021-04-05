import { Doughnut } from 'vue-chartjs'
const ALLGRADIENTS = [
  { from: '#5CEAF3', to: '#ACABE0' },
  { from: '#F3AE5C', to: '#D123E0' },
  { from: '#D5F35C', to: '#ABE7FA' },
  { from: '#B9AC3C', to: '#5771F9' }
]
const getBarGradients = (canvas, count) => {
  const backgrounds = []
  for (let i = 0; i < count; i += 1) {
    const gradient = canvas.createLinearGradient(0, 0, 600, 0)
    gradient.addColorStop(0, ALLGRADIENTS[i % ALLGRADIENTS.length].from)
    gradient.addColorStop(1, ALLGRADIENTS[i % ALLGRADIENTS.length].to)
    backgrounds.push(gradient)
  }
  return backgrounds
}
export default {
  extends: Doughnut,
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  mounted () {
    const labels = Object.keys(this.result)
    const data = Object.values(this.result)
    const backgrounds = getBarGradients(this.$refs.canvas.getContext('2d'), data.length)
    this.renderChart({
      labels,
      datasets: [{
        label: '',
        backgroundColor: backgrounds,
        data
      }]
    }, { responsive: true, maintainAspectRatio: false })
  }
}
