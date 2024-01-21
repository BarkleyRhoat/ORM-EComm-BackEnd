const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag }
        // { model: Tag, through: ProductTag }
      ]
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all products
  // be sure to include its associated Category and Tag data
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag}
        // { model: Tag, through: ProductTag }
      ]
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);

    // if (req.body.tagIds && req.body.tagIds.length)
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id
      }));

      await ProductTag.bulkCreate(productTagIdArr);
      
    }

    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {

  // try {

  //   const [numRowsUpdated, updatedProduct] = await Product.update(req.body, {
  //     where: { id: req.params.id },
  //     returning: true

  //   });
  try {

    const [updatedRowsCount] = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
  

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id }
      });

      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => ({
          product_id: req.params.id,
          tag_id
        }));

      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags)
      ]);
    }

    const updatedProduct = await Product.findByPk(req.params.id);

    res.json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: { id: req.params.id }
    });

    res.status(200).json(deletedProduct);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
