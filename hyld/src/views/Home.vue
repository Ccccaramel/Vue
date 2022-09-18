<template>
  <div>
    <Head :commonResponse="commonResponseData"></Head>
    <div class="container">
      <div class="row align-items-center">
        <div class="col">
          <div class="card">
            <div class="card-header">
              欢迎
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>这是一个荒野乱斗社区,在这里你可以畅所欲言,寻找队友或是寻找战队;此外,还能辅助你高效地管理你的战队赛战绩.</p>
                <footer class="blockquote-footer">充满未知的<cite title="Source Title">野排坑王</cite></footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "@/components/Head.vue";

export default {
  name: "home",
  components: {
    Head
  },
  data() {
    return {
      commonResponseData: { // Modal 弹窗数据
          success: true,
          msg: '',
      },
    }
  },
  methods: {
    
  },
};
</script>
