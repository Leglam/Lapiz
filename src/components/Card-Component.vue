<template>
  <div class="container">
    <img src="/src/assets/shoes/shoes.png" alt="" class="card-img" />

    <div class="card-title">
      <div class="product-name">
        a
      </div>
      <div class="card-detail">
        <div class="card-content">
          <div class="product-price">4000 THB</div>
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
  width: 16.46vw;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.226);

  .card-img {
    width: 100%;
  }

  .card-title {
    display: flex;
    flex-direction: column;
    font-size: 0.83vw;
    font-weight: bold;
    margin: 11px 14px;
  }

  .product-name {
    font-size: 0.9vw;
    color: var(--card-name-color);
    line-height: 150%;
    height: 2.7vw;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-detail {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    font-weight: 400;
    gap: 10px;

    .product-price {
      font-weight: bold;
    }
  }
}
</style>
