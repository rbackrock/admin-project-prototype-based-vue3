<template>
  <div style="margin: 24px auto; width: 80%;">
    <a-card title="Home Example">
      <a-row>
        <a-col :span="12">
          <a-statistic
            title="Active Users"
            :value="112893"
            style="margin-right: 50px"
          />
        </a-col>
        <a-col :span="12">
          <a-statistic
            title="Account Balance (CNY)"
            :precision="2" 
            :value="112893"
          />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  setup() {
    return {
    }
  }
}
</script>
