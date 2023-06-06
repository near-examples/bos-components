const products = Near.view("commerce.dev-support.near", "get_items");

return <>
  <div class="row">
    {products.map(product => (
      <>
        <div class="col-6">
          <Widget
            src="dev-support.near/widget/Commerce.Product.Preview"
            props={{
              title: product.name,
              text: product.description,
              price: product.price,
              img: product.image
            }}
          />
        </div>
      </>
    ))}
  </div>
</>