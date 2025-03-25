<script setup lang="ts">
import { useAppStore } from '@/stores/modules/app'
import { useUserStore } from '@/stores/modules/user'
import { Menu as MenuIcon, ChatDotRound, Expand, Fold, User, SwitchButton } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { markRaw } from 'vue'

const appStore = useAppStore()
const userStore = useUserStore()
const router = useRouter()

function handleLogout() {
  userStore.logout()
}

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <el-container class="app-container">
    <!-- 侧边栏 -->
    <el-aside width="210px" class="sidebar-container" :class="{ 'is-collapsed': !appStore.sidebarOpened }">
      <div class="logo">
        <img src="@/assets/vue.svg" alt="logo" />
        <h1 v-show="appStore.sidebarOpened">Vue3 Admin</h1>
      </div>
      <el-menu
        :default-active="$route.path"
        :collapse="!appStore.sidebarOpened"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        unique-opened
        router
      >
        <el-menu-item index="/dashboard" @click="navigateTo('/dashboard')">
          <el-icon><MenuIcon /></el-icon>
          <template #title>首页</template>
        </el-menu-item>
        <el-menu-item index="/history" @click="navigateTo('/history')">
          <el-icon><ChatDotRound /></el-icon>
          <template #title>历史记录</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 头部 -->
      <el-header class="app-header">
        <div class="header-left">
          <el-icon @click="appStore.toggleSidebar" class="toggle-sidebar">
            <Expand v-if="!appStore.sidebarOpened" />
            <Fold v-else />
          </el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-dropdown trigger="click">
            <div class="avatar-container">
              <el-avatar 
                :size="32" 
                :src="userStore.state.userInfo?.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
              />
              <span class="username">{{ userStore.state.userInfo?.name }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="navigateTo('/profile')">
                  <el-icon><User /></el-icon>
                  个人信息
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  <el-icon><SwitchButton /></el-icon>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 内容区 -->
      <el-main class="app-main">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive v-if="$route.meta.keepAlive">
              <component :is="markRaw(Component)" />
            </keep-alive>
            <component :is="markRaw(Component)" v-else />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.app-container {
  height: 100vh;
  width: 100%;
}

.sidebar-container {
  background-color: #304156;
  transition: width 0.28s;
  overflow: hidden;

  &.is-collapsed {
    width: 64px !important;
  }

  .logo {
    height: 60px;
    line-height: 60px;
    background-color: #263445;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    overflow: hidden;

    img {
      width: 32px;
      height: 32px;
    }

    h1 {
      color: #fff;
      font-size: 16px;
      margin: 0 0 0 12px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

.app-header {
  height: 60px;
  line-height: 60px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  .header-left {
    display: flex;
    align-items: center;

    .toggle-sidebar {
      cursor: pointer;
      font-size: 20px;
      margin-right: 16px;
    }
  }

  .header-right {
    display: flex;
    align-items: center;

    .avatar-container {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0 8px;
      height: 100%;
      
      &:hover {
        background-color: rgba(0, 0, 0, 0.025);
      }

      .username {
        margin-left: 8px;
        font-size: 14px;
        color: #606266;
      }
    }
  }
}

.app-main {
  background-color: #f0f2f5;
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>