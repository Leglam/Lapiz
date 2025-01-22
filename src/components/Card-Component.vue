<template>
  <div class="container">
    <img src="/src/assets/shoes/shoes.png" alt="" class="card-img" />

    <div class="card-title">
      <div class="product-name">Product Name</div>
      <div class="card-detail">
        <div class="card-content">
          <div>Product Price</div>
          <div>Compare</div>
        </div>
        <div class="card-content">
          <div>Color</div>
          <div>Heart</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  background-color: var(--white-color);
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.226);

  .card-img {
    width: 15.76vw;
    height: 100%;
  }

  .card-title {
    display: flex;
    flex-direction: column;
    font-size: 0.9vw;
    font-weight: bold;
    margin: 11px 14px;
  }

  .card-detail {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    font-size: 0.83vw;
    font-weight: 400;
    gap: 10px;
  }
}
</style>
