<script>
import { AGE } from '~/controllers/playground'

export default {
  data() {
    return {
      name: AGE,
    }
  },
  created() {
    this.$emit('greet', 'hello')
    this.$emit('greet', 'goodbye')

    this.name = AGE
  },
}
</script>
