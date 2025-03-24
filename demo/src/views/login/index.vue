<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { User, Lock, View, Hide } from '@element-plus/icons-vue'
import authApi from '@/api/auth'
import storage from '@/utils/storage'

const router = useRouter()
const route = useRoute()

// 用户登录表单
const loginForm = reactive({
  username: '',
  password: '',
  rememberMe: false,
})

// 表单验证规则
const loginRules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度必须在 3 到 20 个字符之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度必须在 6 到 20 个字符之间', trigger: 'blur' },
  ],
})

const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const passwordVisible = ref(false)

// 处理登录
const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true
      try {
        const response = await authApi.login({
          username: loginForm.username,
          password: loginForm.password
        })
        
        if (response.success) {
          // 保存token和用户信息
          storage.set('token', response.data.token)
          storage.set('userInfo', {
            id: response.data.id,
            username: response.data.username,
            name: response.data.name,
            avatar: response.data.avatar
          })
          
          ElMessage.success('登录成功')
          
          // 跳转到首页或历史记录页面
          const redirectPath = route.query.redirect as string || '/history'
          router.push(redirectPath)
        }
      } catch (error: any) {
        console.error('登录出错:', error)
        ElMessage.error(error.response?.data?.message || '登录失败，请稍后重试')
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2>登录</h2>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        @submit.prevent="handleLogin(loginFormRef)"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            type="text"
            tabindex="1"
            autocomplete="off"
          >
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="密码"
            :type="passwordVisible ? 'text' : 'password'"
            tabindex="2"
            autocomplete="off"
            @keyup.enter="handleLogin(loginFormRef)"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
            <template #suffix>
              <el-icon 
                class="password-icon" 
                @click="passwordVisible = !passwordVisible"
              >
                <component :is="passwordVisible ? 'View' : 'Hide'" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%"
          @click="handleLogin(loginFormRef)"
        >
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  
  .login-box {
    width: 400px;
    padding: 40px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    
    h2 {
      margin-bottom: 30px;
      text-align: center;
      color: #303133;
    }
    
    .password-icon {
      cursor: pointer;
      color: #909399;
    }
  }
}
</style>