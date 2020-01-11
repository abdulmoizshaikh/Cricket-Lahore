async function getProductsCategories() {
    try {
      setStateIsLoading(true);
      const categories = await dispatch(productActions.getProductsCategories());
      for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < categories[i].category.length; j++) {
          categories[i].category[j].subCategory.push({
            subCategory: "Others / Suggest Category"
          });
        }
      }
      setStateOfCategories(categories);
      setStateIsLoading(false);
    } catch (error) {
      utils._toast("Somthing went Wrong! in get Categories", "error");
      setStateIsLoading(true);
    }
  }