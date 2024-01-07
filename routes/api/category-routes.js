const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    
    const allCategories = await Category.findAll({
      include: [
        {
          model: Product
        }
      ]
    });

    res.status(200).json(allCategories);
  
  } catch (error) {

    res.status(500).json({ message: 'error'});
  }
 
});

router.get('/:id', async (req, res) => {
  try {

    const category = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product
        }
      ]
    });

    res.status (200).json(category);

  } catch (error) {

    res.status(500).json({ message: 'error'});
  }

});

// create a new categroy
router.post('/', async (req, res) => {

  try{

    const newCategory = await Category.create(req.body);

    res.status(200).json(newCategory);

  } catch (error) {

    res.status(500).json({ message: 'Server error'});
  }
  
});
// update a category by its `id` value
router.put('/:id', async (req, res) => {

  try {

    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(updatedCategory);

  } catch (error) {

    res.status(500).json({ message: 'Server error'});
  }

});
// delete a category by its `id` value
router.delete('/:id', async (req, res) => {

  try {

    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

  } catch (error) {

    res.status(500).json({ message: 'Server error'});
  }
  
});

module.exports = router;
