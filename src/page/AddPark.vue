<template>
<el-form ref="form" :model="form" label-width="130px">
  <el-form-item label="停车场名称">
    <el-input v-model="form.parkName"></el-input>
  </el-form-item>
  <el-form-item label="停车场简称">
    <el-input v-model="form.shortName"></el-input>
  </el-form-item>
  <el-form-item label="停车场类型">
    <el-select v-model="form.parkType"  placeholder="请选择停车场类型">
      <el-option label="小区" value="0"></el-option>
      <el-option label="非小区" value="1"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="停车场状态">
    <el-select v-model="form.parkStatus" placeholder="请选择状态">
      <el-option label="可用" value="0"></el-option>
      <el-option label="不可用" value="1"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="停车场描述">
    <el-input type="textarea" v-model="form.parkDesc"></el-input>
  </el-form-item>
  <el-form-item label="AppId">
    <el-input v-model="form.parkAppId"></el-input>
  </el-form-item>
  <el-form-item label="AppKey">
    <el-input v-model="form.parkAppKey"></el-input>
  </el-form-item>
  <el-form-item label="停车场接口参数">
    <el-select v-model="form.apiParamsSelect" placeholder="请选择闸道类型" @change="onChangeApiParam" value="" >
      <el-option v-for="item in apiParamList" :key="item.apiParamId" :value="item.apiParamName"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item v-for="(item,index) in paramList"
                :label="item.paramName"
                :key="index"
                :prop="'paramList.'+index+'.paramValue'"
                >
    <el-input  size="mini" v-model="paramList[index].paramValue"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onConfirm">确认</el-button>
    <el-button>取消</el-button>
  </el-form-item>
  <!--<el-form-item label="上传logo">
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </el-form-item>-->
  <el-form-item label="交易公共号" >
    <el-select v-model="form.weixinCode" placeholder="请选择交易公共号" value="">
      <el-option v-for="(item,index) in weixinCodeList"
                 :key="index" :value="item"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="挂载公共号">
    <el-select v-model="form.groupId" placeholder="请选择挂载公共号" value="">
      <el-option v-for="(item,index) in weixinCodeList"
                 :key="index" :value="item"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="无感支付url">
      <el-input v-model="form.noFeelPayUrl"></el-input>
    <el-alert
      title="不建议修改"
      type="warning"></el-alert>
  </el-form-item>
  <el-form-item label="离场时间">
    <el-input v-model="form.quit"></el-input>
    <el-alert
      title="不建议修改"
      type="warning"></el-alert>
  </el-form-item>
  <el-form-item label="是否办理月/年卡">
    <el-select v-model="form.month" placeholder="请选择是否办理月/年卡" value="">
      <el-option label="是" value="0"></el-option>
      <el-option label="否" value="1"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</template>
<script>
export default {
  data () {
    return {
      imageUrl: '',
      form: {
        parkName: '',
        parkCode: '',
        shortName: '',
        parkType: '',
        parkStatus: '',
        parkDesc: '',
        parkAppId: '',
        parkAppKey: '',
        weixinCode: '',
        groupId: '',
        month: '',
        noFeelPayUrl: 'https://ilazypay.com/access/wx/main?bankType=7000000000000054',
        quit: '15',
        apiParams: '',
        apiParamsSelect: '',
        createdBy: '',
        updatedBy: '',
        logo: ''
      },
      // 不同的闸道系统对应不同的参数，此数组存储当前选中的参数列表
      paramList: [{
        paramName: '',
        paramValue: ''
      }],
      apiParamList: [{
        apiParamId: 'hmParkApiService',
        apiParamName: '红门'
      },
      {
        apiParamId: 'bhParkApiService',
        apiParamName: '百会'
      },
      {
        apiParamId: 'jsParkApiService',
        apiParamName: '捷顺'
      },
      {
        apiParamId: 'fsParkApiService',
        apiParamName: '富士'
      },
      {
        apiParamId: 'ktParkApiService',
        apiParamName: '科拓'
      }
      ],
      // 存储从后台取出的微信公众号
      weixinCodeList: []

    }
  },
  methods: {
    // 点击闸道参数下确认按钮时执行的函数
    onConfirm () {
      // 将填入的值拼装成json格式付给apiParam
      let obj = {}
      for (let i = 0; i < this.paramList.length; i++) {
        obj[this.paramList[i].paramName] = this.paramList[i].paramValue
      }
      var json = JSON.stringify(obj)
      this.form.apiParams = json
      console.log(json)
    },
    onChangeApiParam () {
      console.log(this.form.apiParamsSelect)

      switch (this.form.apiParamsSelect) {
        case '红门':this.paramList.splice(0, this.paramList.length)
          console.log(this.paramList)
          this.paramList.push({ paramName: 'parkingId',
            paramValue: ''})
          this.paramList.push({ paramName: 'appId',
            paramValue: ''})
          this.paramList.push({ paramName: 'appSecret',
            paramValue: ''})
          console.log(this.paramList)
          break
        case '百会':this.paramList.splice(0, this.paramList.length)
          console.log(this.paramList)
          this.paramList.push({ paramName: 'SecretKey',
            paramValue: ''})
          console.log(this.paramList)
          break
        case '科拓':this.paramList.splice(0, this.paramList.length)
          this.paramList.push({ paramName: 'parkId',
            paramValue: ''})
          this.paramList.push({ paramName: 'appId',
            paramValue: ''})
          this.paramList.push({ paramName: 'appSecret',
            paramValue: ''})
          break
        case '捷顺':this.paramList.splice(0, this.paramList.length)
          this.paramList.push({ paramName: 'orderType',
            paramValue: ''})
          this.paramList.push({ paramName: 'usr',
            paramValue: ''})
          this.paramList.push({ paramName: 'psw',
            paramValue: ''})
          this.paramList.push({ paramName: 'v',
            paramValue: ''})
          this.paramList.push({ paramName: 'signKey',
            paramValue: ''})
          this.paramList.push({ paramName: 'parkCode',
            paramValue: ''})
          this.paramList.push({ paramName: 'cid',
            paramValue: ''})
          this.paramList.push({ paramName: 'businessrCode',
            paramValue: ''})
          break
        case '富士':this.paramList.splice(0, this.paramList.length)
          this.paramList.push({ paramName: 'privateKey',
            paramValue: ''})
          this.paramList.push({ paramName: 'appId',
            paramValue: ''})
          this.paramList.push({ paramName: 'appSecret',
            paramValue: ''})
          this.paramList.push({ paramName: 'parkCode',
            paramValue: ''})
          break
        default:this.paramList.splice(0, this.paramList.length)
      }
    },
    onSubmit () {
      // 获取当前用户作为creator和updator
      this.form.updatedBy = this.$store.getters.getStorage
      this.form.createdBy = this.$store.getters.getStorage
      this.$axios.post(this.HOME + '/park-manage/insert', {'apiParams': this.form.apiParams,
        'createdBy': this.form.createdBy,
        'groupId': this.form.groupId,
        'logo': this.form.logo,
        'month': this.form.month,
        'nofeelpayUrl': this.form.noFeelPayUrl,
        'parkAppId': this.form.parkAppId,
        'parkAppKey': this.form.parkAppKey,
        'parkCode': this.form.parkCode,
        'parkDesc': this.form.parkDesc,
        'parkId': 0,
        'parkName': this.form.parkName,
        'parkStatus': this.form.parkStatus,
        'parkType': this.form.parkType,
        'quit': this.form.quit,
        'shortName': this.form.shortName,
        'updatedBy': this.form.updatedBy,
        'weixinCode': this.form.weixinCode})
        .then(res => {
          console.log(res.data)
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
        }).catch(err => {
          console.error(err)
        })
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  mounted () {
    // 在此处载入公众号列表
    this.$axios.get(this.HOME + '/weixin/select-all-weixincode')
      .then(res => {
        console.log(res.data)
        this.weixinCodeList = res.data.extra
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
