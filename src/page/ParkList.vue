<template>
  <div>
    <div>
      <el-form ref="form" :model="form" :inline=true label-width="60px" label-position="center" style="margin-left: 1%">
        <el-row :gutter="0">
          <el-col :xs="24" :sm="6" :md="6" :lg="6">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.parkName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="6" :md="6" :lg="6">
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" clearable filterable placeholder="---请选择---" style="width:175px" value="">
                <el-option v-for="item in parkStatusList" :key="item.statusId" :value="item.statusId" :label="item.statusName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6" :md="6" :lg="6">
            <el-form-item label="公众号" prop="code">
              <el-select v-model="form.weixinCode" clearable filterable placeholder="请选择公共号" style="width:175px" value="">
                <el-option v-for="(item,index) in weixinCodeList"
                           :key="index" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="6" :md="6" :lg="6">
            <el-form-item style="  float:right">
              <el-button type="primary" @click="handleReset" >清空</el-button>
              <el-button type="primary" @click="handleSearch" >查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div >
      <el-table
        ref="multipleTable"
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        border
        style="width: 100%"
        :default-sort = "{prop: 'name', order: 'descending'}"
      >
        <el-table-column
          prop="parkId"
          label="id"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          prop="parkName"
          label="停车场名称"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          prop="parkDesc"
          label="描述"
          align="center"
          sortable>
        </el-table-column>

        <el-table-column
          prop="parkStatus"
          label="状态"
          align="center"
          sortable>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="info" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页器-->
    <div class="table-page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size=" pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="title" width="80%" :visible.sync ="editFormVisible" :close-on-click-modal = "false">
      <el-form :model="editForm"  label-width="120px"  ref="editForm" >
        <el-form-item label="停车场名称">
          <el-input v-model="editForm.parkId" auto-complete="off" :disabled="true"/>
        </el-form-item>
        <el-form-item label="停车场名称">
          <el-input v-model="editForm.parkName" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="停车场简称">
          <el-input v-model="editForm.shortName" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="停车场编码">
          <el-input v-model="editForm.parkCode" auto-complete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="停车场状态">
          <el-select v-model="editForm.parkStatus" placeholder="请选择状态">
            <el-option label="可用" value="usable"></el-option>
            <el-option label="不可用" value="unusable"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="停车场描述">
          <el-input type="textarea" v-model="editForm.parkDesc"></el-input>
        </el-form-item>
        <el-form-item label="停车场参数">
          <el-input v-model="editForm.apiParams"></el-input>
        </el-form-item>
        <el-form-item label="AppId">
          <el-input v-model="editForm.parkAppId"></el-input>
        </el-form-item>
        <el-form-item label="AppKey">
          <el-input v-model="editForm.parkAppKey"></el-input>
        </el-form-item>
        <!--//未确定存储方式，暂时不传
        <el-form-item label="商户logo">
          <el-upload
            class="avatar-uploader"
            :action="uploadExcelUrl"
            :on-change="handlePreview"
            :show-file-list="false"
            :auto-upload="false">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>-->
        <el-form-item label="交易公共号">
          <el-select v-model="editForm.weixinCode" placeholder="请选择交易公共号" value="">
            <el-option label="可用" value="usable"></el-option>
            <el-option label="不可用" value="unusable"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="挂载公共号">
          <el-select v-model="editForm.groupId" placeholder="请选择挂载公共号" value="">
            <el-option label="可用" value="usable"></el-option>
            <el-option label="不可用" value="unusable"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="无感支付url">
          <el-input v-model="editForm.nofeelpayUrl"></el-input>
          <el-alert
            title="不建议修改"
            type="warning"></el-alert>
        </el-form-item>
        <el-form-item label="离场时间">
          <el-input v-model="editForm.quit"></el-input>
          <el-alert
            title="不建议修改"
            type="warning"></el-alert>
        </el-form-item>
        <el-form-item label="是否办理月/年卡">
          <el-select v-model="editForm.month" placeholder="请选择是否办理月/年卡" value="">
            <el-option label="是" value="yes"></el-option>
            <el-option label="否" value="no"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="success" @click="confirmModify" :loading="loading">确认修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
// import { mapActions } from 'vuex'
export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      form: {
        parkName: '',
        WeixinCode: '',
        status: ''
      },
      editForm: {
        parkId: '',
        parkName: '',
        parkCode: '',
        parkType: '',
        parkStatus: '',
        parkDesc: '',
        parkAppId: '',
        parkAppKey: '',
        weixinCode: '',
        logo: '',
        shortName: '',
        groupId: '',
        month: '',
        nofeelpayUrl: '',
        quit: '',
        apiParams: '',
        createdBy: '',
        updatedBy: ''
      },
      parkStatusList: [{
        statusId: '0',
        statusName: '已启用'
      },
      {
        statusId: '1',
        statusName: '未启用'
      }],
      tableData: [],
      multipleSelection: [],
      editFormVisible: false,
      title: '',
      //  翻页
      weixinCodeList: []
    }
  },
  methods: {
    // 确认编辑信息
    confirmModify () {
      // 从localStorage中获取当前用户作为更新人
      this.editForm.updatedBy = this.$store.getters.getStorage
      // console.log(this.editForm.updatedBy)
      this.$confirm('此操作将永久修改, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.put(this.HOME + '/park-manage/update-dynamic', {
          'apiParams': this.editForm.apiParams,
          'createdBy': null,
          'groupId': this.editForm.groupId,
          'logo': this.editForm.logo,
          'month': this.editForm.month,
          'nofeelpayUrl': this.editForm.noFeelPayUrl,
          'parkAppId': this.editForm.parkAppId,
          'parkAppKey': this.editForm.parkAppKey,
          'parkCode': this.editForm.parkCode,
          'parkDesc': this.editForm.parkDesc,
          'parkId': this.editForm.parkId,
          'parkName': this.editForm.parkName,
          'parkStatus': this.editForm.parkStatus,
          'parkType': this.editForm.parkType,
          'quit': this.editForm.quit,
          'shortName': this.editForm.shortName,
          'updatedBy': this.editForm.updatedBy,
          'weixinCode': this.editForm.weixinCode
        }).then(res => {
          // console.log(res.data)
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.editFormVisible = false
          }
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 查询
    handleSearch () {
      console.log(' 点击查询按钮 ')
      console.log(this.form.status)
      this.currentPage = 1
      this.$axios.post(this.HOME + '/park-manage/select-by-cond', {
        'parkName': this.form.parkName,
        'parkStatus': this.form.status,
        'weixinCode': this.form.weixinCode
      })
        .then(res => {
          console.log(res.data)
          this.tableData = res.data.extra
          this.total = res.data.extra.length
        })
    },
    // 清空
    handleReset () {
      console.log('点击清空按钮')
      this.form.parkName = ''
      this.form.weixinCode = ''
      this.form.status = ''
    },
    // 编辑
    handleEdit (index, row) {
      console.log(row.parkId)
      this.editFormVisible = true
      this.title = '编辑'
      this.editForm = Object.assign({}, row)
    },
    // 删除
    handleDelete (index, row) {
      console.log(row.parkId)
      //  var id = row.parkId
      //  var param = {'parkId': id}
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios.get(this.HOME + '/park-manage/delete-by-parkid/' + row.parkId)
            .then(res => {
              console.log(res.data)
              if (res.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.loadData()
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 每页显示数据变更响应
    handleSizeChange (val) {
      this.form.size = val
    },
    // 换页响应
    handleCurrentChange (val) {
      this.currentPage = val
    },
    loadData () {
      this.$axios.get(this.HOME + '/park-manage/select-all')
        .then((res) => {
          console.log(res.data)
          this.tableData = res.data.extra
          this.total = res.data.extra.length
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteData (id) {
      this.$axios.delete(this.Home + '/park-manage/delete-by-parkid', id)
        .then(res => {
          console.log(res.data)
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'})
            this.loadData()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  created () {
  },
  mounted () {
    this.loadData()
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

<style scoped>

</style>
