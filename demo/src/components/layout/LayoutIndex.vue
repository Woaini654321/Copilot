<script setup lang="ts">
import { useAppStore } from '@/stores/modules/app'
import { useUserStore } from '@/stores/modules/user'

const appStore = useAppStore()
const userStore = useUserStore()

function handleLogout() {
  userStore.logout()
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
        router
      >
        <el-menu-item index="/dashboard">
          <el-icon><el-icon-menu /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <!-- 更多菜单项 -->
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 头部 -->
      <el-header class="app-header">
        <div class="header-left">
          <el-icon @click="appStore.toggleSidebar" class="toggle-sidebar">
            <el-icon-expand v-if="!appStore.sidebarOpened" />
            <el-icon-fold v-else />
          </el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-dropdown trigger="click">
            <div class="avatar-container">
              <el-avatar :size="32" :src="userStore.state.userInfo?.avatar" />
              <span class="username">{{ userStore.state.userInfo?.nickname }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 内容区 -->
      <el-main class="app-main">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" />
          </keep-alive>
          <component :is="Component" v-if="!$route.meta.keepAlive" />
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

      .username {
        margin-left: 8px;
      }
    }
  }
}

.app-main {
  padding: 16px;
  background-color: #f0f2f5;
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>