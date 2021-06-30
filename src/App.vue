<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html{ 
 height: 100%;
} 

body{
 height: 100%;
 position: relative;
}
body{
  background: rgb(109,8,249);
  background: linear-gradient(23deg, rgba(109,8,249,1) 0%, rgba(23,23,205,1) 62%, rgba(51,49,61,0.9976365546218487) 100%);
}
table#table thead th {
    padding: 14px!important;
}

table#table tbody td {
    padding: 14px!important;
}

@media only screen and (max-width: 547px) {
  .body-main{
    height: auto!important;
  }
  .content-table{
    height: 100%;
    padding: 6% 3% 0%;
  }
  .content-table .card{
    width: 90%!important;
  }
}
</style>
